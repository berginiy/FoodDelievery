import React from "react";
import "../styles/Register.css";

function Register() {
    return (
        <section className="register">
            <div className="register-container">
                <h1>Create an Account</h1>
                <form className="register-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" />
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
