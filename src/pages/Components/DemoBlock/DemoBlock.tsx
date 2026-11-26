import React, { useState } from 'react';
import './DemoBlock.less';

interface DemoBlockProps {
  title?: string;
  code: string;
  children: React.ReactNode;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Single-pass tokenizer — each character is matched at most once, so no
// overlapping replacements that would corrupt the HTML structure.
function highlightCode(code: string): string {
  const tokenRegex =
    /(\{\/\*[\s\S]*?\*\/\})|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(<\/?[A-Za-z][\w.]*|\/?>)|([a-zA-Z_][\w-]*)(?==)|([{}])/g;

  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      result += escapeHtml(code.substring(lastIndex, match.index));
    }

    const [full, comment, str, tag, attr, brace] = match;
    const escaped = escapeHtml(full);

    if (comment) {
      result += `<span class="tok-comment">${escaped}</span>`;
    } else if (str) {
      result += `<span class="tok-string">${escaped}</span>`;
    } else if (tag) {
      result += `<span class="tok-tag">${escaped}</span>`;
    } else if (attr) {
      result += `<span class="tok-attr">${escaped}</span>`;
    } else if (brace) {
      result += `<span class="tok-brace">${escaped}</span>`;
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < code.length) {
    result += escapeHtml(code.substring(lastIndex));
  }

  return result;
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
            <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DemoBlock;
