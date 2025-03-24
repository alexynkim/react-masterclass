import Home from "./component/Home";
import StyleExec from "./component/Exercise/StyleExec";
import TypeScriptExec from "./component/Exercise/TypeScriptExec";
import Coins from "./component/Coins/Coins";
import Coin from "./component/Coins/Coin";
import Chart from "./component/Coins/Chart";
import Price from "./component/Coins/Price";
import TodoList from "./component/TodoList/TodoList";

//import { createBrowserRouter } from "react-router-dom";
import { createHashRouter } from "react-router-dom";
import Root from "./Root";

const router = createHashRouter(
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
          path: "TodoList",
          element: <TodoList />,
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
  ]
  // {
  //   basename: "/react-masterclass",
  // }
);

export default router;
