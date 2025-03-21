import { createContext, useContext, useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

const darkTheme: DefaultTheme = {
  mode: true,
  textColor: "#D4F1F4",
  bgColor: "#05445E",
  textMenuColor: "#bbb",
  bgHovorColor: "#75E6DA",
  textHoverColor: "#189AB4",
  borderShadow: "rgba(255, 255, 255, 0.5)",
};

const lightTheme: DefaultTheme = {
  mode: false,
  textColor: "#05445E",
  bgColor: "#D4F1F4",
  textMenuColor: "#555",
  bgHovorColor: "#189AB4",
  textHoverColor: "#75E6DA",
  borderShadow: "rgba(0, 0, 0, 0.2)",
};

type ThemeContextType = {
  theme: typeof lightTheme;
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
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
