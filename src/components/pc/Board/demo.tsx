import { useState } from 'react';
import DemoBlock from '../../DemoBlock/DemoBlock';
import ApiTable from '../../ApiTable/ApiTable';
import Board from './Board';
import type { BoardColumnData } from '../../../types';

const defaultColumns: BoardColumnData[] = [
  {
    id: 'todo',
    title: '待办',
    color: '#1890ff',
    cards: [
      { id: '1', title: '需求评审', description: '与产品经理对齐迭代需求', priority: 'high', tags: ['V1.0'], assignee: '张三' },
      { id: '2', title: 'UI 设计稿确认', description: '完成首页和详情页设计', priority: 'medium', tags: ['设计'], assignee: '李四' },
    ],
  },
  {
    id: 'doing',
    title: '进行中',
    color: '#faad14',
    wip: 3,
    cards: [
      { id: '3', title: '登录模块开发', priority: 'urgent', tags: ['前端'], assignee: '王五' },
      { id: '4', title: '接口联调', description: '与后端联调用户中心接口', priority: 'high', tags: ['联调'], assignee: '赵六' },
    ],
  },
  {
    id: 'done',
    title: '已完成',
    color: '#52c41a',
    cards: [
      { id: '5', title: '项目初始化', priority: 'low', label: '已完成' },
      { id: '6', title: '环境搭建', description: 'CI/CD 流水线配置', priority: 'medium', tags: ['DevOps'], assignee: '钱七' },
    ],
  },
];

