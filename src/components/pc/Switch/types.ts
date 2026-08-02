import React from 'react';
import type { BaseComponentProps, SizeType } from '../../../types';

export interface BaseSwitchProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: SizeType;
}
