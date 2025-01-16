import React, { useState } from "react";
import "../styles/Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // Для ошибок
    const [success, setSuccess] = useState(""); // Для успешной регистрации

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { username, email, password };

        try {
            const response = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess("Registration successful! Please log in.");
                setUsername("");
                setEmail("");
                setPassword("");
            } else {
                const errorData = await response.json();
                setError(errorData.errors || "Error registering user.");
            }
        } catch (err) {
            setError("Network error. Please try again later.");
        }
    };

    return (
        <section className="register">
            <div className="register-container">
                <h1>Create an Account</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form className="register-form" onSubmit={handleSubmit}>
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
                    <button type="submit" className="register-button">Register</button>
                    <p className="redirect-text">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Register;
