// 获取git commit记录
export interface GitCommit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export async function getGitCommits(count: number = 20): Promise<GitCommit[]> {
  try {
    const response = await fetch('/api/git-log', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch git commits');
    }
    
    return await response.json();
  } catch (error) {
    // 如果API不可用，返回模拟数据
    return getMockCommits();
  }
}

// 模拟commit数据
function getMockCommits(): GitCommit[] {
  return [
    {
      hash: 'a1b2c3d',
      date: '2024-01-18',
      message: 'feat: 添加组件总览和更新日志页面',
      author: 'Developer',
    },
    {
      hash: 'e4f5g6h',
      date: '2024-01-17',
      message: 'style: 优化按钮样式设计',
      author: 'Developer',
    },
    {
      hash: 'i7j8k9l',
      date: '2024-01-16',
      message: 'feat: 新增Input输入框组件',
      author: 'Developer',
    },
    {
      hash: 'm0n1o2p',
      date: '2024-01-15',
      message: 'feat: 新增Button按钮组件',
      author: 'Developer',
    },
    {
      hash: 'q3r4s5t',
      date: '2024-01-14',
      message: 'chore: 初始化React+TS+Vite项目',
      author: 'Developer',
    },
    {
      hash: 'u6v7w8x',
      date: '2024-01-13',
      message: 'chore: 添加Less样式支持',
      author: 'Developer',
    },
    {
      hash: 'y9z0a1b',
      date: '2024-01-12',
      message: 'chore: 配置TypeScript类型声明',
      author: 'Developer',
    },
    {
      hash: 'c2d3e4f',
      date: '2024-01-11',
      message: 'chore: 配置Vite构建工具',
      author: 'Developer',
    },
  ];
}