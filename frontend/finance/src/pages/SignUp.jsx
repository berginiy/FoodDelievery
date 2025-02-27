import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/register/", {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                alert("Registration successful! Please sign in.");
                navigate("/sign-in");
            }
        } catch (err) {
            console.error("Ошибка регистрации:", err.response?.data || err.message);
            setError(
                err.response?.data?.errors ||
                err.response?.data?.detail ||
                "Something went wrong. Please try again later."
            );
        }
    };

    return (
        <section className="signup">
            <div className="signup-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit} className="signup-form">
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
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
                    <button type="submit" className="signup-button">Sign Up</button>
                    <p className="redirect-text">
                        Already have an account? <a href="/sign-in">Sign In</a>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default SignUp;