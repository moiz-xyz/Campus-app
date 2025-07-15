import { Outlet } from "react-router-dom";
import Navbar from "../componets/Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
