import { DefaultTheme } from "styled-components";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { themeState } from "./atoms";

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
  bgShadowColor: "rgba(30,80,100, 0.5)",
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
  borderShadow: "rgba(0, 0, 0, 0.5)",
  bgShadowColor: "rgba(130,180,216, 0.5)",
  accentColor: "#0d572b",
  backgroundImage: bgImglight,
};

export const useThemeSetValue = () => {
  const setTheme = useSetRecoilState(themeState);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.mode ? lightTheme : darkTheme));
  };

  return toggleTheme;
};

export const useThemeValue = (): DefaultTheme => {
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    if (Object.keys(theme).length === 0) {
      setTheme(darkTheme);
      console.log("Set Default Theme");
    }
  }, []);

  return Object.keys(theme).length === 0 ? darkTheme : theme;
};
