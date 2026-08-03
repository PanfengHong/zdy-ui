import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  Children,
  isValidElement,
} from 'react';
import classNames from 'classnames';
import type {
  FormProps,
  FormItemProps,
  FormContextValue,
  FormFieldRegister,
  FormRule,
  ValidateResult,
} from './types';
import './Form.less';

// ============================================================
// FormInstance：暴露给外部使用的表单实例
// ============================================================
export interface FormInstance {
  getFieldValue: (name: string) => any;
  setFieldValue: (name: string, value: any) => void;
  getFieldsValue: () => Record<string, any>;
  setFieldsValue: (values: Record<string, any>) => void;
  resetFields: () => void;
  getFieldError: (name: string) => string | undefined;
  validateField: (name: string, trigger?: 'change' | 'blur') => Promise<ValidateResult>;
  validateFields: () => Promise<Record<string, string>>;
  submit: () => Promise<void>;
}

// 内部状态容器（不随渲染变化，通过 ref 持有）
interface FormStore {
  values: Record<string, any>;
  errors: Record<string, string>;
  fields: Map<string, FormFieldRegister>;
  listeners: Map<string, Set<() => void>>;
  initialValues: Record<string, any>;
  onValuesChange?: (changed: Record<string, any>, all: Record<string, any>) => void;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, string>) => void;
}

const createValidateRule =
  (store: FormStore) =>
  async (rule: FormRule, value: any, formData: Record<string, any>): Promise<ValidateResult> => {
    if (rule.required) {
      const empty =
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);
      if (empty) return { valid: false, message: rule.message ?? '该字段为必填' };
    }
    if (rule.min !== undefined && typeof value === 'string' && value.length < rule.min) {
      return { valid: false, message: rule.message ?? `最少 ${rule.min} 个字符` };
    }
    if (rule.max !== undefined && typeof value === 'string' && value.length > rule.max) {
      return { valid: false, message: rule.message ?? `最多 ${rule.max} 个字符` };
    }
    if (rule.pattern && !rule.pattern.test(String(value ?? ''))) {
      return { valid: false, message: rule.message ?? '格式不正确' };
    }
    if (rule.validator) {
      return rule.validator(value, formData);
    }
    return { valid: true };
  };

const createFormInstance = (store: FormStore): FormInstance => {
  const validateRule = createValidateRule(store);

  const notify = (name: string) => {
    store.listeners.get(name)?.forEach((cb) => cb());
  };

  const validateField = async (
    name: string,
    trigger?: 'change' | 'blur'
  ): Promise<ValidateResult> => {
    const reg = store.fields.get(name);
    if (!reg) return { valid: true };
    const rules = reg.rules ?? [];
    const filtered = trigger ? rules.filter((r) => !r.trigger || r.trigger === trigger) : rules;
    const value = store.values[name];
    for (const rule of filtered) {
      const result = await validateRule(rule, value, store.values);
      if (!result.valid) {
        store.errors = { ...store.errors, [name]: result.message ?? '校验失败' };
        notify(name);
        return result;
      }
    }
    const next = { ...store.errors };
    delete next[name];
    store.errors = next;
    notify(name);
    return { valid: true };
  };

  return {
    getFieldValue: (name) => store.values[name],
    setFieldValue: (name, value) => {
      store.values = { ...store.values, [name]: value };
      store.onValuesChange?.({ [name]: value }, store.values);
      const reg = store.fields.get(name);
      const trigger = reg?.validateTrigger ?? 'change';
      if (trigger === 'change' || trigger === 'both') {
        void validateField(name, 'change');
      }
      notify(name);
    },
    getFieldsValue: () => ({ ...store.values }),
    setFieldsValue: (vals) => {
      store.values = { ...store.values, ...vals };
      Object.keys(vals).forEach(notify);
    },
    resetFields: () => {
      store.values = { ...store.initialValues };
      store.errors = {};
      store.fields.forEach((_, name) => notify(name));
    },
    getFieldError: (name) => store.errors[name],
    validateField,
    validateFields: async () => {
      const names = Array.from(store.fields.keys());
      await Promise.all(names.map((n) => validateField(n)));
      return { ...store.errors };
    },
    submit: async () => {
      const errors = await Promise.all(names()).then(() => ({ ...store.errors }));
      if (Object.keys(errors).length === 0) {
        store.onFinish?.({ ...store.values });
      } else {
        store.onFinishFailed?.(errors);
      }
      function names() {
        return Array.from(store.fields.keys());
      }
    },
  };
};

