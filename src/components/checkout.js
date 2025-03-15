import React, { useState } from "react";

function Checkout() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [error, setError] = useState("");

    const handleSave = () => {
        // card number has 16 digits
        const sanitizedCardNumber = cardNumber.replace(/\s/g, "");
        if (!firstName || !lastName || sanitizedCardNumber.length !== 16) {
            setError("Please fill out all fields and ensure the card number is 16 digits.");
            return;
        }
        const newCard = {
            firstName,
            lastName,
            cardNumber: sanitizedCardNumber,
        };

        //saving card info
        const savedCards = JSON.parse(localStorage.getItem("checkoutDetails")) || [];
        localStorage.setItem("checkoutDetails", JSON.stringify([...savedCards, newCard]));
        alert("Your card details have been saved!");
        setFirstName("");
        setLastName("");
        setCardNumber("");
        setError("");
    };

    const handleCardInput = (value) => {
        const sanitizedValue = value.replace(/\D/g, ""); // only numbers
        const formattedValue = sanitizedValue
            .match(/.{1,4}/g) // card spacing
            ?.join(" ") 
            .substring(0, 19); 
        setCardNumber(formattedValue || "");
        if (sanitizedValue.length === 16) {
            setError(""); // clear error when valid
        }
    };

    // below is the credit card info fill in sections //
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
