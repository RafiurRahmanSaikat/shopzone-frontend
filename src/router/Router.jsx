import {
  AuthComponent,
  DashboardLayout,
  ErrorPage,
  Home,
  MyOrderList,
  MyProductList,
  OrderList,
  Private,
  ProductDetails,
  ProductList,
  Profile,
  RoleBasedRoute,
  RootLayout,
  ShoppingCart,
  StoreList,
  UsersList,
} from "@components";
import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "../components/ProductsPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <AuthComponent /> },
      { path: "signup", element: <AuthComponent /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "all_products", element: <ProductsPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <DashboardLayout />
      </Private>
    ),
    errorElement: <ErrorPage message={"404 Not Found"} />,
    children: [
      { path: "", element: <Profile /> },
      { path: "profile", element: <Profile /> },
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
