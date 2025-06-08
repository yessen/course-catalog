import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { DefaultSidebar } from "./DefaultSideBar";

const Navbar = () => {
    // const [buttonPopup, setButtonPopup] = useState(false)

    var log_token = "Log In"
    const token = localStorage.getItem("token");
    if (token) {
        log_token = "Log Out"
    }
    // const handleClick = (id) => {
    //     var courseDetails = [];
    //     const streamingList = JSON.parse(localStorage.getItem("streamingList"))
    //     if (streamingList){ 
    //     const streamInfo = streamingList.find((s) => s.id == id);
    //     courseDetails.push(streamInfo)
    //     setDataID(courseDetails)
    //     // console.log(streamInfo)
    //     }
    // }

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/">Course Catalogue</Link>           
            </div>
            <div style={styles.navLinks}>
                <Link to="/semesterlist" style={styles.navLink}>Semester List</Link>
                <Link to="/courselist" style={styles.navLink}>Course List</Link>
                <Link to="/streaming" style={styles.navLink}>Streaming</Link>
            </div>
            <div style={styles.authButtons}>
                <Link to="/login" style={styles.loginButton}>{log_token}</Link>
                <Link to="/register" style={styles.signupButton}>Sign up</Link>
            </div>
        </nav>
        
    );
};

const styles = {
    navbar: {
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1000",
    },
    logo: {
        fontSize: "24px",
        fontWeight: "bold",
    },
    navLinks: {
        display: "flex",
        gap: "20px",
    },
    navLink: {
        textDecoration: "none",
        color: "#333",
        fontSize: "16px",
        fontWeight: "500",
    },
    authButtons: {
        display: "flex",
        gap: "10px",
        marginRight: "50px",
    },
    loginButton: {
        textDecoration: "none",
        color: "#333",
        fontSize: "16px",
        fontWeight: "500",
        padding: "8px 16px",
    },
    signupButton: {
        textDecoration: "none",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "500",
        padding: "8px 16px",
        backgroundColor: "#007BFF",
        borderRadius: "5px",
    },
};

export default Navbar;
