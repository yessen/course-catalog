import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div style={styles.container}>
            <Navbar /> {/* Include the Navbar */}

            {/* Main Content */}
            <div style={styles.content}>
                <h1>Welcome to Course Catalog</h1>
                <p>An app to help students manage their courses.</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    content: {
        marginTop: "80px",
        textAlign: "center",
    },
};

export default Home;
