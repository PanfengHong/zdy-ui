import { useMemo, useState } from 'react';
import { Avatar, Button, Dialog, Icon, Input, Message, Radio, Select, Table, Tag } from '../../components/pc';
import type { RowAction, TableColumn } from '../../components/pc/Table/types';
import Form, { FormItem, useForm } from '../../components/pc/Form/Form';
import './Admin.css';

type UserStatus = 'active' | 'disabled';

interface UserRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: UserStatus;
  createdAt: string;
}

const roleOptions = [
  { value: '管理员', label: '管理员' },
  { value: '运营', label: '运营' },
  { value: '财务', label: '财务' },
  { value: '访客', label: '访客' },
];

const roleColor: Record<string, string> = {
  管理员: 'purple',
  运营: 'blue',
  财务: 'cyan',
  访客: 'gold',
};

const initialUsers: UserRecord[] = [
  { id: 1, name: '林晚晴', email: 'wanqing.lin@zdy.com', phone: '13800001234', role: '管理员', status: 'active', createdAt: '2026-09-12' },
  { id: 2, name: '陈子墨', email: 'zimo.chen@zdy.com', phone: '13900002345', role: '运营', status: 'active', createdAt: '2026-09-18' },
  { id: 3, name: '周予安', email: 'yuan.zhou@zdy.com', phone: '13700003456', role: '财务', status: 'disabled', createdAt: '2026-09-25' },
  { id: 4, name: '苏念', email: 'nian.su@zdy.com', phone: '13600004567', role: '运营', status: 'active', createdAt: '2026-10-02' },
  { id: 5, name: '顾言', email: 'yan.gu@zdy.com', phone: '13500005678', role: '访客', status: 'active', createdAt: '2026-10-08' },
  { id: 6, name: '沈亦舟', email: 'yizhou.shen@zdy.com', phone: '13400006789', role: '管理员', status: 'active', createdAt: '2026-10-15' },
  { id: 7, name: '许知意', email: 'zhiyi.xu@zdy.com', phone: '13300007890', role: '财务', status: 'active', createdAt: '2026-10-21' },
  { id: 8, name: '江叙白', email: 'xubai.jiang@zdy.com', phone: '13200008901', role: '运营', status: 'disabled', createdAt: '2026-10-29' },
  { id: 9, name: '温以琛', email: 'yichen.wen@zdy.com', phone: '13100009012', role: '访客', status: 'active', createdAt: '2026-11-03' },
  { id: 10, name: '白露', email: 'lu.bai@zdy.com', phone: '13000000123', role: '运营', status: 'active', createdAt: '2026-11-07' },
  { id: 11, name: '陆星野', email: 'xingye.lu@zdy.com', phone: '18800001111', role: '财务', status: 'active', createdAt: '2026-11-12' },
  { id: 12, name: '叶南嘉', email: 'nanjia.ye@zdy.com', phone: '18900002222', role: '访客', status: 'active', createdAt: '2026-11-16' },
  { id: 13, name: '纪云深', email: 'yunshen.ji@zdy.com', phone: '18600003333', role: '运营', status: 'active', createdAt: '2026-11-20' },
  { id: 14, name: '唐糖', email: 'tang.tang@zdy.com', phone: '18500004444', role: '管理员', status: 'disabled', createdAt: '2026-11-24' },
];

const formatToday = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

