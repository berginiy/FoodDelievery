import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="hero">
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/menu" className="nav-link">Menu</Link>

                {user ? (
                    <>
                        <Link to="/personal-info" className="nav-link">Personal Information</Link>
                        <button className="log-out-button" onClick={logout}>Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/sign-in" className="nav-link">Sign In</Link>
                        <Link to="/sign-up" className="nav-link">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
