import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
 * Card — superficie principal del sistema.
 * Borde sutil (border-2 ~ rgba 0.04), sombra apilada de 3 capas — el sello
 * de elevación del sistema. Radio medio (16px) para jerarquía clara.
 * `children` hereda padding-6 que respeta ratio interior.
 */
export const cardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    base: 'flex rounded-lg border border-border bg-surface shadow-card',
    children: 'flex h-full flex-col gap-3 p-6',
    horizontal: {
      off: 'flex-col',
      on: 'flex-col sm:max-w-xl sm:flex-row',
    },
    href: 'hover:bg-surface-2',
  },
  img: {
    base: '',
    horizontal: {
      off: 'rounded-t-lg',
      on: 'h-96 w-full rounded-t-lg object-cover sm:h-auto sm:w-48 sm:rounded-none sm:rounded-l-lg',
    },
  },
};
