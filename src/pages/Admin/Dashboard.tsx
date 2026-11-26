import { Link } from 'react-router-dom';
import { Button, Icon, Message, Progress, Steps, Table, Tag } from '../../components/pc';
import type { IconType } from '../../components/pc/Icon/types';
import type { TableColumn } from '../../components/pc/Table/types';
import { getAdminUser } from './auth';
import './Admin.css';

interface StatItem {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  icon: IconType;
  tone: 'blue' | 'green' | 'orange' | 'red';
}

const stats: StatItem[] = [
  { label: '总用户数', value: '12,846', delta: '12.5%', up: true, icon: 'people', tone: 'blue' },
  { label: '今日订单', value: '1,024', delta: '8.2%', up: true, icon: 'package', tone: 'green' },
  { label: '本月销售额', value: '¥ 328,560', delta: '15.4%', up: true, icon: 'heart', tone: 'orange' },
  { label: '待处理工单', value: '23', delta: '4.1%', up: false, icon: 'warning', tone: 'red' },
];

const visitTrend = [
  { label: '周一', value: 42 },
  { label: '周二', value: 58 },
  { label: '周三', value: 35 },
  { label: '周四', value: 70 },
  { label: '周五', value: 62 },
  { label: '周六', value: 88 },
  { label: '周日', value: 76 },
];

const goals = [
  { label: '季度营收目标', percent: 78 },
  { label: '新增客户目标', percent: 56 },
  { label: '客户续费率', percent: 92 },
];

type OrderStatus = 'done' | 'processing' | 'pending' | 'canceled';

interface OrderRecord {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  time: string;
}

const orderStatusMap: Record<
  OrderStatus,
  { text: string; status: 'success' | 'processing' | 'warning' | 'error' }
> = {
  done: { text: '已完成', status: 'success' },
  processing: { text: '处理中', status: 'processing' },
  pending: { text: '待付款', status: 'warning' },
  canceled: { text: '已取消', status: 'error' },
};

const orders: OrderRecord[] = [
  { id: 'ZD-20261126-001', customer: '云启科技', amount: 12800, status: 'done', time: '11-26 10:24' },
  { id: 'ZD-20261126-002', customer: '杭州蓝湖设计', amount: 5680, status: 'processing', time: '11-26 09:58' },
  { id: 'ZD-20261125-018', customer: '恒星传媒', amount: 23900, status: 'pending', time: '11-25 18:32' },
  { id: 'ZD-20261125-017', customer: '知行教育', amount: 3200, status: 'canceled', time: '11-25 16:05' },
  { id: 'ZD-20261125-016', customer: '南风物流', amount: 8600, status: 'done', time: '11-25 14:41' },
];

const columns: TableColumn[] = [
  { title: '订单号', dataIndex: 'id', width: 170 },
  { title: '客户', dataIndex: 'customer' },
  {
    title: '金额',
    dataIndex: 'amount',
    align: 'right',
    width: 120,
    render: (value: number) => `¥ ${value.toLocaleString()}`,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 110,
    render: (value: OrderStatus) => {
      const item = orderStatusMap[value];
      return (
        <Tag status={item.status} size="small">
          {item.text}
        </Tag>
      );
    },
  },
  { title: '下单时间', dataIndex: 'time', width: 130 },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return '凌晨好';
  if (hour < 12) return '上午好';
  if (hour < 18) return '下午好';
  return '晚上好';
};

const maxVisit = Math.max(...visitTrend.map((item) => item.value));

