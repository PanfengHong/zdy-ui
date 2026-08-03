import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Form, { FormItem, useForm } from './Form';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Select from '../Select/Select';
import Checkbox from '../Checkbox/Checkbox';
import Radio from '../Radio/Radio';
import Button from '../Button/Button';

// 基础登录表单
const BasicFormDemo = () => {
  const form = useForm();
  const [result, setResult] = useState<string>('');

  return (
    <DemoBlock
      code={`const form = useForm();

<Form
  form={form}
  labelWidth={80}
  onFinish={(v) => console.log(v)}
>
  <FormItem name="username" label="用户名" rules={[{ required: true }]}>
    <Input placeholder="请输入用户名" />
  </FormItem>
  <FormItem name="password" label="密码" rules={[{ required: true, min: 6 }]}>
    <Input type="password" placeholder="请输入密码" />
  </FormItem>
  <FormItem>
    <Button type="primary" onClick={() => form.submit()}>登录</Button>
  </FormItem>
</Form>`}
    >
      <Form
        form={form}
        labelWidth={80}
        onFinish={(v) => setResult(JSON.stringify(v, null, 2))}
        onFinishFailed={(errs) => setResult('校验失败：' + JSON.stringify(errs))}
      >
        <FormItem name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem name="password" label="密码" rules={[{ required: true, min: 6, message: '密码至少 6 位' }]}>
          <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={() => form.submit()}>登录</Button>
        </FormItem>
      </Form>
      {result && (
        <pre style={{ marginTop: 12, padding: 8, background: '#f5f5f5', borderRadius: 4, fontSize: 12 }}>
          {result}
        </pre>
      )}
    </DemoBlock>
  );
};

// 注册表单（多种控件）
const RegisterFormDemo = () => {
  const form = useForm();
  const [result, setResult] = useState<string>('');

  return (
    <DemoBlock
      code={`<Form form={form} labelWidth={80} layout="horizontal">
  <FormItem name="name" label="姓名" rules={[{ required: true }]}>
    <Input />
  </FormItem>
  <FormItem name="gender" label="性别" rules={[{ required: true }]}>
    <Radio.Group>
      <Radio value="male">男</Radio>
      <Radio value="female">女</Radio>
    </Radio.Group>
  </FormItem>
  <FormItem name="hobbies" label="爱好">
    <Checkbox.Group>
      <Checkbox value="music">音乐</Checkbox>
      <Checkbox value="sport">运动</Checkbox>
      <Checkbox value="read">阅读</Checkbox>
    </Checkbox.Group>
  </FormItem>
  <FormItem name="city" label="城市" rules={[{ required: true }]}>
    <Select options={[...]} />
  </FormItem>
  <FormItem name="bio" label="简介">
    <Textarea rows={3} />
  </FormItem>
</Form>`}
    >
      <Form
        form={form}
        labelWidth={80}
        onFinish={(v) => setResult(JSON.stringify(v, null, 2))}
        onFinishFailed={(errs) => setResult('校验失败：' + JSON.stringify(errs))}
      >
        <FormItem name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem name="gender" label="性别" rules={[{ required: true, message: '请选择性别' }]}>
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="hobbies" label="爱好">
          <Checkbox.Group>
            <Checkbox value="music">音乐</Checkbox>
            <Checkbox value="sport">运动</Checkbox>
            <Checkbox value="read">阅读</Checkbox>
          </Checkbox.Group>
        </FormItem>
        <FormItem name="city" label="城市" rules={[{ required: true, message: '请选择城市' }]}>
          <Select
            placeholder="请选择城市"
            options={[
              { value: 'beijing', label: '北京' },
              { value: 'shanghai', label: '上海' },
              { value: 'guangzhou', label: '广州' },
              { value: 'shenzhen', label: '深圳' },
            ]}
          />
        </FormItem>
        <FormItem name="bio" label="简介">
          <Textarea rows={3} placeholder="介绍一下自己" />
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={() => form.submit()}>提交</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>重置</Button>
        </FormItem>
      </Form>
      {result && (
        <pre style={{ marginTop: 12, padding: 8, background: '#f5f5f5', borderRadius: 4, fontSize: 12 }}>
          {result}
        </pre>
      )}
    </DemoBlock>
  );
};

// 自定义校验
const CustomValidateDemo = () => {
  const form = useForm();
  const [result, setResult] = useState<string>('');

  return (
    <DemoBlock
      code={`<FormItem
  name="email"
  label="邮箱"
  rules={[
    { required: true, message: '请输入邮箱' },
    { pattern: /^[^@]+@[^@]+\\.[^@]+$/, message: '邮箱格式不正确' }
  ]}
>
  <Input />
</FormItem>

<FormItem
  name="confirm"
  label="确认密码"
  rules={[
    { required: true },
    {
      validator: (v, data) => ({
        valid: v === data.password,
        message: '两次密码不一致'
      })
    }
  ]}
>
  <Input type="password" />
</FormItem>`}
    >
      <Form
        form={form}
        labelWidth={100}
        onFinish={(v) => setResult(JSON.stringify(v, null, 2))}
        onFinishFailed={(errs) => setResult('校验失败：' + JSON.stringify(errs))}
      >
        <FormItem
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { pattern: /^[^@]+@[^@]+\.[^@]+$/, message: '邮箱格式不正确' },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem
          name="confirm"
          label="确认密码"
          rules={[
            { required: true, message: '请确认密码' },
            {
              validator: (v, data) => ({
                valid: v === data.password,
                message: '两次密码不一致',
              }),
            },
          ]}
        >
          <Input type="password" placeholder="请再次输入密码" />
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={() => form.submit()}>提交</Button>
        </FormItem>
      </Form>
      {result && (
        <pre style={{ marginTop: 12, padding: 8, background: '#f5f5f5', borderRadius: 4, fontSize: 12 }}>
          {result}
        </pre>
      )}
    </DemoBlock>
  );
};

