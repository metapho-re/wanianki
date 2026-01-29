import { type Ref, watch } from "vue";

import { THEME_KEY } from "../storage-keys";
import type { Theme } from "../types";
import { applyTheme } from "../utils";

import { useLocalStorage } from "./use-local-storage";

const theme = useLocalStorage<Theme>(
  THEME_KEY,
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
);

applyTheme(theme.value);

watch(theme, (newTheme) => {
  applyTheme(newTheme);
});

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
};

interface ReturnValue {
  theme: Ref<Theme>;
  toggleTheme: () => void;
}

export const useTheme = (): ReturnValue => ({
  theme,
  toggleTheme,
});
