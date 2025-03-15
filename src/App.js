import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./components/homepage";
import About from "./components/about";
import Cart from "./components/cart";
import Movies from "./components/movies";
import Checkout from "./components/checkout";
import SignIn from "./components/signin";
import { googleLogout } from "@react-oauth/google";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // sees if the user is logged in
    const [showAlert, setShowAlert] = useState(false); // show sign in alert

    /**
     * Handles successful login by updating authentication state.
     * @param {Object} response - Login response object.
     */
    const handleLoginSuccess = (response) => {
        console.log("Login successful!", response);
        setIsLoggedIn(true); // Set user as logged in
        setShowAlert(false); 
    };

    
    const handleLogout = () => {
        googleLogout(); // log out with OAuth
        alert("You have been logged out."); // alert for the user
        setIsLoggedIn(false);
    };

    /**
     * Protected Route Wrapper: Redirects users to the sign-in page if not authenticated.
     * @param {React.Component} Component - The component to render if authenticated.
     */
    const ProtectedRoute = ({ Component }) => {
        return isLoggedIn ? (
            <Component />
        ) : (
            <>
                {setShowAlert(true)} {/* show the alert message */}
                <Navigate to="/signin" replace />
            </>
        );
    };

    return (
        <Router>
            <div className="App">
                <header className="header">
                    <h1 className="app-title">EZ Tech Movies</h1>
                    <nav className="navbar">
                        <Link to="/" className="nav-button">Home</Link>
                        <Link to="/movies" className="nav-button">Movies</Link>
                        <Link to="/cart" className="nav-button">Cart</Link>
                        <Link to="/about" className="nav-button">About</Link>
                        <div className="auth-buttons">
                            {!isLoggedIn ? (
                                // sign in and sign out link if user is not logged in
                                <Link to="/signin" className="nav-button">Sign In</Link>
                            ) : (
                                <button onClick={handleLogout} className="nav-button">Sign Out</button>
                            )}
                        </div>
                    </nav>
                </header>
                <main>
                    {showAlert && (
                        <div className="alert">
                            Please sign in to access StreamList!
                        </div>
                    )}

                    <Routes>
                        {/* user can move to the sign in page */}
                        <Route
                            path="/signin"
                            element={
                                !isLoggedIn ? (
                                    <SignIn onLogin={handleLoginSuccess} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />

                        {/* theres restrcitions on these pages */}
                        <Route path="/" element={<ProtectedRoute Component={HomePage} />} />
                        <Route path="/movies" element={<ProtectedRoute Component={Movies} />} />
                        <Route path="/cart" element={<ProtectedRoute Component={Cart} />} />
                        <Route path="/about" element={<ProtectedRoute Component={About} />} />
                        <Route path="/checkout" element={<ProtectedRoute Component={Checkout} />} />

                        {/* Fallback route */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
