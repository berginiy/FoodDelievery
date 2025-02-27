import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/SignIn.css";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/signin/", {
                username: email, // Используем email как username (или замени на username, если нужно)
                password,
            });

            if (response.status === 200) {
                const data = response.data;
                const accessToken = data.token || data.access; // Убедись, что структура ответа соответствует бэкенду
                localStorage.setItem("token", accessToken);
                signIn({ token: accessToken }); // Обновляем состояние в AuthContext
                navigate("/");
            } else {
                setError("Invalid credentials.");
            }
        } catch (err) {
            console.error("Ошибка входа:", err.response?.data || err.message);
            setError(
                err.response?.data?.detail || "Something went wrong. Please try again later."
            );
        }
    };

    return (
        <section className="signin">
            <div className="signin-container">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit} className="signin-form">
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="signin-button">Sign In</button>
                    <p className="redirect-text">
                        Don't have an account? <a href="/sign-up">Sign Up</a>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default SignIn;