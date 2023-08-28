import { ReactElement } from 'react';

export interface InputOption {
  label?: string;
  value: string;
  id: string;
  selected?: boolean;
  children?: ReactElement;
  sortIndex?: number;
}
