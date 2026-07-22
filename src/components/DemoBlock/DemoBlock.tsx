import React, { useState } from 'react';
import './DemoBlock.less';

interface DemoBlockProps {
  title?: string;
  code: string;
  children: React.ReactNode;
}

const DemoBlock: React.FC<DemoBlockProps> = ({ title, code, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="demo-block">
      <div className="demo-block-header">
        {title && <span className="demo-block-title">{title}</span>}
        <button
          className="demo-block-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          &lt;/&gt;
        </button>
      </div>
      <div className="demo-block-body">
        <div className="demo-block-preview">
          {children}
        </div>
        <div className={`demo-block-code ${expanded ? 'expanded' : ''}`}>
          <pre className="demo-block-code-content">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DemoBlock;