import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
 * Button — "Caribe operativo"
 * - default (sin color) y `primary`: turquesa identidad de marca.
 * - secondary: azul marino, autoridad.
 * - danger: coral, bloqueante.
 * - light / ghost: superficies suaves para acciones secundarias.
 * Tamaños en una escala 1.2: xs (28) · sm (36) · md (40) · lg (44) · xl (48).
 * Botón de control debe tener al menos 40px de altura (sm y arriba) para hit-area.
 */
export const buttonTheme: CustomFlowbiteTheme['button'] = {
  base: 'group inline-flex items-center justify-center gap-2 rounded-md text-center font-medium tracking-[-0.005em] transition-[background-color,border-color,box-shadow,color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1 focus-visible:ring-offset-background',
  disabled: 'pointer-events-none opacity-50',
  fullSized: 'w-full',
  pill: 'rounded-full',
  grouped:
    'rounded-none border-l-0 first:rounded-s-md first:border-l last:rounded-e-md focus:ring-2',
  size: {
    xs: 'h-7 px-2.5 text-xs',
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
    xl: 'h-12 px-6 text-base',
  },
  color: {
    default:
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    alternative:
      'border border-border bg-surface text-secondary-700 hover:bg-surface-2 hover:text-secondary-900 active:bg-surface-3',
    // Aliases semánticos — sistema "Caribe operativo"
    // Mapean a los tokens visuales correctos, sin divergencias entre las
    // variantes estándar (blue/green/red/etc.) y los nombres del sistema.
    secondary:
      'bg-secondary-700 text-white hover:bg-secondary-800 active:bg-secondary-900',
    success:
      'bg-success-600 text-white hover:bg-success-700 active:bg-success-800',
    warning:
      'bg-warning-500 text-secondary-900 hover:bg-warning-600 hover:text-white active:bg-warning-700 active:text-white',
    danger:
      'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800',
    // Variantes estándar conservadas (compatibilidad hacia atrás)
    blue: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    cyan: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    dark: 'bg-secondary-900 text-white hover:bg-secondary-950 active:bg-secondary-900',
    gray: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
    green:
      'bg-success-600 text-white hover:bg-success-700 active:bg-success-800',
    indigo:
      'bg-primary-800 text-white hover:bg-primary-900 active:bg-primary-900',
    light:
      'border border-border bg-surface text-secondary-700 hover:bg-surface-2 hover:text-secondary-900',
    lime: 'bg-success-500 text-secondary-900 hover:bg-success-600 hover:text-white active:bg-success-700 active:text-white',
    pink: 'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800',
    purple: 'bg-secondary-700 text-white hover:bg-secondary-800 active:bg-secondary-900',
    red: 'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800',
    teal: 'bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900',
    yellow:
      'bg-warning-500 text-secondary-900 hover:bg-warning-600 hover:text-white active:bg-warning-700 active:text-white',
  },
  outlineColor: {
    default:
      'border border-primary-600 text-primary-700 hover:bg-primary-50 hover:text-primary-800 active:bg-primary-100',
    // Aliases semánticos — outline
    secondary:
      'border border-secondary-700 text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900',
    success:
      'border border-success-600 text-success-700 hover:bg-success-50 hover:text-success-800',
    warning:
      'border border-warning-500 text-warning-700 hover:bg-warning-50 hover:text-warning-800',
    danger:
      'border border-danger-600 text-danger-700 hover:bg-danger-50 hover:text-danger-800',
    // Variantes estándar conservadas (compatibilidad hacia atrás)
    blue: 'border border-primary-600 text-primary-700 hover:bg-primary-50 hover:text-primary-800',
    cyan: 'border border-primary-500 text-primary-700 hover:bg-primary-50 hover:text-primary-800',
    dark: 'border border-secondary-900 text-secondary-900 hover:bg-secondary-50 hover:text-secondary-950',
    gray: 'border border-secondary-600 text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900',
    green:
      'border border-success-600 text-success-700 hover:bg-success-50 hover:text-success-800',
    indigo: 'border border-primary-800 text-primary-800 hover:bg-primary-50 hover:text-primary-900',
    lime: 'border border-success-500 text-success-700 hover:bg-success-50 hover:text-success-800',
    pink: 'border border-danger-600 text-danger-700 hover:bg-danger-50 hover:text-danger-800',
    purple: 'border border-secondary-700 text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900',
    red: 'border border-danger-600 text-danger-700 hover:bg-danger-50 hover:text-danger-800',
    teal: 'border border-primary-700 text-primary-700 hover:bg-primary-50 hover:text-primary-800',
    yellow:
      'border border-warning-500 text-warning-700 hover:bg-warning-50 hover:text-warning-800',
    alternative:
      'border border-border bg-surface text-secondary-700 hover:bg-surface-2 hover:text-secondary-900',
    light: 'border border-border bg-surface text-secondary-700 hover:bg-surface-2 hover:text-secondary-900',
  },
};
