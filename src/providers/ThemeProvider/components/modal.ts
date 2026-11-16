import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
- Modal — contenedor de diálogo superpuesto del sistema.
- Backdrop con desenfoque sutil y superficie `bg-surface` con borde `border-border`.
- Mantiene jerarquía clara entre encabezado, cuerpo con scroll y pie de acciones.
 */
export const modalTheme: CustomFlowbiteTheme['modal'] = {
  root: {
    base: 'fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
    show: {
      on: 'flex bg-secondary-950/40 backdrop-blur-xs transition-opacity duration-200',
      off: 'hidden',
    },
    sizes: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start',
    },
  },
  content: {
    base: 'relative h-full w-full p-4 md:h-auto',
    inner:
      'relative flex max-h-[90dvh] flex-col rounded-2xl border border-border bg-surface shadow-card',
  },
  header: {
    base: 'flex items-start justify-between rounded-t-2xl border-b border-border px-6 py-4',
    popup: 'border-b-0 p-2',
    title: 'text-lg font-bold tracking-tight text-foreground',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary-200',
      icon: 'h-5 w-5',
    },
  },
  body: {
    base: 'flex-1 overflow-auto p-6 text-sm text-foreground',
    popup: 'pt-0',
  },
  footer: {
    base: 'flex items-center gap-3 rounded-b-2xl border-t border-border bg-surface-2/50 px-6 py-4',
    popup: 'border-t border-border',
  },
};