import React, { useState } from "react";

function Checkout() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [error, setError] = useState("");

    const validateMonth = (value) => {
        const sanitizedValue = value.replace(/\D/g, ""); // Allow only numbers
        if (sanitizedValue.length <= 2) {
            setExpMonth(sanitizedValue); // Update input value
            if (sanitizedValue && (Number(sanitizedValue) < 1 || Number(sanitizedValue) > 12)) {
                setError("Expiration month must be between 01 and 12.");
            } else {
                setError(""); // Clear error if valid
            }
        }
    };

    const validateYear = (value) => {
        const sanitizedValue = value.replace(/\D/g, ""); // Allow only numbers
        if (sanitizedValue.length <= 2) {
            setExpYear(sanitizedValue);
        }
    };

    const validateSecurityCode = (value) => {
        const sanitizedValue = value.replace(/\D/g, ""); // Allow only numbers
        if (sanitizedValue.length <= 3) {
            setSecurityCode(sanitizedValue);
        }
    };

    const handleSave = () => {
        const sanitizedCardNumber = cardNumber.replace(/\s/g, "");

        // Check if any field is empty or invalid
        if (
            !firstName ||
            !lastName ||
            sanitizedCardNumber.length !== 16 ||
            !expMonth ||
            !expYear ||
            securityCode.length !== 3 ||
            error // Prevent save if there's an error
        ) {
            setError("Please fill out all fields and ensure the card details are valid.");
            return;
        }

        const newCard = {
            firstName,
            lastName,
            cardNumber: sanitizedCardNumber,
            expMonth,
            expYear,
            securityCode,
        };

        const savedCards = JSON.parse(localStorage.getItem("checkoutDetails")) || [];
        localStorage.setItem("checkoutDetails", JSON.stringify([...savedCards, newCard]));
        alert("Your card details have been saved!");
        setError(""); // Clear error, keep inputs
    };

    const handleCardInput = (value) => {
        const sanitizedValue = value.replace(/\D/g, ""); // Only numbers
        const formattedValue = sanitizedValue
            .match(/.{1,4}/g) // Add spacing every 4 digits
            ?.join(" ")
            .substring(0, 19);
        setCardNumber(formattedValue || "");
        if (sanitizedValue.length === 16) {
            setError(""); // Clear error when valid
        }
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <div className="checkout-form">
                <div className="name-container">
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter your first name"
                            className="checkout-input"
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter your last name"
                            className="checkout-input"
                        />
                    </div>
                </div>
                <div className="card-info-container">
                    <div>
                        <label>Expiration Date:</label>
                        <div className="expiration-date">
                            <input
                                type="text"
                                value={expMonth}
                                onChange={(e) => validateMonth(e.target.value)}
                                placeholder="MM"
                                maxLength="2"
                                className="small-input"
                            />
                            /
                            <input
                                type="text"
                                value={expYear}
                                onChange={(e) => validateYear(e.target.value)}
                                placeholder="YY"
                                maxLength="2"
                                className="small-input"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Security Code:</label>
                        <input
                            type="text"
                            value={securityCode}
                            onChange={(e) => validateSecurityCode(e.target.value)}
                            placeholder="123"
                            maxLength="3"
                            className="small-input"
                        />
                    </div>
                </div>
                <label>Card Number:</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => handleCardInput(e.target.value)}
                    placeholder="16-digit card number"
                    className="checkout-input"
                />
                {error && <p className="error-message">{error}</p>}
                <div className="checkout-buttons">
                    <button className="save-button" onClick={handleSave}>
                        Save
                    </button>
                    <button className="checkout-button" disabled>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
