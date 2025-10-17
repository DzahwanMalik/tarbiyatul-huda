import MainLayout from "../components/layouts/MainLayout";
import PageNotFound from "../pages/404PageNotFound";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import GalleryPage from "../pages/GalleryPage";

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
        Component: AboutPage,
      },
      {
        name: "news",
        path: "/news",
        key: "news",
        Component: AboutPage,
      },
      {
        name: "gallery",
        path: "/gallery",
        key: "gallery",
        Component: GalleryPage,
      },
    ],
  },
  {
    name: "404",
    path: "*",
    key: "404",
    Component: PageNotFound,
  },
];

export default AppRoutes;
