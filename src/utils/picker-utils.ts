// DatePicker / TimePicker / DateTimePicker 共享工具函数

export const pad = (n: number): string => String(n).padStart(2, '0');

export const cloneDate = (d: Date): Date => new Date(d.getTime());

export const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
};

export const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const isToday = (d: Date): boolean => isSameDay(d, new Date());

export const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];
export const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

// 格式化日期，支持 token: YYYY MM DD HH mm ss
export const formatDate = (date: Date | null, format: string): string => {
  if (!date) return '';
  return format
    .replace('YYYY', String(date.getFullYear()))
    .replace('MM', pad(date.getMonth() + 1))
    .replace('DD', pad(date.getDate()))
    .replace('HH', pad(date.getHours()))
    .replace('mm', pad(date.getMinutes()))
    .replace('ss', pad(date.getSeconds()));
};

// 按格式解析字符串为 Date，失败返回 null
export const parseDate = (str: string, format: string): Date | null => {
  if (!str) return null;
  const tokenOrder: string[] = [];
  let regexStr = format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, (m) => {
    tokenOrder.push(m);
    return '(\\d+)';
  });
  regexStr = regexStr.replace(/[-\s:/]/g, '\\$&');
  const match = new RegExp('^' + regexStr + '$').exec(str);
  if (!match) return null;
  const vals: Record<string, number> = {};
  tokenOrder.forEach((tok, i) => {
    vals[tok] = parseInt(match[i + 1], 10);
  });
  const now = new Date();
  const d = new Date(
    vals['YYYY'] ?? now.getFullYear(),
    (vals['MM'] ?? 1) - 1,
    vals['DD'] ?? 1,
    vals['HH'] ?? 0,
    vals['mm'] ?? 0,
    vals['ss'] ?? 0
  );
  return isNaN(d.getTime()) ? null : d;
};

// 获取月视图 6x7 日期网格
export const getMonthDates = (viewDate: Date): Date[] => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const startDate = new Date(year, month, 1 - firstDayOfWeek);
  const dates: Date[] = [];
  for (let i = 0; i < 42; i++) {
    dates.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
  }
  return dates;
};
