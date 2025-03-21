import Home from "./Routes/Home";
import StyleExec from "./Routes/StyleExec";
import TypeScriptExec from "./Routes/TypeScriptExec";
import Coins from "./Routes/Coins";
import Coin from "./Routes/Coin";
import Chart from "./Routes/Chart";
import Price from "./Routes/Price";

import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "Coins",
          element: <Coins />,
        },
        {
          path: "Coins/:coinId",
          element: <Coin />,
          children: [
            {
              path: "chart",
              element: <Chart />,
            },
            {
              path: "price",
              element: <Price />,
            },
          ],
        },
        {
          path: "Style",
          element: <StyleExec />,
        },
        {
          path: "TypeScript",
          element: <TypeScriptExec />,
        },
      ],
    },
  ],
  {
    basename: "/react-masterclass",
  }
);

export default router;
