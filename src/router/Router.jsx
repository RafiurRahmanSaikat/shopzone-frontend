import {
  AuthComponent,
  MyOrderList,
  MyProductList,
  OrderList,
  Private,
  ProductDetails,
  RoleBasedRoute,
  RootLayout,
  ShoppingCart,
  UsersList,
} from "@components";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components";
import DashboardLayout2 from "../components/layout/DashboardLayout2";
import ProductsPage from "../components/product/ProductsPage";

import DashboardHomePage from "../pages/DashboardHomePage";
import HomePage from "../pages/HomePage";
import ProductsManagePage from "../pages/ProductsManagePage";
import ProfilePage from "../pages/ProfilePage";
import StoresManagePage from "../pages/StoresManagePage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "login", element: <AuthComponent /> },
      { path: "signup", element: <AuthComponent /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "products", element: <ProductsPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <DashboardLayout2 />
      </Private>
    ),
    errorElement: <ErrorPage message={"404 Not Found"} />,
    children: [
      { path: "", element: <DashboardHomePage /> },
      { path: "profile", element: <ProfilePage /> },
      {
        path: "cart",
        element: (
          <RoleBasedRoute roles={["customer"]}>
            <ShoppingCart />
          </RoleBasedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <RoleBasedRoute roles={["admin", "store_owner"]}>
            <OrderList />
          </RoleBasedRoute>
        ),
      },
      {
        path: "my_orders",
        element: (
          <RoleBasedRoute roles={["customer"]}>
            <MyOrderList />
          </RoleBasedRoute>
        ),
      },

      {
        path: "users",
        element: (
          <RoleBasedRoute roles={["admin"]}>
            <UsersList />
          </RoleBasedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <RoleBasedRoute roles={["admin"]}>
            <ProductsManagePage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "stores",
        element: (
          <RoleBasedRoute roles={["admin"]}>
            <StoresManagePage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "manage_stores",
        element: (
          <RoleBasedRoute roles={["store_owner"]}>
            <StoresManagePage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "manage_orders",
        element: (
          <RoleBasedRoute roles={["store_owner"]}>
            <OrderList />
          </RoleBasedRoute>
        ),
      },
      {
        path: "manage_products",
        element: (
          <RoleBasedRoute roles={["store_owner"]}>
            <MyProductList />
          </RoleBasedRoute>
        ),
      },
      // Catch-all route for 404 error
      { path: "*", element: <ErrorPage message={"404 Not Found"} /> },
    ],
  },
]);

export { Router };
