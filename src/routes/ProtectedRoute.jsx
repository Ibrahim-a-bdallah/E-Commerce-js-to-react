import AuthContext from "@/store/Auth/AuthContext";
import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useContext(AuthContext);
  const lastPath = useRef(location.pathname);

  // Redirect if not logged in and trying to access protected routes
  useEffect(() => {
    const protectedRoutes = ["/cart", "/profile", "/checkout"];

    if (
      (!data || data.status === "loggedout") &&
      protectedRoutes.includes(location.pathname)
    ) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [data, navigate, location]);

  // Prevent accessing auth pages when already logged in
  useEffect(() => {
    if (data?.status === "loggedin") {
      const authRoutes = ["/login", "/register"];

      // Only show message if directly navigating to auth pages (not from redirect)
      if (
        authRoutes.includes(location.pathname) &&
        !authRoutes.includes(lastPath.current)
      ) {
        toast.error("You are already logged in");
        navigate("/");
      }
    }

    // Update last path
    lastPath.current = location.pathname;
  }, [data, navigate, location]);

  return children;
};

export default ProtectedRoute;
