import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

export type ColorTheme = "light" | "dark";

export type ThemeContextState = {
  theme: ColorTheme;
  setTheme: (newTheme: ColorTheme) => void | Dispatch<SetStateAction<ColorTheme>>;
};

export type ThemeProviderProps = PropsWithChildren;
