import {
  AuthComponent,
  MyOrderList,
  MyProductList,
  OrderList,
  Private,
  ProductDetails,
  ProductList,
  RoleBasedRoute,
  RootLayout,
  ShoppingCart,
  StoreList,
  UsersList,
} from "@components";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components";
import DashboardLayout2 from "../components/layout/DashboardLayout2";
import ProductsPage from "../components/product/ProductsPage";
import ProfilePage from "../components/ProfilePage";
import HomePage from "../pages/HomePage";

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
      { path: "", element: <ProfilePage /> },
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
            <ProductList />
          </RoleBasedRoute>
        ),
      },
      {
        path: "stores",
        element: (
          <RoleBasedRoute roles={["admin"]}>
            <StoreList />
          </RoleBasedRoute>
        ),
      },
      {
        path: "manage_stores",
        element: (
          <RoleBasedRoute roles={["store_owner"]}>
            <StoreList />
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
