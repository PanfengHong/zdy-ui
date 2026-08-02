import React from 'react';
import type { BaseComponentProps } from '../../../types';

export interface BreadcrumbItemProps extends BaseComponentProps {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  icon?: React.ReactNode;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
}

export interface BreadcrumbProps extends BaseComponentProps {
  separator?: React.ReactNode;
  items?: { title: React.ReactNode; href?: string; icon?: React.ReactNode; onClick?: () => void }[];
  children?: React.ReactNode;
}
