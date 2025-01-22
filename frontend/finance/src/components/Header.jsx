import React from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import "../styles/Header.css"; // Подключаем стили

function Header() {
    const navigate = useNavigate(); // Используем useNavigate для навигации

    return (
        <header className="header">
            <div className="logo">
                <h1
                    className="logo-link"
                    onClick={() => navigate("/")} // Добавляем обработчик клика
                    style={{ cursor: "pointer" }} // Добавляем курсор "pointer" для указания, что это кликабельный элемент
                >
                    Foo
                </h1>
            </div>
            <nav className="nav">
                <button
                    onClick={() => navigate("/")}
                    className="nav-link"
                >
                    Home
                </button>
                <button
                    onClick={() => navigate("/menu")}
                    className="nav-link"
                >
                    Menu
                </button>
                <button
                    onClick={() => navigate("/shop")}
                    className="nav-link"
                >
                    Shop
                </button>
                <button
                    onClick={() => navigate("/contact")}
                    className="nav-link"
                >
                    Contact
                </button>
            </nav>
            <div className="auth-container">
                <button
                    onClick={() => navigate("/sign-in")}
                    className="auth-link"
                >
                    Sign In
                </button>
                <button
                    onClick={() => navigate("/sign-up")}
                    className="auth-link"
                >
                    Sign Up
                </button>
            </div>
        </header>
    );
}

export default Header;
