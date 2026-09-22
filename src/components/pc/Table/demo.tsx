import React, { useState } from "react";
import DemoBlock from "../../DemoBlock/DemoBlock";
import Table from "../Table";
import type { RowAction } from "../Table/types";
import ApiTable from "../../ApiTable/ApiTable";

const TableDemo = () => {
  const apiData = [
    {
      prop: "columns",
      desc: "表格列配置",
      type: "TableColumn[]",
      default: "-",
    },
    {
      prop: "dataSource",
      desc: "表格数据",
      type: "Record<string, any>[]",
      default: "-",
    },
    {
      prop: "bordered",
      desc: "是否显示外边框",
      type: "boolean",
      default: "true",
    },
    {
      prop: "rowSelection",
      desc: "行选中配置",
      type: "RowSelection",
      default: "-",
    },
    {
      prop: "draggable",
      desc: "是否开启行拖拽排序",
      type: "boolean",
      default: "false",
    },
    {
      prop: "onDragEnd",
      desc: "拖拽排序完成回调",
      type: "(from, to, newData) => void",
      default: "-",
    },
    {
      prop: "rowActions",
      desc: "行操作菜单配置，开启后每行末尾显示 ...",
      type: "RowAction[]",
      default: "-",
    },
    {
      prop: "rowKey",
      desc: "自定义 row key 字段",
      type: "string",
      default: "'key'",
    },
    {
      prop: "maxHeight",
      desc: "表体最大高度，超出后纵向滚动且表头吸顶",
      type: "number | string",
      default: "-",
    },
    {
      prop: "pagination",
      desc: "分页配置，传 true 开启；对象可配 pageSize / showSizeChanger 等；显式 total 时为服务端分页",
      type: "boolean | TablePaginationConfig",
      default: "false",
    },
  ];

  // --------- Column 配置 API ---------
  const columnApiData = [
    {
      prop: "title",
      desc: "列标题",
      type: "ReactNode",
      default: "-",
    },
    {
      prop: "dataIndex",
      desc: "列对应的数据字段名",
      type: "string",
      default: "-",
    },
    {
      prop: "key",
      desc: "列的唯一标识（无 dataIndex 时用于 key）",
      type: "string",
      default: "-",
    },
    {
      prop: "width",
      desc: "列宽",
      type: "number | string",
      default: "-",
    },
    {
      prop: "align",
      desc: "对齐方式",
      type: "'left' | 'center' | 'right'",
      default: "'left'",
    },
    {
      prop: "fixed",
      desc: "固定列，横向滚动时吸住",
      type: "'left' | 'right'",
      default: "-",
    },
    {
      prop: "render",
      desc: "自定义单元格渲染 (value, record, index) => ReactNode",
      type: "Function",
      default: "-",
    },
  ];

  // --------- Demo 1: 基础示例 ---------
  const demoColumns = [
    { title: "姓名", dataIndex: "name" },
    { title: "年龄", dataIndex: "age" },
    { title: "性别", dataIndex: "gender" },
  ];

  const demoData = [
    { key: "1", name: "张三", age: 25, gender: "男" },
    { key: "2", name: "李四", age: 30, gender: "女" },
    { key: "3", name: "王五", age: 28, gender: "男" },
  ];
  const [dragDemoData, setDragDemoData] = useState(demoData);

  // --------- Demo 2: 完整功能 (shadcn 风格) ---------
  const statusStyle: Record<string, { bg: string; fg: string; icon: string }> =
    {
      done: { bg: "#f0fdf4", fg: "#15803d", icon: "✓" },
      inProcess: { bg: "#fefce8", fg: "#a16207", icon: "◔" },
    };

  const sectionStyle: Record<string, string> = {
    "Table of contents": "#eef2ff",
    "Cover page": "#f5f3ff",
    Narrative: "#f0f9ff",
    "Technical content": "#faf5ff",
  };

  const fullDemoColumns = [
    {
      title: "Section Type",
      dataIndex: "section",
      width: 180,
      render: (v: string) => (
        <span
          style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: 999,
            fontSize: 12,
            background: sectionStyle[v] || "#f5f5f5",
            color: "#555",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {v}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "statusKey",
      width: 120,
      render: (v: "done" | "inProcess") => {
        const s = statusStyle[v];
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px",
              borderRadius: 999,
              fontSize: 12,
              background: s.bg,
              color: s.fg,
              border: `1px solid ${s.fg}22`,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: v === "done" ? "#22c55e" : "#facc15",
                color: "#fff",
                fontSize: 10,
                lineHeight: "14px",
                textAlign: "center",
              }}
            >
              {s.icon}
            </span>
            {v === "done" ? "Done" : "In Process"}
          </span>
        );
      },
    },
    {
      title: "Target",
      dataIndex: "target",
      width: 80,
      align: "right" as const,
    },
    { title: "Limit", dataIndex: "limit", width: 80, align: "right" as const },
    { title: "Reviewer", dataIndex: "reviewer", width: 140 },
  ];

  const [fullDemoData, setFullDemoData] = useState([
    {
      key: "1",
      title: "Table of contents",
      section: "Table of contents",
      statusKey: "done",
      target: 29,
      limit: 24,
      reviewer: "Eddie Lake",
    },
    {
      key: "2",
      title: "Cover page",
      section: "Cover page",
      statusKey: "inProcess",
      target: 18,
      limit: 5,
      reviewer: "Eddie Lake",
    },
    {
      key: "3",
      title: "Executive summary",
      section: "Narrative",
      statusKey: "done",
      target: 10,
      limit: 13,
      reviewer: "Eddie Lake",
    },
    {
      key: "4",
      title: "Technical approach",
      section: "Narrative",
      statusKey: "done",
      target: 27,
      limit: 23,
      reviewer: "Jamik Tashpulatov",
    },
    {
      key: "5",
      title: "Design",
      section: "Narrative",
      statusKey: "inProcess",
      target: 2,
      limit: 16,
      reviewer: "Jamik Tashpulatov",
    },
    {
      key: "6",
      title: "Capabilities",
      section: "Narrative",
      statusKey: "inProcess",
      target: 20,
      limit: 8,
      reviewer: "Jamik Tashpulatov",
    },
    {
      key: "7",
      title: "Integration with existing systems",
      section: "Narrative",
      statusKey: "inProcess",
      target: 19,
      limit: 21,
      reviewer: "Jamik Tashpulatov",
    },
    {
      key: "8",
      title: "Innovation and Advantages",
      section: "Narrative",
      statusKey: "done",
      target: 25,
      limit: 26,
      reviewer: "",
    },
    {
      key: "9",
      title: "Overview of EMR's Innovative Solutions",
      section: "Technical content",
      statusKey: "done",
      target: 7,
      limit: 23,
      reviewer: "",
    },
  ]);

  const rowActions: RowAction[] = [
    {
      key: "edit",
      label: "Edit",
      onClick: (record) => console.log("Edit", record.title),
    },
    {
      key: "copy",
      label: "Copy",
      onClick: (record) => console.log("Copy", record.title),
    },
    {
      key: "favorite",
      label: "Favorite",
      onClick: (record) => console.log("Favorite", record.title),
    },
    {
      key: "delete",
      label: "Delete",
      danger: true,
      onClick: (record, index) => {
        console.log("Delete", record.title);
        setFullDemoData((prev) => prev.filter((_, i) => i !== index));
      },
    },
  ];

  // 给 Title 列配置 render —— 但这里因为 title 和 section 用了相同列，我们把 title 作为第一列
  const fullDemoColumnsWithTitle: typeof fullDemoColumns = [
    {
      title: "Title",
      dataIndex: "title" as any,
      render: (v: string) => <span style={{ fontWeight: 500 }}>{v}</span>,
    },
    ...fullDemoColumns,
  ] as any;

  // --------- Demo: 固定表头 + 固定列 ---------
  const fixedColumns = [
    {
      title: "Header",
      dataIndex: "header",
      width: 240,
      fixed: "left" as const,
      render: (v: string) => <span style={{ fontWeight: 500 }}>{v}</span>,
    },
    { title: "Section Type", dataIndex: "section", width: 170 },
    { title: "Status", dataIndex: "statusText", width: 120 },
    {
      title: "Target",
      dataIndex: "target",
      width: 90,
      align: "right" as const,
    },
    { title: "Limit", dataIndex: "limit", width: 90, align: "right" as const },
    { title: "Reviewer", dataIndex: "reviewer", width: 160 },
    { title: "Department", dataIndex: "department", width: 150 },
    { title: "Updated", dataIndex: "updated", width: 120 },
    { title: "Priority", dataIndex: "priority", width: 100 },
    { title: "Owner Email", dataIndex: "email", width: 220 },
  ];

  const [fixedData] = useState(() => {
    const reviewers = [
      "Eddie Lake",
      "Jamik Tashpulatov",
      "Sofia Chen",
      "Leo Martin",
    ];
    const sections = [
      "Narrative",
      "Table of contents",
      "Cover page",
      "Technical content",
    ];
    const departments = ["R&D", "Product", "Design", "Marketing"];
    return fullDemoData
      .map((row, i) => ({
        key: row.key,
        header: row.title,
        section: row.section,
        statusText: row.statusKey === "done" ? "Done" : "In Process",
        target: row.target,
        limit: row.limit,
        reviewer: reviewers[i % reviewers.length],
        department: departments[i % departments.length],
        updated: `09/${10 + (i % 10)}/2026`,
        priority: i % 2 === 0 ? "High" : "Medium",
        email: `owner${i + 1}@example.com`,
      }))
      .concat(
        // 复制若干行，撑出纵向滚动
        Array.from({ length: 8 }, (_, k) => {
          const i = k + 9;
          return {
            key: `extra-${k}`,
            header: `Extended section ${k + 1}`,
            section: sections[k % sections.length],
            statusText: k % 2 === 0 ? "Done" : "In Process",
            target: 10 + k,
            limit: 20 + k,
            reviewer: reviewers[k % reviewers.length],
            department: departments[k % departments.length],
            updated: `09/${10 + (k % 10)}/2026`,
            priority: k % 3 === 0 ? "Low" : "Medium",
            email: `owner${i + 1}@example.com`,
          };
        }),
      );
  });

  const fixedRowActions: RowAction[] = [
    { key: "edit", label: "Edit" },
    { key: "copy", label: "Make a copy" },
    {
      key: "delete",
      label: "Delete",
      danger: true,
      divider: true,
    },
  ];

  const demos = [
    {
      title: "基础示例",
      code: `<Table columns={demoColumns} dataSource={demoData} />`,
      render: (
        <div className="table-group">
          <Table columns={demoColumns as any} dataSource={demoData} />
        </div>
      ),
    },
    {
      title: "行选中（多选）",
      code: `<Table
  columns={columns}
  dataSource={data}
  rowSelection={{ onChange: (keys) => console.log(keys) }}
/>`,
      render: (
        <Table
          columns={demoColumns as any}
          dataSource={demoData}
          rowSelection={{
            onChange: (keys) => console.log("selected:", keys),
          }}
        />
      ),
    },
    {
      title: "行拖拽排序",
      code: `<Table
  columns={columns}
  dataSource={data}
  draggable
  onDragEnd={(from, to, newData) => setData(newData)}
/>`,
      render: (
        <Table
          columns={demoColumns as any}
          dataSource={dragDemoData}
          draggable
          onDragEnd={(_from, _to, newData) =>
            setDragDemoData(newData as typeof dragDemoData)
          }
        />
      ),
    },
    {
      title: "固定表头 + 固定列",
      code: `<Table
  columns={columns}
  dataSource={data}
  maxHeight={320}
  rowSelection={{ onChange }}
  rowActions={[
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete', danger: true, divider: true },
  ]}
/>
// 列配置：{ title: 'Header', dataIndex: 'header', width: 240, fixed: 'left' }`,
      render: (
        <div style={{ maxWidth: 860 }}>
          <Table
            rowKey="key"
            columns={fixedColumns as any}
            dataSource={fixedData}
            maxHeight={320}
            rowSelection={{
              onChange: (keys) => console.log("selected:", keys),
            }}
            rowActions={fixedRowActions}
          />
        </div>
      ),
    },
    {
      title: "完整功能（shadcn 风格）",
      code: `<Table
  columns={columns}
  dataSource={data}
  draggable
  rowSelection={{ onChange }}
  rowActions={[
    { key: 'edit', label: 'Edit' },
    { key: 'copy', label: 'Make a copy' },
    { key: 'delete', label: 'Delete', danger: true },
  ]}
  onDragEnd={(f, t, newData) => setData(newData)}
/>`,
      render: (
        <Table
          rowKey="key"
          columns={fullDemoColumnsWithTitle as any}
          dataSource={fullDemoData}
          draggable
          rowSelection={{
            onChange: (keys) => console.log("selected:", keys),
          }}
          rowActions={rowActions}
          onDragEnd={(_from, _to, newData) =>
            setFullDemoData(newData as typeof fullDemoData)
          }
        />
      ),
    },
    {
      title: "分页",
      code: `<Table
  columns={columns}
  dataSource={data}
  rowSelection={{ onChange }}
  pagination={{
    defaultPageSize: 5,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: (page, pageSize) => console.log(page, pageSize),
  }}
/>`,
      render: (
        <Table
          rowKey="key"
          columns={fullDemoColumnsWithTitle as any}
          dataSource={fullDemoData}
          rowSelection={{
            onChange: (keys) => console.log("selected:", keys),
          }}
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 20],
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page, size) => console.log("page:", page, size),
          }}
        />
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

      <div className="component-group" style={{ marginTop: "32px" }}>
        <h3>API</h3>
        <ApiTable dataSource={apiData} />
      </div>

      <div className="component-group" style={{ marginTop: "32px" }}>
        <h3>Column 配置</h3>
        <ApiTable dataSource={columnApiData} />
      </div>
    </>
  );
};

export default TableDemo;
