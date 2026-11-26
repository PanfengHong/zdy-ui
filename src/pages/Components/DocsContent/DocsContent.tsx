import type { ReactNode } from 'react';

import './DocsContent.css';

interface DocsContentProps {
  children: ReactNode;
  preview?: ReactNode;
}

// PC 与移动端共用的文档内容区，移动端额外传入 preview
const DocsContent = ({ children, preview }: DocsContentProps) => (
  <div className={`docs-content ${preview ? 'docs-content--with-preview' : ''}`}>
    <div className="docs-content-main">{children}</div>
    {preview && <aside className="docs-content-preview">{preview}</aside>}
  </div>
);

export default DocsContent;
