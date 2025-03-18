import StyleExec from "./Routes/StyleExec";
import TypeScriptExec from "./Routes/TypeScriptExec";
import { ThemeProvider } from "styled-components";

const darktheme = {
  textColor: "lightcyan",
  backgroundColor: "darkslateblue",
};

const lighttheme = {
  textColor: "darkslateblue",
  backgroundColor: "lightcyan",
};

function App() {
  return (
    <ThemeProvider theme={lighttheme}>
      {/* <StyleExec /> */}
      <TypeScriptExec />
    </ThemeProvider>
  );
}

export default App;
