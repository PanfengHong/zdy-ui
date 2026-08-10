import React, { useState, useEffect } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Progress from './Progress';
import Button from '../Button/Button';

const ProgressDemo = () => {
  const [percent, setPercent] = useState(0);
  const [loadingPercent, setLoadingPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const apiData = [
    { prop: 'percent', desc: '进度百分比（0-100）', type: 'number', default: '0' },
    { prop: 'type', desc: '进度条类型', type: "'line' | 'circle'", default: 'line' },
    { prop: 'status', desc: '状态', type: "'normal' | 'success' | 'exception' | 'active'", default: '-' },
    { prop: 'strokeColor', desc: '自定义进度条颜色', type: 'string', default: '-' },
    { prop: 'strokeWidth', desc: '进度条宽度', type: 'number', default: 'line:8 / circle:6' },
    { prop: 'showInfo', desc: '是否显示进度文字', type: 'boolean', default: 'true' },
    { prop: 'format', desc: '自定义进度文字', type: 'function(percent)', default: '-' },
    { prop: 'trailColor', desc: '背景色', type: 'string', default: '#f5f5f5' },
    { prop: 'width', desc: '环形进度条宽度', type: 'number', default: '120' },
    { prop: 'gapDegree', desc: '环形进度条缺口角度', type: 'number', default: '0' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const demos = [
    {
      title: '基础用法',
      code: `<Progress percent={30} />\n<Progress percent={50} />\n<Progress percent={70} />\n<Progress percent={100} />`,
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Progress percent={30} />
          <Progress percent={50} />
          <Progress percent={70} />
          <Progress percent={100} />
        </div>
      ),
    },
    {
      title: '状态',
      code: `<Progress percent={30} />\n<Progress percent={50} status="active" />\n<Progress percent={70} status="exception" />\n<Progress percent={100} status="success" />`,
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} status="success" />
        </div>
      ),
    },
    {
      title: '不显示进度文字',
      code: `<Progress percent={30} showInfo={false} />\n<Progress percent={50} showInfo={false} />\n<Progress percent={70} showInfo={false} />`,
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Progress percent={30} showInfo={false} />
          <Progress percent={50} showInfo={false} />
          <Progress percent={70} showInfo={false} />
        </div>
      ),
    },
    {
      title: '自定义颜色与宽度',
      code: `<Progress percent={60} strokeColor="#f5222d" />\n<Progress percent={60} strokeColor="#faad14" />\n<Progress percent={60} strokeWidth={12} />\n<Progress percent={60} strokeWidth={4} />`,
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Progress percent={60} strokeColor="#f5222d" />
          <Progress percent={60} strokeColor="#faad14" />
          <Progress percent={60} strokeWidth={12} />
          <Progress percent={60} strokeWidth={4} />
        </div>
      ),
    },
    {
      title: '自定义文字格式',
      code: `<Progress percent={60} format={(p) => \`\${p} 步骤已完成\`} />\n<Progress percent={60} format={(p) => p === 100 ? '完成' : \`\${p}%\`} />`,
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Progress percent={60} format={(p) => `${p} 步骤已完成`} />
          <Progress percent={100} format={(p) => p === 100 ? '完成' : `${p}%`} />
        </div>
      ),
    },
    {
      title: '动态进度条',
      code: `const [percent, setPercent] = useState(0);\n\n<Progress percent={percent} />\n<Button onClick={() => setPercent(0)}>重置</Button>\n<Button onClick={() => setPercent(percent + 10)}>+10%</Button>\n<Button onClick={() => setPercent(percent - 10)}>-10%</Button>`,
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Progress percent={percent} />
          <div style={{ display: 'flex', gap: 12 }}>
            <Button size="small" onClick={() => setPercent(0)}>重置</Button>
            <Button size="small" onClick={() => setPercent(Math.min(100, percent + 10))}>+10%</Button>
            <Button size="small" onClick={() => setPercent(Math.max(0, percent - 10))}>-10%</Button>
          </div>
        </div>
      ),
    },
    {
      title: '环形进度条',
      code: `<Progress type="circle" percent={30} />\n<Progress type="circle" percent={50} />\n<Progress type="circle" percent={70} />\n<Progress type="circle" percent={100} />`,
      render: (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Progress type="circle" percent={30} />
          <Progress type="circle" percent={50} />
          <Progress type="circle" percent={70} />
          <Progress type="circle" percent={100} />
        </div>
      ),
    },
    {
      title: '环形状态',
      code: `<Progress type="circle" percent={30} />\n<Progress type="circle" percent={70} status="exception" />\n<Progress type="circle" percent={100} status="success" />`,
      render: (
        <div style={{ display: 'flex', gap: 24 }}>
          <Progress type="circle" percent={30} />
          <Progress type="circle" percent={70} status="exception" />
          <Progress type="circle" percent={100} status="success" />
        </div>
      ),
    },
    {
      title: '环形自定义尺寸与宽度',
      code: `<Progress type="circle" percent={50} width={80} />\n<Progress type="circle" percent={50} width={120} />\n<Progress type="circle" percent={50} width={180} />\n<Progress type="circle" percent={50} width={120} strokeWidth={4} />\n<Progress type="circle" percent={50} width={120} strokeWidth={12} />`,
      render: (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Progress type="circle" percent={50} width={80} />
          <Progress type="circle" percent={50} width={120} />
          <Progress type="circle" percent={50} width={180} />
          <Progress type="circle" percent={50} width={120} strokeWidth={4} />
          <Progress type="circle" percent={50} width={120} strokeWidth={12} />
        </div>
      ),
    },
    {
      title: '环形带缺口',
      code: `<Progress type="circle" percent={50} gapDegree={60} />\n<Progress type="circle" percent={75} gapDegree={60} />\n<Progress type="circle" percent={100} gapDegree={60} />`,
      render: (
        <div style={{ display: 'flex', gap: 24 }}>
          <Progress type="circle" percent={50} gapDegree={60} />
          <Progress type="circle" percent={75} gapDegree={60} />
          <Progress type="circle" percent={100} gapDegree={60} />
        </div>
      ),
    },
    {
      title: '动态环形进度',
      code: `// 自动循环的进度条\n<Progress type="circle" percent={loadingPercent} status="active" />`,
      render: (
        <div style={{ display: 'flex', gap: 24 }}>
          <Progress type="circle" percent={loadingPercent} status="active" />
          <Progress percent={loadingPercent} status="active" />
        </div>
      ),
    },
  ];

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default ProgressDemo;
