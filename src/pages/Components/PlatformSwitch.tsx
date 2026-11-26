import { Link, useSearchParams } from 'react-router-dom';

import Icon from '../../components/pc/Icon/Icon';
import './PlatformSwitch.css';

interface PlatformSwitchProps {
  className?: string;
}

// 组件库平台切换开关：PC 端 / 移动端
const PlatformSwitch = ({ className = '' }: PlatformSwitchProps) => {
  const [searchParams] = useSearchParams();
  const isMobile = searchParams.get('platform') === 'mobile';

  return (
    <div
      className={`platform-switch ${isMobile ? 'is-mobile' : 'is-pc'} ${className}`.trim()}
      role="group"
      aria-label="切换组件库平台"
    >
      <span className="platform-switch-thumb" aria-hidden="true" />
      <Link
        className={`platform-switch-option ${isMobile ? '' : 'active'}`}
        to="/components/overview"
        aria-current={isMobile ? undefined : 'page'}
      >
        <Icon type="monitor" size={15} color="currentColor" />
        <span>PC 端</span>
      </Link>
      <Link
        className={`platform-switch-option ${isMobile ? 'active' : ''}`}
        to="/components/overview?platform=mobile"
        aria-current={isMobile ? 'page' : undefined}
      >
        <Icon type="smartphone" size={15} color="currentColor" />
        <span>移动端</span>
      </Link>
    </div>
  );
};

export default PlatformSwitch;
