import { ref, type Ref, watch } from "vue";

import { THEME_KEY } from "../storage-keys";
import type { Theme } from "../types";
import { applyTheme, getInitialTheme } from "../utils";

const theme = ref<Theme>(getInitialTheme());

applyTheme(theme.value);

watch(theme, (newTheme) => {
  localStorage.setItem(THEME_KEY, newTheme);

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
