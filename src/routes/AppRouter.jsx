import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// mainLayout
const MainLayout = lazy(() => import("../layout/MainLayout"));
// pages
const Home = lazy(() => import("../pages/home"));

const Cart = lazy(() => import("../pages/cartProudcts"));
const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../pages/register"));

import Error from "../pages/Error";
import LoadingSpinner from "../components/feedback/lottieHandler/SuspenseHandler";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoadingSpinner type="loading">
        <MainLayout />
      </LoadingSpinner>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <LoadingSpinner>
            <Home />
          </LoadingSpinner>
        ),
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
