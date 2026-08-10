import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Grid from './Grid';

const GridDemo = () => {
  const rowApiData = [
    { prop: 'gutter', desc: '栅格间距', type: 'number | object', default: '0' },
    { prop: 'justify', desc: '水平对齐方式', type: "'start' | 'end' | 'center' | 'space-around' | 'space-between'", default: 'start' },
    { prop: 'align', desc: '垂直对齐方式', type: "'top' | 'middle' | 'bottom'", default: 'top' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const colApiData = [
    { prop: 'span', desc: '栅格占位格数', type: 'number | string', default: '-' },
    { prop: 'offset', desc: '栅格偏移格数', type: 'number | string', default: '0' },
    { prop: 'push', desc: '向右移动格数', type: 'number | string', default: '0' },
    { prop: 'pull', desc: '向左移动格数', type: 'number | string', default: '0' },
    { prop: 'xs', desc: '超小屏响应式', type: 'number | string | object', default: '-' },
    { prop: 'sm', desc: '小屏响应式', type: 'number | string | object', default: '-' },
    { prop: 'md', desc: '中屏响应式', type: 'number | string | object', default: '-' },
    { prop: 'lg', desc: '大屏响应式', type: 'number | string | object', default: '-' },
    { prop: 'xl', desc: '超大屏响应式', type: 'number | string | object', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  const demos = [
    {
      title: '基础栅格',
      code: `<Grid.Row>\n  <Grid.Col span={24}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-24</div>\n  </Grid.Col>\n</Grid.Row>\n<Grid.Row>\n  <Grid.Col span={12}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-12</div>\n  </Grid.Col>\n  <Grid.Col span={12}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-12</div>\n  </Grid.Col>\n</Grid.Row>\n<Grid.Row>\n  <Grid.Col span={8}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>\n  </Grid.Col>\n  <Grid.Col span={8}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>\n  </Grid.Col>\n  <Grid.Col span={8}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>\n  </Grid.Col>\n</Grid.Row>`,
      render: (
        <>
          <Grid.Row>
            <Grid.Col span={24}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-24</div>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={12}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-12</div>
            </Grid.Col>
            <Grid.Col span={12}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-12</div>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={8}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>
            </Grid.Col>
            <Grid.Col span={8}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>
            </Grid.Col>
            <Grid.Col span={8}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>
            </Grid.Col>
          </Grid.Row>
        </>
      ),
    },
    {
      title: '间距栅格',
      code: `<Grid.Row gutter={16}>\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n</Grid.Row>`,
      render: (
        <Grid.Row gutter={16}>
          <Grid.Col span={6}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
          </Grid.Col>
        </Grid.Row>
      ),
    },
    {
      title: '偏移栅格',
      code: `<Grid.Row>\n  <Grid.Col span={8}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>\n  </Grid.Col>\n  <Grid.Col span={8} offset={8}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8 offset-8</div>\n  </Grid.Col>\n</Grid.Row>`,
      render: (
        <Grid.Row>
          <Grid.Col span={8}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>
          </Grid.Col>
          <Grid.Col span={8} offset={8}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8 offset-8</div>
          </Grid.Col>
        </Grid.Row>
      ),
    },
    {
      title: '对齐方式',
      code: `<Grid.Row justify="center">\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n</Grid.Row>\n<Grid.Row justify="end">\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n</Grid.Row>\n<Grid.Row justify="space-between">\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n  <Grid.Col span={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>\n  </Grid.Col>\n</Grid.Row>`,
      render: (
        <>
          <Grid.Row justify="center">
            <Grid.Col span={6}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row justify="end">
            <Grid.Col span={6}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row justify="space-between">
            <Grid.Col span={6}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6</div>
            </Grid.Col>
          </Grid.Row>
        </>
      ),
    },
    {
      title: '响应式布局',
      code: `<Grid.Row>\n  <Grid.Col xs={24} sm={12} md={8} lg={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>响应式列</div>\n  </Grid.Col>\n  <Grid.Col xs={24} sm={12} md={8} lg={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>响应式列</div>\n  </Grid.Col>\n  <Grid.Col xs={24} sm={12} md={8} lg={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>响应式列</div>\n  </Grid.Col>\n  <Grid.Col xs={24} sm={12} md={8} lg={6}>\n    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>响应式列</div>\n  </Grid.Col>\n</Grid.Row>`,
      render: (
        <Grid.Row>
          <Grid.Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>响应式列</div>
          </Grid.Col>
          <Grid.Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>响应式列</div>
          </Grid.Col>
          <Grid.Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>响应式列</div>
          </Grid.Col>
          <Grid.Col xs={24} sm={12} md={8} lg={6}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>响应式列</div>
          </Grid.Col>
        </Grid.Row>
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
        <h3>Grid.Row API</h3>
        <ApiTable dataSource={rowApiData} />
      </div>
      <div className="component-group">
        <h3>Grid.Col API</h3>
        <ApiTable dataSource={colApiData} />
      </div>
    </>
  );
};

export default GridDemo;
