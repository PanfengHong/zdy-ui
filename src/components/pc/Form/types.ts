import type React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

// 校验规则的返回结果
export type ValidateResult = {
  valid: boolean;
  message?: string;
};

// 单条校验规则
export interface FormRule {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (value: any, formData: Record<string, any>) => ValidateResult | Promise<ValidateResult>;
  trigger?: 'change' | 'blur';
}

// 表单字段注册信息
export interface FormFieldRegister {
  name: string;
  rules?: FormRule[];
  validateTrigger?: 'change' | 'blur' | 'both';
}

// 表单上下文暴露给 FormItem 的能力
export interface FormContextValue {
  // 字段值
  getFieldValue: (name: string) => any;
  setFieldValue: (name: string, value: any) => void;
  // 错误
  getFieldError: (name: string) => string | undefined;
  setFieldError: (name: string, error?: string) => void;
  // 注册/注销
  registerField: (field: FormFieldRegister) => void;
  unregisterField: (name: string) => void;
  // 订阅/取消订阅（FormItem 强制刷新）
  subscribe: (name: string, cb: () => void) => void;
  unsubscribe: (name: string, cb: () => void) => void;
  // 校验
  validateField: (name: string, trigger?: 'change' | 'blur') => Promise<ValidateResult>;
  validateAll: () => Promise<Record<string, string>>;
  // 状态
  disabled?: boolean;
  labelWidth?: number | string;
  labelAlign?: 'left' | 'right';
  layout?: 'horizontal' | 'vertical' | 'inline';
  size?: SizeType;
}

// Form 组件 props
export interface FormProps extends BaseComponentProps {
  initialValues?: Record<string, any>;
  values?: Record<string, any>;
  onValuesChange?: (changed: Record<string, any>, all: Record<string, any>) => void;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, string>) => void;
  labelWidth?: number | string;
  labelAlign?: 'left' | 'right';
  layout?: 'horizontal' | 'vertical' | 'inline';
  size?: SizeType;
  disabled?: boolean;
}

// FormItem 组件 props
export interface FormItemProps extends BaseComponentProps {
  name?: string;
  label?: React.ReactNode;
  rules?: FormRule[];
  validateTrigger?: 'change' | 'blur' | 'both';
  required?: boolean;
  colon?: boolean;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  valuePropName?: string;
  onChangePropName?: string;
  onBlurPropName?: string;
}
