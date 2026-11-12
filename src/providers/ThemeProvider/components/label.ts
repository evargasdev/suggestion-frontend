import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
- Label — etiqueta de formulario alineada con TextInput, Select y Checkbox.
 */
export const labelTheme: CustomFlowbiteTheme['label'] = {
  root: {
    base: 'text-sm font-medium text-foreground select-none',
    disabled: 'cursor-not-allowed text-muted-2 opacity-75',
    colors: {
      default: 'text-foreground',
      info: 'text-info-800',
      failure: 'text-danger-700',
      warning: 'text-warning-800',
      success: 'text-success-800',
    },
  },
};