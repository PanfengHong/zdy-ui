import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table/Table';
import Alert from './Alert';

const AlertDemo = () => {
  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

  const apiData = [
    { prop: 'type', desc: '警告类型', type: "'success' | 'info' | 'warning' | 'error'", default: 'info' },
    { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
    { prop: 'message', desc: '内容', type: 'ReactNode', default: '-' },
    { prop: 'closable', desc: '是否可关闭', type: 'boolean', default: 'false' },
    { prop: 'showIcon', desc: '是否显示图标', type: 'boolean', default: 'true' },
    { prop: 'onClose', desc: '关闭回调', type: 'function', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
<Alert>基础示例</Alert>
<Alert type="success" message="操作成功" />
<Alert type="warning" message="此操作将无法撤销" />
<Alert type="error">
  网络连接失败，请检查网络设置
</Alert>
          `.trim()}
        >
          <div className="alert-group">
            <Alert>基础示例</Alert>
            
            <Alert type="success" message="操作成功" />
            
            <Alert type="warning" message="此操作将无法撤销" />

            <Alert type="error">
                网络连接失败，请检查网络设置
            </Alert>
          </div>
        </DemoBlock>
      </div>
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <Table columns={apiColumns} dataSource={apiData} className="zdy-table-api" />
      </div>
    </>
  );
};

export default AlertDemo;