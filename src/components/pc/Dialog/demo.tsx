import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Dialog from './Dialog';
import Button from '../Button/Button';

const DialogDemo = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const apiData = [
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
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`
const [visible, setVisible] = useState(false);

<Button onClick={() => setVisible(true)}>
  打开对话框
</Button>

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
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button onClick={() => setVisible1(true)}>
              打开对话框
            </Button>
          </div>
          <Dialog
            title="对话框标题"
            visible={visible1}
            onClose={() => setVisible1(false)}
            footer={
              <>
                <Button onClick={() => setVisible1(false)}>取消</Button>
                <Button type="primary" onClick={() => setVisible1(false)}>确认</Button>
              </>
            }
          >
            对话框内容
          </Dialog>
        </DemoBlock>
      </div>
      <div className="component-group">
        <h3>无标题对话框</h3>
        <DemoBlock
          code={`
<Dialog
  visible={visible}
  onClose={() => setVisible(false)}
  closable={false}
>
  无标题对话框内容
</Dialog>
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button onClick={() => setVisible2(true)}>
              打开无标题对话框
            </Button>
          </div>
          <Dialog
            visible={visible2}
            onClose={() => setVisible2(false)}
            closable={false}
          >
            无标题对话框内容
          </Dialog>
        </DemoBlock>
      </div>
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default DialogDemo;