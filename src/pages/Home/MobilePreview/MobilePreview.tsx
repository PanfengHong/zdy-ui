import Icon from '../../../components/pc/Icon/Icon';
import { MAlert, MButton, MInput } from '../../../components/mobile';
import IPhoneFrame from '../../Components/IPhoneFrame/IPhoneFrame';
import './MobilePreview.css';

// 手机壳内的真实移动端组件预览
const MobilePreview = () => (
  <IPhoneFrame>
    <div className="mobile-preview-app">
      <div className="mobile-preview-head">
        <div>
          <div className="mobile-preview-title">Zdy Mobile</div>
          <div className="mobile-preview-sub">触屏场景组件预览</div>
        </div>
        <Icon type="smartphone" size={20} color="#94a3b8" />
      </div>
      <MAlert type="info" message="移动端样式已独立生效" showIcon />
      <MInput placeholder="搜索内容" prefix={<Icon type="search" size={14} color="#94a3b8" />} />
      <div className="mobile-preview-chips">
        <span className="mobile-preview-chip">触屏友好</span>
        <span className="mobile-preview-chip">独立样式</span>
        <span className="mobile-preview-chip">按需引入</span>
      </div>
      <div className="mobile-preview-list">
        {[
          { name: 'MButton', label: '按钮' },
          { name: 'MInput', label: '输入框' },
          { name: 'MAlert', label: '提醒' },
          { name: 'MTag', label: '标签' }
        ].map(item => (
          <div key={item.name} className="mobile-preview-list-item">
            <span className="mobile-preview-list-name">{item.name}</span>
            <span className="mobile-preview-list-label">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mobile-preview-actions">
        <MButton type="primary">开始使用</MButton>
        <MButton>次要操作</MButton>
      </div>
    </div>
  </IPhoneFrame>
);

export default MobilePreview;
