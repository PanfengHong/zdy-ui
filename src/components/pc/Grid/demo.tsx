import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Grid from './Grid';

const GridDemo = () => {
  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

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

  return (
    <>
      <div className="component-group">
        <h3>基础栅格</h3>
        <DemoBlock
          code={`
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
          `.trim()}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>间距栅格</h3>
        <DemoBlock
          code={`
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
          `.trim()}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>偏移栅格</h3>
        <DemoBlock
          code={`
<Grid.Row>
  <Grid.Col span={8}>
    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>
  </Grid.Col>
  <Grid.Col span={8} offset={8}>
    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8 offset-8</div>
  </Grid.Col>
</Grid.Row>
          `.trim()}
        >
          <Grid.Row>
            <Grid.Col span={8}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8</div>
            </Grid.Col>
            <Grid.Col span={8} offset={8}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-8 offset-8</div>
            </Grid.Col>
          </Grid.Row>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>对齐方式</h3>
        <DemoBlock
          code={`
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
          `.trim()}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>响应式布局</h3>
        <DemoBlock
          code={`
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
          `.trim()}
        >
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
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Grid.Row API</h3>
        <Table columns={apiColumns} dataSource={rowApiData} className="zdy-table-api" />
      </div>
      <div className="component-group">
        <h3>Grid.Col API</h3>
        <Table columns={apiColumns} dataSource={colApiData} className="zdy-table-api" />
      </div>
    </>
  );
};

export default GridDemo;