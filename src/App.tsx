import StyleExec from "./Routes/StyleExec";
import TypeScriptExec from "./Routes/TypeScriptExec";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { darktheme, lighttheme } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    font-family: Arial, sans-serif;
  }
`;

function App() {
  return (
    <ThemeProvider theme={darktheme}>
      <GlobalStyle />
      <StyleExec />
      <TypeScriptExec />
    </ThemeProvider>
  );
}

export default App;
