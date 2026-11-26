import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Icon,
  Input,
  Message,
  Radio,
  Select,
  Steps,
  Switch,
  Textarea,
} from '../../components/pc';
import Form, { FormItem, useForm } from '../../components/pc/Form/Form';
import './Admin.css';

const ownerOptions = [
  { value: 'linwanqing', label: '林晚晴 · 产品' },
  { value: 'chenzimo', label: '陈子墨 · 研发' },
  { value: 'sunian', label: '苏念 · 设计' },
  { value: 'guyan', label: '顾言 · 运营' },
];

const tagOptions = [
  { id: 'frontend', content: '前端' },
  { id: 'backend', content: '后端' },
  { id: 'design', content: '设计' },
  { id: 'ops', content: '运维' },
];

const AdminFormPage = () => {
  const form = useForm();
  const [result, setResult] = useState('');

  const handleFinish = (values: Record<string, any>) => {
    const text = JSON.stringify(values, (_key, value) =>
      value instanceof Date ? value.toLocaleDateString('zh-CN') : value,
      2,
    );
    setResult(text);
    Message.success('表单提交成功');
  };

  const handleReset = () => {
    form.resetFields();
    setResult('');
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">表单页</h1>
          <p className="admin-page-desc">展示表单校验、栅格布局与多种表单控件的组合用法。</p>
        </div>
        <div className="admin-page-actions">
          <Button onClick={handleReset}>
            <Icon type="cancel" size={14} />
            重置表单
          </Button>
        </div>
      </div>

      <div className="admin-grid-2 admin-grid-2--form">
        <div className="admin-card">
          <div className="admin-card-head">
            <h3>创建任务</h3>
            <span className="admin-muted">带 * 的为必填项</span>
          </div>
          <div className="admin-card-body">
            <Form
              form={form}
              className="admin-form"
              layout="vertical"
              initialValues={{ priority: 'medium', public: true, tags: [] }}
              onFinish={handleFinish}
            >
              <div className="admin-form-row">
                <FormItem
                  name="taskName"
                  label="任务名称"
                  rules={[
                    { required: true, message: '请输入任务名称' },
                    { min: 3, message: '任务名称至少 3 个字符' },
                  ]}
                >
                  <Input placeholder="例如：优化管理后台首页加载速度" />
                </FormItem>
                <FormItem name="owner" label="负责人" rules={[{ required: true, message: '请选择负责人' }]}>
                  <Select options={ownerOptions} placeholder="请选择负责人" />
                </FormItem>
              </div>

              <div className="admin-form-row">
                <FormItem name="priority" label="优先级">
                  <Radio
                    optionType="button"
                    options={[
                      { id: 'high', content: '高' },
                      { id: 'medium', content: '中' },
                      { id: 'low', content: '低' },
                    ]}
                  />
                </FormItem>
                <FormItem name="startDate" label="计划开始日期">
                  <DatePicker placeholder="请选择日期" />
                </FormItem>
              </div>

              <FormItem name="tags" label="所属模块">
                <Checkbox options={tagOptions} />
              </FormItem>

              <FormItem
                name="description"
                label="任务描述"
                rules={[
                  { required: true, message: '请输入任务描述' },
                  { min: 10, message: '任务描述至少 10 个字符' },
                ]}
              >
                <Textarea rows={4} placeholder="请详细描述任务背景、目标与验收标准" />
              </FormItem>

              <FormItem name="public" label="公开任务" valuePropName="checked">
                <Switch />
              </FormItem>

              <FormItem>
                <Button type="primary" onClick={() => void form.submit()}>
                  提交表单
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </FormItem>
            </Form>
          </div>
        </div>

        <aside className="admin-aside">
          <div className="admin-card admin-card-body">
            <h3>流程说明</h3>
            <Steps direction="vertical" current={1} size="small">
              <Steps.Step title="填写任务信息" description="补充任务名称、负责人与描述" />
              <Steps.Step title="负责人确认" description="负责人 1 个工作日内确认排期" />
              <Steps.Step title="进入迭代" description="任务流转至迭代看板跟进" />
            </Steps>
          </div>

          <Alert
            type="info"
            showIcon
            title="表单校验"
            message="必填项与格式校验会在提交时统一触发，可体验组件库完整的校验能力。"
          />

          <div className="admin-card admin-card-body">
            <h3>提交结果</h3>
            {result ? (
              <pre className="admin-result">{result}</pre>
            ) : (
              <div className="admin-result-empty">
                <Icon type="info" size={18} color="#bfbfbf" />
                提交表单后可在此查看数据
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminFormPage;
