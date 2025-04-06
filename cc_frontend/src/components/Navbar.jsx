import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/semesterlist">Course Catalogue</Link>
            </div>
            <div style={styles.navLinks}>
                <Link to="/semesterlist" style={styles.navLink}>Semester List</Link>
                <Link to="/courselist" style={styles.navLink}>Course List</Link>
                <Link to="/streaming" style={styles.navLink}>Streaming</Link>
            </div>
            <div style={styles.authButtons}>
                <Link to="/login" style={styles.loginButton}>Log in</Link>
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
