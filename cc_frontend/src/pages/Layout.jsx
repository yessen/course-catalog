import { Outlet } from "react-router-dom";
// import IMAGES from "../Images/Images";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <Outlet />
    </div>
  );
};

export default Layout;