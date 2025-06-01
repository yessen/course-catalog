import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

const PrivateRoute = ({ children }) => {
    const { accessToken } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    if (!token) {
      return accessToken ? children : <Navigate to="/login" />;
    } else {
        return <Outlet/>
    }  
};

export default PrivateRoute;
