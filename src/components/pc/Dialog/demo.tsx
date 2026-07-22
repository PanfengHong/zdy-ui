import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Dialog from './Dialog';
import Button from '../Button/Button';

const DialogDemo = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

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
    </>
  );
};

export default DialogDemo;
