import type { Theme } from "../types";

export const applyTheme = (theme: Theme): void => {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
};
