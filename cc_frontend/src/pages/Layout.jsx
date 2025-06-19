import { Outlet } from "react-router-dom";
// import IMAGES from "../Images/Images";
import StickyNavbar from "../components/StickyNavbar";

const Layout = () => {
  return (
    <div>
      <StickyNavbar /> {/* Include the Navbar */}
      <Outlet />
    </div>
  );
};

export default Layout;