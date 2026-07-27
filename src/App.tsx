import { useState, useEffect } from 'react';

import { PC, Mobile } from './index';
import { getGitCommits } from './utils/git';
import type { GitCommit } from './utils/git';
import DemoBlock from './components/DemoBlock/DemoBlock';
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
        { id: 'button', label: 'Button 按钮', icon: '🔘', type: 'component', component: 'button' },
        { id: 'icon', label: 'Icon 图标', icon: '🎨', type: 'component', component: 'icon' },
      ],
    },
    {
      id: 'layout',
      label: '布局',
      items: [
        { id: 'layout', label: 'Layout 布局', icon: '📐', type: 'component', component: 'layout' },
        { id: 'grid', label: 'Grid 栅格', icon: '🔲', type: 'component', component: 'grid' },
        { id: 'masonry', label: 'Masonry 瀑布流', icon: '🧱', type: 'component', component: 'masonry' },
      ],
    },
    {
      id: 'feedback',
      label: '反馈',
      items: [
        { id: 'dialog', label: 'Dialog 弹框', icon: '💬', type: 'component', component: 'dialog' },
        { id: 'alert', label: 'Alert 提醒', icon: '⚠️', type: 'component', component: 'alert' },
        { id: 'message', label: 'Message 消息', icon: '📨', type: 'component', component: 'message' },
        { id: 'notification', label: 'Notification 通知', icon: '🔔', type: 'component', component: 'notification' },
        { id: 'loading', label: 'Loading 加载', icon: '⏳', type: 'component', component: 'loading' },
        { id: 'skeleton', label: 'Skeleton 骨架屏', icon: '💀', type: 'component', component: 'skeleton' },
        { id: 'watermark', label: 'Watermark 水印', icon: '💧', type: 'component', component: 'watermark' },
        { id: 'progress', label: 'Progress 进度条', icon: '📊', type: 'component', component: 'progress' },
      ],
    },
    {
      id: 'display',
      label: '展示',
      items: [
        { id: 'menu', label: 'Menu 菜单', icon: '📋', type: 'component', component: 'menu' },
        { id: 'carousel', label: 'Carousel 走马灯', icon: '🎠', type: 'component', component: 'carousel' },
        { id: 'table', label: 'Table 表格', icon: '📋', type: 'component', component: 'table' },
        { id: 'list', label: 'List 列表', icon: '📝', type: 'component', component: 'list' },
        { id: 'breadcrumb', label: 'Breadcrumb 面包屑', icon: '🍞', type: 'component', component: 'breadcrumb' },
        { id: 'steps', label: 'Steps 步骤条', icon: '📶', type: 'component', component: 'steps' },
        { id: 'pagination', label: 'Pagination 分页', icon: '📄', type: 'component', component: 'pagination' },
        { id: 'anchor', label: 'Anchor 锚点', icon: '⚓', type: 'component', component: 'anchor' },
        { id: 'tabs', label: 'Tabs 标签页', icon: '📑', type: 'component', component: 'tabs' },
        { id: 'tree', label: 'Tree 树形控件', icon: '🌳', type: 'component', component: 'tree' },
        { id: 'calendar', label: 'Calendar 日历', icon: '📅', type: 'component', component: 'calendar' },
        { id: 'empty', label: 'Empty 空状态', icon: '📭', type: 'component', component: 'empty' },
        { id: 'popover', label: 'Popover 气泡', icon: '💭', type: 'component', component: 'popover' },
        { id: 'collapse', label: 'Collapse 折叠面板', icon: '📁', type: 'component', component: 'collapse' },
        { id: 'intro', label: 'Intro 引导', icon: '🎯', type: 'component', component: 'intro' },
        { id: 'tag', label: 'Tag 标签', icon: '🏷️', type: 'component', component: 'tag' },
        { id: 'board', label: 'Board 看板', icon: '📊', type: 'component', component: 'board' },
        { id: 'echarts', label: 'ECharts 图表', icon: '📈', type: 'component', component: 'echarts' },
      ],
    },
    {
      id: 'form',
      label: '表单',
      items: [
        { id: 'input', label: 'Input 输入框', icon: '📝', type: 'component', component: 'input' },
        { id: 'textarea', label: 'Textarea 文本域', icon: '📄', type: 'component', component: 'textarea' },
        { id: 'select', label: 'Select 下拉选择', icon: '📋', type: 'component', component: 'select' },
        { id: 'radio', label: 'Radio 单选框', icon: '⭕', type: 'component', component: 'radio' },
        { id: 'checkbox', label: 'Checkbox 多选框', icon: '☑️', type: 'component', component: 'checkbox' },
        { id: 'upload', label: 'Upload 上传', icon: '📤', type: 'component', component: 'upload' },
        { id: 'switch', label: 'Switch 开关', icon: '🔘', type: 'component', component: 'switch' },
        { id: 'datetimepicker', label: 'DateTimePicker 日期时间选择器', icon: '📅', type: 'component', component: 'datetimepicker' },
        { id: 'colorpicker', label: 'ColorPicker 颜色选择器', icon: '🎨', type: 'component', component: 'colorpicker' },
        { id: 'form', label: 'Form 表单', icon: '📋', type: 'component', component: 'form' },
        { id: 'transfer', label: 'Transfer 穿梭框', icon: '↔️', type: 'component', component: 'transfer' },
        { id: 'slider', label: 'Slider 滑块', icon: '🎚️', type: 'component', component: 'slider' },
        { id: 'rate', label: 'Rate 评分', icon: '⭐', type: 'component', component: 'rate' },
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
    const componentId = getCurrentMenuItem().component || '';
    const sectionClass = activePlatform === 'pc' ? '' : 'mobile-section';
    const platformComponents = activePlatform === 'pc' ? PC : Mobile;
    
    // 获取组件名称（首字母大写）
    const componentName = componentId.charAt(0).toUpperCase() + componentId.slice(1);
    
    // 动态获取组件
    const Component = (platformComponents as any)[componentName];
    
    if (!Component) {
      return (
        <section className={`component-section ${sectionClass}`}>
          <h2>组件开发中</h2>
          <p>该组件正在开发中，敬请期待...</p>
        </section>
      );
    }
    
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
    };
    
    const DemoComponent = demoComponents[componentName];
    
    if (DemoComponent) {
      return (
        <section className={`component-section ${sectionClass}`}>
          <h2>{componentName}组件</h2>
          <DemoComponent />
        </section>
      );
    }
    
    return (
        <section className={`component-section ${sectionClass}`}>
          <h2>{componentName}组件</h2>
          <div className="component-group">
            <h3>基础示例</h3>
            <DemoBlock
              code={`
<${componentName}>基础示例</${componentName}>
              `.trim()}
            >
              <Component>基础示例</Component>
            </DemoBlock>
          </div>
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
      {/* 左侧菜单 */}
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <h2>📦 组件库</h2>
        </div>
        
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
        {/* 平台切换选项卡 - 仅在组件页面显示 */}
        {getCurrentMenuItem().type === 'component' && (
          <div className="platform-tabs">
            <button
              className={`platform-tab ${activePlatform === 'pc' ? 'active' : ''}`}
              onClick={() => setActivePlatform('pc')}
            >
              <span className="tab-icon">🖥️</span>
              <span className="tab-label">PC端</span>
            </button>
            <button
              className={`platform-tab ${activePlatform === 'mobile' ? 'active' : ''}`}
              onClick={() => setActivePlatform('mobile')}
            >
              <span className="tab-icon">📱</span>
              <span className="tab-label">移动端</span>
            </button>
          </div>
        )}

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
