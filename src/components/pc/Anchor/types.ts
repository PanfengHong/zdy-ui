import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface AnchorLinkBaseProps {
  href?: string;
  target?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export interface AnchorLinkProps extends AnchorLinkBaseProps, BaseComponentProps {}

export interface AnchorProps extends BaseComponentProps {
  prefixCls?: string;
  bounds?: number;
  affix?: boolean;
  showInkInFixed?: boolean;
  getContainer?: () => HTMLElement | Window | null;
  offsetTop?: number;
  offsetBottom?: number;
  items?: AnchorLinkBaseProps[];
  direction?: 'vertical' | 'horizontal';
  onChange?: (currentLink: string) => void;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { title: React.ReactNode; href: string }
  ) => void;
}
