import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
- Tooltip — ayuda contextual flotante para preguntas del instrumento.
 */
export const tooltipTheme: CustomFlowbiteTheme['tooltip'] = {
  target: 'w-fit',
  animation: 'transition-opacity duration-150',
  arrow: {
    base: 'absolute z-10 h-2 w-2 rotate-45',
    style: {
      dark: 'bg-secondary-900',
      light: 'border-b border-r border-border bg-surface',
      auto: 'bg-secondary-900',
    },
    placement: '-4px',
  },
  base: 'absolute z-30 inline-block max-w-xs rounded-lg px-3 py-2 text-xs font-medium leading-relaxed shadow-card',
  hidden: 'invisible opacity-0',
  style: {
    dark: 'bg-secondary-900 text-white',
    light: 'border border-border bg-surface text-foreground',
    auto: 'bg-secondary-900 text-white',
  },
  content: 'relative z-20',
};