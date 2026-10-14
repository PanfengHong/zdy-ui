import { useState } from "react";
import DemoBlock from "../../DemoBlock/DemoBlock";
import ApiTable from "../../ApiTable/ApiTable";
import Button from "../Button/Button";
import Loading from "./Loading";

/**
 * 一些点组成的圆圈指示器：
 * 圆点沿圆周均匀排布，各自按顺序渐隐 → 视觉上形成一个旋转的拖尾，不需要连成完整的圆。
 * 动画名 loadingDotPulse 由组件库样式提供（Loading.less）。
 */
const DotRingIndicator = ({ size = 32, count = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50">
    {Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={25 + Math.cos(angle) * 19}
          cy={25 + Math.sin(angle) * 19}
          r={2.8}
          fill="currentColor"
          style={{
            animation: "loadingDotPulse 1.2s linear infinite",
            animationDelay: ((i / count) * 1.2).toFixed(2) + "s",
          }}
        />
      );
    })}
  </svg>
);

const LoadingDemo = () => {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(true);
  const [loading6, setLoading6] = useState(true);

  const apiData = [
    {
      prop: "loading",
      desc: "是否显示加载状态",
      type: "boolean",
      default: "false",
    },
    {
      prop: "size",
      desc: "加载尺寸",
      type: "'small' | 'medium' | 'large'",
      default: "medium",
    },
    { prop: "tip", desc: "加载提示文字", type: "ReactNode", default: "-" },
    {
      prop: "indicator",
      desc: "自定义加载指示器",
      type: "ReactNode",
      default: "-",
    },
    { prop: "children", desc: "包裹的内容", type: "ReactNode", default: "-" },
    {
      prop: "closable",
      desc: "全屏模式下是否在加载界面内显示关闭按钮",
      type: "boolean",
      default: "false",
    },
    {
      prop: "onClose",
      desc: "点击加载界面内关闭按钮时的回调（全屏模式下生效）",
      type: "function",
      default: "-",
    },
    { prop: "className", desc: "自定义类名", type: "string", default: "-" },
    { prop: "style", desc: "自定义样式", type: "CSSProperties", default: "-" },
  ];

  const methodApiData = [
    {
      prop: "Loading.show(config)",
      desc: "显示全屏加载",
      type: "function",
      default: "-",
    },
    {
      prop: "Loading.hide()",
      desc: "隐藏全屏加载",
      type: "function",
      default: "-",
    },
  ];

  const configApiData = [
    { prop: "tip", desc: "加载提示文字", type: "ReactNode", default: "-" },
    {
      prop: "size",
      desc: "加载尺寸",
      type: "'small' | 'medium' | 'large'",
      default: "medium",
    },
    {
      prop: "indicator",
      desc: "自定义加载指示器",
      type: "ReactNode",
      default: "-",
    },
    {
      prop: "closable",
      desc: "是否在加载界面内显示关闭按钮，点击后自动隐藏",
      type: "boolean",
      default: "false",
    },
    {
      prop: "onClose",
      desc: "点击关闭按钮时的回调，在自动隐藏之前触发",
      type: "function",
      default: "-",
    },
  ];

  const demos = [
    {
      title: "基础用法",
      code: `<Loading loading={loading}>\n  <div style={{ padding: 24, background: '#fff' }}>\n    内容区域\n  </div>\n</Loading>`,
      render: (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ width: 200 }}>
            <Loading loading={loading1}>
              <div
                style={{
                  padding: 24,
                  background: "#fafafa",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                内容区域
              </div>
            </Loading>
            <div style={{ marginTop: 8, textAlign: "center" }}>
              <Button size="small" onClick={() => setLoading1(!loading1)}>
                {loading1 ? "关闭" : "开启"}
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "不同尺寸",
      code: `<Loading loading size="small">小</Loading>\n<Loading loading size="medium">中</Loading>\n<Loading loading size="large">大</Loading>`,
      render: (
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Loading loading size="small">
              <div style={{ width: 80, height: 80, background: "#fafafa" }} />
            </Loading>
            <span style={{ fontSize: 12, color: "#999" }}>Small</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Loading loading size="medium">
              <div style={{ width: 100, height: 100, background: "#fafafa" }} />
            </Loading>
            <span style={{ fontSize: 12, color: "#999" }}>Medium</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Loading loading size="large">
              <div style={{ width: 120, height: 120, background: "#fafafa" }} />
            </Loading>
            <span style={{ fontSize: 12, color: "#999" }}>Large</span>
          </div>
        </div>
      ),
    },
    {
      title: "带文字提示",
      code: `<Loading loading tip="加载中...">\n  <div style={{ padding: 24 }}>内容区域</div>\n</Loading>`,
      render: (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ width: 200 }}>
            <Loading loading={loading2} tip="加载中...">
              <div
                style={{
                  padding: 24,
                  background: "#fafafa",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                内容区域
              </div>
            </Loading>
            <div style={{ marginTop: 8, textAlign: "center" }}>
              <Button size="small" onClick={() => setLoading2(!loading2)}>
                {loading2 ? "关闭" : "开启"}
              </Button>
            </div>
          </div>
          <div style={{ width: 200 }}>
            <Loading
              loading={loading3}
              tip="数据加载中，请稍候..."
              size="large"
            >
              <div
                style={{
                  padding: 24,
                  background: "#fafafa",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                加载更多内容
              </div>
            </Loading>
            <div style={{ marginTop: 8, textAlign: "center" }}>
              <Button size="small" onClick={() => setLoading3(!loading3)}>
                {loading3 ? "关闭" : "开启"}
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "自定义指示器",
      code: `// 一些点组成的圆圈：圆点沿圆周排布，依次渐隐形成旋转拖尾（不要求连成完整的圆）\nconst DotRingIndicator = ({ size = 32, count = 12 }) => (\n  <svg width={size} height={size} viewBox="0 0 50 50">\n    {Array.from({ length: count }).map((_, i) => {\n      const angle = (i / count) * Math.PI * 2;\n      return (\n        <circle\n          key={i}\n          cx={25 + Math.cos(angle) * 19}\n          cy={25 + Math.sin(angle) * 19}\n          r={2.8}\n          fill="currentColor"\n          style={{\n            animation: 'loadingDotPulse 1.2s linear infinite',\n            animationDelay: ((i / count) * 1.2).toFixed(2) + 's'\n          }}\n        />\n      );\n    })}\n  </svg>\n);\n\n<Loading loading indicator={<DotRingIndicator />} tip="加载中...">\n  <div style={{ padding: 24 }}>自定义加载动画</div>\n</Loading>\n\n// 点数与尺寸都可调\n<Loading loading indicator={<DotRingIndicator size={20} count={8} />} />`,
      render: (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ width: 200 }}>
            <Loading loading indicator={<DotRingIndicator />} tip="加载中...">
              <div
                style={{
                  padding: 24,
                  background: "#fafafa",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                自定义加载动画
              </div>
            </Loading>
          </div>
          <div style={{ width: 200 }}>
            <Loading
              loading
              indicator={<DotRingIndicator size={20} count={8} />}
              tip="8 点 / 20px"
            >
              <div
                style={{
                  padding: 24,
                  background: "#fafafa",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                更小的圆点
              </div>
            </Loading>
          </div>
        </div>
      ),
    },
    {
      title: "全屏加载",
      code: `// 显示全屏加载，2 秒后自动关闭\nLoading.show({ tip: '加载中...' });\nsetTimeout(() => Loading.hide(), 2000);\n\n// 长时间任务需要手动关闭时，用 closable\n// 全屏遮罩会覆盖整个页面，页面上的按钮点不到，\n// 关闭入口需放进加载界面内部\nLoading.show({\n  tip: '数据处理中，请稍候...',\n  size: 'large',\n  closable: true,\n  onClose: () => console.log('已关闭')\n});\n\n// 也可以通过代码关闭\nLoading.hide();`,
      render: (
        <div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button
              type="primary"
              onClick={() => {
                Loading.show({ tip: "加载中..." });
                setTimeout(() => Loading.hide(), 2000);
              }}
            >
              显示 2 秒后自动关闭
            </Button>
            <Button
              onClick={() =>
                Loading.show({
                  tip: "数据处理中，请稍候...",
                  size: "large",
                  closable: true,
                })
              }
            >
              显示（手动关闭）
            </Button>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, color: "#999" }}>
            全屏遮罩会覆盖整个页面，页面上的按钮无法点击；手动关闭请使用
            closable（关闭按钮位于加载界面右上角），或调用 Loading.hide()。
          </p>
        </div>
      ),
    },
    {
      title: "卡片加载",
      code: `<Loading loading={loading}>\n  <Card title="用户信息">\n    <p>姓名: 张三</p>\n    <p>年龄: 28</p>\n    <p>地址: 北京市朝阳区</p>\n  </Card>\n</Loading>`,
      render: (
        <>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div
              style={{
                width: 280,
                border: "1px solid #f0f0f0",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  padding: 12,
                  borderBottom: "1px solid #f0f0f0",
                  fontWeight: "bold",
                }}
              >
                用户信息
              </div>
              <Loading loading={loading4}>
                <div style={{ padding: 16 }}>
                  <p style={{ margin: "0 0 8px" }}>姓名: 张三</p>
                  <p style={{ margin: "0 0 8px" }}>年龄: 28</p>
                  <p style={{ margin: 0 }}>地址: 北京市朝阳区</p>
                </div>
              </Loading>
            </div>
            <div
              style={{
                width: 280,
                border: "1px solid #f0f0f0",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  padding: 12,
                  borderBottom: "1px solid #f0f0f0",
                  fontWeight: "bold",
                }}
              >
                订单列表
              </div>
              <Loading loading={loading5} tip="加载订单中...">
                <div style={{ padding: 16 }}>
                  <p style={{ margin: "0 0 8px" }}>订单号: 202401001</p>
                  <p style={{ margin: "0 0 8px" }}>金额: ¥99.00</p>
                  <p style={{ margin: 0 }}>状态: 已完成</p>
                </div>
              </Loading>
            </div>
            <div
              style={{
                width: 280,
                border: "1px solid #f0f0f0",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  padding: 12,
                  borderBottom: "1px solid #f0f0f0",
                  fontWeight: "bold",
                }}
              >
                产品详情
              </div>
              <Loading loading={loading6} tip="加载产品信息...">
                <div style={{ padding: 16 }}>
                  <p style={{ margin: "0 0 8px" }}>产品: 智能手机</p>
                  <p style={{ margin: "0 0 8px" }}>价格: ¥3,999</p>
                  <p style={{ margin: 0 }}>库存: 100 件</p>
                </div>
              </Loading>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Button
              size="small"
              onClick={() => {
                setLoading4(!loading4);
                setLoading5(!loading5);
                setLoading6(!loading6);
              }}
            >
              切换所有加载状态
            </Button>
          </div>
        </>
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
      <div className="component-group" style={{ marginTop: "32px" }}>
        <h3>组件属性</h3>
        <ApiTable dataSource={apiData} />
      </div>
      <div className="component-group">
        <h3>方法</h3>
        <ApiTable dataSource={methodApiData} />
      </div>
      <div className="component-group">
        <h3>Loading.show 配置项</h3>
        <ApiTable dataSource={configApiData} />
      </div>
    </>
  );
};

export default LoadingDemo;
