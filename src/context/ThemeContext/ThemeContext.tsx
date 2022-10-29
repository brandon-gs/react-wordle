import { createContext, FC, useState, useLayoutEffect } from "react";
import { getInitialTheme } from "./ThemeContext.helpers";
import type { ColorTheme, ThemeContextState, ThemeProviderProps } from "./ThemeContext.types";

export const ThemeContext = createContext<ThemeContextState>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  const updateTheme = (newTheme: ColorTheme) => {
    const root = window.document.documentElement;
    const isDark = newTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(newTheme);

    localStorage.setItem("color-theme", newTheme);
  };

  useLayoutEffect(() => {
    updateTheme(theme);
  }, [theme]);

  /**
   * Allow sync theme between different tabs on the same browser
   */
  useLayoutEffect(() => {
    const listenerTheme = () => {
      const storageTheme = getInitialTheme();
      updateTheme(storageTheme);
    };
    window.addEventListener("storage", listenerTheme);
    return () => {
      window.removeEventListener("storage", listenerTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
