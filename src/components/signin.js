import React from "react";
import { GoogleLogin } from "@react-oauth/google"; // Login with Google

/**
 * SignIn component allows users to sign in using their Google account.
 * @param {Function} onLogin - Function called when login is successful.
 */
function SignIn({ onLogin }) {
    const handleLoginSuccess = (response) => {
        onLogin(response);
    };

    const handleLoginError = (error) => {
        //log error if login fails
        console.error("Login failed!", error);
    };

    return (
        <div className="signin-page">
            <h2>Sign in to StreamList!</h2>
            <p>Please sign in to continue.</p>
            {/* Google Login button */}
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </div>
    );
}

export default SignIn;
  
