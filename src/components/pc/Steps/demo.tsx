import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Steps from './Steps';

const { Step } = Steps;

const StepsDemo = () => {
  const [current1, setCurrent1] = useState(1);
  const [current2, setCurrent2] = useState(2);
  const [current3, setCurrent3] = useState(1);

  const stepsData = [
    { title: '第一步', description: '填写基本信息' },
    { title: '第二步', description: '配置参数' },
    { title: '第三步', description: '确认提交' },
    { title: '第四步', description: '完成' },
  ];

  const apiData = [
    { prop: 'current', desc: '当前步骤（从0开始）', type: 'number', default: '0' },
    { prop: 'initial', desc: '起始步骤序号', type: 'number', default: '0' },
    { prop: 'direction', desc: '方向', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
    { prop: 'status', desc: '当前步骤状态', type: "'wait' | 'process' | 'finish' | 'error'", default: "'process'" },
    { prop: 'size', desc: '尺寸', type: "'default' | 'small'", default: "'default'" },
    { prop: 'labelPlacement', desc: '标签放置位置', type: "'horizontal' | 'vertical'", default: "'vertical'" },
    { prop: 'percent', desc: '当前步骤进度百分比', type: 'number', default: '-' },
    { prop: 'type', desc: '类型', type: "'default' | 'navigation'", default: "'default'" },
    { prop: 'onChange', desc: '点击步骤回调', type: '(current) => void', default: '-' }
  ];

  const stepApiData = [
    { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
    { prop: 'description', desc: '描述', type: 'ReactNode', default: '-' },
    { prop: 'icon', desc: '自定义图标', type: 'ReactNode', default: '-' },
    { prop: 'status', desc: '状态（覆盖自动计算）', type: 'StepStatus', default: '-' },
    { prop: 'disabled', desc: '是否禁用点击', type: 'boolean', default: 'false' },
    { prop: 'onClick', desc: '点击回调', type: '(e) => void', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock code={`<Steps current={1}>\n  <Step title="已完成" />\n  <Step title="进行中" />\n  <Step title="待处理" />\n</Steps>`}>
          <Steps current={1}>
            <Step title="已完成" />
            <Step title="进行中" />
            <Step title="待处理" />
            <Step title="最后一个" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带描述</h3>
        <DemoBlock code={`<Steps current={1}>\n  <Step title="登录" description="登录账号" />\n</Steps>`}>
          <Steps current={1}>
            <Step title="登录" description="登录账号" />
            <Step title="验证" description="验证身份信息" />
            <Step title="完成" description="登录成功" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>可点击切换</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前步骤：</span>
          <strong style={{ color: '#1890ff' }}>{current1}</strong>
        </div>
        <DemoBlock code={`const [current, setCurrent] = useState(1);\n\n<Steps current={current} onChange={setCurrent}>`}>
          <Steps current={current1} onChange={setCurrent1}>
            {stepsData.map((s) => (
              <Step key={s.title} title={s.title} description={s.description} />
            ))}
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>垂直方向</h3>
        <div style={{ display: 'flex', gap: 48 }}>
          <DemoBlock code={`<Steps current={1} direction="vertical">`}>
            <Steps current={1} direction="vertical" style={{ width: 200 }}>
              <Step title="已完成" description="这个任务已完成" />
              <Step title="进行中" description="正在处理这个任务" />
              <Step title="待处理" description="等待处理" />
              <Step title="待处理" description="等待处理" />
            </Steps>
          </DemoBlock>
        </div>
      </div>

      <div className="component-group">
        <h3>垂直方向可切换</h3>
        <div style={{ marginBottom: 12 }}>
          <span>当前步骤：</span>
          <strong style={{ color: '#1890ff' }}>{current3}</strong>
        </div>
        <DemoBlock code={`<Steps current={current} direction="vertical" onChange={setCurrent}>`}>
          <Steps current={current3} direction="vertical" onChange={setCurrent3} style={{ width: 200 }}>
            {stepsData.map((s) => (
              <Step key={s.title} title={s.title} description={s.description} />
            ))}
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>错误状态</h3>
        <DemoBlock code={`<Steps current={1} status="error">`}>
          <Steps current={1} status="error">
            <Step title="登录" description="登录成功" />
            <Step title="验证" description="验证失败" />
            <Step title="完成" description="等待重试" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>小尺寸</h3>
        <DemoBlock code={`<Steps current={2} size="small">`}>
          <Steps current={2} size="small">
            <Step title="已完成" />
            <Step title="已完成" />
            <Step title="进行中" />
            <Step title="待处理" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>标签在右侧（labelPlacement=horizontal）</h3>
        <DemoBlock code={`<Steps current={1} labelPlacement="horizontal">`}>
          <Steps current={1} labelPlacement="horizontal">
            <Step title="第一步" description="填写信息" />
            <Step title="第二步" description="配置参数" />
            <Step title="第三步" description="确认提交" />
            <Step title="第四步" description="完成" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义图标</h3>
        <DemoBlock code={`<Step title="登录" icon="🔐" />`}>
          <Steps current={1}>
            <Step title="登录" icon="🔐" />
            <Step title="验证" icon="📱" />
            <Step title="支付" icon="💰" />
            <Step title="完成" icon="✅" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>进度环</h3>
        <div style={{ marginBottom: 12 }}>
          <button
            onClick={() => setCurrent2((c) => Math.max(0, c - 1))}
            style={{ padding: '4px 12px', marginRight: 8, border: '1px solid #d9d9d9', borderRadius: 4, background: '#fff', cursor: 'pointer' }}
          >
            上一步
          </button>
          <button
            onClick={() => setCurrent2((c) => Math.min(2, c + 1))}
            style={{ padding: '4px 12px', border: '1px solid #d9d9d9', borderRadius: 4, background: '#fff', cursor: 'pointer' }}
          >
            下一步
          </button>
        </div>
        <DemoBlock code={`<Steps current={current} percent={60}>`}>
          <Steps current={current2} percent={60}>
            <Step title="开始" description="任务开始" />
            <Step title="处理中" description="正在处理任务（60%）" />
            <Step title="完成" description="任务完成" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>导航模式</h3>
        <DemoBlock code={`<Steps current={1} type="navigation" onChange={onChange}>`}>
          <Steps current={1} type="navigation" onChange={(c) => console.log(c)}>
            <Step title="首页" />
            <Step title="商品列表" />
            <Step title="购物车" />
            <Step title="结算" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用某步</h3>
        <DemoBlock code={`<Step title="禁用" disabled />`}>
          <Steps current={1} onChange={(c) => console.log(c)}>
            <Step title="第一步" />
            <Step title="第二步" />
            <Step title="禁用步" disabled />
            <Step title="第四步" />
          </Steps>
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Steps API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>Step API</h3>
        <ApiTable dataSource={stepApiData} />
      </div>
    </>
  );
};

export default StepsDemo;
