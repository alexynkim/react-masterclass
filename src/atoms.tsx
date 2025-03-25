import { DefaultTheme } from "styled-components/dist/types";
import { atom } from "recoil";

export const themeState = atom<DefaultTheme>({
  key: "ThemeState",
  default: {} as DefaultTheme,
});
