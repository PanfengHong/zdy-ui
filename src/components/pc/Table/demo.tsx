import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table';

const TableDemo = () => {
  const apiColumns = [
    { title: '参数', dataIndex: 'prop' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ];

  const apiData = [
    { prop: 'columns', desc: '表格列配置', type: 'ColumnProps[]', default: '-' },
    { prop: 'dataSource', desc: '表格数据', type: 'any[]', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' }
  ];

  const demoColumns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: '性别', dataIndex: 'gender' }
  ];

  const demoData = [
    { name: '张三', age: 25, gender: '男' },
    { name: '李四', age: 30, gender: '女' },
    { name: '王五', age: 28, gender: '男' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础示例</h3>
        <DemoBlock
          code={`
const demoColumns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: '性别', dataIndex: 'gender' }
  ];

  const demoData = [
    { name: '张三', age: 25, gender: '男' },
    { name: '李四', age: 30, gender: '女' },
    { name: '王五', age: 28, gender: '男' }
  ];

<Table columns={demoColumns} dataSource={demoData} />
          `.trim()}
        >
          <div className="table-group">
            <Table columns={demoColumns} dataSource={demoData} />
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

export default TableDemo;
