import { Route, Routes } from "react-router";
import { Suspense } from "react";
import AppRoutes from "./AppRoutes";

const renderRoute = (route: any) => {
  const { requireAuth, isLazy, props } = route;

  const renderRoutes = (routes: any) => {
    return routes ? routes.map(renderRoute) : null;
  };

  const Component = route.Component;

  const routeElement = requireAuth ? (
    <p>You must be logged in to view this page</p>
  ) : (
    <Component {...props} />
  );

  const routeComponent = isLazy ? (
    <Suspense fallback={<p>Loading...</p>}>{routeElement}</Suspense>
  ) : (
    routeElement
  );

  return (
    <Route
      path={route.index ? undefined : route.path}
      index={route.index}
      key={route.key}
      element={routeComponent}
    >
      {route.routes && renderRoutes(route.routes)}
    </Route>
  );
};

const Page = () => {
  return <Routes>{AppRoutes.map(renderRoute)}</Routes>;
};

export default Page;
