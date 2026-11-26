import { useState } from "react";
import type { DemoConfig } from "../../../pages/Components/Demo/types";
import Radio from "./Radio";

const options = [
  { id: "a", content: "选项A" },
  { id: "b", content: "选项B" },
  { id: "c", content: "选项C" },
];

const SingleControlledDemo = () => {
  const [singleValue, setSingleValue] = useState(false);
  return (
    <>
      <Radio value={singleValue} onChange={setSingleValue}>
        radio
      </Radio>
      <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
        当前值：{String(singleValue)}
      </p>
    </>
  );
};

const GroupControlledDemo = () => {
  const [value, setValue] = useState("a");
  return (
    <>
      <Radio options={options} value={value} onChange={setValue} />
      <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
        当前选中：{value}
      </p>
    </>
  );
};

const ButtonGroupDemo = () => {
  const [buttonValue, setButtonValue] = useState("a");
  return (
    <>
      <Radio
        options={options}
        value={buttonValue}
        onChange={setButtonValue}
        optionType="button"
      />
      <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
        当前选中：{buttonValue}
      </p>
    </>
  );
};

const TextGroupDemo = () => {
  const [textValue, setTextValue] = useState("a");
  return (
    <>
      <Radio
        options={options}
        value={textValue}
        onChange={setTextValue}
        optionType="text"
      />
      <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
        当前选中：{textValue}
      </p>
    </>
  );
};

const radioDemo: DemoConfig = {
  demos: [
    {
      title: "单个用法",
      code: `<Radio>radio</Radio>\n<Radio defaultValue>默认选中</Radio>\n<Radio disabled>禁用</Radio>`,
      render: (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Radio>radio</Radio>
          <Radio defaultValue>默认选中</Radio>
          <Radio disabled>禁用</Radio>
        </div>
      ),
    },
    {
      title: "单个用法（受控）",
      code: `const [value, setValue] = useState(false);\n\n<Radio value={value} onChange={setValue}>radio</Radio>`,
      render: <SingleControlledDemo />,
    },
    {
      title: "单个用法 + 展示形态",
      code: `<Radio optionType="button">单个按钮</Radio>\n<Radio optionType="text" defaultValue>单个文字</Radio>`,
      render: (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Radio optionType="button">单个按钮</Radio>
          <Radio optionType="text" defaultValue>
            单个文字
          </Radio>
        </div>
      ),
    },
    {
      title: "组用法（受控）",
      code: `const [value, setValue] = useState('a');\n\n<Radio\n  options={[\n    { id: 'a', content: '选项A' },\n    { id: 'b', content: '选项B' },\n    { id: 'c', content: '选项C' },\n  ]}\n  value={value}\n  onChange={setValue}\n/>`,
      render: <GroupControlledDemo />,
    },
    {
      title: "组用法（非受控）",
      code: `<Radio\n  options={[\n    { id: 'a', content: '选项A' },\n    { id: 'b', content: '选项B' },\n  ]}\n  defaultValue="b"\n/>`,
      render: <Radio options={options} defaultValue="b" />,
    },
    {
      title: '按钮组（optionType="button"）',
      code: `<Radio options={options} value={value} onChange={setValue} optionType="button" />`,
      render: <ButtonGroupDemo />,
    },
    {
      title: '纯文字样式（optionType="text"）',
      code: `<Radio options={options} value={value} onChange={setValue} optionType="text" />`,
      render: <TextGroupDemo />,
    },
    {
      title: "自定义内容（content 支持 ReactNode）",
      code: `<Radio\n  defaultValue="standard"\n  options={[\n    { id: 'standard', content: '标准版' },\n    { id: 'pro', content: <span>专业版 <em>推荐</em></span> },\n  ]}\n/>`,
      render: (
        <Radio
          defaultValue="standard"
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
      code: `<Radio options={options} defaultValue="a" disabled />`,
      render: <Radio options={options} defaultValue="a" disabled />,
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
    {
      prop: "optionType",
      desc: "展示形态：default 圆点单选框 / button 按钮组 / text 纯文字（选中后文字带背景色）",
      type: "'default' | 'button' | 'text'",
      default: "'default'",
    },
    { prop: "disabled", desc: "是否禁用", type: "boolean", default: "false" },
    {
      prop: "name",
      desc: "原生 name，不传时使用浏览器默认行为",
      type: "string",
      default: "-",
    },
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
      desc: "当前选中项 id（受控）",
      type: "string",
      default: "-",
    },
    {
      prop: "defaultValue",
      desc: "默认选中项 id（非受控）",
      type: "string",
      default: "-",
    },
    {
      prop: "onChange",
      desc: "选中项变化回调，参数为选中项的 id",
      type: "function(id)",
      default: "-",
    },
    {
      prop: "optionType",
      desc: "展示形态：default 圆点单选框 / button 按钮组 / text 纯文字（选中后文字带背景色）",
      type: "'default' | 'button' | 'text'",
      default: "'default'",
    },
    {
      prop: "disabled",
      desc: "是否禁用整组",
      type: "boolean",
      default: "false",
    },
    {
      prop: "name",
      desc: "原生 name，同组 radio 共享，不传时自动生成",
      type: "string",
      default: "-",
    },
    { prop: "className", desc: "自定义类名", type: "string", default: "-" },
    { prop: "style", desc: "自定义样式", type: "CSSProperties", default: "-" },
  ],
};

export default radioDemo;
