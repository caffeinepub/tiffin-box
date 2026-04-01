import { createRootRoute, createRoute } from "@tanstack/react-router";
import RootLayout from "./layouts/RootLayout";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order",
  component: OrderPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  orderRoute,
  adminRoute,
  adminDashboardRoute,
]);
