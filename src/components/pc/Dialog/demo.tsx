import { useState } from 'react';
import type { DemoConfig } from '../../../pages/Components/Demo/types';
import Dialog from './Dialog';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

const BasicDialogDemo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button onClick={() => setVisible(true)}>
          打开对话框
        </Button>
      </div>
      <Dialog
        title="对话框标题"
        visible={visible}
        onClose={() => setVisible(false)}
        footer={
          <>
            <Button onClick={() => setVisible(false)}>取消</Button>
            <Button type="primary" onClick={() => setVisible(false)}>确认</Button>
          </>
        }
      >
        对话框内容
      </Dialog>
    </>
  );
};

const IconDialogDemo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button onClick={() => setVisible(true)}>
          打开对话框
        </Button>
      </div>
      <Dialog
        visible={visible}
        title="对话框标题"
        icon={<Icon type="home" />}
        onClose={() => setVisible(false)}
      >
        对话框内容
      </Dialog>
    </>
  );
};

const dialogDemo: DemoConfig = {
  demos: [
    {
      title: '基础用法',
      code: `const [visible, setVisible] = useState(false);\n\n<Button onClick={() => setVisible(true)}>\n  打开对话框\n</Button>\n\n<Dialog\n  title="对话框标题"\n  visible={visible}\n  onClose={() => setVisible(false)}\n  footer={\n    <>\n      <Button onClick={() => setVisible(false)}>取消</Button>\n      <Button type="primary" onClick={() => setVisible(false)}>确认</Button>\n    </>\n  }\n>\n  对话框内容\n</Dialog>`,
      render: <BasicDialogDemo />,
    },
    {
      title: '带图标对话框',
      code: `<Dialog\n  visible={visible}\n title="对话框标题"\n icon={<Icon name="home" />}\n  onClose={() => setVisible(false)}\n>\n  对话框内容\n</Dialog>`,
      render: <IconDialogDemo />,
    },
  ],
  api: [
    { prop: 'visible', desc: '是否显示对话框', type: 'boolean', default: 'false' },
    { prop: 'title', desc: '对话框标题', type: 'ReactNode', default: '-' },
    { prop: 'width', desc: '对话框宽度', type: 'string | number', default: '520' },
    { prop: 'closable', desc: '是否显示关闭按钮', type: 'boolean', default: 'true' },
    { prop: 'mask', desc: '是否显示遮罩', type: 'boolean', default: 'true' },
    { prop: 'maskClosable', desc: '点击遮罩是否关闭', type: 'boolean', default: 'true' },
    { prop: 'onClose', desc: '关闭回调', type: 'function', default: '-' },
    { prop: 'footer', desc: '自定义底部', type: 'ReactNode', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ],
};

export default dialogDemo;
