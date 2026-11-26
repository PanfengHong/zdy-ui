import type { DemoConfig } from '../../../pages/Components/Demo/types';
import MCheckbox from './MCheckbox';

const mCheckboxDemo: DemoConfig = {
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
};

export default mCheckboxDemo;
