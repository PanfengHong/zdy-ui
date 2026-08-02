import { useState, useEffect } from 'react';

import { PC, Mobile } from './index';
import { getGitCommits } from './utils/git';
import type { GitCommit } from './utils/git';
import DemoBlock from './components/DemoBlock/DemoBlock';
import Icon from './components/pc/Icon/Icon';
import ButtonDemo from './components/pc/Button/demo';
import InputDemo from './components/pc/Input/demo';
import TabsDemo from './components/pc/Tabs/demo';
import SwitchDemo from './components/pc/Switch/demo';
import DialogDemo from './components/pc/Dialog/demo';
import IconDemo from './components/pc/Icon/demo';
import LayoutDemo from './components/pc/Layout/demo';
import GridDemo from './components/pc/Grid/demo';
import AlertDemo from './components/pc/Alert/demo';
import RadioDemo from './components/pc/Radio/demo';
import CheckboxDemo from './components/pc/Checkbox/demo';
import SelectDemo from './components/pc/Select/demo';
import UploadDemo from './components/pc/Upload/demo';
import TextareaDemo from './components/pc/Textarea/demo';
import MessageDemo from './components/pc/Message/demo';
import NotificationDemo from './components/pc/Notification/demo';
import LoadingDemo from './components/pc/Loading/demo';
import TableDemo from './components/pc/Table/demo';
import WatermarkDemo from './components/pc/Watermark/demo';
import MasonryDemo from './components/pc/Masonry/demo';
import CarouselDemo from './components/pc/Carousel/demo';
import ListDemo from './components/pc/List/demo';
import MenuDemo from './components/pc/Menu/demo';
import BreadcrumbDemo from './components/pc/Breadcrumb/demo';
import PaginationDemo from './components/pc/Pagination/demo';
import CalendarDemo from './components/pc/Calendar/demo';
import RateDemo from './components/pc/Rate/demo';
import TransferDemo from './components/pc/Transfer/demo';
import TagDemo from './components/pc/Tag/demo';
import './App.css';

// 定义菜单数据类型
type MenuItem = {
  id: string;
  label: string;
  icon: string;
  type: 'overview' | 'changelog' | 'component';
  component?: string;
};

type MenuGroup = {
  id: string;
  label: string;
  items: MenuItem[];
};

