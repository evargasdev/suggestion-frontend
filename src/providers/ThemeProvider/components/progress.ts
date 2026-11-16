import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
- Progress — barra de avance del cuestionario.
- Pista en `bg-surface-2` con borde sutil y relleno suavizado en `primary` / `purple`.
 */
export const progressTheme: CustomFlowbiteTheme['progress'] = {
  base: 'w-full overflow-hidden rounded-full border border-border/60 bg-surface-2',
  label: 'mb-1 flex justify-between text-xs font-semibold text-foreground',
  bar: 'flex items-center justify-center rounded-full text-center font-medium leading-none text-white transition-all duration-300 ease-out',
  color: {
    default: 'bg-primary-600',
    purple: 'bg-primary-700',
    dark: 'bg-foreground',
    gray: 'bg-muted',
    green: 'bg-success-600',
    red: 'bg-danger-600',
    yellow: 'bg-warning-500',
  },
  size: {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
    xl: 'h-6',
  },
};