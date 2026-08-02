import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import type { ColorPickerProps, ColorInfo, ColorPickerFormat } from './types';
import Icon from '../Icon/Icon';

import './ColorPicker.less';

// ============ 颜色转换工具函数 ============
export interface RGB { r: number; g: number; b: number; a: number; }
export interface HSB { h: number; s: number; b: number; a: number; }

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// hex -> rgb
function hexToRgb(hex: string): RGB {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  if (h.length === 8) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = Math.round(parseInt(h.slice(6, 8), 16) / 255 * 100) / 100;
    return { r: r || 0, g: g || 0, b: b || 0, a: isNaN(a) ? 1 : a };
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r: r || 0, g: g || 0, b: b || 0, a: 1 };
}

// rgb -> hex
function rgbToHex({ r, g, b, a }: RGB): string {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  const base = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) {
    return base + toHex(Math.round(a * 255));
  }
  return base;
}

// rgb -> hsb
function rgbToHsb({ r, g, b, a }: RGB): HSB {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rN) {
      h = ((gN - bN) / d) % 6;
    } else if (max === gN) {
      h = (bN - rN) / d + 2;
    } else {
      h = (rN - gN) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h: Math.round(h), s: Math.round(s * 100), b: Math.round(max * 100), a };
}

// hsb -> rgb
function hsbToRgb({ h, s, b, a }: HSB): RGB {
  const sN = s / 100;
  const bN = b / 100;
  const c = bN * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = bN - c;
  let r = 0, g = 0, bl = 0;
  if (h < 60) { r = c; g = x; bl = 0; }
  else if (h < 120) { r = x; g = c; bl = 0; }
  else if (h < 180) { r = 0; g = c; bl = x; }
  else if (h < 240) { r = 0; g = x; bl = c; }
  else if (h < 300) { r = x; g = 0; bl = c; }
  else { r = c; g = 0; bl = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((bl + m) * 255),
    a,
  };
}

