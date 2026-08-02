import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  Children,
  isValidElement,
} from 'react';
import classNames from 'classnames';
import type { AnchorProps, AnchorLinkProps, AnchorLinkBaseProps } from './types';

import './Anchor.less';

// 提取所有链接信息（支持 items 和 children 两种方式）
const collectLinks = (
  items?: AnchorLinkBaseProps[],
  children?: React.ReactNode
): AnchorLinkBaseProps[] => {
  if (items && items.length > 0) return items;

  const links: AnchorLinkBaseProps[] = [];
  if (children) {
    Children.forEach(children, (child) => {
      if (isValidElement<AnchorLinkProps>(child) && (child.type as any)?.displayName === 'AnchorLink') {
        const { href, title, children: linkChildren } = child.props;
        links.push({ href, title, children: linkChildren });
      }
    });
  }
  return links;
};

// 在元素树中递归查找所有 href
const flattenLinks = (links: AnchorLinkBaseProps[]): { href: string; title: React.ReactNode }[] => {
  const result: { href: string; title: React.ReactNode }[] = [];
  const walk = (list: AnchorLinkBaseProps[]) => {
    list.forEach((link) => {
      if (link.href) {
        result.push({ href: link.href, title: link.title });
      }
      if (link.children) {
        // 嵌套链接：从 ReactNode 中提取 AnchorLink
        Children.forEach(link.children, (child) => {
          if (isValidElement<AnchorLinkProps>(child) && (child.type as any)?.displayName === 'AnchorLink') {
            const sub = collectLinks(undefined, child);
            walk(sub);
          }
        });
      }
    });
  };
  walk(links);
  return result;
};

