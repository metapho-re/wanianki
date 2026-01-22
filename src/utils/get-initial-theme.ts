import { THEME_KEY } from "../storage-keys";
import type { Theme } from "../types";

export const getInitialTheme = (): Theme => {
  const persistedThemeValue = localStorage.getItem(THEME_KEY);

  if (persistedThemeValue === "light" || persistedThemeValue === "dark") {
    return persistedThemeValue;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};
