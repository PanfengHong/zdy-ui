/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';

import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MSwitch from './MSwitch';

const BasicDemo = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="mdemo-stack">
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <MSwitch checked={checked} onChange={setChecked} aria-label="消息通知" />
        <MSwitch defaultChecked size="small" aria-label="小尺寸开关" />
      </div>
      <p className="mdemo-tip">当前状态：{checked ? '已开启' : '已关闭'}</p>
    </div>
  );
};

const RowDemo = () => {
  const [wifi, setWifi] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);

  return (
    <div className="mdemo-stack">
      <MSwitch
        label="无线局域网"
        description="已连接 ZDY-Office，信号良好"
        checked={wifi}
        onChange={setWifi}
      />
      <MSwitch
        label="自动更新"
        description="仅在 Wi-Fi 环境下下载并安装"
        checked={autoUpdate}
        onChange={setAutoUpdate}
      />
      <p className="mdemo-tip">
        Wi-Fi：{wifi ? '开启' : '关闭'}，自动更新：{autoUpdate ? '开启' : '关闭'}
      </p>
    </div>
  );
};

const LoadingDemo = () => {
  const [saving, setSaving] = useState(false);
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="mdemo-stack">
      <MSwitch
        label="同步通讯录"
        description="切换后立即生效，无需手动保存"
        checked={enabled}
        loading={saving}
        onChange={next => {
          setSaving(true);
          setEnabled(next);
          window.setTimeout(() => setSaving(false), 1200);
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <MSwitch loading aria-label="加载中的开关" />
        <MSwitch loading defaultChecked size="small" aria-label="加载中且已开启的开关" />
      </div>
      <p className="mdemo-tip">loading 时显示菊花并禁止交互，可避免提交过程中重复点击。</p>
    </div>
  );
};

const DisabledDemo = () => (
  <div className="mdemo-stack">
    <MSwitch disabled defaultChecked label="蓝牙" description="该设备不支持蓝牙" />
    <MSwitch disabled label="开发者选项" description="需要管理员权限后才能修改" />
  </div>
);

const mSwitchDemo: DemoConfig = {
  intro:
    '移动端开关用于即时切换单个设置项的开启与关闭。默认触控区高 44px，传入 label 后变为整行可点击的设置项，标题左对齐、开关右对齐；支持加载中与禁用态。',
  demos: [
    {
      title: '基础用法',
      desc: '受控用法通过 checked 与 onChange 管理状态，非受控用 defaultChecked；size="small" 适合紧凑场景。',
      code: `const [checked, setChecked] = useState(true);

<MSwitch checked={checked} onChange={setChecked} />
<MSwitch defaultChecked size="small" />`,
      render: <BasicDemo />
    },
    {
      title: '标题与说明',
      desc: '传入 label 后整行可点击，开关右对齐；description 在标题下方展示辅助说明。',
      code: `const [wifi, setWifi] = useState(true);

<MSwitch
  label="无线局域网"
  description="已连接 ZDY-Office，信号良好"
  checked={wifi}
  onChange={setWifi}
/>

<MSwitch label="自动更新" description="仅在 Wi-Fi 环境下下载并安装" />`,
      render: <RowDemo />
    },
    {
      title: '加载中',
      desc: 'loading 会在滑块内显示菊花并禁止交互，适合切换后需要请求接口的场景。',
      code: `<MSwitch label="同步通讯录" loading checked />
<MSwitch loading />`,
      render: <LoadingDemo />
    },
    {
      title: '禁用状态',
      desc: 'disabled 时整行置灰不可点击，开、关两种状态均支持。',
      code: `<MSwitch disabled defaultChecked label="蓝牙" description="该设备不支持蓝牙" />
<MSwitch disabled label="开发者选项" description="需要管理员权限后才能修改" />`,
      render: <DisabledDemo />
    }
  ],
  api: [
    { prop: 'checked', desc: '是否开启（受控）', type: 'boolean', default: '-' },
    { prop: 'defaultChecked', desc: '默认是否开启（非受控）', type: 'boolean', default: 'false' },
    { prop: 'onChange', desc: '开关状态变化回调', type: '(checked: boolean) => void', default: '-' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', default: 'false' },
    { prop: 'loading', desc: '是否加载中，显示菊花并禁止交互', type: 'boolean', default: 'false' },
    { prop: 'size', desc: '尺寸', type: "'small' | 'medium'", default: "'medium'" },
    { prop: 'label', desc: '开关标题，传入后整行可点击', type: 'ReactNode', default: '-' },
    { prop: 'description', desc: '标题下方的说明文字', type: 'ReactNode', default: '-' },
    { prop: 'aria-label', desc: '无标题时的无障碍名称', type: 'string', default: '-' },
    { prop: 'className', desc: '自定义类名', type: 'string', default: '-' },
    { prop: 'style', desc: '自定义样式', type: 'CSSProperties', default: '-' }
  ]
};

export default mSwitchDemo;
