import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
 * Select — debe empatar con TextInput: misma superficie inset y mismo foco.
 * Estructura completa para soportar `icon` y los Boolean slots.
 */
export const selectTheme: CustomFlowbiteTheme['select'] = {
  base: 'flex',
  addon:
    'inline-flex items-center rounded-l-md border border-r-0 border-border bg-surface-2 px-3 text-sm text-muted',
  field: {
    base: 'relative w-full',
    icon: {
      base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
      svg: 'h-4 w-4 text-muted',
    },
    select: {
      base: 'block w-full appearance-none rounded-md border bg-surface-2 pr-9 text-sm text-foreground placeholder:text-muted-2 transition-colors duration-150 focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-muted-2 disabled:opacity-100',
      colors: {
        gray: 'border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:bg-surface',
        info: 'border-info-500 bg-info-50 text-info-900 focus:border-info-500 focus:ring-2 focus:ring-info-200',
        failure:
          'border-danger-500 bg-danger-50 text-danger-900 focus:border-danger-600 focus:ring-2 focus:ring-danger-200',
        warning:
          'border-warning-500 bg-warning-50 text-warning-900 focus:border-warning-500 focus:ring-2 focus:ring-warning-200',
        success:
          'border-success-500 bg-success-50 text-success-900 focus:border-success-500 focus:ring-2 focus:ring-success-200',
        default:
          'border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:bg-surface',
      },
      sizes: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-3.5 text-sm',
        lg: 'h-11 px-4 text-base',
      },
      withIcon: {
        on: 'pl-10',
        off: '',
      },
      withAddon: {
        on: 'rounded-r-md',
        off: 'rounded-md',
      },
      withShadow: {
        on: 'shadow-card',
        off: '',
      },
    },
  },
};
