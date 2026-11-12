import type { CustomFlowbiteTheme } from "flowbite-react/types";

/*
- Radio — empatado con Checkbox y Select: borde sutil, anillo de foco primario y estados semánticos.
 */
export const radioTheme: CustomFlowbiteTheme["radio"] = {
  base: "h-4 w-4 appearance-none rounded-full border border-r-0 bg-surface-2 bg-center bg-no-repeat transition-colors duration-150 checked:border-transparent checked:bg-current focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:border-border-2 disabled:bg-surface-3 disabled:opacity-100",
  color: {
    default:
      "text-primary-600 hover:border-primary-400 focus:border-primary-500 focus:ring-primary-200 checked:hover:bg-primary-700",
    gray: "text-secondary-700 hover:border-secondary-400 focus:border-secondary-500 focus:ring-secondary-200 checked:hover:bg-secondary-800",
    info: "text-info-600 hover:border-info-400 focus:border-info-500 focus:ring-info-200 checked:hover:bg-info-700",
    failure:
      "text-danger-600 border-danger-300 bg-danger-50 hover:border-danger-500 focus:border-danger-500 focus:ring-danger-200 checked:hover:bg-danger-700",
    warning:
      "text-warning-600 hover:border-warning-400 focus:border-warning-500 focus:ring-warning-200 checked:hover:bg-warning-700",
    success:
      "text-success-600 hover:border-success-400 focus:border-success-500 focus:ring-success-200 checked:hover:bg-success-700",
    purple:
      "text-primary-600 hover:border-primary-400 focus:border-primary-500 focus:ring-primary-200 checked:hover:bg-primary-700",
  },
};
