import { type Ref, watch } from "vue";

import { THEME_KEY } from "../storage-keys";
import type { Theme } from "../types";
import { applyTheme } from "../utils";

import { useLocalStorage } from "./use-local-storage";

const getDefaultTheme = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const theme = useLocalStorage<Theme>(THEME_KEY, getDefaultTheme());

applyTheme(theme.value);

watch(theme, (newTheme) => {
  applyTheme(newTheme);
});

interface ReturnValue {
  theme: Ref<Theme>;
  toggleTheme: () => void;
}

export const useTheme = (): ReturnValue => {
  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  };

  return {
    theme,
    toggleTheme,
  };
};