type Platform = 'pc' | 'mobile';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('button');
  const [activePlatform, setActivePlatform] = useState<Platform>('pc');
  const [activeTopNav, setActiveTopNav] = useState<'design' | 'components'>('components');
  const [gitCommits, setGitCommits] = useState<GitCommit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 加载git commit记录
  useEffect(() => {
    const fetchCommits = async () => {
      setIsLoading(true);
      const commits = await getGitCommits(20);
      setGitCommits(commits);
      setIsLoading(false);
    };
    fetchCommits();
  }, []);

  // 菜单数据 - 按组件分组
  const menuGroups: MenuGroup[] = [
    {
      id: 'info',
      label: '信息',
      items: [
        { id: 'overview', label: '组件总览', icon: '📊', type: 'overview' },
        { id: 'changelog', label: '更新日志', icon: '📝', type: 'changelog' },
      ],
    },
    {
      id: 'general',
      label: '通用',
      items: [
        { id: 'button', label: 'Button 按钮', icon: '🔘', type: 'component', component: 'Button' },
        { id: 'icon', label: 'Icon 图标', icon: '🎨', type: 'component', component: 'Icon' },
      ],
    },
    {
      id: 'layout',
      label: '布局',
      items: [
        { id: 'layout', label: 'Layout 布局', icon: '📐', type: 'component', component: 'Layout' },
        { id: 'grid', label: 'Grid 栅格', icon: '🔲', type: 'component', component: 'Grid' },
        { id: 'masonry', label: 'Masonry 瀑布流', icon: '🧱', type: 'component', component: 'Masonry' },
      ],
    },
    {
      id: 'feedback',
      label: '反馈',
      items: [
        { id: 'dialog', label: 'Dialog 弹框', icon: '💬', type: 'component', component: 'Dialog' },
        { id: 'alert', label: 'Alert 提醒', icon: '⚠️', type: 'component', component: 'Alert' },
        { id: 'message', label: 'Message 消息', icon: '📨', type: 'component', component: 'Message' },
        { id: 'notification', label: 'Notification 通知', icon: '🔔', type: 'component', component: 'Notification' },
        { id: 'loading', label: 'Loading 加载', icon: '⏳', type: 'component', component: 'Loading' },
        { id: 'skeleton', label: 'Skeleton 骨架屏', icon: '💀', type: 'component', component: 'Skeleton' },
        { id: 'watermark', label: 'Watermark 水印', icon: '💧', type: 'component', component: 'Watermark' },
        { id: 'progress', label: 'Progress 进度条', icon: '📊', type: 'component', component: 'Progress' },
      ],
    },
    {
      id: 'display',
      label: '展示',
      items: [
        { id: 'menu', label: 'Menu 菜单', icon: '📋', type: 'component', component: 'Menu' },
        { id: 'carousel', label: 'Carousel 走马灯', icon: '🎠', type: 'component', component: 'Carousel' },
        { id: 'table', label: 'Table 表格', icon: '📋', type: 'component', component: 'Table' },
        { id: 'list', label: 'List 列表', icon: '📝', type: 'component', component: 'List' },
        { id: 'breadcrumb', label: 'Breadcrumb 面包屑', icon: '🍞', type: 'component', component: 'Breadcrumb' },
        { id: 'steps', label: 'Steps 步骤条', icon: '📶', type: 'component', component: 'Steps' },
        { id: 'pagination', label: 'Pagination 分页', icon: '📄', type: 'component', component: 'Pagination' },
        { id: 'anchor', label: 'Anchor 锚点', icon: '⚓', type: 'component', component: 'Anchor' },
        { id: 'tabs', label: 'Tabs 标签页', icon: '📑', type: 'component', component: 'Tabs' },
        { id: 'tree', label: 'Tree 树形控件', icon: '🌳', type: 'component', component: 'Tree' },
        { id: 'calendar', label: 'Calendar 日历', icon: '📅', type: 'component', component: 'Calendar' },
        { id: 'empty', label: 'Empty 空状态', icon: '📭', type: 'component', component: 'Empty' },
        { id: 'popover', label: 'Popover 气泡', icon: '💭', type: 'component', component: 'Popover' },
        { id: 'collapse', label: 'Collapse 折叠面板', icon: '📁', type: 'component', component: 'Collapse' },
        { id: 'intro', label: 'Intro 引导', icon: '🎯', type: 'component', component: 'Intro' },
        { id: 'tag', label: 'Tag 标签', icon: '🏷️', type: 'component', component: 'Tag' },
        { id: 'board', label: 'Board 看板', icon: '📊', type: 'component', component: 'Board' },
        { id: 'echarts', label: 'ECharts 图表', icon: '📈', type: 'component', component: 'ECharts' },
      ],
    },
    {
      id: 'form',
      label: '表单',
      items: [
        { id: 'input', label: 'Input 输入框', icon: '📝', type: 'component', component: 'Input' },
        { id: 'textarea', label: 'Textarea 文本域', icon: '📄', type: 'component', component: 'Textarea' },
        { id: 'select', label: 'Select 下拉选择', icon: '📋', type: 'component', component: 'Select' },
        { id: 'radio', label: 'Radio 单选框', icon: '⭕', type: 'component', component: 'Radio' },
        { id: 'checkbox', label: 'Checkbox 多选框', icon: '☑️', type: 'component', component: 'Checkbox' },
        { id: 'upload', label: 'Upload 上传', icon: '📤', type: 'component', component: 'Upload' },
        { id: 'switch', label: 'Switch 开关', icon: '🔘', type: 'component', component: 'Switch' },
        { id: 'datetimepicker', label: 'DateTimePicker 日期时间选择器', icon: '📅', type: 'component', component: 'DateTimePicker' },
        { id: 'colorpicker', label: 'ColorPicker 颜色选择器', icon: '🎨', type: 'component', component: 'ColorPicker' },
        { id: 'form', label: 'Form 表单', icon: '📋', type: 'component', component: 'Form' },
        { id: 'transfer', label: 'Transfer 穿梭框', icon: '↔️', type: 'component', component: 'Transfer' },
        { id: 'slider', label: 'Slider 滑块', icon: '🎚️', type: 'component', component: 'Slider' },
        { id: 'rate', label: 'Rate 评分', icon: '⭐', type: 'component', component: 'Rate' },
      ],
    },
  ];

  // 获取当前激活的菜单项
  const getCurrentMenuItem = () => {
    for (const group of menuGroups) {
      const item = group.items.find(item => item.id === activeMenuItem);
      if (item) return item;
    }
    return menuGroups[0].items[0];
  };

  // 渲染通用组件展示
  const renderComponentDemo = () => {
    const currentMenuItem = getCurrentMenuItem();
    const componentTitle = currentMenuItem.label || '';
    // component 字段直接存储实际组件名（PascalCase）
    const componentName = currentMenuItem.component || '';
    const sectionClass = activePlatform === 'pc' ? '' : 'mobile-section';
    const platformComponents = activePlatform === 'pc' ? PC : Mobile;
    
    // 动态获取组件
    const Component = (platformComponents as any)[componentName];
    
    const demoComponents: Record<string, React.ComponentType> = {
      Button: ButtonDemo,
      Input: InputDemo,
      Tabs: TabsDemo,
      Switch: SwitchDemo,
      Dialog: DialogDemo,
      Icon: IconDemo,
      Layout: LayoutDemo,
      Grid: GridDemo,
      Alert: AlertDemo,
      Radio: RadioDemo,
      Checkbox: CheckboxDemo,
      Select: SelectDemo,
      Upload: UploadDemo,
      Textarea: TextareaDemo,
      Message: MessageDemo,
      Notification: NotificationDemo,
      Loading: LoadingDemo,
      Table: TableDemo,
      Watermark: WatermarkDemo,
      Masonry: MasonryDemo,
      Carousel: CarouselDemo,
      List: ListDemo,
      Menu: MenuDemo,
      Breadcrumb: BreadcrumbDemo,
      Pagination: PaginationDemo,
      Calendar: CalendarDemo,
      Rate: RateDemo,
      Transfer: TransferDemo,
      Tag: TagDemo,
    };
    
    const DemoComponent = demoComponents[componentName];

    if (!Component || !DemoComponent) {
      return (
        <section className={`component-section ${sectionClass}`}>
          <h2>组件开发中</h2>
          <p>该组件正在开发中，敬请期待...</p>
        </section>
      );
    }
    
    return (
        <section className={`component-section ${sectionClass}`}>
          <h2>{componentTitle}</h2>
          <DemoComponent />
        </section>
      );
    };

  // 渲染组件预览
  const renderComponentPreview = (componentId: string) => {
    const componentName = componentId.charAt(0).toUpperCase() + componentId.slice(1);
    const Component = (PC as any)[componentName];
    
    if (!Component) {
      return <div className="preview-placeholder">开发中</div>;
    }
    
    switch (componentName) {
      case 'Button':
        return (
          <div className="preview-content">
            <Component type="primary">Primary</Component>
          </div>
        );
      case 'Icon':
        return (
          <div className="preview-content">
            <Component type="search" size="medium" />
            <Component type="setting" size="medium" />
            <Component type="user" size="medium" />
          </div>
        );
      case 'Input':
        return (
          <div className="preview-content">
            <Component placeholder="请输入内容" />
          </div>
        );
      case 'Switch':
        return (
          <section className="component-section">
            <div className="component-group">
              <h3>基础用法</h3>
              <DemoBlock
                code={`
<Switch defaultChecked />
<Switch />
<Switch disabled />
<Switch disabled defaultChecked />
                `.trim()}
              >
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Component defaultChecked />
                  <Component />
                  <Component disabled />
                  <Component disabled defaultChecked />
                </div>
              </DemoBlock>
            </div>
            <div className="component-group">
              <h3>开关尺寸</h3>
              <DemoBlock
                code={`
<Switch size="small" />
<Switch size="medium" />
<Switch size="large" />
                `.trim()}
              >
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <Component size="small" />
                    <span style={{ fontSize: '12px', color: '#999' }}>Small</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <Component size="medium" />
                    <span style={{ fontSize: '12px', color: '#999' }}>Medium</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <Component size="large" />
                    <span style={{ fontSize: '12px', color: '#999' }}>Large</span>
                  </div>
                </div>
              </DemoBlock>
            </div>
          </section>
        );
      case 'Radio':
        return (
          <div className="preview-content">
            <Component label="选项一" value="1" />
            <Component label="选项二" value="2" />
          </div>
        );
      case 'Checkbox':
        return (
          <div className="preview-content">
            <Component label="复选框" />
            <Component label="禁用" disabled />
          </div>
        );
      case 'Tag':
        return (
          <div className="preview-content">
            <Component>普通标签</Component>
            <Component type="primary">主要标签</Component>
          </div>
        );
      case 'Tabs':
        return (
          <div className="preview-content">
            <Component defaultActiveKey="1">
              <Component.TabPane tabKey="1" title="Tab 1">Tab 1</Component.TabPane>
              <Component.TabPane tabKey="2" title="Tab 2">Tab 2</Component.TabPane>
            </Component>
          </div>
        );
      case 'Layout':
        return (
          <div className="preview-content" style={{ width: '100%', height: '80px' }}>
            <Component style={{ minHeight: 'auto', height: '100%' }}>
              <Component.Header style={{ backgroundColor: '#001529', color: '#fff', height: '24px', fontSize: '10px' }}>H</Component.Header>
              <Component.Content style={{ backgroundColor: '#f0f2f5', height: '32px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>C</Component.Content>
              <Component.Footer style={{ height: '24px', fontSize: '10px' }}>F</Component.Footer>
            </Component>
          </div>
        );
      case 'Grid':
        return (
          <div className="preview-content" style={{ width: '100%', height: '60px' }}>
            <Component.Row>
              <Component.Col span={8}>
                <div style={{ backgroundColor: '#f5f5f5', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>1/3</div>
              </Component.Col>
              <Component.Col span={8}>
                <div style={{ backgroundColor: '#f5f5f5', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>1/3</div>
              </Component.Col>
              <Component.Col span={8}>
                <div style={{ backgroundColor: '#f5f5f5', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>1/3</div>
              </Component.Col>
            </Component.Row>
          </div>
        );
      default:
        return <div className="preview-placeholder">预览</div>;
    }
  };

  // 渲染组件总览
  const renderOverview = () => {
    return (
      <section className="component-section">
        <h2>组件总览</h2>
        <div className="component-group">
          <div className="component-cards">
            {menuGroups.filter(g => g.id !== 'info').map(group => (
              <div key={group.id} className="component-category">
                <h4>{group.label}</h4>
                <div className="cards-container">
                  {group.items.map(item => {
                    const [englishName, chineseName] = item.label.split(' ');
                    return (
                      <div key={item.id} className="component-card">
                        <div className="card-header">
                          <span className="component-english">{englishName}</span>
                          <span className="component-chinese">{chineseName}</span>
                        </div>
                        <div className="card-content">
                          {renderComponentPreview(item.component || '')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // 渲染更新日志
  const renderChangelog = () => {
    if (isLoading) {
      return (
        <section className="component-section">
          <h2>更新日志</h2>
          <div className="loading-container">
            <span className="loading-spinner"></span>
            <span>正在加载 commit 记录...</span>
          </div>
        </section>
      );
    }

    // 按日期分组
    const commitsByDate = gitCommits.reduce((acc, commit) => {
      if (!acc[commit.date]) {
        acc[commit.date] = [];
      }
      acc[commit.date].push(commit);
      return acc;
    }, {} as Record<string, GitCommit[]>);

    return (
      <section className="component-section">
        <h2>更新日志</h2>
        <p className="changelog-hint">基于 git commit 记录自动生成</p>
        <div className="changelog-list">
          {Object.entries(commitsByDate).map(([date, commits]) => (
            <div key={date} className="changelog-group">
              <div className="changelog-date-header">{date}</div>
              <div className="changelog-items">
                {commits.map((commit) => (
                  <div key={commit.hash} className="changelog-item">
                    <div className="changelog-hash">{commit.hash}</div>
                    <div className="changelog-message">{commit.message}</div>
                    <div className="changelog-author">{commit.author}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="app-container">
      {/* 顶部导航 */}
      <header className="app-top-header">
        <div className="app-top-header-inner">
          <div className="app-top-header-left">
            <span className="app-top-header-logo">Zdy Design</span>
          </div>
          <div className="app-top-header-right">
            <nav className="app-top-header-nav">
              <button
                className={`app-top-header-nav-item ${activeTopNav === 'design' ? 'active' : ''}`}
                onClick={() => setActiveTopNav('design')}
              >
                设计
              </button>
              <button
                className={`app-top-header-nav-item ${activeTopNav === 'components' ? 'active' : ''}`}
                onClick={() => setActiveTopNav('components')}
              >
                组件
              </button>
            </nav>
            <a
              className="app-top-header-github"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <Icon type="github" size={20} color="currentColor" />
            </a>
          </div>
        </div>
      </header>

      {/* 左侧菜单 */}
      <aside className="app-sidebar">
        <nav className="sidebar-nav">
          {menuGroups.map((group) => (
            <div key={group.id} className="menu-group">
              <div className="group-header">
                <span className="group-label">{group.label}</span>
              </div>
              <div className="group-items">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    className={`nav-item ${activeMenuItem === item.id ? 'active' : ''}`}
                    onClick={() => setActiveMenuItem(item.id)}
                  >
                    <span className="nav-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* 主内容区域 */}
      <div className="app-content">
        <main className="app-main">
          {getCurrentMenuItem().type === 'overview' && renderOverview()}
          {getCurrentMenuItem().type === 'changelog' && renderChangelog()}
          {getCurrentMenuItem().type === 'component' && renderComponentDemo()}
        </main>
      </div>
    </div>
  );
}

export default App;
