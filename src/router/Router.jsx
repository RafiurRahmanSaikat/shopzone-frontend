import {
  AuthComponent,
  DashboardLayout,
  ErrorPage,
  Home,
  Private,
  ProductDetails,
  Profile,
  RootLayout,
} from "@components";
import { createBrowserRouter } from "react-router-dom";
import Test from "../layouts/Test";
import TestDash from "../layouts/TestDash";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <AuthComponent /> },
      { path: "signup", element: <AuthComponent /> },
      { path: "product/:id", element: <ProductDetails /> },
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
      {
        path: "",
        element: <DashboardLayout />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "test",
        element: <Test />,
      },

      // {
      //   path: "rent_request_list",
      //   element: <RentRequest />,
      // },
    ],
  },
  {
    path: "/test",
    element: <TestDash />,

    errorElement: <ErrorPage message={"404 Not Found"} />,
    children: [
      {
        path: "",
        element: <Test />,
      },
    ],
  },
]);

export { Router };
