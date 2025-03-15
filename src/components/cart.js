import React, { useState, useEffect } from "react";
import list from "./data"; // data from data.js file provided
import { Link } from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [warning, setWarning] = useState(""); 

    // load storage
    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            console.log("Loaded cart from Local Storage:", JSON.parse(savedCart));
            setCartItems(JSON.parse(savedCart));
        } else {
            }
    }, []);

    // save
    useEffect(() => {
        if (cartItems.length > 0) {
            console.log("Saving cart to Local Storage:", cartItems);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            localStorage.removeItem("cartItems"); // clear when cart is empty.
        }
    }, [cartItems]);
;
     // add things to cart
    const addItemToCart = (item) => {
        console.log("Adding item to cart:", item);

        // restric req
        if (item.id <= 4) {
            const subscriptionExists = cartItems.some((cartItem) => cartItem.id <= 4);
            if (subscriptionExists) {
                setWarning("You can only add one subscription!");
                return;
            }
        }

        // update quantity
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });

        setWarning(""); // Clear warnings
    };

    const updateQuantity = (id, quantity) => {
        console.log(`Updating quantity for item ID ${id} to ${quantity}`);
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: parseInt(quantity, 10) || 1 }
                    : item
            )
        );
    };

    // remove merch / sub
    const removeItemFromCart = (id) => {
        console.log(`Removing item with ID ${id} from cart`);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2>Your Cart!</h2>

            {warning && <p className="warning">{warning}</p>}

            {/* subscription items pulled from data.js */}
            <div className="cart-section">
                <h3>Subscriptions</h3>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Info</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list
                            .filter((item) => item.id <= 4)
                            .map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={item.img} alt={item.service} />
                                        {item.service}
                                    </td>
                                    <td>{item.serviceInfo}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => addItemToCart(item)}>Add</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* merch items pulled from data.js */}
            <div className="cart-section">
                <h3>EZ Tech Merch!</h3>
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Info</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list
                            .filter((item) => item.id > 4)
                            .map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={item.img} alt={item.service} />
                                        {item.service}
                                    </td>
                                    <td>{item.serviceInfo}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => addItemToCart(item)}>Add</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* cart summary with data pulled from data.js */}
            <div className="cart-summary">
                <h3>Cart Summary</h3>
                {cartItems.length > 0 ? (
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={item.img} alt={item.service} />
                                        {item.service}
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        {item.id > 4 ? (
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(item.id, e.target.value)
                                                }
                                            />
                                        ) : (
                                            <span>{item.quantity}</span>
                                        )}
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => removeItemFromCart(item.id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                        <div className="empty-cart"> {/* for the empty cart */}
                        <p>Your cart is empty!</p>
                    </div>
                )}
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <Link to="/checkout">
                    <button className="checkout-button">Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
}

export default Cart;
