import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Хук для навигации
import "../styles/SignIn.css"; // Стиль, если есть

function SignIn() {
    const [email, setEmail] = useState(""); // Состояние для email
    const [password, setPassword] = useState(""); // Состояние для пароля
    const [error, setError] = useState(""); // Состояние для ошибок
    const navigate = useNavigate(); // Хук для навигации после успешного входа

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
        setError(""); // Очистка ошибок перед отправкой

        try {
            // Отправляем запрос на сервер Django
            const response = await fetch("http://localhost:8000/api/signin/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: email, password }), // Отправляем email и пароль
            });

            if (response.ok) {
                // Если ответ успешный, получаем токен
                const data = await response.json();
                // Сохраняем токен в localStorage
                localStorage.setItem("token", data.token);
                // Перенаправляем на главную страницу
                navigate("/");
            } else {
                // Если ошибка, показываем сообщение об ошибке
                const errorData = await response.json();
                setError(errorData.detail || "Invalid credentials.");
            }
        } catch (err) {
            // Если ошибка запроса
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <section className="signin">
            <div className="signin-container">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit} className="signin-form">
                    {error && <p className="error-message">{error}</p>} {/* Показываем ошибку, если она есть */}
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
