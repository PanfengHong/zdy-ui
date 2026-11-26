import type { ReactNode } from 'react';

// 单个示例：展示区 + 对应代码
export interface DemoItem {
  title: string;
  desc?: string;
  code: string;
  render: ReactNode;
}

// API 表格行
export interface DemoApiItem {
  prop: string;
  desc: string;
  type: string;
  default: string;
}

// 各组件在自身目录下维护的 demo 配置，PC 与移动端分别导出
export interface DemoConfig {
  intro?: string;
  demos: DemoItem[];
  api?: DemoApiItem[];
}
