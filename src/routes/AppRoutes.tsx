import MainLayout from "../components/layouts/MainLayout";
import HomePage from "../pages/HomePage";

const AppRoutes = [
  {
    name: "main",
    path: "/",
    key: "main",
    Component: MainLayout,
    routes: [
      {
        name: "home",
        path: "/",
        key: "home",
        index: true,
        requireAuth: false,
        Component: HomePage,
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
