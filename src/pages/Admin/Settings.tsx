import { useState } from 'react';
import type { ReactNode } from 'react';
import { Alert, Button, Icon, Input, Message, Radio, Select, Switch, Tabs, Textarea } from '../../components/pc';
import './Admin.css';

const SettingRow = ({
  label,
  desc,
  children,
}: {
  label: string;
  desc?: string;
  children: ReactNode;
}) => (
  <div className="admin-setting-row">
    <div className="admin-setting-label">
      <span>{label}</span>
      {desc && <small>{desc}</small>}
    </div>
    <div className="admin-setting-control">{children}</div>
  </div>
);

const AdminSettingsPage = () => {
  const [siteName, setSiteName] = useState('Zdy 中后台管理系统');
  const [siteDesc, setSiteDesc] = useState('基于 Zdy Design 组件库构建的中后台示例系统。');
  const [language, setLanguage] = useState('zh');
  const [allowRegister, setAllowRegister] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordLevel, setPasswordLevel] = useState('strong');
  const [whiteList, setWhiteList] = useState('10.0.0.0/24\n192.168.1.0/24');

  const [systemNotify, setSystemNotify] = useState(true);
  const [emailNotify, setEmailNotify] = useState(true);
  const [smsNotify, setSmsNotify] = useState(false);
  const [noticeEmail, setNoticeEmail] = useState('admin@zdy.com');

  const save = (name: string) => {
    Message.success(`${name}已保存`);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">系统设置</h1>
          <p className="admin-page-desc">配置站点信息、安全策略与通知方式。</p>
        </div>
      </div>

      <Alert
        type="info"
        showIcon
        title="演示说明"
        message="以下配置仅用于演示组件能力，不会真正提交到服务端保存。"
      />

      <div className="admin-card">
        <div className="admin-card-body">
          <Tabs type="capsule" defaultActiveKey="basic">
            <Tabs.TabPane tabKey="basic" title="基础设置">
              <div className="admin-setting">
                <SettingRow label="系统名称" desc="显示在浏览器标题与登录页">
                  <Input value={siteName} onChange={(event) => setSiteName(event.target.value)} />
                </SettingRow>
                <SettingRow label="系统描述" desc="用于介绍系统用途">
                  <Textarea
                    rows={3}
                    value={siteDesc}
                    onChange={(event) => setSiteDesc(event.target.value)}
                  />
                </SettingRow>
                <SettingRow label="默认语言" desc="新用户首次进入时的界面语言">
                  <Select
                    value={language}
                    onChange={setLanguage}
                    options={[
                      { value: 'zh', label: '简体中文' },
                      { value: 'en', label: 'English' },
                      { value: 'ja', label: '日本語' },
                    ]}
                  />
                </SettingRow>
                <SettingRow label="开放注册" desc="关闭后仅管理员可创建账号">
                  <Switch checked={allowRegister} onChange={setAllowRegister} />
                </SettingRow>
                <SettingRow label="维护模式" desc="开启后普通用户将无法访问系统">
                  <Switch checked={maintenance} onChange={setMaintenance} />
                </SettingRow>
                <div className="admin-setting-actions">
                  <Button type="primary" onClick={() => save('基础设置')}>
                    保存设置
                  </Button>
                </div>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tabKey="security" title="安全设置">
              <div className="admin-setting">
                <SettingRow label="双因素认证" desc="登录时需要额外输入动态验证码">
                  <Switch checked={twoFactor} onChange={setTwoFactor} />
                </SettingRow>
                <SettingRow label="会话有效期" desc="登录状态自动失效的时间">
                  <Select
                    value={sessionTimeout}
                    onChange={setSessionTimeout}
                    options={[
                      { value: '15', label: '15 分钟' },
                      { value: '30', label: '30 分钟' },
                      { value: '60', label: '1 小时' },
                      { value: '480', label: '8 小时' },
                    ]}
                  />
                </SettingRow>
                <SettingRow label="密码强度" desc="创建账号时的最低密码要求">
                  <Radio
                    optionType="button"
                    value={passwordLevel}
                    onChange={setPasswordLevel}
                    options={[
                      { id: 'normal', content: '普通' },
                      { id: 'strong', content: '强' },
                      { id: 'strict', content: '严格' },
                    ]}
                  />
                </SettingRow>
                <SettingRow label="IP 白名单" desc="每行一个网段，留空表示不限制">
                  <Textarea rows={3} value={whiteList} onChange={(event) => setWhiteList(event.target.value)} />
                </SettingRow>
                <div className="admin-setting-actions">
                  <Button type="primary" onClick={() => save('安全设置')}>
                    保存设置
                  </Button>
                </div>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tabKey="notify" title="通知设置">
              <div className="admin-setting">
                <SettingRow label="系统通知" desc="站内消息提醒">
                  <Switch checked={systemNotify} onChange={setSystemNotify} />
                </SettingRow>
                <SettingRow label="邮件通知" desc="重要事件通过邮件推送">
                  <Switch checked={emailNotify} onChange={setEmailNotify} />
                </SettingRow>
                <SettingRow label="短信通知" desc="仅用于紧急告警">
                  <Switch checked={smsNotify} onChange={setSmsNotify} />
                </SettingRow>
                <SettingRow label="接收邮箱" desc="系统通知的默认收件地址">
                  <Input value={noticeEmail} onChange={(event) => setNoticeEmail(event.target.value)} />
                </SettingRow>
                <div className="admin-setting-actions">
                  <Button type="primary" onClick={() => save('通知设置')}>
                    保存设置
                  </Button>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h3>危险操作</h3>
          <span className="admin-muted">操作前请确认已备份重要数据</span>
        </div>
        <div className="admin-card-body">
          <div className="admin-danger-actions">
            <div>
              <Button type="warning" onClick={() => Message.warning('缓存已清理（演示）')}>
                <Icon type="delete" size={14} />
                清理系统缓存
              </Button>
              <Button type="danger" onClick={() => Message.error('重置系统需要二次确认（演示）')}>
                <Icon type="warning" size={14} />
                重置系统配置
              </Button>
            </div>
            <span className="admin-muted">当前版本 v1.0.3 · 基于 Zdy Design 构建</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
