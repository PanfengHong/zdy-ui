import React from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import Table from '../Table';
import ApiTable from '../../ApiTable/ApiTable';

const TableDemo = () => {
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


  const demos = [
    {
      title: '基础示例',
      code: `
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
          `.trim(),
      render: (
        <div className="table-group">
          <Table columns={demoColumns} dataSource={demoData} />
        </div>
      )
    }
  ]

  return (
    <>
      {demos.map((demo) => (
        <div key={demo.title} className="component-group">
          <h3>{demo.title}</h3>
          <DemoBlock code={demo.code}>{demo.render}</DemoBlock>
        </div>
      ))}
      
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>
    </>
  );
};

export default TableDemo;
