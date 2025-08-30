import AuthContext from "@/store/Auth/AuthContext";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useContext(AuthContext);
  console.log(location.pathname);

  // مثال: لو المستخدم مش لوجن وحاول يفتح صفحة cart
  useEffect(() => {
    if (!data && location.pathname === "/cart") {
      toast.error("Please login first");
      navigate("/login");
      return null;
    }
    if (data && location.pathname === "/cart" && data.status === "loggedout") {
      toast.error("Please login first");
      navigate("/login");
      return null;
    }
  }, [data, navigate, location]);

  // مثال: لو هو لوجن وحاول يفتح صفحة login
  if (data?.status === "loggedin") {
    navigate("/");

    toast.error("Please logout first");

    return null;
  }

  return children;
};

export default ProtectedRoute;
