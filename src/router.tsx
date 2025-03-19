import Home from "./Routes/Home";
import StyleExec from "./Routes/StyleExec";
import TypeScriptExec from "./Routes/TypeScriptExec";
import Coins from "./Routes/Coins";
import Coin from "./Routes/Coin";

import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/react-masterclass",
    element: <Root />,
    children: [
      {
        path: "/react-masterclass",
        element: <Home />,
      },
      {
        path: "Style",
        element: <StyleExec />,
      },
      {
        path: "TypeScript",
        element: <TypeScriptExec />,
      },
      {
        path: "Coins",
        element: <Coins />,
        children: [
          {
            path: ":coinId",
            element: <Coin />,
          },
        ],
      },
    ],
  },
]);

export default router;
