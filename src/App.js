import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/homepage";
import About from "./components/about";
import Cart from "./components/cart";
import Movies from "./components/movies";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1 className="app-title">EZ Tech Movies</h1>
                    <nav className="navbar">
                        <Link to="/" className="nav-button">
                            Home
                        </Link>
                        <Link to="/movies" className="nav-button">
                            Movies
                        </Link>
                        <Link to="/cart" className="nav-button">
                            Cart
                        </Link>
                        <Link to="/about" className="nav-button">
                            About
                        </Link>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