const BoardDemo = () => {
  const [columns, setColumns] = useState<BoardColumnData[]>(defaultColumns);
  const [log, setLog] = useState<string[]>([]);

  const apiData = [
    { prop: 'columns', desc: '看板列数据（受控）', type: 'BoardColumnData[]', default: '-' },
    { prop: 'defaultColumns', desc: '默认列数据', type: 'BoardColumnData[]', default: '[]' },
    { prop: 'draggable', desc: '是否允许拖拽', type: 'boolean', default: 'true' },
    { prop: 'showColumnCount', desc: '显示列卡片数量', type: 'boolean', default: 'true' },
    { prop: 'showAddColumn', desc: '显示添加列入口', type: 'boolean', default: 'true' },
    { prop: 'showAddCard', desc: '显示添加卡片入口', type: 'boolean', default: 'true' },
    { prop: 'allowRemoveColumn', desc: '允许删除列', type: 'boolean', default: 'true' },
    { prop: 'allowRemoveCard', desc: '允许删除卡片', type: 'boolean', default: 'true' },
    { prop: 'emptyDescription', desc: '空列描述', type: 'string', default: "'暂无卡片'" },
    { prop: 'renderCard', desc: '自定义卡片渲染', type: 'function(card, column)', default: '-' },
    { prop: 'renderColumnHeader', desc: '自定义列头渲染', type: 'function(column)', default: '-' },
    { prop: 'onColumnsChange', desc: '列数据变化回调', type: 'function(columns)', default: '-' },
    { prop: 'onCardMove', desc: '卡片移动回调', type: 'function(cardId, from, to, index)', default: '-' },
    { prop: 'onColumnAdd', desc: '新增列回调', type: 'function(title)', default: '-' },
    { prop: 'onColumnRemove', desc: '删除列回调', type: 'function(columnId)', default: '-' },
    { prop: 'onCardAdd', desc: '新增卡片回调', type: 'function(columnId, card)', default: '-' },
    { prop: 'onCardRemove', desc: '删除卡片回调', type: 'function(columnId, cardId)', default: '-' },
    { prop: 'onCardClick', desc: '点击卡片回调', type: 'function(card, columnId)', default: '-' },
    { prop: 'onColumnTitleChange', desc: '列标题修改回调', type: 'function(columnId, title)', default: '-' },
  ];

  const cardApiData = [
    { prop: 'id', desc: '卡片唯一标识', type: 'string', default: '-' },
    { prop: 'title', desc: '卡片标题', type: 'string', default: '-' },
    { prop: 'description', desc: '卡片描述', type: 'string', default: '-' },
    { prop: 'priority', desc: '优先级', type: "'low' | 'medium' | 'high' | 'urgent'", default: '-' },
    { prop: 'label', desc: '标签节点', type: 'ReactNode', default: '-' },
    { prop: 'tags', desc: '标签数组', type: 'string[]', default: '-' },
    { prop: 'assignee', desc: '负责人', type: 'string', default: '-' },
    { prop: 'meta', desc: '自定义元数据', type: 'Record<string, any>', default: '-' },
  ];

  const columnApiData = [
    { prop: 'id', desc: '列唯一标识', type: 'string', default: '-' },
    { prop: 'title', desc: '列标题', type: 'string', default: '-' },
    { prop: 'cards', desc: '卡片数据', type: 'BoardCardData[]', default: '[]' },
    { prop: 'color', desc: '列主题色', type: 'string', default: "'#1890ff'" },
    { prop: 'wip', desc: '在制品数量上限（超出会高亮）', type: 'number', default: '-' },
  ];

  return (
    <>
      <div className="component-group">
        <h3>基础用法</h3>
        <p style={{ color: '#666', margin: '8px 0' }}>
          支持拖拽卡片在列间移动、点击列标题编辑、新增/删除列与卡片。
        </p>
        <DemoBlock
          code={`
const [columns, setColumns] = useState(defaultColumns);
<Board
  columns={columns}
  onColumnsChange={setColumns}
  onCardMove={(id, from, to, idx) => console.log(id, from, to, idx)}
/>
          `.trim()}
        >
          <div style={{ maxHeight: 460, overflow: 'hidden' }}>
            <Board
              columns={columns}
              onColumnsChange={setColumns}
              onCardMove={(id, from, to, idx) =>
                setLog((l) => [`${new Date().toLocaleTimeString()} 卡片 ${id}：${from} → ${to}（位置 ${idx}）`, ...l].slice(0, 5))
              }
            />
          </div>
          {log.length > 0 && (
            <div style={{ marginTop: 12, padding: 8, background: '#fafafa', borderRadius: 4, fontSize: 12, color: '#666' }}>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>最近移动：</div>
              {log.map((t, i) => <div key={i}>{t}</div>)}
            </div>
          )}
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>非受控用法</h3>
        <DemoBlock
          code={`
<Board
  defaultColumns={[
    { id: 'todo', title: '待办', cards: [{ id: '1', title: '任务一' }] },
    { id: 'done', title: '已完成', cards: [] }
  ]}
/>
          `.trim()}
        >
          <div style={{ maxHeight: 360, overflow: 'hidden' }}>
            <Board
              defaultColumns={[
                { id: 'todo', title: '待办', color: '#1890ff', cards: [{ id: '1', title: '任务一' }, { id: '2', title: '任务二' }] },
                { id: 'done', title: '已完成', color: '#52c41a', cards: [] },
              ]}
            />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>禁用拖拽</h3>
        <DemoBlock
          code={`
<Board draggable={false} defaultColumns={columns} />
          `.trim()}
        >
          <div style={{ maxHeight: 360, overflow: 'hidden' }}>
            <Board
              draggable={false}
              showAddColumn={false}
              showAddCard={false}
              allowRemoveColumn={false}
              allowRemoveCard={false}
              defaultColumns={[
                {
                  id: 'todo', title: '待办', color: '#1890ff',
                  cards: [{ id: '1', title: '只读卡片 A' }, { id: '2', title: '只读卡片 B' }],
                },
                {
                  id: 'done', title: '已完成', color: '#52c41a',
                  cards: [{ id: '3', title: '只读卡片 C' }],
                },
              ]}
            />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>WIP 限制</h3>
        <p style={{ color: '#666', margin: '8px 0' }}>
          为列设置 <code>wip</code> 可限制在制品数量，超出时计数会高亮显示。
        </p>
        <DemoBlock
          code={`
<Board
  defaultColumns={[
    { id: 'doing', title: '进行中（WIP=2）', wip: 2, cards: [
      { id: '1', title: '任务 1' }, { id: '2', title: '任务 2' }, { id: '3', title: '任务 3' }
    ]},
    { id: 'done', title: '已完成', cards: [] }
  ]}
/>
          `.trim()}
        >
          <div style={{ maxHeight: 360, overflow: 'hidden' }}>
            <Board
              defaultColumns={[
                {
                  id: 'doing', title: '进行中（WIP=2）', color: '#fa541c', wip: 2,
                  cards: [
                    { id: '1', title: '任务 1' },
                    { id: '2', title: '任务 2' },
                    { id: '3', title: '任务 3（超出限制）' },
                  ],
                },
                { id: 'done', title: '已完成', color: '#52c41a', cards: [] },
              ]}
            />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>自定义卡片渲染</h3>
        <DemoBlock
          code={`
<Board
  defaultColumns={columns}
  renderCard={(card) => (
    <div style={{ padding: 8, background: 'linear-gradient(135deg, #722ed1, #eb2f96)', color: '#fff', borderRadius: 4 }}>
      <strong>{card.title}</strong>
    </div>
  )}
/>
          `.trim()}
        >
          <div style={{ maxHeight: 360, overflow: 'hidden' }}>
            <Board
              showAddCard={false}
              defaultColumns={[
                {
                  id: 'c1', title: '自定义卡片', color: '#722ed1',
                  cards: [
                    { id: '1', title: '渐变卡片 1' },
                    { id: '2', title: '渐变卡片 2' },
                    { id: '3', title: '渐变卡片 3' },
                  ],
                },
              ]}
              renderCard={(card) => (
                <div
                  style={{
                    padding: 10,
                    background: 'linear-gradient(135deg, #722ed1, #eb2f96)',
                    color: '#fff',
                    borderRadius: 4,
                    fontSize: 13,
                    cursor: 'grab',
                  }}
                >
                  <strong>{card.title}</strong>
                  <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>自定义渲染示例</div>
                </div>
              )}
            />
          </div>
        </DemoBlock>
      </div>

      <div className="component-group">
        <h3>点击卡片回调</h3>
        <DemoBlock
          code={`
const [selected, setSelected] = useState(null);
<Board
  defaultColumns={columns}
  allowRemoveCard={false}
  onCardClick={(card) => setSelected(card)}
/>
          `.trim()}
        >
          <ClickBoardDemo />
        </DemoBlock>
      </div>

      <div className="component-group" style={{ marginTop: '32px' }}>
        <h3>API - Board</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group">
        <h3>API - BoardColumnData</h3>
        <ApiTable dataSource={columnApiData} />
      </div>

      <div className="component-group">
        <h3>API - BoardCardData</h3>
        <ApiTable dataSource={cardApiData} />
      </div>
    </>
  );
};

// 点击卡片演示
const ClickBoardDemo = () => {
  const [selected, setSelected] = useState<{ title: string; columnId: string } | null>(null);

  return (
    <>
      <div style={{ maxHeight: 360, overflow: 'hidden' }}>
        <Board
          allowRemoveCard={false}
          showAddCard={false}
          defaultColumns={[
            {
              id: 'todo', title: '待办', color: '#1890ff',
              cards: [
                { id: '1', title: '点击我试试' },
                { id: '2', title: '也可以点这个' },
              ],
            },
            {
              id: 'done', title: '已完成', color: '#52c41a',
              cards: [{ id: '3', title: '已完成的任务' }],
            },
          ]}
          onCardClick={(card, columnId) => setSelected({ title: card.title, columnId })}
        />
      </div>
      <div style={{ marginTop: 12, padding: 8, background: '#fafafa', borderRadius: 4, fontSize: 12, color: '#666' }}>
        {selected ? `点击了「${selected.title}」（列：${selected.columnId}）` : '请点击任意卡片'}
      </div>
    </>
  );
};

export default BoardDemo;
