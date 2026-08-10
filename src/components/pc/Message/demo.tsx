import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Button from '../Button/Button';
import Message from './Message';

const MessageDemo = () => {
  const apiData = [
    { prop: 'content', desc: '消息内容', type: 'ReactNode', default: '-' },
    { prop: 'type', desc: '消息类型', type: "'success' | 'info' | 'warning' | 'error'", default: 'info' },
    { prop: 'duration', desc: '自动关闭时长（毫秒），0为不自动关闭', type: 'number', default: '3000' },
    { prop: 'closable', desc: '是否可关闭', type: 'boolean', default: 'true' },
    { prop: 'onClose', desc: '关闭回调', type: 'function', default: '-' }
  ];

  const methodApiData = [
    { prop: 'Message.success(content|config)', desc: '显示成功消息', type: 'function', default: '-' },
    { prop: 'Message.info(content|config)', desc: '显示信息消息', type: 'function', default: '-' },
    { prop: 'Message.warning(content|config)', desc: '显示警告消息', type: 'function', default: '-' },
    { prop: 'Message.error(content|config)', desc: '显示错误消息', type: 'function', default: '-' },
    { prop: 'Message.loading(content|config)', desc: '显示加载消息', type: 'function', default: '-' },
    { prop: 'Message.closeAll()', desc: '关闭所有消息', type: 'function', default: '-' }
  ];

  const demos = [
    {
      title: '基础示例',
      code: `Message.info('这是一条信息提示');\nMessage.success('操作成功');\nMessage.warning('警告信息');\nMessage.error('操作失败');`,
      render: (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => Message.info('这是一条信息提示')}>信息提示</Button>
          <Button type="success" onClick={() => Message.success('操作成功')}>成功提示</Button>
          <Button type="warning" onClick={() => Message.warning('警告信息')}>警告提示</Button>
          <Button type="error" onClick={() => Message.error('操作失败')}>错误提示</Button>
        </div>
      ),
    },
    {
      title: '自定义配置',
      code: `Message.success({\n  content: '操作成功，5秒后自动关闭',\n  duration: 5000,\n  closable: true,\n  onClose: () => console.log('消息已关闭')\n});`,
      render: (
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
      ),
    },
    {
      title: '手动关闭',
      code: `const msg = Message.loading('加载中...');\n// 手动关闭\nsetTimeout(() => {\n  msg.close();\n}, 3000);`,
      render: (
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
      ),
    },
    {
      title: '批量显示',
      code: `// 同时显示多条消息\nMessage.success('第一条消息');\nMessage.info('第二条消息');\nMessage.warning('第三条消息');`,
      render: (
        <Button onClick={() => {
          Message.success('第一条消息');
          setTimeout(() => Message.info('第二条消息'), 200);
          setTimeout(() => Message.warning('第三条消息'), 400);
        }}>显示多条消息</Button>
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
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>配置参数</h3>
        <ApiTable dataSource={apiData} />
      </div>
      <div className="component-group">
        <h3>方法</h3>
        <ApiTable dataSource={methodApiData} />
      </div>
    </>
  );
};

export default MessageDemo;
