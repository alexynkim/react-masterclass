import { createContext, useContext, useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import { atom, useRecoilState, useRecoilValue } from "recoil";

import bgImgdark from "./images/bgImgdark.jpg";
import bgImglight from "./images/bgImglight.jpg";

const darkTheme: DefaultTheme = {
  mode: true,
  textColor: "#D4F1F4",
  bgColor: "#05445E",
  textMenuColor: "#bbb",
  bgHovorColor: "#75E6DA",
  textHoverColor: "#0e4d5a",
  borderShadow: "rgba(255, 255, 255, 0.5)",
  accentColor: "#7bdfb8",
  backgroundImage: bgImgdark,
};

const lightTheme: DefaultTheme = {
  mode: false,
  textColor: "#05445E",
  bgColor: "#D4F1F4",
  textMenuColor: "#555",
  bgHovorColor: "#0f6477",
  textHoverColor: "#c7e4e1",
  borderShadow: "rgba(0, 0, 0, 0.2)",
  accentColor: "#0d572b",
  backgroundImage: bgImglight,
};

interface ThemeInterface {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

const themeState = atom({
  key: "ThemeState",
  default: lightTheme,
});

export const useThemeAtom = (): ThemeInterface => {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.mode ? lightTheme : darkTheme));
  };

  return { theme, toggleTheme };
};

export const useThemeValue = (): DefaultTheme => {
  return useRecoilValue(themeState);
};
