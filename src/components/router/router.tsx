import { createHashRouter } from "react-router";
import { MainLayout } from "../main-layout/MainLayout";
import { DashboardPage } from "../../pages/Dashboard";
import { LoginPage } from "../../pages/Login";
import { App } from "../../App";
import { HandlerPage } from "../../pages/Handler";
import { ListPage } from "../../pages/List";
import { WrapLayout } from "../main-layout/WrapLayout";

export const router = createHashRouter(
  [
    {
      path: "/",
      Component: App,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },

        {
          path: "",
          Component: WrapLayout,
          children: [
            {
              index: true,
              Component: ListPage,
            },
            {
              path: "/new/:lab/:hosp",
              element: <MainLayout />,
              children: [
                {
                  index: true,
                  element: <DashboardPage />,
                },
                {
                  path: ":dynamicRoute",
                  Component: HandlerPage,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  {
    // basename: "template",
  }
);
