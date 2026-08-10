import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Tag from './Tag';
import Icon from '../Icon/Icon';

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

  const demos = [
    {
      title: '基础用法',
      code: `<Tag>标签一</Tag>\n<Tag>标签二</Tag>\n<Tag>标签三</Tag>`,
      render: (
        <>
          <Tag>标签一</Tag>
          <Tag>标签二</Tag>
          <Tag>标签三</Tag>
        </>
      ),
    },
    {
      title: '预设颜色',
      code: `<Tag color="magenta">magenta</Tag>\n<Tag color="red">red</Tag>\n<Tag color="volcano">volcano</Tag>`,
      render: (
        <>
          {presetColors.map((c) => (
            <Tag key={c} color={c as any}>{c}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '语义色',
      code: `<Tag color="success">成功</Tag>\n<Tag color="processing">处理中</Tag>\n<Tag color="error">错误</Tag>`,
      render: (
        <>
          <Tag color="success">成功</Tag>
          <Tag color="processing">处理中</Tag>
          <Tag color="error">错误</Tag>
          <Tag color="default">默认</Tag>
          <Tag color="warning">警告</Tag>
        </>
      ),
    },
    {
      title: '状态点（status 属性）',
      code: `<Tag status="success">成功</Tag>\n<Tag status="processing">处理中</Tag>`,
      render: (
        <>
          {statusList.map(({ status, text }) => (
            <Tag key={status} status={status}>{text}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '自定义颜色',
      code: `<Tag color="#f50">#f50</Tag>\n<Tag color="#2db7f5">#2db7f5</Tag>\n<Tag color="#87d068">#87d068</Tag>`,
      render: (
        <>
          <Tag color="#f50">#f50</Tag>
          <Tag color="#2db7f5">#2db7f5</Tag>
          <Tag color="#87d068">#87d068</Tag>
          <Tag color="rgb(255, 0, 128)">rgb(255, 0, 128)</Tag>
        </>
      ),
    },
    {
      title: '不同尺寸',
      code: `<Tag size="small">小尺寸</Tag>\n<Tag size="default">默认尺寸</Tag>\n<Tag size="large">大尺寸</Tag>`,
      render: (
        <>
          <Tag size="small">小尺寸</Tag>
          <Tag size="default">默认尺寸</Tag>
          <Tag size="large">大尺寸</Tag>
        </>
      ),
    },
    {
      title: '无边框',
      code: `<Tag bordered={false}>无边框标签</Tag>`,
      render: <Tag bordered={false}>无边框标签</Tag>,
    },
    {
      title: '前置图标',
      code: `<Tag icon={<Icon type="check" />}>检查</Tag>`,
      render: <Tag icon={<Icon type="check" />}>检查</Tag>,
    },
      {
        title: '可关闭',
        code: `<Tag closable>可关闭标签</Tag>`,
        render: (
          <>
            <Tag closable>可关闭标签</Tag>
          </>
        ),
      },
      {
        title: '自定义关闭图标',
        code: `<Tag closable closeIcon={<Icon type="close" />}>可关闭标签</Tag>`,
        render: (
          <>
            <Tag closable closeIcon={<Icon type="close" />}>可关闭标签</Tag>
          </>
        ),
      },
      {
        title: '受控显示/隐藏',
        code: `const [visible, setVisible] = useState(true);\n\n<Tag visible={visible} closable onChange={(v) => setVisible(v)}>受控标签</Tag>`,
        prepend: (
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
        ),
        render: (
          <>
            <Tag visible={visible} closable onChange={(v) => setVisible(v)}>受控标签</Tag>
          {!visible && <span style={{ color: '#999', marginLeft: 8 }}>标签已隐藏</span>}
          </>
        )
      },
      {
        title: 'CheckableTag 可勾选',
        code: `<Tag.CheckableTag checked={checked} onChange={(c) => setChecked(c)}>标签</Tag.CheckableTag>`,
        prepend:(
          <div style={{ marginBottom: 12 }}>
          <span>已选：</span>
          <strong style={{ color: '#1890ff' }}>{checkedTags.join(', ') || '无'}</strong>
        </div>
        ),
        render: (
          <>
            {['Apple', 'Banana', 'Orange', 'Mango'].map((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={checkedTags.includes(tag)}
              onChange={() => toggleCheckable(tag)}
            >
              {tag}
            </Tag.CheckableTag>
          ))}
          </>
        ),
      }
  ]

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          {demo.prepend}
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}

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
