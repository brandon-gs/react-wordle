import type { ColorTheme } from "./ThemeContext.types";

export const getInitialTheme = (): ColorTheme => {
  const isOnClient = typeof window !== "undefined" && window.localStorage;

  if (isOnClient) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    const hasStoredPrefs = storedPrefs === "dark" || storedPrefs === "light";
    if (hasStoredPrefs) {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
};
