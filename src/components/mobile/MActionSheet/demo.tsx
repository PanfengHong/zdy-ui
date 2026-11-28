import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MButton from '../MButton/MButton';
import MActionSheet from './MActionSheet';
import type { MActionSheetAction } from './MActionSheet';

const photoActions: MActionSheetAction[] = [
  { key: 'camera', text: '拍照' },
  { key: 'album', text: '从相册选择', description: '支持 JPG、PNG 格式' },
  { key: 'scan', text: '扫描文档' }
];

const BasicDemo = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('未选择');

  return (
    <div className="mdemo-stack">
      <MButton type="primary" onClick={() => setVisible(true)}>
        打开操作面板
      </MButton>
      <p className="mdemo-tip">当前选择：{selected}</p>
      <MActionSheet
        inline
        visible={visible}
        title="上传图片"
        description="选择一种方式上传图片"
        actions={photoActions}
        onClose={() => setVisible(false)}
        onSelect={action => setSelected(String(action.text))}
      />
    </div>
  );
};

const DangerDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mdemo-stack">
      <MButton onClick={() => setVisible(true)}>删除项目</MButton>
      <MActionSheet
        inline
        visible={visible}
        title="删除项目"
        description="删除后不可恢复，请谨慎操作"
        actions={[
          { key: 'delete', text: '删除', danger: true },
          { key: 'archive', text: '归档项目', description: '可稍后在归档中恢复' },
          { key: 'transfer', text: '转移给他人', disabled: true }
        ]}
        cancelText="取消"
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

const mActionSheetDemo: DemoConfig = {
  intro:
    '移动端操作面板从底部弹出，用于承载一组与当前场景相关的操作。支持标题、描述、危险操作、禁用项与自定义取消文案，可通过 mask 点击或 ESC 关闭。',
  demos: [
    {
      title: '基础用法',
      desc: '通过 visible 控制显示，actions 配置操作项，onSelect 获取选中的操作。',
      code: `<MButton onClick={() => setVisible(true)}>打开操作面板</MButton>

<MActionSheet
  visible={visible}
  title="上传图片"
  description="选择一种方式上传图片"
  actions={[
    { key: 'camera', text: '拍照' },
    { key: 'album', text: '从相册选择', description: '支持 JPG、PNG 格式' },
    { key: 'scan', text: '扫描文档' }
  ]}
  onClose={() => setVisible(false)}
  onSelect={action => handleSelect(action)}
/>`,
      render: <BasicDemo />
    },
    {
      title: '危险操作与禁用项',
      desc: 'danger 标记危险操作，disabled 禁用不可用项，cancelText 可自定义取消文案。',
      code: `<MActionSheet
  visible={visible}
  title="删除项目"
  description="删除后不可恢复，请谨慎操作"
  actions={[
    { key: 'delete', text: '删除', danger: true },
    { key: 'archive', text: '归档项目', description: '可稍后在归档中恢复' },
    { key: 'transfer', text: '转移给他人', disabled: true }
  ]}
  cancelText="取消"
  onClose={() => setVisible(false)}
/>`,
      render: <DangerDemo />
    }
  ],
  api: [
    { prop: 'visible', desc: '是否显示（受控）', type: 'boolean', default: '-' },
    { prop: 'defaultVisible', desc: '初始是否显示（非受控）', type: 'boolean', default: 'false' },
    { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
    { prop: 'description', desc: '描述信息', type: 'ReactNode', default: '-' },
    { prop: 'actions', desc: '操作项列表', type: 'MActionSheetAction[]', default: '[]' },
    { prop: 'cancelText', desc: '取消按钮文案，传 null 隐藏', type: 'ReactNode | null', default: "'取消'" },
    { prop: 'closeOnMaskClick', desc: '点击遮罩是否关闭', type: 'boolean', default: 'true' },
    { prop: 'inline', desc: '内联渲染，铺满最近定位父级（预览场景）', type: 'boolean', default: 'false' },
    { prop: 'onClose', desc: '关闭回调', type: 'function', default: '-' },
    { prop: 'onSelect', desc: '点击操作项回调', type: '(action, index) => void', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mActionSheetDemo;
