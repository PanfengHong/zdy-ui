import { useState } from "react";
import type { DemoConfig } from "../../../pages/Components/Demo/types";
import Checkbox from "./Checkbox";

const options = [
  { id: "apple", content: "苹果" },
  { id: "orange", content: "橙子" },
  { id: "banana", content: "香蕉" },
];

const SingleControlledDemo = () => {
  const [singleValue, setSingleValue] = useState(false);
  return (
    <>
      <Checkbox value={singleValue} onChange={setSingleValue}>
        我已阅读并同意
      </Checkbox>
      <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
        当前值：{String(singleValue)}
      </p>
    </>
  );
};

const GroupControlledDemo = () => {
  const [value, setValue] = useState<string[]>(["apple"]);
  return (
    <>
      <Checkbox options={options} value={value} onChange={setValue} />
      <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
        当前选中：{value.join("、") || "无"}
      </p>
    </>
  );
};

const checkboxDemo: DemoConfig = {
  demos: [
    {
      title: "单个用法",
      code: `<Checkbox>复选</Checkbox>\n<Checkbox defaultValue>默认选中</Checkbox>\n<Checkbox disabled>禁用</Checkbox>`,
      render: (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Checkbox>复选</Checkbox>
          <Checkbox defaultValue>默认选中</Checkbox>
          <Checkbox disabled>禁用</Checkbox>
        </div>
      ),
    },
    {
      title: "单个用法（受控）",
      code: `const [value, setValue] = useState(false);\n\n<Checkbox value={value} onChange={setValue}>我已阅读并同意</Checkbox>`,
      render: <SingleControlledDemo />,
    },
    {
      title: "组用法（受控）",
      code: `const [value, setValue] = useState(['apple']);\n\n<Checkbox\n  options={[\n    { id: 'apple', content: '苹果' },\n    { id: 'orange', content: '橙子' },\n    { id: 'banana', content: '香蕉' },\n  ]}\n  value={value}\n  onChange={setValue}\n/>`,
      render: <GroupControlledDemo />,
    },
    {
      title: "组用法（非受控）",
      code: `<Checkbox\n  options={[\n    { id: 'apple', content: '苹果' },\n    { id: 'orange', content: '橙子' },\n    { id: 'banana', content: '香蕉' },\n  ]}\n  defaultValue={['apple', 'orange']}\n/>`,
      render: <Checkbox options={options} defaultValue={["apple", "orange"]} />,
    },
    {
      title: "自定义内容（content 支持 ReactNode）",
      code: `<Checkbox\n  defaultValue={['standard']}\n  options={[\n    { id: 'standard', content: '标准版' },\n    { id: 'pro', content: <span>专业版 <em>推荐</em></span> },\n  ]}\n/>`,
      render: (
        <Checkbox
          defaultValue={["standard"]}
          options={[
            { id: "standard", content: "标准版" },
            {
              id: "pro",
              content: (
                <span>
                  专业版
                  <em
                    style={{
                      marginLeft: 6,
                      fontStyle: "normal",
                      color: "#1890ff",
                      fontSize: 12,
                    }}
                  >
                    推荐
                  </em>
                </span>
              ),
            },
          ]}
        />
      ),
    },
    {
      title: "禁用整组",
      code: `<Checkbox options={options} defaultValue={['apple']} disabled />`,
      render: <Checkbox options={options} defaultValue={["apple"]} disabled />,
    },
  ],
  api: [
    {
      prop: "children",
      desc: "选项内容（字符串或 ReactNode）",
      type: "ReactNode",
      default: "-",
    },
    {
      prop: "value",
      desc: "当前值：是否选中（受控）",
      type: "boolean",
      default: "-",
    },
    {
      prop: "defaultValue",
      desc: "默认值：默认是否选中（非受控）",
      type: "boolean",
      default: "false",
    },
    {
      prop: "onChange",
      desc: "选中状态变化回调，参数为是否选中",
      type: "function(value)",
      default: "-",
    },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    { prop: "className", desc: "自定义类名", type: "string", default: "-" },
    { prop: "style", desc: "自定义样式", type: "CSSProperties", default: "-" },
    {
      prop: "options",
      desc: "选项列表，id 为选中值，content 为展示内容（字符串或 ReactNode）",
      type: "Array<{ id: string; content: string | ReactNode }>",
      default: "-",
    },
    {
      prop: "value",
      desc: "当前选中项 id 数组（受控）",
      type: "string[]",
      default: "-",
    },
    {
      prop: "defaultValue",
      desc: "默认选中项 id 数组（非受控）",
      type: "string[]",
      default: "[]",
    },
    {
      prop: "onChange",
      desc: "选中项变化回调，参数为选中项 id 数组",
      type: "function(ids)",
      default: "-",
    },
    {
      prop: "disabled",
      desc: "是否禁用整组",
      type: "boolean",
      default: "false",
    },
    { prop: "className", desc: "自定义类名", type: "string", default: "-" },
    { prop: "style", desc: "自定义样式", type: "CSSProperties", default: "-" },
  ],
};

export default checkboxDemo;
