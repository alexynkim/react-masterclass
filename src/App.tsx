import ExerciseStyle from "./Routes/ExerciseStyle";
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
      <ExerciseStyle />
    </ThemeProvider>
  );
}

export default App;