const AdminUserListPage = () => {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<'all' | UserStatus>('all');
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<UserRecord | null>(null);
  const [pendingDelete, setPendingDelete] = useState<UserRecord[]>([]);

  const filterForm = useForm();
  const editForm = useForm();

  const filteredUsers = useMemo(() => {
    const text = keyword.trim().toLowerCase();
    return users.filter((user) => {
      const matchKeyword =
        !text ||
        user.name.toLowerCase().includes(text) ||
        user.email.toLowerCase().includes(text) ||
        user.phone.includes(text);
      const matchStatus = status === 'all' || user.status === status;
      return matchKeyword && matchStatus;
    });
  }, [users, keyword, status]);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (record: UserRecord) => {
    setEditing(record);
    setDialogOpen(true);
  };

  const handleSearch = (values: Record<string, any>) => {
    setKeyword(String(values.keyword ?? '').trim());
    setStatus((values.status as 'all' | UserStatus) ?? 'all');
    setSelectedKeys([]);
  };

  const handleReset = () => {
    filterForm.resetFields();
    setKeyword('');
    setStatus('all');
    setSelectedKeys([]);
  };

  const handleSave = (values: Record<string, any>) => {
    const payload = {
      name: String(values.name ?? '').trim(),
      email: String(values.email ?? '').trim(),
      phone: String(values.phone ?? '').trim(),
      role: String(values.role ?? '运营'),
      status: (values.status === 'disabled' ? 'disabled' : 'active') as UserStatus,
    };

    if (editing) {
      setUsers((list) => list.map((user) => (user.id === editing.id ? { ...user, ...payload } : user)));
      Message.success(`已更新用户「${payload.name}」`);
    } else {
      setUsers((list) => [{ id: Date.now(), createdAt: formatToday(), ...payload }, ...list]);
      Message.success(`已新增用户「${payload.name}」`);
    }
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    const ids = pendingDelete.map((user) => user.id);
    setUsers((list) => list.filter((user) => !ids.includes(user.id)));
    setSelectedKeys((keys) => keys.filter((key) => !ids.includes(Number(key))));
    Message.success(`已删除 ${ids.length} 位用户`);
    setPendingDelete([]);
  };

  const rowActions: RowAction[] = [
    {
      key: 'edit',
      label: '编辑',
      icon: <Icon type="edit" size={14} />,
      onClick: (record) => openEdit(record as UserRecord),
    },
    {
      key: 'delete',
      label: '删除',
      danger: true,
      icon: <Icon type="delete" size={14} />,
      onClick: (record) => setPendingDelete([record as UserRecord]),
    },
  ];

  const columns: TableColumn[] = [
    {
      title: '用户',
      dataIndex: 'name',
      render: (_value, record: UserRecord) => (
        <div className="admin-user-cell">
          <Avatar
            size={34}
            text={record.name.slice(0, 1)}
            style={{ background: record.status === 'active' ? '#1890ff' : '#bfbfbf' }}
          />
          <div className="admin-user-cell-main">
            <span className="admin-user-cell-name">{record.name}</span>
            <span className="admin-user-cell-email">{record.email}</span>
          </div>
        </div>
      ),
    },
    { title: '手机号', dataIndex: 'phone', width: 140 },
    {
      title: '角色',
      dataIndex: 'role',
      width: 110,
      render: (value: string) => (
        <Tag color={roleColor[value] ?? 'blue'} size="small">
          {value}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 110,
      render: (value: UserStatus) => (
        <Tag status={value === 'active' ? 'success' : 'error'} size="small">
          {value === 'active' ? '正常' : '已禁用'}
        </Tag>
      ),
    },
    { title: '注册时间', dataIndex: 'createdAt', width: 130 },
  ];

  const selectedUsers = users.filter((user) => selectedKeys.map(Number).includes(user.id));

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="admin-page-title">用户管理</h1>
          <p className="admin-page-desc">管理后台账号信息、角色权限与启用状态。</p>
        </div>
        <div className="admin-page-actions">
          <Button type="primary" onClick={openCreate}>
            <Icon type="add" size={14} />
            新增用户
          </Button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-body">
          <Form
            form={filterForm}
            layout="inline"
            className="admin-filter"
            initialValues={{ keyword: '', status: 'all' }}
            onFinish={handleSearch}
          >
            <FormItem name="keyword" label="关键词">
              <Input placeholder="搜索姓名 / 邮箱 / 手机号" prefix={<Icon type="search" size={14} />} />
            </FormItem>
            <FormItem name="status" label="状态">
              <Select
                options={[
                  { value: 'all', label: '全部状态' },
                  { value: 'active', label: '正常' },
                  { value: 'disabled', label: '已禁用' },
                ]}
              />
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={() => void filterForm.submit()}>
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </FormItem>
          </Form>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h3>用户列表</h3>
          <span className="admin-muted">共 {filteredUsers.length} 位用户</span>
        </div>
        <div className="admin-card-body admin-card-body--table">
          <div className="admin-table-toolbar">
            {selectedUsers.length > 0 ? (
              <div className="admin-selection">
                已选择 <strong>{selectedUsers.length}</strong> 项
                <Button type="danger" size="small" onClick={() => setPendingDelete(selectedUsers)}>
                  批量删除
                </Button>
              </div>
            ) : (
              <span className="admin-muted">勾选左侧复选框可批量操作</span>
            )}
          </div>

          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            rowActions={rowActions}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedKeys,
              onChange: (keys) => setSelectedKeys(keys),
            }}
            pagination={{
              defaultPageSize: 8,
              pageSizeOptions: [5, 8, 10],
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </div>
      </div>

      <Dialog
        visible={dialogOpen}
        title={editing ? '编辑用户' : '新增用户'}
        width={520}
        onClose={() => setDialogOpen(false)}
        footer={
          <>
            <Button onClick={() => setDialogOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => void editForm.submit()}>
              保存
            </Button>
          </>
        }
      >
        <Form
          form={editForm}
          className="admin-form"
          layout="vertical"
          labelWidth={72}
          initialValues={
            editing
              ? { ...editing }
              : { role: '运营', status: 'active' }
          }
          onFinish={handleSave}
        >
          <FormItem
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }, { max: 12, message: '姓名最多 12 个字符' }]}
          >
            <Input placeholder="请输入姓名" />
          </FormItem>
          <FormItem
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: '邮箱格式不正确' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </FormItem>
          <FormItem
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1\d{10}$/, message: '请输入 11 位手机号' },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </FormItem>
          <FormItem name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
            <Select options={roleOptions} placeholder="请选择角色" />
          </FormItem>
          <FormItem name="status" label="状态">
            <Radio
              optionType="button"
              options={[
                { id: 'active', content: '正常' },
                { id: 'disabled', content: '禁用' },
              ]}
            />
          </FormItem>
        </Form>
      </Dialog>

      <Dialog
        visible={pendingDelete.length > 0}
        title="确认删除"
        width={420}
        onClose={() => setPendingDelete([])}
        footer={
          <>
            <Button onClick={() => setPendingDelete([])}>取消</Button>
            <Button type="danger" onClick={confirmDelete}>
              确认删除
            </Button>
          </>
        }
      >
        <p className="admin-dialog-text">
          确定要删除
          <strong>
            {pendingDelete.length > 1
              ? `选中的 ${pendingDelete.length} 位用户`
              : `「${pendingDelete[0]?.name ?? ''}」`}
          </strong>
          吗？删除后不可恢复。
        </p>
      </Dialog>
    </div>
  );
};

export default AdminUserListPage;
