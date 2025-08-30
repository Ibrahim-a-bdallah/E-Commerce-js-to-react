import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <Toaster position="top-center" />

      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