// 外部 useForm：返回稳定引用，Form 组件会填充真实实现
export const useForm = (): FormInstance => {
  const ref = useRef<FormInstance | null>(null);
  if (!ref.current) {
    // 占位实现，Form 挂载后会替换
    ref.current = {
      getFieldValue: () => undefined,
      setFieldValue: () => {},
      getFieldsValue: () => ({}),
      setFieldsValue: () => {},
      resetFields: () => {},
      getFieldError: () => undefined,
      validateField: async () => ({ valid: true }),
      validateFields: async () => ({}),
      submit: async () => {},
    };
  }
  return ref.current;
};

// ============================================================
// FormContext
// ============================================================
const FormContext = createContext<FormContextValue | null>(null);
export const useFormContext = () => useContext(FormContext);

// ============================================================
// FormItem
// ============================================================
const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  rules = [],
  validateTrigger = 'change',
  required: requiredProp,
  colon = true,
  help,
  extra,
  valuePropName = 'value',
  onChangePropName = 'onChange',
  onBlurPropName = 'onBlur',
  className = '',
  style,
  children,
}) => {
  const ctx = useContext(FormContext);
  const [, forceUpdate] = useState(0);
  const rerender = useCallback(() => forceUpdate((n) => n + 1), []);

  // 注册字段 + 订阅
  useEffect(() => {
    if (!name || !ctx) return;
    ctx.registerField({ name, rules, validateTrigger });
    ctx.subscribe(name, rerender);
    return () => {
      ctx.unregisterField(name);
      ctx.unsubscribe(name, rerender);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // rules 变化时同步更新注册信息
  useEffect(() => {
    if (!name || !ctx) return;
    ctx.registerField({ name, rules, validateTrigger });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rules, validateTrigger]);

  const value = name && ctx ? ctx.getFieldValue(name) : undefined;
  const error = name && ctx ? ctx.getFieldError(name) : undefined;
  const isRequired = requiredProp ?? rules.some((r) => r.required);

  const handleChange = (v: any) => {
    if (!name || !ctx) return;
    ctx.setFieldValue(name, v);
  };

  const handleBlur = () => {
    if (!name || !ctx) return;
    if (validateTrigger === 'blur' || validateTrigger === 'both') {
      void ctx.validateField(name, 'blur');
    }
  };

  // 注入 props 到子组件
  const childArray = Children.toArray(children);
  const injectedChildren = childArray.map((child) => {
    if (isValidElement(child)) {
      const childProps: any = child.props || {};
      const merged: any = {
        ...childProps,
        [valuePropName]: value,
        [onChangePropName]: (...args: any[]) => {
          const last = args[args.length - 1];
          let v: any;
          if (last && last.target && 'value' in last.target) {
            v = last.target.value;
          } else if (args.length === 1) {
            v = args[0];
          } else {
            v = last;
          }
          handleChange(v);
          childProps[onChangePropName]?.(...args);
        },
      };
      if (onBlurPropName) {
        merged[onBlurPropName] = (...args: any[]) => {
          handleBlur();
          childProps[onBlurPropName]?.(...args);
        };
      }
      return React.cloneElement(child, merged);
    }
    return child;
  });

  return (
    <div
      className={classNames(
        'zdy-form-item',
        `zdy-form-item--${ctx?.layout ?? 'horizontal'}`,
        { 'zdy-form-item--error': !!error },
        className
      )}
      style={style}
    >
      {label !== undefined && label !== null && (
        <label
          className="zdy-form-item-label"
          style={{
            width: typeof ctx?.labelWidth === 'number' ? ctx.labelWidth : undefined,
            textAlign: ctx?.labelAlign ?? 'right',
            flex: typeof ctx?.labelWidth === 'string' ? `0 0 ${ctx.labelWidth}` : undefined,
          }}
        >
          {isRequired && <span className="zdy-form-item-required">*</span>}
          {label}
          {colon && typeof label === 'string' && <span>：</span>}
        </label>
      )}
      <div className="zdy-form-item-control">
        <div className="zdy-form-item-content">{injectedChildren}</div>
        {(error || help) && (
          <div
            className={classNames('zdy-form-item-explain', {
              'zdy-form-item-explain--error': error,
            })}
          >
            {error ?? help}
          </div>
        )}
        {extra && <div className="zdy-form-item-extra">{extra}</div>}
      </div>
    </div>
  );
};

// ============================================================
// Form
// ============================================================
const Form: React.FC<FormProps & { form?: FormInstance }> = ({
  initialValues = {},
  values: controlledValues,
  onValuesChange,
  onFinish,
  onFinishFailed,
  labelWidth = 100,
  labelAlign = 'right',
  layout = 'horizontal',
  size = 'medium',
  disabled = false,
  className = '',
  style,
  form: formProp,
  children,
}) => {
  // 创建内部 store（只创建一次）
  const storeRef = useRef<FormStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = {
      values: { ...initialValues },
      errors: {},
      fields: new Map(),
      listeners: new Map(),
      initialValues: { ...initialValues },
      onValuesChange,
      onFinish,
      onFinishFailed,
    };
  }
  // 同步最新的回调（避免闭包过期）
  storeRef.current.onValuesChange = onValuesChange;
  storeRef.current.onFinish = onFinish;
  storeRef.current.onFinishFailed = onFinishFailed;

  // 创建实例（只创建一次）
  const instanceRef = useRef<FormInstance | null>(null);
  if (!instanceRef.current) {
    instanceRef.current = createFormInstance(storeRef.current);
  }
  const instance = instanceRef.current;

  // 如果外部传入了 form，将方法挂到外部 form 上（保持引用稳定）
  useEffect(() => {
    if (!formProp) return;
    const inst = instance;
    (formProp as any).getFieldValue = inst.getFieldValue;
    (formProp as any).setFieldValue = inst.setFieldValue;
    (formProp as any).getFieldsValue = inst.getFieldsValue;
    (formProp as any).setFieldsValue = inst.setFieldsValue;
    (formProp as any).resetFields = inst.resetFields;
    (formProp as any).getFieldError = inst.getFieldError;
    (formProp as any).validateField = inst.validateField;
    (formProp as any).validateFields = inst.validateFields;
    (formProp as any).submit = inst.submit;
  }, [formProp, instance]);

  // 受控 values 同步
  useEffect(() => {
    if (controlledValues) {
      instance.setFieldsValue(controlledValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledValues]);

  const registerField = useCallback((field: FormFieldRegister) => {
    storeRef.current!.fields.set(field.name, field);
  }, []);
  const unregisterField = useCallback((name: string) => {
    storeRef.current!.fields.delete(name);
  }, []);
  const subscribe = useCallback((name: string, cb: () => void) => {
    const store = storeRef.current!;
    if (!store.listeners.has(name)) store.listeners.set(name, new Set());
    store.listeners.get(name)!.add(cb);
  }, []);
  const unsubscribe = useCallback((name: string, cb: () => void) => {
    storeRef.current!.listeners.get(name)?.delete(cb);
  }, []);

  const contextValue: FormContextValue = useMemo(
    () => ({
      getFieldValue: instance.getFieldValue,
      setFieldValue: instance.setFieldValue,
      getFieldError: instance.getFieldError,
      setFieldError: (name) => {
        // 错误由 validateField 写入，这里仅触发通知
        storeRef.current!.listeners.get(name)?.forEach((cb) => cb());
      },
      registerField,
      unregisterField,
      validateField: instance.validateField,
      validateAll: instance.validateFields,
      subscribe,
      unsubscribe,
      disabled,
      labelWidth,
      labelAlign,
      layout,
      size,
    }),
    [instance, registerField, unregisterField, subscribe, unsubscribe, disabled, labelWidth, labelAlign, layout, size]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void instance.submit();
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={classNames(
          'zdy-form',
          `zdy-form--${layout}`,
          `zdy-form--${size}`,
          { 'zdy-form--disabled': disabled },
          className
        )}
        style={style}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

export { FormItem };
export default Form;
