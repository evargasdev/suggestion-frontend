import type { CustomFlowbiteTheme } from 'flowbite-react/types';

/*
 * Card — superficie principal del sistema.
 * Borde sutil (border-2 ~ rgba 0.04), sombra apilada de 3 capas — el sello
 * de elevación del sistema. Radio medio (16px) para jerarquía clara.
 * `children` hereda padding-6 que respeta ratio interior.
 */
export const accordionTheme: CustomFlowbiteTheme['accordion'] = {
  "root": {
    "base": "divide-y divide-border border-border",
    "flush": {
      "off": "rounded-lg border",
      "on": "border-b"
    }
  },
  "content": {
    "base": "p-5 first:rounded-t-lg last:rounded-b-lg"
  },
  "title": {
    "arrow": {
      "base": "h-6 w-6 shrink-0",
      "open": {
        "off": "",
        "on": "rotate-180"
      }
    },
    "base": "flex w-full items-center justify-between p-5 text-left font-medium text-muted first:rounded-t-lg last:rounded-b-lg",
    "flush": {
      "off": "hover:bg-surface-2 focus:ring-4 focus:ring-primary-200",
      "on": "bg-transparent"
    },
    "heading": "",
    "open": {
      "off": "",
      "on": "bg-surface-2 text-foreground"
    }
  }
}