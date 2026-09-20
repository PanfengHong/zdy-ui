import React, { useState } from "react";
import DemoBlock from "../../DemoBlock/DemoBlock";
import Table from "../Table";
import type { RowAction } from "../Table/types";

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
      default: "false",
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
      title: "基础示例（带边框）",
      code: `<Table columns={demoColumns} dataSource={demoData} bordered />`,
      render: (
        <div className="table-group">
          <Table columns={demoColumns as any} dataSource={demoData} bordered />
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
          dataSource={demoData}
          draggable
          onDragEnd={(_from, _to, newData) => console.log("reorder:", newData)}
        />
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
        <div style={{ marginTop: 12 }}>
          <h4 style={{ margin: "16px 0 8px" }}>Table</h4>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th style={thStyle}>属性</th>
                <th style={thStyle}>说明</th>
                <th style={thStyle}>类型</th>
                <th style={thStyle}>默认值</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((row) => (
                <tr
                  key={row.prop}
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <td style={tdStyle}>
                    <code>{row.prop}</code>
                  </td>
                  <td style={tdStyle}>{row.desc}</td>
                  <td style={tdStyle}>
                    <code
                      style={{
                        color: "#c7254e",
                        background: "#f9f2f4",
                        padding: "1px 4px",
                        borderRadius: 3,
                      }}
                    >
                      {row.type}
                    </code>
                  </td>
                  <td style={tdStyle}>{row.default}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  fontWeight: 500,
  borderBottom: "1px solid #d9d9d9",
};
const tdStyle: React.CSSProperties = { padding: "10px 12px" };

export default TableDemo;
