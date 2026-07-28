import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Button from '../Button/Button';
import Message from './Message';

const MessageDemo = () => {
  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
Message.info('这是一条信息提示');
Message.success('操作成功');
Message.warning('警告信息');
Message.error('操作失败');
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button onClick={() => Message.info('这是一条信息提示')}>信息提示</Button>
            <Button type="success" onClick={() => Message.success('操作成功')}>成功提示</Button>
            <Button type="warning" onClick={() => Message.warning('警告信息')}>警告提示</Button>
            <Button type="error" onClick={() => Message.error('操作失败')}>错误提示</Button>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义配置</h3>
        <DemoBlock
          code={`
Message.success({
  content: '操作成功，5秒后自动关闭',
  duration: 5000,
  closable: true,
  onClose: () => console.log('消息已关闭')
});
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button onClick={() => Message.info({
              content: '自定义时长5秒',
              duration: 5000
            })}>5秒后关闭</Button>
            <Button onClick={() => Message.success({
              content: '不自动关闭',
              duration: 0
            })}>不自动关闭</Button>
            <Button onClick={() => Message.warning({
              content: '不可关闭',
              closable: false
            })}>不可关闭</Button>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>手动关闭</h3>
        <DemoBlock
          code={`
const msg = Message.loading('加载中...');
// 手动关闭
setTimeout(() => {
  msg.close();
}, 3000);
          `.trim()}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button onClick={() => {
              const msg = Message.loading('加载中...');
              setTimeout(() => {
                msg.close();
                Message.success('加载完成');
              }, 3000);
            }}>显示加载</Button>
            <Button type="error" onClick={() => Message.closeAll()}>清空所有</Button>
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>批量显示</h3>
        <DemoBlock
          code={`
// 同时显示多条消息
Message.success('第一条消息');
Message.info('第二条消息');
Message.warning('第三条消息');
          `.trim()}
        >
          <Button onClick={() => {
            Message.success('第一条消息');
            setTimeout(() => Message.info('第二条消息'), 200);
            setTimeout(() => Message.warning('第三条消息'), 400);
          }}>显示多条消息</Button>
        </DemoBlock>
      </div>
    </>
  );
};

export default MessageDemo;