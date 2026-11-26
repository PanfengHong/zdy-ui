export interface AdminUser {
  username: string;
  displayName: string;
  role: string;
}

export const DEMO_ACCOUNT = {
  username: 'admin',
  password: '123456',
};

const STORAGE_KEY = 'zdy-admin-user';

export const getAdminUser = (): AdminUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AdminUser>;
    if (!parsed || typeof parsed.username !== 'string') return null;
    return {
      username: parsed.username,
      displayName:
        typeof parsed.displayName === 'string' && parsed.displayName
          ? parsed.displayName
          : parsed.username,
      role: typeof parsed.role === 'string' && parsed.role ? parsed.role : '管理员',
    };
  } catch {
    return null;
  }
};

export const adminLogin = (username: string): AdminUser => {
  const user: AdminUser = {
    username,
    displayName: username === DEMO_ACCOUNT.username ? '超级管理员' : username,
    role: '系统管理员',
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // 忽略存储异常（如隐私模式），本次会话仍可正常使用
  }
  return user;
};

export const adminLogout = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
