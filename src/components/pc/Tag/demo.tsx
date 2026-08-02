import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Tag from './Tag';

const presetColors = [
  'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'
];

const statusList: Array<{ status: 'success' | 'processing' | 'error' | 'default' | 'warning'; text: string }> = [
  { status: 'success', text: '成功' },
  { status: 'processing', text: '处理中' },
  { status: 'error', text: '错误' },
  { status: 'default', text: '默认' },
  { status: 'warning', text: '警告' },
];

const TagDemo = () => {
  const [visible, setVisible] = useState(true);
  const [checkedTags, setCheckedTags] = useState<string[]>(['Apple', 'Orange']);

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log('关闭按钮被点击', e);
  };

  const toggleCheckable = (tag: string) => {
    setCheckedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const apiData = [
    { prop: 'color', desc: '标签颜色（预设色或自定义颜色）', type: "TagColor | string", default: "'default'" },
    { prop: 'status', desc: '状态色（带状态点）', type: "'success' | 'processing' | 'error' | 'default' | 'warning'", default: '-' },
    { prop: 'closable', desc: '是否可关闭', type: 'boolean', default: 'false' },
    { prop: 'closeIcon', desc: '自定义关闭图标', type: 'ReactNode', default: '×' },
    { prop: 'visible', desc: '是否显示（受控）', type: 'boolean', default: '-' },
    { prop: 'defaultVisible', desc: '默认是否显示', type: 'boolean', default: 'true' },
    { prop: 'bordered', desc: '是否有边框', type: 'boolean', default: 'true' },
    { prop: 'icon', desc: '前置图标', type: 'ReactNode', default: '-' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'default' | 'large'", default: "'default'" },
    { prop: 'onClick', desc: '点击回调', type: '(e) => void', default: '-' },
    { prop: 'onClose', desc: '关闭回调', type: '(e) => void', default: '-' },
    { prop: 'onChange', desc: '显示/隐藏变化回调', type: '(visible) => void', default: '-' }
  ];

  const checkableApiData = [
    { prop: 'checked', desc: '是否选中（受控）', type: 'boolean', default: '-' },
    { prop: 'defaultChecked', desc: '默认是否选中', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '选中状态变化回调', type: '(checked) => void', default: '-' },
    { prop: 'onClick', desc: '点击回调', type: '(e) => void', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock code={`<Tag>标签一</Tag>\n<Tag>标签二</Tag>\n<Tag>标签三</Tag>`}>
          <Tag>标签一</Tag>
          <Tag>标签二</Tag>
          <Tag>标签三</Tag>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>预设颜色</h3>
        <DemoBlock code={`<Tag color="magenta">magenta</Tag>\n<Tag color="red">red</Tag>\n<Tag color="volcano">volcano</Tag>`}>
          {presetColors.map((c) => (
            <Tag key={c} color={c as any}>{c}</Tag>
          ))}
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>语义色</h3>
        <DemoBlock code={`<Tag color="success">成功</Tag>\n<Tag color="processing">处理中</Tag>\n<Tag color="error">错误</Tag>`}>
          <Tag color="success">成功</Tag>
          <Tag color="processing">处理中</Tag>
          <Tag color="error">错误</Tag>
          <Tag color="default">默认</Tag>
          <Tag color="warning">警告</Tag>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>状态点（status 属性）</h3>
        <DemoBlock code={`<Tag status="success">成功</Tag>\n<Tag status="processing">处理中</Tag>`}>
          {statusList.map(({ status, text }) => (
            <Tag key={status} status={status}>{text}</Tag>
          ))}
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义颜色</h3>
        <DemoBlock code={`<Tag color="#f50">#f50</Tag>\n<Tag color="#2db7f5">#2db7f5</Tag>\n<Tag color="#87d068">#87d068</Tag>`}>
          <Tag color="#f50">#f50</Tag>
          <Tag color="#2db7f5">#2db7f5</Tag>
          <Tag color="#87d068">#87d068</Tag>
          <Tag color="rgb(255, 0, 128)">rgb(255, 0, 128)</Tag>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>不同尺寸</h3>
        <DemoBlock code={`<Tag size="small">small</Tag>\n<Tag size="default">default</Tag>\n<Tag size="large">large</Tag>`}>
          <Tag size="small">small</Tag>
          <Tag size="default">default</Tag>
          <Tag size="large">large</Tag>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>无边框</h3>
        <DemoBlock code={`<Tag color="blue" bordered={false}>无边框</Tag>`}>
          <Tag color="blue" bordered={false}>无边框</Tag>
          <Tag color="green" bordered={false}>无边框</Tag>
          <Tag color="orange" bordered={false}>无边框</Tag>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>前置图标</h3>
        <DemoBlock code={`<Tag icon="🌟">带图标</Tag>`}>
          <Tag icon="🌟">带图标</Tag>
          <Tag icon="✅" color="success">已完成</Tag>
          <Tag icon="⚠️" color="warning">注意</Tag>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>可关闭</h3>
        <DemoBlock code={`<Tag closable onClose={handleClose}>可关闭</Tag>`}>
          <Tag closable onClose={handleClose}>标签一</Tag>
          <Tag closable color="blue" onClose={handleClose}>标签二</Tag>
          <Tag closable color="red" onClose={handleClose}>标签三</Tag>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义关闭图标</h3>
        <DemoBlock code={`<Tag closable closeIcon="×">自定义关闭</Tag>`}>
          <Tag closable closeIcon="×">自定义关闭</Tag>
          <Tag closable closeIcon="✕" color="purple">自定义关闭</Tag>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控显示/隐藏</h3>
        <div style={{ marginBottom: 12 }}>
          <button
            onClick={() => setVisible((v) => !v)}
            style={{
              padding: '4px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            {visible ? '隐藏' : '显示'}标签
          </button>
        </div>
        <DemoBlock code={`const [visible, setVisible] = useState(true);\n\n<Tag visible={visible} closable onChange={(v) => setVisible(v)}>受控标签</Tag>`}>
          <Tag visible={visible} closable onChange={(v) => setVisible(v)}>受控标签</Tag>
          {!visible && <span style={{ color: '#999', marginLeft: 8 }}>标签已隐藏</span>}
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>CheckableTag 可勾选</h3>
        <div style={{ marginBottom: 12 }}>
          <span>已选：</span>
          <strong style={{ color: '#1890ff' }}>{checkedTags.join(', ') || '无'}</strong>
        </div>
        <DemoBlock code={`<Tag.CheckableTag checked={checked} onChange={(c) => setChecked(c)}>标签</Tag.CheckableTag>`}>
          {['Apple', 'Banana', 'Orange', 'Mango'].map((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={checkedTags.includes(tag)}
              onChange={() => toggleCheckable(tag)}
            >
              {tag}
            </Tag.CheckableTag>
          ))}
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Tag API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>Tag.CheckableTag API</h3>
        <ApiTable dataSource={checkableApiData} />
      </div>
    </>
  );
};

export default TagDemo;