// 解析任意颜色字符串为 RGB
function parseColor(color: string): RGB {
  if (!color) return { r: 0, g: 0, b: 0, a: 1 };
  const c = color.trim();
  // hex
  if (c.startsWith('#')) {
    return hexToRgb(c);
  }
  // rgb/rgba
  const rgbMatch = c.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(',').map((p) => parseFloat(p.trim()));
    return {
      r: parts[0] || 0,
      g: parts[1] || 0,
      b: parts[2] || 0,
      a: parts.length > 3 ? clamp(parts[3], 0, 1) : 1,
    };
  }
  // hsb/hsla
  const hsbMatch = c.match(/^hs[bv]a?\(([^)]+)\)$/i);
  if (hsbMatch) {
    const parts = hsbMatch[1].split(',').map((p) => parseFloat(p.trim()));
    const hsb: HSB = {
      h: parts[0] || 0,
      s: parts[1] || 0,
      b: parts[2] || 0,
      a: parts.length > 3 ? clamp(parts[3], 0, 1) : 1,
    };
    return hsbToRgb(hsb);
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

// 根据格式输出颜色字符串
function formatColor(rgb: RGB, format: ColorPickerFormat): string {
  if (format === 'hex') {
    return rgbToHex(rgb);
  }
  if (format === 'rgb') {
    const { r, g, b, a } = rgb;
    return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
  }
  // hsb
  const hsb = rgbToHsb(rgb);
  const { h, s, b, a } = hsb;
  return a < 1 ? `hsba(${h}, ${s}%, ${b}%, ${a})` : `hsb(${h}, ${s}%, ${b}%)`;
}

// 棋盘格背景（用于透明度展示）
const checkerBg =
  'linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%)';

interface InternalColor {
  rgb: RGB;
  hsb: HSB;
}

const buildColor = (rgb: RGB): InternalColor => ({
  rgb,
  hsb: rgbToHsb(rgb),
});

// 默认预设色板
const DEFAULT_PRESETS = [
  {
    label: '推荐色',
    colors: [
      '#f5222d', '#fa8c16', '#faad14', '#fadb14',
      '#a0d911', '#52c41a', '#13c2c2', '#1890ff',
      '#2f54eb', '#722ed1', '#eb2f96', '#eb2f96',
    ],
  },
  {
    label: '中性色',
    colors: [
      '#000000', '#333333', '#666666', '#999999',
      '#cccccc', '#dddddd', '#eeeeee', '#f5f5f5',
      '#fafafa', '#ffffff',
    ],
  },
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  value: valueProp,
  defaultValue = '#1677ff',
  format = 'hex',
  disabled = false,
  disabledAlpha = false,
  showText = false,
  presets,
  size = 'medium',
  allowClear = false,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  onChange,
  onClear,
  className = '',
  style,
}) => {
  const isControlled = valueProp !== undefined;
  const isOpenControlled = openProp !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 当前颜色（基于 value 字符串解析）
  const currentColorStr = isControlled ? valueProp! : internalValue;
  const [editColor, setEditColor] = useState<InternalColor>(() => buildColor(parseColor(currentColorStr)));

  // 当外部值变化时同步内部编辑状态
  useEffect(() => {
    setEditColor(buildColor(parseColor(currentColorStr)));
  }, [currentColorStr]);

  // 受控 open 同步
  useEffect(() => {
    if (isOpenControlled) {
      setOpen(openProp!);
    }
  }, [openProp, isOpenControlled]);

  // 计算下拉位置
  const updateDropdownPosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownWidth = 234;
    const dropdownHeight = 320;
    let top = rect.bottom + 4;
    let left = rect.left;
    if (top + dropdownHeight > window.innerHeight) {
      top = rect.top - dropdownHeight - 4;
    }
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth;
    }
    setDropdownStyle({
      position: 'absolute',
      top: top + window.scrollY,
      left: left + window.scrollX,
      width: dropdownWidth,
    });
  }, []);

  useEffect(() => {
    if (open) {
      updateDropdownPosition();
      window.addEventListener('resize', updateDropdownPosition);
    }
    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [open, updateDropdownPosition]);

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        toggleOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggleOpen = (next: boolean) => {
    if (!isOpenControlled) setOpen(next);
    onOpenChange?.(next);
  };

  // 提交颜色变化
  const commit = useCallback((color: InternalColor) => {
    const output = formatColor(color.rgb, format);
    if (!isControlled) {
      setInternalValue(output);
    }
    const info: ColorInfo = {
      hex: rgbToHex(color.rgb),
      rgb: { ...color.rgb },
      hsb: { ...color.hsb },
    };
    onChange?.(output, info);
  }, [format, isControlled, onChange]);

  // SV 面板交互
  const svRef = useRef<HTMLDivElement>(null);
  const [draggingSV, setDraggingSV] = useState(false);

  const handleSVChange = useCallback((clientX: number, clientY: number) => {
    const el = svRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((clientY - rect.top) / rect.height, 0, 1);
    const next: InternalColor = {
      rgb: { ...editColor.rgb },
      hsb: {
        ...editColor.hsb,
        s: Math.round(x * 100),
        b: Math.round((1 - y) * 100),
      },
    };
    next.rgb = hsbToRgb(next.hsb);
    setEditColor(next);
    commit(next);
  }, [editColor, commit]);

  const handleSVMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setDraggingSV(true);
    handleSVChange(e.clientX, e.clientY);
  };

  useEffect(() => {
    if (!draggingSV) return;
    const onMove = (e: MouseEvent) => handleSVChange(e.clientX, e.clientY);
    const onUp = () => setDraggingSV(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [draggingSV, handleSVChange]);

  // Hue 滑块交互
  const hueRef = useRef<HTMLDivElement>(null);
  const [draggingHue, setDraggingHue] = useState(false);

  const handleHueChange = useCallback((clientX: number) => {
    const el = hueRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 1);
    const next: InternalColor = {
      rgb: { ...editColor.rgb },
      hsb: { ...editColor.hsb, h: Math.round(x * 360) },
    };
    next.rgb = hsbToRgb(next.hsb);
    setEditColor(next);
    commit(next);
  }, [editColor, commit]);

  const handleHueMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    setDraggingHue(true);
    handleHueChange(e.clientX);
  };

  useEffect(() => {
    if (!draggingHue) return;
    const onMove = (e: MouseEvent) => handleHueChange(e.clientX);
    const onUp = () => setDraggingHue(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [draggingHue, handleHueChange]);

  // Alpha 滑块交互
  const alphaRef = useRef<HTMLDivElement>(null);
  const [draggingAlpha, setDraggingAlpha] = useState(false);

  const handleAlphaChange = useCallback((clientX: number) => {
    const el = alphaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 1);
    const a = Math.round(x * 100) / 100;
    const next: InternalColor = {
      rgb: { ...editColor.rgb, a },
      hsb: { ...editColor.hsb, a },
    };
    setEditColor(next);
    commit(next);
  }, [editColor, commit]);

  const handleAlphaMouseDown = (e: React.MouseEvent) => {
    if (disabled || disabledAlpha) return;
    e.stopPropagation();
    setDraggingAlpha(true);
    handleAlphaChange(e.clientX);
  };

  useEffect(() => {
    if (!draggingAlpha) return;
    const onMove = (e: MouseEvent) => handleAlphaChange(e.clientX);
    const onUp = () => setDraggingAlpha(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [draggingAlpha, handleAlphaChange]);

  // 输入框值
  const [hexInput, setHexInput] = useState<string>(rgbToHex(editColor.rgb).replace('#', ''));
  useEffect(() => {
    setHexInput(rgbToHex(editColor.rgb).replace('#', ''));
  }, [editColor]);

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 8);
    setHexInput(v);
  };

  const handleHexBlur = () => {
    const full = hexInput.length === 3 || hexInput.length === 6 || hexInput.length === 8;
    if (full) {
      const rgb = hexToRgb(hexInput);
      const next = buildColor(rgb);
      setEditColor(next);
      commit(next);
    } else {
      setHexInput(rgbToHex(editColor.rgb).replace('#', ''));
    }
  };

  const handlePresetClick = (color: string) => {
    const rgb = parseColor(color);
    const next = buildColor(rgb);
    setEditColor(next);
    commit(next);
  };

  const handleClear = () => {
    onClear?.();
    toggleOpen(false);
  };

  // 触发器显示的色块
  const triggerColorStr = useMemo(() => formatColor(editColor.rgb, 'hex'), [editColor]);
  const svPanelBackground = `hsl(${editColor.hsb.h}, 100%, 50%)`;
  const alphaGradient = `linear-gradient(to right, rgba(${editColor.rgb.r},${editColor.rgb.g},${editColor.rgb.b},0), rgb(${editColor.rgb.r},${editColor.rgb.g},${editColor.rgb.b}))`;

  const displayText = formatColor(editColor.rgb, format);

  const presetData = presets && presets.length > 0 ? presets : DEFAULT_PRESETS;

  const dropdown = open ? (
    <div ref={dropdownRef} className="zdy-color-picker-dropdown" style={dropdownStyle}>
      {/* SV 面板 */}
      <div
        ref={svRef}
        className="zdy-color-picker-sv"
        style={{ background: svPanelBackground }}
        onMouseDown={handleSVMouseDown}
      >
        <div className="zdy-color-picker-sv-white" />
        <div className="zdy-color-picker-sv-dark" />
        <div
          className="zdy-color-picker-sv-cursor"
          style={{
            left: `${editColor.hsb.s}%`,
            top: `${100 - editColor.hsb.b}%`,
          }}
        />
      </div>

      {/* 预览 + Hex 输入 */}
      <div className="zdy-color-picker-preview">
        <div className="zdy-color-picker-preview-color" style={{ background: triggerColorStr }} />
        <div className="zdy-color-picker-hex-wrap">
          <span className="zdy-color-picker-hex-prefix">#</span>
          <input
            className="zdy-color-picker-hex-input"
            value={hexInput.toUpperCase()}
            onChange={handleHexInput}
            onBlur={handleHexBlur}
            onKeyDown={(e) => { if (e.key === 'Enter') handleHexBlur(); }}
          />
        </div>
      </div>

      {/* Hue 滑块 */}
      <div className="zdy-color-picker-slider">
        <div
          ref={hueRef}
          className="zdy-color-picker-hue"
          onMouseDown={handleHueMouseDown}
        >
          <div
            className="zdy-color-picker-slider-handle"
            style={{ left: `${(editColor.hsb.h / 360) * 100}%` }}
          />
        </div>
      </div>

      {/* Alpha 滑块 */}
      {!disabledAlpha && (
        <div className="zdy-color-picker-slider">
          <div
            ref={alphaRef}
            className="zdy-color-picker-alpha"
            style={{ background: alphaGradient }}
            onMouseDown={handleAlphaMouseDown}
          >
            <div className="zdy-color-picker-alpha-checker" style={{ backgroundImage: checkerBg, backgroundSize: '8px 8px' }} />
            <div
              className="zdy-color-picker-slider-handle"
              style={{ left: `${editColor.rgb.a * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 预设色板 */}
      <div className="zdy-color-picker-presets">
        {presetData.map((group, gi) => (
          <div key={gi} className="zdy-color-picker-presets-group">
            <div className="zdy-color-picker-presets-label">{group.label}</div>
            <div className="zdy-color-picker-presets-colors">
              {group.colors.map((c, ci) => (
                <div
                  key={ci}
                  className="zdy-color-picker-presets-color"
                  style={{ background: c }}
                  onClick={() => handlePresetClick(c)}
                  title={c}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 底部操作 */}
      {(allowClear || showText) && (
        <div className="zdy-color-picker-footer">
          {showText && <span className="zdy-color-picker-footer-text">{displayText}</span>}
          {allowClear && (
            <button
              type="button"
              className="zdy-color-picker-clear-btn"
              onClick={handleClear}
            >
              清除
            </button>
          )}
        </div>
      )}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className={classNames(
          'zdy-color-picker',
          `zdy-color-picker--${size}`,
          { 'zdy-color-picker--disabled': disabled },
          { 'zdy-color-picker--open': open },
          className
        )}
        style={style}
      >
        <div
          className="zdy-color-picker-trigger"
          onClick={() => !disabled && toggleOpen(!open)}
        >
          <span className="zdy-color-picker-trigger-block" style={{ background: triggerColorStr }} />
          {showText && <span className="zdy-color-picker-trigger-text">{displayText}</span>}
          <span className="zdy-color-picker-trigger-arrow">
            <Icon type="down" size={12} color="currentColor" />
          </span>
        </div>
      </div>
      {dropdown && typeof window !== 'undefined' && ReactDOM.createPortal(dropdown, document.body)}
    </>
  );
};

export default ColorPicker;