// 布局演示
const LayoutDemo = () => {
  return (
    <DemoBlock code={`<Form layout="vertical">...</Form>\n<Form layout="inline">...</Form>`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h4 style={{ marginBottom: 8 }}>垂直布局（vertical）</h4>
          <Form layout="vertical" labelWidth={80}>
            <FormItem name="a" label="字段 A">
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem name="b" label="字段 B">
              <Input placeholder="请输入" />
            </FormItem>
          </Form>
        </div>
        <div>
          <h4 style={{ marginBottom: 8 }}>行内布局（inline）</h4>
          <Form layout="inline">
            <FormItem name="kw" label="关键词">
              <Input placeholder="搜索" />
            </FormItem>
            <FormItem name="status" label="状态">
              <Select
                options={[
                  { value: 'all', label: '全部' },
                  { value: 'active', label: '启用' },
                ]}
              />
            </FormItem>
            <FormItem>
              <Button type="primary">查询</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </DemoBlock>
  );
};

const FormDemo = () => {
  const formApi = [
    { prop: 'initialValues', desc: '表单初始值', type: 'Record<string, any>', default: '{}' },
    { prop: 'values', desc: '受控值（受控模式）', type: 'Record<string, any>', default: '-' },
    { prop: 'onValuesChange', desc: '字段变化回调', type: '(changed, all) => void', default: '-' },
    { prop: 'onFinish', desc: '校验通过后的提交回调', type: '(values) => void', default: '-' },
    { prop: 'onFinishFailed', desc: '校验失败回调', type: '(errors) => void', default: '-' },
    { prop: 'labelWidth', desc: '标签宽度', type: 'number | string', default: '100' },
    { prop: 'labelAlign', desc: '标签对齐', type: "'left' | 'right'", default: "'right'" },
    { prop: 'layout', desc: '表单布局', type: "'horizontal' | 'vertical' | 'inline'", default: "'horizontal'" },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
    { prop: 'disabled', desc: '是否禁用整表', type: 'boolean', default: 'false' },
  ];

  const itemApi = [
    { prop: 'name', desc: '字段名', type: 'string', default: '-' },
    { prop: 'label', desc: '标签文本', type: 'ReactNode', default: '-' },
    { prop: 'rules', desc: '校验规则数组', type: 'FormRule[]', default: '[]' },
    { prop: 'validateTrigger', desc: '校验触发时机', type: "'change' | 'blur' | 'both'", default: "'change'" },
    { prop: 'required', desc: '是否必填（覆盖 rules）', type: 'boolean', default: '-' },
    { prop: 'colon', desc: '标签后是否显示冒号', type: 'boolean', default: 'true' },
    { prop: 'help', desc: '帮助文本', type: 'ReactNode', default: '-' },
    { prop: 'extra', desc: '额外提示', type: 'ReactNode', default: '-' },
    { prop: 'valuePropName', desc: '值的属性名', type: 'string', default: "'value'" },
    { prop: 'onChangePropName', desc: '变化的回调名', type: 'string', default: "'onChange'" },
  ];

  const ruleApi = [
    { prop: 'required', desc: '是否必填', type: 'boolean', default: 'false' },
    { prop: 'message', desc: '校验失败提示', type: 'string', default: '-' },
    { prop: 'min', desc: '字符串最小长度', type: 'number', default: '-' },
    { prop: 'max', desc: '字符串最大长度', type: 'number', default: '-' },
    { prop: 'pattern', desc: '正则校验', type: 'RegExp', default: '-' },
    { prop: 'validator', desc: '自定义校验函数', type: '(value, formData) => ValidateResult | Promise<ValidateResult>', default: '-' },
    { prop: 'trigger', desc: '触发时机', type: "'change' | 'blur'", default: '-' },
  ];

  const instanceApi = [
    { prop: 'getFieldValue', desc: '获取字段值', type: '(name) => any', default: '-' },
    { prop: 'setFieldValue', desc: '设置字段值', type: '(name, value) => void', default: '-' },
    { prop: 'getFieldsValue', desc: '获取所有字段值', type: '() => Record<string, any>', default: '-' },
    { prop: 'setFieldsValue', desc: '批量设置字段值', type: '(values) => void', default: '-' },
    { prop: 'resetFields', desc: '重置表单', type: '() => void', default: '-' },
    { prop: 'validateFields', desc: '校验所有字段', type: '() => Promise<Record<string, string>>', default: '-' },
    { prop: 'submit', desc: '提交表单', type: '() => Promise<void>', default: '-' },
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <BasicFormDemo />
      </div>

      <div className="component-group">
        <h3>注册表单（多种控件）</h3>
        <RegisterFormDemo />
      </div>

      <div className="component-group">
        <h3>自定义校验</h3>
        <CustomValidateDemo />
      </div>

      <div className="component-group">
        <h3>布局演示</h3>
        <LayoutDemo />
      </div>

      <div className="component-group" style={{ marginTop: 32 }}>
        <h3>Form API</h3>
        <ApiTable dataSource={formApi} />
      </div>

      <div className="component-group">
        <h3>FormItem API</h3>
        <ApiTable dataSource={itemApi} />
      </div>

      <div className="component-group">
        <h3>FormRule API</h3>
        <ApiTable dataSource={ruleApi} />
      </div>

      <div className="component-group">
        <h3>FormInstance API（useForm 返回值）</h3>
        <ApiTable dataSource={instanceApi} />
      </div>
    </>
  );
};

export default FormDemo;
