// 文档示例代码语法高亮：把 TSX / JS 代码转换成带 token 类名的 HTML 字符串。
// 单次扫描，每个字符最多匹配一次，避免多轮替换互相破坏已生成的标签结构。

const KEYWORDS = new Set([
  'import',
  'from',
  'export',
  'default',
  'const',
  'let',
  'var',
  'function',
  'return',
  'if',
  'else',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'break',
  'continue',
  'new',
  'class',
  'extends',
  'async',
  'await',
  'try',
  'catch',
  'finally',
  'throw',
  'typeof',
  'instanceof',
  'in',
  'of',
  'this',
  'super',
  'delete',
  'yield',
  'interface',
  'type',
  'enum',
  'implements',
  'readonly',
  'public',
  'private',
  'protected',
  'as'
]);

const LITERALS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'void']);

// 匹配顺序：注释 → 字符串 → JSX 标签 → 属性名（后跟 =）→ 标识符 → 数字 → 标点
const TOKEN_REGEX =
  /(\{\/\*[\s\S]*?\*\/\}|\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.-]*)|([A-Za-z_$][\w$]*)(?==)|([A-Za-z_$][\w$]*)|(\d+(?:\.\d+)?)|(=>|<\/?|\/?>|[{}()[\],;:.=+*/!?&|<>-])/g;

export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function highlightCode(code: string): string {
  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    if (match.index > lastIndex) {
      result += escapeHtml(code.slice(lastIndex, match.index));
    }

    const [full, comment, str, tag, attr, word, num, punct] = match;
    const escaped = escapeHtml(full);
    let className = '';

    if (comment) {
      className = 'tok-comment';
    } else if (str) {
      className = 'tok-string';
    } else if (tag) {
      className = 'tok-tag';
    } else if (attr) {
      className = 'tok-attr';
    } else if (word) {
      if (KEYWORDS.has(word)) {
        className = 'tok-keyword';
      } else if (LITERALS.has(word)) {
        className = 'tok-literal';
      } else {
        // 标识符后紧跟 ( 视为函数调用，紧跟 : 视为对象键
        const rest = code.slice(match.index + word.length);
        if (/^\s*\(/.test(rest)) {
          className = 'tok-function';
        } else if (/^\s*:/.test(rest)) {
          className = 'tok-property';
        }
      }
    } else if (num) {
      className = 'tok-number';
    } else if (punct) {
      className = 'tok-punct';
    }

    result += className ? `<span class="${className}">${escaped}</span>` : escaped;
    lastIndex = match.index + full.length;
  }

  if (lastIndex < code.length) {
    result += escapeHtml(code.slice(lastIndex));
  }

  return result;
}