const AdminDashboardPage = () => {
  const user = getAdminUser();

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">工作台</h1>
          <p className="admin-page-desc">查看核心经营数据、近期订单与项目进度。</p>
        </div>
        <div className="admin-page-actions">
          <Button onClick={() => Message.info('数据已刷新')}>
            <Icon type="loading" size={14} spin />
            刷新数据
          </Button>
          <Link to="/admin/users">
            <Button type="primary">
              <Icon type="add" size={14} />
              新增用户
            </Button>
          </Link>
        </div>
      </div>

      <section className="admin-hero">
        <div className="admin-hero-text">
          <h2>
            {getGreeting()}，{user?.displayName ?? '管理员'}
          </h2>
          <p>今日有 23 条待处理工单、4 个待审批流程，系统运行平稳。</p>
          <div className="admin-hero-actions">
            <Link to="/admin/users">
              <Button type="primary">进入用户管理</Button>
            </Link>
            <Link to="/admin/form">
              <Button>创建新流程</Button>
            </Link>
          </div>
        </div>
        <div className="admin-hero-metrics">
          <div>
            <span>本月营收</span>
            <strong>¥ 1,286,400</strong>
            <em>环比 +18.6%</em>
          </div>
          <div>
            <span>活跃用户</span>
            <strong>8,420</strong>
            <em>环比 +6.3%</em>
          </div>
        </div>
      </section>

      <section className="admin-stat-grid">
        {stats.map((item) => (
          <div className="admin-stat" key={item.label}>
            <span className={`admin-stat-icon admin-stat-icon--${item.tone}`}>
              <Icon type={item.icon} size={20} />
            </span>
            <div className="admin-stat-main">
              <span className="admin-stat-label">{item.label}</span>
              <strong className="admin-stat-value">{item.value}</strong>
              <span className={`admin-stat-trend ${item.up ? 'is-up' : 'is-down'}`}>
                <Icon type={item.up ? 'caret-up' : 'caret-down'} size={12} />
                {item.delta}
                <i>较上周</i>
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-grid-2">
        <div className="admin-card">
          <div className="admin-card-head">
            <div>
              <h3>近 7 日访问趋势</h3>
              <p className="admin-muted">统计口径：全站去重后的 UV 数据</p>
            </div>
            <div className="admin-legend">
              <i />
              访问量
            </div>
          </div>
          <div className="admin-card-body">
            <div className="admin-bars">
              {visitTrend.map((item) => (
                <div className="admin-bar-col" key={item.label}>
                  <span className="admin-bar-value">{item.value}k</span>
                  <div className="admin-bar-track">
                    <div
                      className="admin-bar"
                      style={{ height: `${Math.round((item.value / maxVisit) * 100)}%` }}
                    />
                  </div>
                  <span className="admin-bar-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h3>目标完成度</h3>
            <span className="admin-muted">本季度</span>
          </div>
          <div className="admin-card-body">
            <div className="admin-goals">
              {goals.map((goal) => (
                <div className="admin-goal" key={goal.label}>
                  <div className="admin-goal-head">
                    <span>{goal.label}</span>
                    <strong>{goal.percent}%</strong>
                  </div>
                  <Progress percent={goal.percent} showInfo={false} />
                </div>
              ))}
            </div>
            <div className="admin-goal-footer">
              <Progress type="circle" percent={78} width={96} />
              <div>
                <strong>整体进度良好</strong>
                <p className="admin-muted">距离季度目标还差 22%，请继续保持当前节奏。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-grid-2">
        <div className="admin-card">
          <div className="admin-card-head">
            <h3>最近订单</h3>
            <Link className="admin-link" to="/admin/users">
              查看全部
            </Link>
          </div>
          <div className="admin-card-body admin-card-body--table">
            <Table columns={columns} dataSource={orders} rowKey="id" bordered={false} />
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h3>项目进度</h3>
            <Tag color="processing" size="small">
              进行中
            </Tag>
          </div>
          <div className="admin-card-body">
            <Steps direction="vertical" current={1} size="small">
              <Steps.Step title="需求提交" description="已完成 · 11 月 12 日" />
              <Steps.Step title="方案评审" description="进行中 · 预计 11 月 28 日" />
              <Steps.Step title="开发交付" description="待开始 · 计划 12 月 10 日" />
            </Steps>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
