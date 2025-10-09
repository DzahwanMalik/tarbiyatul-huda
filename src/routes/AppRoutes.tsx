import { Outlet } from "react-router";

const AppRoutes = [
  {
    name: "main",
    path: "/",
    key: "main",
    Component: () => <h1>Main Layout <Outlet /></h1>,
    routes: [
      {
        name: "home",
        path: "/",
        key: "home",
        index: true,
        requireAuth: false,
        Component: () => <h1>Home</h1>,
      },
      {
        name: "about",
        path: "/about",
        key: "about",
        Component: () => <h1>About</h1>,
      },
    ],
  },
  {
    name: "404",
    path: "*",
    key: "404",
    Component: () => <h1>404 Page Not Found</h1>,
  },
];

export default AppRoutes;