const Anchor: React.FC<AnchorProps> = ({
  items,
  children,
  bounds = 5,
  affix = false,
  showInkInFixed = false,
  getContainer,
  offsetTop = 0,
  offsetBottom,
  direction = 'vertical',
  onChange,
  onClick,
  className = '',
  style,
}) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const [inkTop, setInkTop] = useState<number>(0);
  const [inkVisible, setInkVisible] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // 收集所有链接
  const allLinks = collectLinks(items, children);
  const flatLinks = flattenLinks(allLinks);

  // 获取滚动容器
  const getScrollContainer = useCallback((): HTMLElement | Window => {
    if (getContainer) {
      const c = getContainer();
      if (c) return c;
    }
    return window;
  }, [getContainer]);

  // 注册链接元素引用
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // 更新 ink 位置（线条顶端略上移，对齐文字视觉中心）
  const updateInk = useCallback((href: string) => {
    const linkEl = linkRefs.current[href];
    const wrapper = wrapperRef.current;
    if (!linkEl || !wrapper) return;
    const linkRect = linkEl.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    setInkTop(linkRect.top - wrapperRect.top - 2);
    setInkVisible(true);
  }, []);

  // 滚动监听：找出当前激活的 section
  // 计算目标相对滚动容器内容原点的位置（兼容 window 和 HTMLElement）
  const getTargetTopInContainer = useCallback(
    (target: HTMLElement, container: HTMLElement | Window): number => {
      const targetRect = target.getBoundingClientRect();
      if (container === window) {
        return targetRect.top + (window.scrollY || document.documentElement.scrollTop);
      }
      const containerEl = container as HTMLElement;
      const containerRect = containerEl.getBoundingClientRect();
      return targetRect.top - containerRect.top + containerEl.scrollTop;
    },
    []
  );

  const handleScroll = useCallback(() => {
    const container = getScrollContainer();
    const scrollTop =
      container === window
        ? window.scrollY || document.documentElement.scrollTop
        : (container as HTMLElement).scrollTop;

    // 容器可滚动距离
    const scrollHeight =
      container === window
        ? document.documentElement.scrollHeight
        : (container as HTMLElement).scrollHeight;
    const clientHeight =
      container === window
        ? document.documentElement.clientHeight
        : (container as HTMLElement).clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    // 距离底部小于阈值时直接激活最后一个
    const isNearBottom = scrollTop + 1 >= maxScroll && flatLinks.length > 0;

    let current = '';
    if (isNearBottom) {
      current = flatLinks[flatLinks.length - 1].href;
    } else {
      for (const link of flatLinks) {
        const target = document.querySelector(link.href) as HTMLElement | null;
        if (!target) continue;
        const top = getTargetTopInContainer(target, container);
        // 当 section 顶部进入视口上方 bounds 像素内时激活
        if (scrollTop + bounds >= top - offsetTop) {
          current = link.href;
        } else {
          break;
        }
      }
    }

    if (current && current !== activeLink) {
      setActiveLink(current);
      onChange?.(current);
      updateInk(current);
    } else if (!current && activeLink) {
      setActiveLink('');
    }
  }, [flatLinks, bounds, offsetTop, activeLink, onChange, updateInk, getScrollContainer, getTargetTopInContainer]);

  // 点击链接：平滑滚动到目标
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, title: React.ReactNode) => {
      e.preventDefault();
      onClick?.(e, { href, title });

      const target = document.querySelector(href) as HTMLElement | null;
      if (!target) return;

      const container = getScrollContainer();
      const top = getTargetTopInContainer(target, container) - offsetTop;

      if (container === window) {
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        (container as HTMLElement).scrollTo({ top, behavior: 'smooth' });
      }

      setActiveLink(href);
      onChange?.(href);
      updateInk(href);
    },
    [onClick, onChange, updateInk, offsetTop, getScrollContainer, getTargetTopInContainer]
  );

  // 注册滚动事件
  useEffect(() => {
    const container = getScrollContainer();
    container.addEventListener('scroll', handleScroll, { passive: true });
    // 初始化激活第一个
    handleScroll();
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [getScrollContainer, handleScroll]);

  // 窗口尺寸变化时重新计算
  useEffect(() => {
    const onResize = () => {
      if (activeLink) updateInk(activeLink);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeLink, updateInk]);

  // 初次渲染后定位 ink
  useLayoutEffect(() => {
    if (activeLink) updateInk(activeLink);
  }, [activeLink, updateInk]);

  // 递归渲染链接节点（支持嵌套）
  const renderLinks = (links: AnchorLinkBaseProps[], level = 0): React.ReactNode => {
    return links.map((link, index) => {
      const { href = '', title, children: linkChildren } = link;
      const isActive = activeLink === href;

      // 提取嵌套的 AnchorLink
      const nestedLinks: AnchorLinkBaseProps[] = [];
      if (linkChildren) {
        Children.forEach(linkChildren, (child) => {
          if (isValidElement<AnchorLinkProps>(child) && (child.type as any)?.displayName === 'AnchorLink') {
            nestedLinks.push({
              href: child.props.href,
              title: child.props.title,
              children: child.props.children,
            });
          }
        });
      }

      return (
        <div
          key={href || index}
          className={classNames('zdy-anchor-link', {
            'zdy-anchor-link--active': isActive,
            'zdy-anchor-link--nested': level > 0,
          })}
        >
          <a
            ref={(el) => {
              linkRefs.current[href] = el;
            }}
            href={href}
            title={typeof title === 'string' ? title : undefined}
            onClick={(e) => handleLinkClick(e, href, title)}
          >
            {title}
          </a>
          {nestedLinks.length > 0 && (
            <div className="zdy-anchor-link-children">
              {renderLinks(nestedLinks, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const classes = classNames(
    'zdy-anchor',
    `zdy-anchor--${direction}`,
    {
      'zdy-anchor--affix': affix,
      'zdy-anchor--ink-fixed': showInkInFixed,
    },
    className
  );

  const wrapperStyle: React.CSSProperties = { ...style };
  if (affix) {
    wrapperStyle.position = 'fixed';
    if (offsetTop !== undefined) wrapperStyle.top = offsetTop;
    if (offsetBottom !== undefined) wrapperStyle.bottom = offsetBottom;
  }

  return (
    <div className={classes} style={wrapperStyle} ref={wrapperRef}>
      <div className="zdy-anchor-ink">
        <span
          className="zdy-anchor-ink-ball"
          style={{ top: inkTop, opacity: inkVisible ? 1 : 0 }}
        />
      </div>
      <div className="zdy-anchor-list">{renderLinks(allLinks)}</div>
    </div>
  );
};

// AnchorLink 子组件（实际渲染由 Anchor 控制）
const AnchorLink: React.FC<AnchorLinkProps> = ({ children }) => {
  return <>{children}</>;
};
AnchorLink.displayName = 'AnchorLink';

type AnchorType = typeof Anchor & {
  AnchorLink: typeof AnchorLink;
};

const AnchorWithLink = Anchor as AnchorType;
AnchorWithLink.AnchorLink = AnchorLink;

export default AnchorWithLink;
