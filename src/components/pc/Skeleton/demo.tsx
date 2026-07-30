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

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`
<Skeleton active />
          `.trim()}
        >
          <Skeleton active />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>无动画效果</h3>
        <DemoBlock
          code={`
<Skeleton active={false} />
          `.trim()}
        >
          <Skeleton active={false} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>有头像的骨架屏</h3>
        <DemoBlock
          code={`
<Skeleton avatar active />
          `.trim()}
        >
          <Skeleton avatar active />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义头像尺寸</h3>
        <DemoBlock
          code={`
<Skeleton avatar={{ size: 56, shape: 'circle' }} active />
          `.trim()}
        >
          <Skeleton avatar={{ size: 56, shape: 'circle' }} active />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>方形头像</h3>
        <DemoBlock
          code={`
<Skeleton avatar={{ size: 48, shape: 'square' }} active />
          `.trim()}
        >
          <Skeleton avatar={{ size: 48, shape: 'square' }} active />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义标题宽度</h3>
        <DemoBlock
          code={`
<Skeleton title={{ width: '60%' }} active />
          `.trim()}
        >
          <Skeleton title={{ width: '60%' }} active />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义段落</h3>
        <DemoBlock
          code={`
<Skeleton paragraph={{ rows: 4, width: ['100%', '100%', '80%', '60%'] }} active />
          `.trim()}
        >
          <Skeleton paragraph={{ rows: 4, width: ['100%', '100%', '80%', '60%'] }} active />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>仅显示段落</h3>
        <DemoBlock
          code={`
<Skeleton avatar={false} title={false} paragraph active />
          `.trim()}
        >
          <Skeleton avatar={false} title={false} paragraph active />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>包裹模式</h3>
        <DemoBlock
          code={`
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
          `.trim()}
        >
          <Skeleton loading={loading} avatar active>
            <div style={{ padding: '16px 0' }}>
              <h3>实现完成的内容</h3>
              <p>这是加载完成后显示的实际内容。</p>
              <p>骨架屏在数据加载完成后会自动消失。</p>
            </div>
          </Skeleton>
        </DemoBlock>
        <div style={{ marginTop: 12 }}>
          <Button size="small" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}>
            重新加载
          </Button>
        </div>
      </div>

      <div className="component-group">
        <h3>自定义加载内容</h3>
        <DemoBlock
          code={`
const [loadData, setLoadData] = useState(true);

<Skeleton loading={loadData} active>
  <div style={{ padding: '16px 0' }}>
    <h3>用户信息</h3>
    <p>姓名：张三</p>
    <p>年龄：28</p>
    <p>职业：前端工程师</p>
  </div>
</Skeleton>
          `.trim()}
        >
          <Skeleton loading={loadData} active avatar>
            <div style={{ padding: '16px 0' }}>
              <h3>用户信息</h3>
              <p>姓名：张三</p>
              <p>年龄：28</p>
              <p>职业：前端工程师</p>
            </div>
          </Skeleton>
        </DemoBlock>
        <div style={{ marginTop: 12 }}>
          <Button size="small" onClick={() => { setLoadData(true); setTimeout(() => setLoadData(false), 2000); }}>
            重新加载
          </Button>
        </div>
      </div>

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