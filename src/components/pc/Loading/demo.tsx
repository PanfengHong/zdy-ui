import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Button from '../Button/Button';
import Loading from './Loading';

const LoadingDemo = () => {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(true);
  const [loading6, setLoading6] = useState(true);

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`
<Loading loading={loading}>
  <div style={{ padding: 24, background: '#fff' }}>
    内容区域
  </div>
</Loading>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ width: 200 }}>
              <Loading loading={loading1}>
                <div style={{ padding: 24, background: '#fafafa', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  内容区域
                </div>
              </Loading>
              <div style={{ marginTop: 8, textAlign: 'center' }}>
                <Button size="small" onClick={() => setLoading1(!loading1)}>
                  {loading1 ? '关闭' : '开启'}
                </Button>
              </div>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不同尺寸</h3>
        <DemoBlock
          code={`
<Loading loading size="small">小</Loading>
<Loading loading size="medium">中</Loading>
<Loading loading size="large">大</Loading>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Loading loading size="small">
                <div style={{ width: 80, height: 80, background: '#fafafa' }} />
              </Loading>
              <span style={{ fontSize: 12, color: '#999' }}>Small</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Loading loading size="medium">
                <div style={{ width: 100, height: 100, background: '#fafafa' }} />
              </Loading>
              <span style={{ fontSize: 12, color: '#999' }}>Medium</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Loading loading size="large">
                <div style={{ width: 120, height: 120, background: '#fafafa' }} />
              </Loading>
              <span style={{ fontSize: 12, color: '#999' }}>Large</span>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带文字提示</h3>
        <DemoBlock
          code={`
<Loading loading tip="加载中...">
  <div style={{ padding: 24 }}>内容区域</div>
</Loading>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ width: 200 }}>
              <Loading loading={loading2} tip="加载中...">
                <div style={{ padding: 24, background: '#fafafa', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  内容区域
                </div>
              </Loading>
              <div style={{ marginTop: 8, textAlign: 'center' }}>
                <Button size="small" onClick={() => setLoading2(!loading2)}>
                  {loading2 ? '关闭' : '开启'}
                </Button>
              </div>
            </div>
            <div style={{ width: 200 }}>
              <Loading loading={loading3} tip="数据加载中，请稍候..." size="large">
                <div style={{ padding: 24, background: '#fafafa', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  加载更多内容
                </div>
              </Loading>
              <div style={{ marginTop: 8, textAlign: 'center' }}>
                <Button size="small" onClick={() => setLoading3(!loading3)}>
                  {loading3 ? '关闭' : '开启'}
                </Button>
              </div>
            </div>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义指示器</h3>
        <DemoBlock
          code={`
const customIndicator = (
  <svg viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M12 2 L15 10 L12 8 L9 10 Z" fill="#1890ff" />
  </svg>
);

<Loading loading indicator={customIndicator}>
  <div style={{ padding: 24 }}>自定义加载动画</div>
</Loading>
          `.trim()}
        >
          <div style={{ width: 200 }}>
            <Loading loading indicator={
              <svg width="32" height="32" viewBox="0 0 24 24" style={{ animation: 'loadingSpin 1s linear infinite' }}>
                <path d="M12 2 L15 10 L12 8 L9 10 Z" fill="#1890ff" />
              </svg>
            } tip="加载中...">
              <div style={{ padding: 24, background: '#fafafa', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                自定义加载动画
              </div>
            </Loading>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>全屏加载</h3>
        <DemoBlock
          code={`
// 显示全屏加载
Loading.show({ tip: '加载中...' });

// 隐藏全屏加载
Loading.hide();
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button type="primary" onClick={() => {
              Loading.show({ tip: '加载中...' });
              setTimeout(() => Loading.hide(), 2000);
            }}>显示2秒</Button>
            <Button onClick={() => {
              Loading.show({ tip: '数据处理中，请稍候...', size: 'large' });
            }}>显示（手动关闭）</Button>
            <Button type="error" onClick={() => Loading.hide()}>关闭</Button>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>卡片加载</h3>
        <DemoBlock
          code={`
<Loading loading={loading}>
  <Card title="用户信息">
    <p>姓名: 张三</p>
    <p>年龄: 28</p>
    <p>地址: 北京市朝阳区</p>
  </Card>
</Loading>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ width: 280, border: '1px solid #f0f0f0', borderRadius: 4 }}>
              <div style={{ padding: 12, borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}>用户信息</div>
              <Loading loading={loading4}>
                <div style={{ padding: 16 }}>
                  <p style={{ margin: '0 0 8px' }}>姓名: 张三</p>
                  <p style={{ margin: '0 0 8px' }}>年龄: 28</p>
                  <p style={{ margin: 0 }}>地址: 北京市朝阳区</p>
                </div>
              </Loading>
            </div>
            <div style={{ width: 280, border: '1px solid #f0f0f0', borderRadius: 4 }}>
              <div style={{ padding: 12, borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}>订单列表</div>
              <Loading loading={loading5} tip="加载订单中...">
                <div style={{ padding: 16 }}>
                  <p style={{ margin: '0 0 8px' }}>订单号: 202401001</p>
                  <p style={{ margin: '0 0 8px' }}>金额: ¥99.00</p>
                  <p style={{ margin: 0 }}>状态: 已完成</p>
                </div>
              </Loading>
            </div>
            <div style={{ width: 280, border: '1px solid #f0f0f0', borderRadius: 4 }}>
              <div style={{ padding: 12, borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}>产品详情</div>
              <Loading loading={loading6} tip="加载产品信息...">
                <div style={{ padding: 16 }}>
                  <p style={{ margin: '0 0 8px' }}>产品: 智能手机</p>
                  <p style={{ margin: '0 0 8px' }}>价格: ¥3,999</p>
                  <p style={{ margin: 0 }}>库存: 100 件</p>
                </div>
              </Loading>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Button size="small" onClick={() => { setLoading4(!loading4); setLoading5(!loading5); setLoading6(!loading6); }}>
              切换所有加载状态
            </Button>
          </div>
        </DemoBlock>
      </div>
    </>
  );
};

export default LoadingDemo;