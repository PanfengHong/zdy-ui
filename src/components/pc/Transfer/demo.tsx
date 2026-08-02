import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Transfer from './Transfer';
import type { TransferItem } from './types';

const mockData: TransferItem[] = [
  { key: '1', title: '张三', description: '前端工程师' },
  { key: '2', title: '李四', description: '后端工程师' },
  { key: '3', title: '王五', description: '产品经理', disabled: true },
  { key: '4', title: '赵六', description: 'UI设计师' },
  { key: '5', title: '孙七', description: '测试工程师' },
  { key: '6', title: '周八', description: '运维工程师' },
  { key: '7', title: '吴九', description: '数据分析师' },
  { key: '8', title: '郑十', description: '架构师' }
];

const TransferDemo = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['2', '5']);

  const apiData = [
    { prop: 'dataSource', desc: '数据源', type: 'TransferItem[]', default: '[]' },
    { prop: 'targetKeys', desc: '右侧列表的 key 数组（受控）', type: 'string[]', default: '-' },
    { prop: 'defaultTargetKeys', desc: '默认右侧列表的 key 数组', type: 'string[]', default: '[]' },
    { prop: 'selectedKeys', desc: '当前选中的 key（受控）', type: 'string[]', default: '-' },
    { prop: 'titles', desc: '左右列表标题', type: '[string, string]', default: "['源列表', '目标列表']" },
    { prop: 'operations', desc: '操作按钮文字', type: '[string, string]', default: "['→', '←']" },
    { prop: 'showSearch', desc: '是否显示搜索框', type: 'boolean', default: 'false' },
    { prop: 'filterOption', desc: '自定义搜索过滤函数', type: '(input, item) => boolean', default: '-' },
    { prop: 'listStyle', desc: '列表自定义样式', type: 'CSSProperties', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'oneWay', desc: '单向模式（仅可向右转移）', type: 'boolean', default: 'false' },
    { prop: 'render', desc: '自定义每行渲染', type: '(item) => ReactNode', default: '-' },
    { prop: 'footer', desc: '自定义底部', type: '(props) => ReactNode', default: '-' },
    { prop: 'onChange', desc: '选项转移回调', type: '(targetKeys, direction, moveKeys) => void', default: '-' },
    { prop: 'onSelectChange', desc: '选中项变化回调', type: '(sourceSelected, targetSelected) => void', default: '-' },
    { prop: 'onSearch', desc: '搜索回调', type: '(direction, value) => void', default: '-' }
  ];

  const itemApiData = [
    { prop: 'key', desc: '唯一标识', type: 'string', default: '-' },
    { prop: 'title', desc: '标题', type: 'string', default: '-' },
    { prop: 'description', desc: '描述', type: 'string', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' }
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock
          code={`const mockData = [
  { key: '1', title: '张三', description: '前端工程师' },
  { key: '2', title: '李四', description: '后端工程师' },
  // ...
];

<Transfer dataSource={mockData} />`}
        >
          <Transfer dataSource={mockData} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带搜索</h3>
        <DemoBlock
          code={`<Transfer dataSource={mockData} showSearch />`}
        >
          <Transfer dataSource={mockData} showSearch />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>受控用法</h3>
        <div style={{ marginBottom: 12 }}>
          <span>目标列表：</span>
          <strong style={{ color: '#1890ff' }}>{targetKeys.join(', ') || '空'}</strong>
        </div>
        <DemoBlock
          code={`const [targetKeys, setTargetKeys] = useState(['2', '5']);

<Transfer
  dataSource={mockData}
  targetKeys={targetKeys}
  onChange={(keys) => setTargetKeys(keys)}
/>`}
        >
          <Transfer
            dataSource={mockData}
            targetKeys={targetKeys}
            onChange={(keys) => setTargetKeys(keys)}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义标题和操作</h3>
        <DemoBlock
          code={`<Transfer
  dataSource={mockData}
  titles={['未选择', '已选择']}
  operations={['添加', '移除']}
/>`}
        >
          <Transfer
            dataSource={mockData}
            titles={['未选择', '已选择']}
            operations={['添加', '移除']}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义渲染</h3>
        <DemoBlock
          code={`<Transfer
  dataSource={mockData}
  render={(item) => (
    <span>
      {item.title} - <small style={{ color: '#999' }}>{item.description}</small>
    </span>
  )}
/>`}
        >
          <Transfer
            dataSource={mockData}
            render={(item) => (
              <span>
                {item.title} - <small style={{ color: '#999' }}>{item.description}</small>
              </span>
            )}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>单向模式</h3>
        <DemoBlock
          code={`<Transfer dataSource={mockData} oneWay />`}
        >
          <Transfer dataSource={mockData} oneWay />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用状态</h3>
        <DemoBlock
          code={`<Transfer dataSource={mockData} disabled defaultTargetKeys={['1', '3']} />`}
        >
          <Transfer dataSource={mockData} disabled defaultTargetKeys={['1', '3']} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义底部</h3>
        <DemoBlock
          code={`<Transfer
  dataSource={mockData}
  footer={({ direction }) => (
    <span style={{ fontSize: 12, color: '#999' }}>
      {direction === 'left' ? '左侧列表' : '右侧列表'}底部
    </span>
  )}
/>`}
        >
          <Transfer
            dataSource={mockData}
            footer={({ direction }) => (
              <span style={{ fontSize: 12, color: '#999' }}>
                {direction === 'left' ? '左侧列表' : '右侧列表'}底部
              </span>
            )}
          />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Transfer API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>TransferItem API</h3>
        <ApiTable dataSource={itemApiData} />
      </div>
    </>
  );
};

export default TransferDemo;
