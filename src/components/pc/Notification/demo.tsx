import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Button from '../Button/Button';
import Notification from './Notification';

const NotificationDemo = () => {
  const apiData = [
    { prop: 'message', desc: '通知标题', type: 'ReactNode', default: '-' },
    { prop: 'description', desc: '通知内容', type: 'ReactNode', default: '-' },
    { prop: 'type', desc: '通知类型', type: "'success' | 'info' | 'warning' | 'error'", default: 'info' },
    { prop: 'duration', desc: '自动关闭时长（毫秒），0为不自动关闭', type: 'number', default: '4500' },
    { prop: 'closable', desc: '是否可关闭', type: 'boolean', default: 'true' },
    { prop: 'placement', desc: '显示位置', type: "'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'", default: 'topRight' },
    { prop: 'onClose', desc: '关闭回调', type: 'function', default: '-' },
    { prop: 'onClick', desc: '点击回调', type: 'function', default: '-' },
    { prop: 'btn', desc: '自定义按钮', type: 'ReactNode', default: '-' },
    { prop: 'notificationKey', desc: '通知唯一标识，用于关闭指定通知', type: 'string', default: '-' }
  ];

  const methodApiData = [
    { prop: 'Notification.success(config)', desc: '显示成功通知', type: 'function', default: '-' },
    { prop: 'Notification.info(config)', desc: '显示信息通知', type: 'function', default: '-' },
    { prop: 'Notification.warning(config)', desc: '显示警告通知', type: 'function', default: '-' },
    { prop: 'Notification.error(config)', desc: '显示错误通知', type: 'function', default: '-' },
    { prop: 'Notification.close(key)', desc: '关闭指定通知', type: 'function', default: '-' },
    { prop: 'Notification.closeAll()', desc: '关闭所有通知', type: 'function', default: '-' }
  ];

  const demos = [
    {
      title: '基础用法',
      code: `Notification.info({\n  message: '通知标题',\n  description: '这是一条通知内容，通常用于展示系统消息或提醒信息。'\n});`,
      render: (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => Notification.info({
            message: '通知标题',
            description: '这是一条通知内容，通常用于展示系统消息或提醒信息。'
          })}>信息通知</Button>
          <Button type="success" onClick={() => Notification.success({
            message: '操作成功',
            description: '您的操作已成功完成。'
          })}>成功通知</Button>
          <Button type="warning" onClick={() => Notification.warning({
            message: '警告',
            description: '请注意相关风险，谨慎操作。'
          })}>警告通知</Button>
          <Button type="error" onClick={() => Notification.error({
            message: '操作失败',
            description: '操作过程中出现错误，请重试。'
          })}>错误通知</Button>
        </div>
      ),
    },
    {
      title: '自定义配置',
      code: `Notification.info({\n  message: '自定义时长',\n  description: '这条通知将在6秒后自动关闭。',\n  duration: 6000\n});\n\nNotification.info({\n  message: '不自动关闭',\n  description: '需要手动点击关闭按钮才能关闭。',\n  duration: 0\n});\n\nNotification.info({\n  message: '不可关闭',\n  description: '没有关闭按钮的通知。',\n  closable: false\n});`,
      render: (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => Notification.info({
            message: '自定义时长',
            description: '这条通知将在6秒后自动关闭。',
            duration: 6000
          })}>6秒后关闭</Button>
          <Button onClick={() => Notification.info({
            message: '不自动关闭',
            description: '需要手动点击关闭按钮才能关闭。',
            duration: 0
          })}>不自动关闭</Button>
          <Button onClick={() => Notification.info({
            message: '不可关闭',
            description: '没有关闭按钮的通知。',
            closable: false
          })}>不可关闭</Button>
        </div>
      ),
    },
    {
      title: '位置',
      code: `Notification.info({\n  message: '左上角通知',\n  description: '这是一条显示在左上角的通知。',\n  placement: 'topLeft'\n});\n\nNotification.info({\n  message: '右下角通知',\n  description: '这是一条显示在右下角的通知。',\n  placement: 'bottomRight'\n});`,
      render: (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => Notification.info({
            message: '左上角通知',
            description: '这是一条显示在左上角的通知。',
            placement: 'topLeft'
          })}>左上角</Button>
          <Button onClick={() => Notification.info({
            message: '右上角通知',
            description: '这是一条显示在右上角的通知。',
            placement: 'topRight'
          })}>右上角</Button>
          <Button onClick={() => Notification.info({
            message: '左下角通知',
            description: '这是一条显示在左下角的通知。',
            placement: 'bottomLeft'
          })}>左下角</Button>
          <Button onClick={() => Notification.info({
            message: '右下角通知',
            description: '这是一条显示在右下角的通知。',
            placement: 'bottomRight'
          })}>右下角</Button>
        </div>
      ),
    },
    {
      title: '自定义按钮和点击事件',
      code: `const btn = <Button size="small" type="primary" onClick={() => alert('按钮被点击')}>查看详情</Button>;\n\nNotification.info({\n  message: '新消息通知',\n  description: '您有一条新的系统消息，请及时查看。',\n  btn: btn,\n  onClick: () => console.log('通知被点击')\n});`,
      render: (
        <Button onClick={() => {
          const btn = <Button size="small" type="primary" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('按钮被点击'); }}>查看详情</Button>;
          Notification.info({
            message: '新消息通知',
            description: '您有一条新的系统消息，请及时查看。',
            btn,
            onClick: () => console.log('通知被点击')
          });
        }}>显示带按钮的通知</Button>
      ),
    },
    {
      title: '通过 key 关闭指定通知',
      code: `Notification.info({\n  message: '这是一条可以被特定 key 关闭的通知',\n  notificationKey: 'my-notification-key',\n  duration: 0\n});\n\n// 通过 key 关闭\nNotification.close('my-notification-key');`,
      render: (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => {
            Notification.info({
              message: '持久通知',
              description: '这条通知需要通过 key 来关闭。',
              notificationKey: 'my-notification-key',
              duration: 0
            });
          }}>显示持久通知</Button>
          <Button type="error" onClick={() => Notification.close('my-notification-key')}>关闭指定通知</Button>
        </div>
      ),
    },
    {
      title: '仅标题',
      code: `Notification.info('这是一个只有标题的简洁通知');`,
      render: (
        <Button onClick={() => Notification.info('这是一个只有标题的简洁通知')}>简洁通知</Button>
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

export default NotificationDemo;
