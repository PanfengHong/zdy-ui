import React, { useState, useEffect } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Skeleton from './Skeleton';
import Button from '../Button/Button';

const SkeletonDemo = () => {
  const [loading, setLoading] = useState(true);
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loadData) {
      const timer = setTimeout(() => {
        setLoadData(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loadData]);

  const apiData = [
    { prop: 'active', desc: '是否显示动画效果', type: 'boolean', default: 'true' },
    { prop: 'avatar', desc: '是否显示头像占位', type: 'boolean | { size?: number; shape?: string }', default: 'false' },
    { prop: 'title', desc: '是否显示标题占位', type: 'boolean | { width?: number | string }', default: 'true' },
    { prop: 'paragraph', desc: '是否显示段落占位', type: 'boolean | { rows?: number; width?: number | string | Array }', default: 'true' },
    { prop: 'loading', desc: '是否显示骨架屏（包裹模式）', type: 'boolean', default: 'true' },
    { prop: 'children', desc: '实际内容（loading为false时显示）', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const paragraphApiData = [
    { prop: 'rows', desc: '段落行数', type: 'number', default: '3' },
    { prop: 'width', desc: '每行宽度', type: 'number | string | Array', default: '最后一行为61%' }
  ];

  const avatarApiData = [
    { prop: 'size', desc: '头像尺寸', type: 'number', default: '40' },
    { prop: 'shape', desc: '头像形状', type: "'circle' | 'square'", default: 'circle' }
  ];

  const demos = [
    {
      title: '基础用法',
      code: `<Skeleton active />`.trim(),
      render: <Skeleton active />
    },
    {
      title: '无动画效果',
      code: `<Skeleton active={false} />`.trim(),
      render: <Skeleton active={false} />
    },
    {
      title: '有头像的骨架屏',
      code: `<Skeleton avatar active />`.trim(),
      render: <Skeleton avatar active />
    },
    {
      title: '自定义头像尺寸',
      code: `<Skeleton avatar={{ size: 56, shape: 'circle' }} active />`.trim(),
      render: <Skeleton avatar={{ size: 56, shape: 'circle' }} active />
    },
    {
      title: '方形头像',
      code: `<Skeleton avatar={{ size: 48, shape: 'square' }} active />`.trim(),
      render: <Skeleton avatar={{ size: 48, shape: 'square' }} active />
    },
    {
      title: '自定义标题宽度',
      code: `<Skeleton title={{ width: '60%' }} active />`.trim(),
      render: <Skeleton title={{ width: '60%' }} active />
    },
    {
      title: '自定义段落',
      code: `<Skeleton paragraph={{ rows: 4, width: ['100%', '100%', '80%', '60%'] }} active />`.trim(),
      render: <Skeleton paragraph={{ rows: 4, width: ['100%', '100%', '80%', '60%'] }} active />
    },
    {
      title: '仅显示段落',
      code: `<Skeleton paragraph active />`.trim(),
      render: <Skeleton paragraph active />
    },
    {
      title: '包裹模式',
      code: `
const [loading, setLoading] = useState(true);

// 2秒后显示内容
useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 2000);
  return () => clearTimeout(timer);
}, []);

<Skeleton loading={loading} avatar active>
  <div style={{ padding: '16px 0' }}>
    <h3>实现完成的内容</h3>
    <p>这是加载完成后显示的实际内容。</p>
    <p>骨架屏在数据加载完成后会自动消失。</p>
  </div>
</Skeleton>
          `.trim(),
      render: <Skeleton loading={loading} avatar active>
            <div style={{ padding: '16px 0' }}>
              <h3>实现完成的内容</h3>
              <p>这是加载完成后显示的实际内容。</p>
              <p>骨架屏在数据加载完成后会自动消失。</p>
            </div>
          </Skeleton>,
          actions: [
            {
              label: '重新加载',
              onClick: () => { setLoading(true); setTimeout(() => setLoading(false), 2000); }
            }
          ]
    },
    {
      title: '自定义加载内容',
      code: `
const [loadData, setLoadData] = useState(true);

<Skeleton loading={loadData} active>
  <div style={{ padding: '16px 0' }}>
    <h3>用户信息</h3>
    <p>姓名：张三</p>
    <p>年龄：28</p>
    <p>职业：前端工程师</p>
  </div>
</Skeleton>
          `.trim(),
      render: (
        <Skeleton loading={loadData} active avatar>
            <div style={{ padding: '16px 0' }}>
              <h3>用户信息</h3>
              <p>姓名：张三</p>
              <p>年龄：28</p>
              <p>职业：前端工程师</p>
            </div>
          </Skeleton>
      ),
      actions: [
        {
          label: '重新加载',
          onClick: () => { setLoadData(true); setTimeout(() => setLoadData(false), 2000); }
        }
      ]
    }
  ];

  return (
    <>
    {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
          {demo.actions && (
            <div style={{ marginTop: 12 }}>
              {demo.actions.map((action) => (
                <Button key={action.label} onClick={action.onClick} type="primary">
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
      <div className="component-group">
        <h3>Paragraph 配置</h3>
        <ApiTable dataSource={paragraphApiData} />
      </div>
      <div className="component-group">
        <h3>Avatar 配置</h3>
        <ApiTable dataSource={avatarApiData} />
      </div>
    </>
  );
};

export default SkeletonDemo;