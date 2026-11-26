import type { ReactNode } from 'react';

import './IPhoneFrame.css';

interface IPhoneFrameProps {
  children: ReactNode;
}

// iPhone 17 Pro 外观预览框
const IPhoneFrame = ({ children }: IPhoneFrameProps) => (
  <div className="iphone-frame">
    <span className="iphone-side-button iphone-side-button--volume-up" />
    <span className="iphone-side-button iphone-side-button--volume-down" />
    <span className="iphone-side-button iphone-side-button--power" />
    <div className="iphone-screen">
      <div className="iphone-statusbar">
        <span className="iphone-time">9:41</span>
        <span className="iphone-island">
          <i className="iphone-camera" />
        </span>
        <span className="iphone-status-icons">●●●</span>
      </div>
      <div className="iphone-content">{children}</div>
      <span className="iphone-home-indicator" />
    </div>
  </div>
);

export default IPhoneFrame;
