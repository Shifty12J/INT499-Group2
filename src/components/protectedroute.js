import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />; //to prevent someone not signed in from accessing the system
};

export default ProtectedRoute;
