import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
- Badge — indicador compacto de categoría, dimensión o estado.
- Usa fondos tintados suaves con borde sutil y tipografía semibold.
 */
export const badgeTheme: CustomFlowbiteTheme['badge'] = {
  root: {
    base: 'inline-flex h-fit items-center gap-1.5 font-semibold transition-colors duration-150',
    color: {
      default:
        'border border-primary-200/80 bg-primary-50 text-primary-900',
      purple:
        'border border-primary-200/80 bg-primary-100/80 text-primary-900',
      gray: 'border border-border bg-surface-2 text-muted',
      info: 'border border-info-200 bg-info-50 text-info-900',
      success: 'border border-success-200 bg-success-50 text-success-900',
      failure: 'border border-danger-200 bg-danger-50 text-danger-900',
      warning: 'border border-warning-200 bg-warning-50 text-warning-900',
    },
    size: {
      xs: 'rounded-md px-2 py-0.5 text-xs',
      sm: 'rounded-full px-3 py-1 text-xs',
    },
  },
  icon: {
    off: '',
    on: 'rounded-full p-1',
    size: {
      xs: 'h-3 w-3',
      sm: 'h-3.5 w-3.5',
    },
  },
};