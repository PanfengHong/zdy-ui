import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Popover from './Popover';
import Button from '../Button/Button';

const sharedBtnStyle: React.CSSProperties = {
  padding: '4px 14px',
  background: '#fff',
  border: '1px solid #d9d9d9',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 14,
  color: 'rgba(0,0,0,0.85)',
};

const PopoverDemo = () => {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<string>('未触发');

  const apiData = [
    { prop: 'content', desc: '气泡内容', type: 'ReactNode', default: '-' },
    { prop: 'title', desc: '气泡标题', type: 'ReactNode', default: '-' },
    { prop: 'trigger', desc: '触发方式', type: "'hover' | 'click' | 'focus'", default: "'hover'" },
    { prop: 'placement', desc: '气泡位置（12 种）', type: 'PopoverPlacement', default: "'top'" },
    { prop: 'defaultOpen', desc: '默认是否打开', type: 'boolean', default: 'false' },
    { prop: 'open', desc: '是否打开（受控）', type: 'boolean', default: '-' },
    { prop: 'onOpenChange', desc: '打开状态变化回调', type: 'function(open)', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'arrow', desc: '是否显示箭头', type: 'boolean', default: 'true' },
    { prop: 'showClose', desc: '是否显示关闭按钮', type: 'boolean', default: 'false' },
    { prop: 'width', desc: '气泡宽度', type: 'number | string', default: '-' },
    { prop: 'mouseEnterDelay', desc: '鼠标进入延迟（秒）', type: 'number', default: '0.1' },
    { prop: 'mouseLeaveDelay', desc: '鼠标离开延迟（秒）', type: 'number', default: '0.1' },
    { prop: 'destroyOnHide', desc: '隐藏时销毁 DOM', type: 'boolean', default: 'false' },
    { prop: 'zIndex', desc: '层级', type: 'number', default: '1050' },
    { prop: 'getPopupContainer', desc: '挂载容器', type: 'function(triggerNode)', default: 'body' },
    { prop: 'onVisibleChange', desc: '可见性变化回调（兼容）', type: 'function(visible)', default: '-' },
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`
<Popover title="标题" content="这是一段气泡内容">
  <button style={sharedBtnStyle}>Hover 我</button>
</Popover>
          `.trim()}
        >
          <Popover title="标题" content="这是一段气泡内容">
            <button style={sharedBtnStyle}>Hover 我</button>
          </Popover>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>三种触发方式</h3>
        <DemoBlock
          code={`
<Popover trigger="hover" content="hover 触发">
  <button>Hover</button>
</Popover>
<Popover trigger="click" content="click 触发">
  <button>Click</button>
</Popover>
<Popover trigger="focus" content="focus 触发">
  <input placeholder="聚焦我" />
</Popover>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Popover trigger="hover" content="hover 触发的气泡">
              <button style={sharedBtnStyle}>Hover</button>
            </Popover>
            <Popover trigger="click" content="click 触发的气泡">
              <button style={sharedBtnStyle}>Click</button>
            </Popover>
            <Popover trigger="focus" content="focus 触发的气泡">
              <input
                placeholder="聚焦我"
                style={{
                  padding: '4px 10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: 4,
                  fontSize: 14,
                  height: 28,
                  outline: 'none',
                }}
              />
            </Popover>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>12 种位置</h3>
        <DemoBlock
          code={`
<Popover placement="top" content="top">
  <button>Top</button>
</Popover>
<Popover placement="bottom" content="bottom">
  <button>Bottom</button>
</Popover>
<Popover placement="left" content="left">
  <button>Left</button>
</Popover>
<Popover placement="right" content="right">
  <button>Right</button>
</Popover>
// ...共 12 种
          `.trim()}
        >
          <PlacementShowcase />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控用法</h3>
        <DemoBlock
          code={`
const [open, setOpen] = useState(false);
<Popover
  open={open}
  onOpenChange={setOpen}
  title="受控模式"
  content="外部完全控制打开状态"
  trigger="click"
>
  <button>{open ? '关闭' : '打开'}</button>
</Popover>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Popover
              open={open}
              onOpenChange={setOpen}
              title="受控模式"
              content="由外部 state 完全控制"
              trigger="click"
            >
              <button style={sharedBtnStyle}>{open ? '关闭' : '打开'}</button>
            </Popover>
            <button
              style={{ ...sharedBtnStyle, color: '#1890ff', borderColor: '#1890ff' }}
              onClick={() => setOpen(!open)}
            >
              外部切换
            </button>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>事件回调</h3>
        <DemoBlock
          code={`
<Popover
  content="观察下方日志"
  onOpenChange={(o) => setLog(o ? '已打开' : '已关闭')}
>
  <button>触发</button>
</Popover>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Popover
              content="观察下方日志"
              onOpenChange={(o) => setLog(`${new Date().toLocaleTimeString()} ${o ? '已打开' : '已关闭'}`)}
            >
              <button style={sharedBtnStyle}>触发</button>
            </Popover>
            <span style={{ fontSize: 12, color: '#666' }}>最近事件：{log}</span>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义内容</h3>
        <DemoBlock
          code={`
<Popover
  title="用户信息"
  width={240}
  content={
    <div>
      <p>昵称：张三</p>
      <p>邮箱：zhangsan@example.com</p>
      <button>查看详情</button>
    </div>
  }
  trigger="click"
>
  <button>点击查看用户信息</button>
</Popover>
          `.trim()}
        >
          <Popover
            title="用户信息"
            width={240}
            trigger="click"
            content={
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                <div>昵称：张三</div>
                <div>邮箱：zhangsan@example.com</div>
                <div>角色：管理员</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                  <Button size="small" type="primary">查看详情</Button>
                  <Button size="small">编辑</Button>
                </div>
              </div>
            }
          >
            <button style={sharedBtnStyle}>点击查看用户信息</button>
          </Popover>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>关闭按钮</h3>
        <DemoBlock
          code={`
<Popover
  title="带关闭按钮"
  content="点击右上角关闭"
  trigger="click"
  showClose
>
  <button>打开</button>
</Popover>
          `.trim()}
        >
          <Popover
            title="带关闭按钮"
            content="点击右上角关闭按钮可关闭气泡"
            trigger="click"
            showClose
          >
            <button style={sharedBtnStyle}>打开</button>
          </Popover>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用 & 无箭头</h3>
        <DemoBlock
          code={`
<Popover content="禁用状态" disabled>
  <button>禁用</button>
</Popover>
<Popover content="无箭头" arrow={false}>
  <button>无箭头</button>
</Popover>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Popover content="禁用状态不会显示" disabled>
              <button style={{ ...sharedBtnStyle, opacity: 0.5, cursor: 'not-allowed' }}>禁用</button>
            </Popover>
            <Popover content="无箭头气泡" arrow={false}>
              <button style={sharedBtnStyle}>无箭头</button>
            </Popover>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

// 12 种位置展示
const PlacementShowcase = () => {
  const btnStyle: React.CSSProperties = {
    ...sharedBtnStyle,
    padding: '4px 10px',
    fontSize: 12,
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        padding: 16,
        background: '#fafafa',
        borderRadius: 4,
      }}
    >
      <Popover placement="top" content="top"><button style={btnStyle}>Top</button></Popover>
      <Popover placement="topLeft" content="topLeft"><button style={btnStyle}>TopLeft</button></Popover>
      <Popover placement="topRight" content="topRight"><button style={btnStyle}>TopRight</button></Popover>
      <Popover placement="bottom" content="bottom"><button style={btnStyle}>Bottom</button></Popover>

      <Popover placement="bottomLeft" content="bottomLeft"><button style={btnStyle}>BottomLeft</button></Popover>
      <Popover placement="bottomRight" content="bottomRight"><button style={btnStyle}>BottomRight</button></Popover>
      <Popover placement="left" content="left"><button style={btnStyle}>Left</button></Popover>
      <Popover placement="leftTop" content="leftTop"><button style={btnStyle}>LeftTop</button></Popover>

      <Popover placement="leftBottom" content="leftBottom"><button style={btnStyle}>LeftBottom</button></Popover>
      <Popover placement="right" content="right"><button style={btnStyle}>Right</button></Popover>
      <Popover placement="rightTop" content="rightTop"><button style={btnStyle}>RightTop</button></Popover>
      <Popover placement="rightBottom" content="rightBottom"><button style={btnStyle}>RightBottom</button></Popover>
    </div>
  );
};

export default PopoverDemo;
