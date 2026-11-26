import type { ReactNode } from 'react';

import Icon from '../../../components/pc/Icon/Icon';
import { MAlert, MButton, MCheckbox, MInput, MRadio } from '../../../components/mobile';

export interface MobileDemo {
  title: string;
  desc?: string;
  code: string;
  render: ReactNode;
}

export interface MobileDemoConfig {
  intro: string;
  demos: MobileDemo[];
}

export const mobileDemos: Record<string, MobileDemoConfig> = {
  MButton: {
    intro:
      '移动端按钮用于触发操作，提供多种类型、状态与尺寸，点击区域适配触屏交互，最小高度 44px。',
    demos: [
      {
        title: '基础用法',
        desc: '通过 type 设置按钮类型，默认为 default。',
        code: `<MButton type="primary">主要按钮</MButton>
<MButton>次要按钮</MButton>`,
        render: (
          <div className="mdemo-stack">
            <MButton type="primary">主要按钮</MButton>
            <MButton>次要按钮</MButton>
          </div>
        )
      },
      {
        title: '状态与类型',
        desc: '通过 disabled 与 loading 控制按钮状态。',
        code: `<MButton type="success">成功</MButton>
<MButton type="warning">警告</MButton>
<MButton disabled>禁用</MButton>
<MButton loading>加载中</MButton>`,
        render: (
          <div className="mdemo-stack">
            <MButton type="success">成功</MButton>
            <MButton type="warning">警告</MButton>
            <MButton disabled>禁用</MButton>
            <MButton loading>加载中</MButton>
          </div>
        )
      }
    ]
  },
  MInput: {
    intro:
      '移动端输入框用于文本录入，支持前后缀图标与禁用态，内置触屏友好的聚焦反馈。',
    demos: [
      {
        title: '基础用法',
        desc: '通过 placeholder 设置占位文案。',
        code: `<MInput placeholder="请输入手机号" />`,
        render: (
          <div className="mdemo-stack">
            <MInput placeholder="请输入手机号" />
          </div>
        )
      },
      {
        title: '前缀图标',
        desc: '通过 prefix 在输入框内添加图标。',
        code: `<MInput
  placeholder="搜索内容"
  prefix={<Icon type="search" size={14} />}
/>`,
        render: (
          <div className="mdemo-stack">
            <MInput
              placeholder="搜索内容"
              prefix={<Icon type="search" size={14} color="#94a3b8" />}
            />
          </div>
        )
      }
    ]
  },
  MAlert: {
    intro:
      '移动端提醒用于页面内展示重要信息，支持四种状态与图标，可通过 closable 手动关闭。',
    demos: [
      {
        title: '基础用法',
        desc: '通过 type 与 message 设置提示类型与内容。',
        code: `<MAlert type="info" message="这是一条普通提示" />
<MAlert type="success" title="提交成功" message="信息已保存" />`,
        render: (
          <div className="mdemo-stack">
            <MAlert type="info" message="这是一条普通提示" />
            <MAlert type="success" title="提交成功" message="信息已保存" />
          </div>
        )
      },
      {
        title: '警告与错误',
        desc: '使用 warning、error 表达不同严重程度。',
        code: `<MAlert type="warning" message="当前网络不稳定" />
<MAlert type="error" message="操作失败，请重试" />`,
        render: (
          <div className="mdemo-stack">
            <MAlert type="warning" message="当前网络不稳定" />
            <MAlert type="error" message="操作失败，请重试" />
          </div>
        )
      }
    ]
  },
  MCheckbox: {
    intro:
      '移动端多选框支持单选项与选项组两种用法，选中状态可由 defaultValue 或 value 控制。',
    demos: [
      {
        title: '选项组',
        desc: '通过 options 定义选项，defaultValue 设置默认选中项。',
        code: `<MCheckbox
  options={[
    { id: 'email', content: '邮件通知' },
    { id: 'sms', content: '短信通知' },
    { id: 'app', content: '应用内通知' }
  ]}
  defaultValue={['email']}
/>`,
        render: (
          <div className="mdemo-stack">
            <MCheckbox
              options={[
                { id: 'email', content: '邮件通知' },
                { id: 'sms', content: '短信通知' },
                { id: 'app', content: '应用内通知' }
              ]}
              defaultValue={['email']}
            />
          </div>
        )
      },
      {
        title: '禁用状态',
        desc: '设置 disabled 禁用整个选项组。',
        code: `<MCheckbox
  options={[
    { id: 'agree', content: '已阅读并同意协议' }
  ]}
  defaultValue={['agree']}
  disabled
/>`,
        render: (
          <div className="mdemo-stack">
            <MCheckbox
              options={[{ id: 'agree', content: '已阅读并同意协议' }]}
              defaultValue={['agree']}
              disabled
            />
          </div>
        )
      }
    ]
  },
  MRadio: {
    intro:
      '移动端单选框用于在多个选项中选择一项，支持选项组与禁用状态。',
    demos: [
      {
        title: '选项组',
        desc: '通过 options 与 defaultValue 设置选项与默认值。',
        code: `<MRadio
  options={[
    { id: 'standard', content: '标准版' },
    { id: 'pro', content: '专业版' },
    { id: 'enterprise', content: '企业版' }
  ]}
  defaultValue="standard"
/>`,
        render: (
          <div className="mdemo-stack">
            <MRadio
              options={[
                { id: 'standard', content: '标准版' },
                { id: 'pro', content: '专业版' },
                { id: 'enterprise', content: '企业版' }
              ]}
              defaultValue="standard"
            />
          </div>
        )
      }
    ]
  }
};

export const getMobileIntro = (name: string, label: string): string =>
  mobileDemos[name]?.intro ??
  `${label}（${name}）组件面向移动端触屏场景，遵循 Zdy Design 移动设计语言，并提供与桌面端一致的 API 命名。`;
