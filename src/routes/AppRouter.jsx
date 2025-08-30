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
import ProtectedRoute from "./ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "login",
        element: (
          <ProtectedRoute>
            <Login />,
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
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
