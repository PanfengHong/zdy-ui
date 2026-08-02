import React, { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Tree from './Tree';
import type { TreeNodeData } from '../../../types';

// 示例数据
const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '部门 A',
    children: [
      {
        key: '1-1',
        title: '研发组',
        children: [
          { key: '1-1-1', title: '前端开发' },
          { key: '1-1-2', title: '后端开发' },
          { key: '1-1-3', title: '测试' },
        ],
      },
      {
        key: '1-2',
        title: '产品组',
        children: [
          { key: '1-2-1', title: '产品经理' },
          { key: '1-2-2', title: 'UI 设计' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '部门 B',
    children: [
      { key: '2-1', title: '市场组' },
      { key: '2-2', title: '运营组' },
      { key: '2-3', title: '客服组' },
    ],
  },
  { key: '3', title: '部门 C' },
];

// 带 icon 的数据
const treeDataWithIcon: TreeNodeData[] = [
  {
    key: '1',
    title: '文件夹 A',
    icon: <span>📁</span>,
    children: [
      { key: '1-1', title: '文件 1.txt', icon: <span>📄</span> },
      { key: '1-2', title: '文件 2.txt', icon: <span>📄</span> },
    ],
  },
  {
    key: '2',
    title: '文件夹 B',
    icon: <span>📁</span>,
    children: [
      { key: '2-1', title: '图片.jpg', icon: <span>🖼️</span> },
      { key: '2-2', title: '文档.md', icon: <span>📝</span> },
    ],
  },
];

// 带禁用的数据
const treeDataDisabled: TreeNodeData[] = [
  {
    key: '1',
    title: '可用节点',
    children: [
      { key: '1-1', title: '子节点 1' },
      { key: '1-2', title: '禁用节点', disabled: true },
    ],
  },
  {
    key: '2',
    title: '禁用根节点',
    disabled: true,
    children: [{ key: '2-1', title: '子节点' }],
  },
];

// 带禁用 checkbox 的数据
const treeDataDisableCheckbox: TreeNodeData[] = [
  {
    key: '1',
    title: '父节点',
    children: [
      { key: '1-1', title: '可选' },
      { key: '1-2', title: '禁止勾选', disableCheckbox: true },
      { key: '1-3', title: '可选' },
    ],
  },
];

const TreeDemo = () => {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<(string | number)[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>(['1', '1-1']);
  const [data, setData] = useState<TreeNodeData[]>(treeData);
  const [info, setInfo] = useState<string>('点击或勾选节点查看信息');

  // 拖拽数据
  const [dragData, setDragData] = useState<TreeNodeData[]>(treeData);

  // 递归处理拖拽移动
  const handleDrop = (info: { node: TreeNodeData; dragNode: TreeNodeData; dropPosition: number; dropToGap: boolean }) => {
    const { node, dragNode, dropPosition, dropToGap } = info;
    setInfo(`拖拽 ${dragNode.title} 到 ${node.title}（${dropToGap ? '间隙' : '内部'}, pos=${dropPosition}）`);

    // 深拷贝并移除拖拽节点
    const removeNode = (list: TreeNodeData[], key: string | number): TreeNodeData | null => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].key === key) {
          return list.splice(i, 1)[0];
        }
        if (list[i].children) {
          const found = removeNode(list[i].children!, key);
          if (found) return found;
        }
      }
      return null;
    };

    // 插入节点
    const insertNode = (list: TreeNodeData[], target: TreeNodeData, dragNode: TreeNodeData, pos: number, toGap: boolean) => {
      if (toGap) {
        const idx = list.findIndex((n) => n.key === target.key);
        if (idx > -1) {
          list.splice(pos < 0 ? idx : idx + 1, 0, dragNode);
          return true;
        }
      } else {
        if (target.key === list.find((n) => n.key === target.key)?.key) {
          if (!list[list.findIndex((n) => n.key === target.key)].children) {
            list[list.findIndex((n) => n.key === target.key)].children = [];
          }
          list[list.findIndex((n) => n.key === target.key)].children!.push(dragNode);
          return true;
        }
      }
      for (const item of list) {
        if (item.children && insertNode(item.children, target, dragNode, pos, toGap)) return true;
      }
      return false;
    };

    const newData = JSON.parse(JSON.stringify(dragData)) as TreeNodeData[];
    const dragged = removeNode(newData, dragNode.key);
    if (dragged) {
      insertNode(newData, node, dragged, dropPosition, dropToGap);
    }
    setDragData(newData);
  };

  const apiData = [
    { prop: 'treeData', desc: '树形数据', type: 'TreeNodeData[]', default: '[]' },
    { prop: 'expandedKeys', desc: '受控展开的 key（受控）', type: '(string|number)[]', default: '-' },
    { prop: 'defaultExpandedKeys', desc: '默认展开的 key', type: '(string|number)[]', default: '[]' },
    { prop: 'selectedKeys', desc: '受控选中的 key（受控）', type: '(string|number)[]', default: '-' },
    { prop: 'defaultSelectedKeys', desc: '默认选中的 key', type: '(string|number)[]', default: '[]' },
    { prop: 'checkedKeys', desc: '受控勾选的 key（受控）', type: 'array | { checked, halfChecked }', default: '-' },
    { prop: 'defaultCheckedKeys', desc: '默认勾选的 key', type: '(string|number)[]', default: '[]' },
    { prop: 'checkable', desc: '是否显示 checkbox', type: 'boolean', default: 'false' },
    { prop: 'checkStrictly', desc: '严格模式（父子不关联）', type: 'boolean', default: 'false' },
    { prop: 'disabled', desc: '整体禁用', type: 'boolean', default: 'false' },
    { prop: 'showIcon', desc: '是否显示自定义图标', type: 'boolean', default: 'false' },
    { prop: 'showLine', desc: '是否显示连接线', type: 'boolean', default: 'false' },
    { prop: 'draggable', desc: '是否可拖拽', type: 'boolean', default: 'false' },
    { prop: 'blockNode', desc: '节点占满整行', type: 'boolean', default: 'false' },
    { prop: 'multiple', desc: '允许多选', type: 'boolean', default: 'false' },
    { prop: 'defaultExpandAll', desc: '默认展开全部', type: 'boolean', default: 'false' },
    { prop: 'switcherIcon', desc: '自定义展开图标', type: 'ReactNode', default: '默认箭头' },
    { prop: 'titleRender', desc: '自定义标题渲染', type: '(node) => ReactNode', default: '-' },
    { prop: 'onExpand', desc: '展开/收起回调', type: '(keys, info) => void', default: '-' },
    { prop: 'onSelect', desc: '选择回调', type: '(keys, info) => void', default: '-' },
    { prop: 'onCheck', desc: '勾选回调', type: '(keys, info) => void', default: '-' },
    { prop: 'onDrop', desc: '拖拽放下回调', type: '(info) => void', default: '-' },
  ];

  const nodeApiData = [
    { prop: 'key', desc: '节点唯一标识（必填）', type: 'string | number', default: '-' },
    { prop: 'title', desc: '标题', type: 'ReactNode', default: '-' },
    { prop: 'children', desc: '子节点', type: 'TreeNodeData[]', default: '-' },
    { prop: 'disabled', desc: '禁用节点', type: 'boolean', default: 'false' },
    { prop: 'disableCheckbox', desc: '禁用 checkbox', type: 'boolean', default: 'false' },
    { prop: 'selectable', desc: '是否可选中', type: 'boolean', default: 'true' },
    { prop: 'isLeaf', desc: '是否叶子节点', type: 'boolean', default: '自动判断' },
    { prop: 'icon', desc: '自定义图标', type: 'ReactNode', default: '-' },
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <DemoBlock code={`<Tree treeData={treeData} defaultExpandAll />`}>
          <Tree treeData={treeData} defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>默认展开指定节点</h3>
        <DemoBlock code={`<Tree treeData={treeData} defaultExpandedKeys={['1', '1-1']} />`}>
          <Tree treeData={treeData} defaultExpandedKeys={['1', '1-1']} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带选择（受控）</h3>
        <div style={{ marginBottom: 8 }}>
          <span>当前选中：</span>
          <strong style={{ color: '#1890ff' }}>{selectedKeys.join(', ') || '无'}</strong>
        </div>
        <DemoBlock code={`<Tree\n  treeData={treeData}\n  selectedKeys={selectedKeys}\n  onSelect={onSelect}\n/>`}>
          <Tree
            treeData={treeData}
            defaultExpandedKeys={['1']}
            selectedKeys={selectedKeys}
            onSelect={(keys, info) => {
              setSelectedKeys(keys);
              setInfo(`选择节点：${info.node.title}（${info.selected ? '选中' : '取消'}）`);
            }}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>多选</h3>
        <DemoBlock code={`<Tree treeData={treeData} multiple defaultExpandAll />`}>
          <Tree treeData={treeData} multiple defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>带勾选（级联）</h3>
        <div style={{ marginBottom: 8 }}>
          <span>当前勾选：</span>
          <strong style={{ color: '#1890ff' }}>{checkedKeys.join(', ') || '无'}</strong>
        </div>
        <DemoBlock code={`<Tree treeData={treeData} checkable defaultExpandAll />`}>
          <Tree
            treeData={treeData}
            checkable
            defaultExpandAll
            checkedKeys={checkedKeys}
            onCheck={(keys) => {
              setCheckedKeys(keys as (string | number)[]);
              setInfo(`勾选：${(keys as (string | number)[]).join(', ')}`);
            }}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>严格模式（父子不关联）</h3>
        <DemoBlock code={`<Tree treeData={treeData} checkable checkStrictly defaultExpandAll />`}>
          <Tree treeData={treeData} checkable checkStrictly defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用节点</h3>
        <DemoBlock code={`<Tree treeData={treeDataDisabled} defaultExpandAll />`}>
          <Tree treeData={treeDataDisabled} defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用单个 checkbox</h3>
        <DemoBlock code={`<Tree treeData={treeDataDisableCheckbox} checkable defaultExpandAll />`}>
          <Tree treeData={treeDataDisableCheckbox} checkable defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>整体禁用</h3>
        <DemoBlock code={`<Tree treeData={treeData} disabled defaultExpandAll />`}>
          <Tree treeData={treeData} disabled defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义图标</h3>
        <DemoBlock code={`<Tree treeData={treeDataWithIcon} showIcon defaultExpandAll />`}>
          <Tree treeData={treeDataWithIcon} showIcon defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>显示连接线</h3>
        <DemoBlock code={`<Tree treeData={treeData} showLine defaultExpandAll />`}>
          <Tree treeData={treeData} showLine defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义展开图标</h3>
        <DemoBlock code={`<Tree treeData={treeData} switcherIcon={<span>▶</span>} defaultExpandAll />`}>
          <Tree treeData={treeData} switcherIcon={<span style={{ fontSize: 10 }}>▶</span>} defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义标题渲染</h3>
        <DemoBlock code={`<Tree treeData={treeData} defaultExpandAll titleRender={(node) => <span>📎 {node.title}</span>} />`}>
          <Tree
            treeData={treeData}
            defaultExpandAll
            titleRender={(node) => (
              <span>
                <span style={{ marginRight: 4 }}>📎</span>
                {node.title}
              </span>
            )}
          />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>节点占满整行</h3>
        <DemoBlock code={`<Tree treeData={treeData} blockNode defaultExpandAll />`}>
          <Tree treeData={treeData} blockNode defaultExpandAll />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>可拖拽（支持间隙和内部放置）</h3>
        <div style={{ marginBottom: 8, color: '#666' }}>
          提示：拖动节点到目标节点的上/下边缘可插入间隙，拖到中间可放入内部
        </div>
        <DemoBlock code={`<Tree treeData={treeData} draggable onDrop={handleDrop} />`}>
          <Tree treeData={dragData} draggable defaultExpandAll onDrop={handleDrop} />
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>事件信息</h3>
        <div style={{ padding: 12, background: '#f5f5f5', borderRadius: 4, minHeight: 40 }}>
          {info}
        </div>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>Tree API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>TreeNodeData</h3>
        <ApiTable dataSource={nodeApiData} />
      </div>
    </>
  );
};

export default TreeDemo;
