import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Grid from './Grid';

const GridDemo = () => {
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
<Grid.Row>
  <Grid.Col span={6} offset={6}>
    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6 offset-6</div>
  </Grid.Col>
  <Grid.Col span={6} offset={6}>
    <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6 offset-6</div>
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
          <Grid.Row>
            <Grid.Col span={6} offset={6}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6 offset-6</div>
            </Grid.Col>
            <Grid.Col span={6} offset={6}>
              <div style={{ backgroundColor: '#f5f5f5', padding: '16px', textAlign: 'center' }}>col-6 offset-6</div>
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
    </>
  );
};

export default GridDemo;
