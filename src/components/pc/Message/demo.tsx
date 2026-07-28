import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Button from '../Button/Button';
import Message from './Message';

const MessageDemo = () => {
  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

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

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>配置参数</h3>
        <Table columns={apiColumns} dataSource={apiData} className="zdy-table-api" />
      </div>
      <div className="component-group">
        <h3>方法</h3>
        <Table columns={apiColumns} dataSource={methodApiData} className="zdy-table-api" />
      </div>
    </>
  );
};

export default MessageDemo;