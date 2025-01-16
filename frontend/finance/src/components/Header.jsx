import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom
import "../styles/Header.css"; // Подключаем стили

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <h1 className="logo-link">Foo</h1>
            </div>
            <nav className="nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/menu" className="nav-link">Menu</Link>
                <Link to="/shop" className="nav-link">Shop</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
            <div className="auth-container">
                <Link to="/sign-in" className="auth-link">Sign In</Link>
                <Link to="/sign-up" className="auth-link">Sign Up</Link>
            </div>
        </header>
    );
}

export default Header;
