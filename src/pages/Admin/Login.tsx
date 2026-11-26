import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Icon, Input, Message } from '../../components/pc';
import Form, { FormItem, useForm } from '../../components/pc/Form/Form';
import { adminLogin, DEMO_ACCOUNT, getAdminUser } from './auth';
import './Admin.css';

const highlights = ['开箱即用的中后台页面模板', '完整的表单校验与组件示例', '响应式布局与主题一致的视觉风格'];

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const form = useForm();
  const [loading, setLoading] = useState(false);

  if (getAdminUser()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleFinish = (values: Record<string, any>) => {
    const username = String(values.username ?? '').trim();
    const password = String(values.password ?? '');

    if (username !== DEMO_ACCOUNT.username || password !== DEMO_ACCOUNT.password) {
      Message.error('账号或密码错误，演示账号：admin / 123456');
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      adminLogin(username);
      Message.success('登录成功，正在进入管理后台');
      navigate('/admin/dashboard', { replace: true });
    }, 500);
  };

  return (
    <div className="admin-login">
      <aside className="admin-login-panel">
        <Link className="admin-login-back" to="/">
          <Icon type="back" size={14} />
          返回组件库官网
        </Link>

        <div className="admin-login-brand">
          <span className="admin-brand-logo">
            <Icon type="component" size={18} color="#fff" />
          </span>
          <span>Zdy Admin</span>
        </div>

        <h1>
          让中后台管理
          <br />
          更简单高效
        </h1>
        <p className="admin-login-intro">
          基于 Zdy Design 组件库搭建的完整管理系统示例，覆盖登录、工作台、列表、表单与设置等常见场景。
        </p>

        <ul className="admin-login-features">
          {highlights.map((item) => (
            <li key={item}>
              <Icon type="confirm" size={14} color="#4ade80" />
              {item}
            </li>
          ))}
        </ul>

        <div className="admin-login-preview">
          <div>
            <span>今日新增用户</span>
            <strong>128</strong>
          </div>
          <div>
            <span>待处理工单</span>
            <strong>23</strong>
          </div>
          <div>
            <span>系统稳定性</span>
            <strong>99.98%</strong>
          </div>
        </div>
      </aside>

      <main className="admin-login-main">
        <div className="admin-login-card">
          <h2>欢迎登录</h2>
          <p className="admin-login-sub">请输入账号密码进入管理后台</p>

          <Form
            form={form}
            layout="vertical"
            labelWidth={72}
            initialValues={{
              username: DEMO_ACCOUNT.username,
              password: DEMO_ACCOUNT.password,
              remember: true,
            }}
            onFinish={handleFinish}
          >
            <FormItem
              name="username"
              label="账号"
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input size="large" placeholder="请输入账号" prefix={<Icon type="user" size={14} />} />
            </FormItem>

            <FormItem
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少 6 位' },
              ]}
            >
              <Input
                type="password"
                size="large"
                placeholder="请输入密码"
                prefix={<Icon type="shield-check" size={14} />}
              />
            </FormItem>

            <div className="admin-login-row">
              <FormItem name="remember">
                <Checkbox>记住登录状态</Checkbox>
              </FormItem>
              <button
                type="button"
                className="admin-link"
                onClick={() => Message.info('请联系系统管理员重置密码')}
              >
                忘记密码？
              </button>
            </div>

            <Button
              type="primary"
              size="large"
              loading={loading}
              className="admin-login-submit"
              onClick={() => void form.submit()}
            >
              登 录
            </Button>
          </Form>

          <div className="admin-login-tip">
            <Icon type="info" size={14} />
            演示账号：admin&nbsp;&nbsp;密码：123456
          </div>
        </div>

        <footer className="admin-login-footer">© 2026 Zdy Design · 中后台管理系统示例</footer>
      </main>
    </div>
  );
};

export default AdminLoginPage;
