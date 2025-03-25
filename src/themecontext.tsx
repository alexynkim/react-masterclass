import { createContext, useContext, useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

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
  bgShadowColor: "rgba(5,70,90, 0.5)",
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
  bgShadowColor: "rgba(230,240,246, 0.5)",
  accentColor: "#0d572b",
  backgroundImage: bgImglight,
};

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDark, setTheme] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
