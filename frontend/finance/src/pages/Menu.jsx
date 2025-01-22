import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Menu.css";

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]); // Данные из API
    const [loading, setLoading] = useState(true);  // Состояние загрузки
    const [error, setError] = useState(null);      // Состояние ошибок

    // Получение данных из API
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/menu/") // Эндпоинт API
            .then((response) => {
                setMenuItems(response.data);
                setLoading(false); // Убираем загрузку
            })
            .catch((err) => {
                console.error("Error fetching menu:", err);
                setError("Failed to load menu. Try again later.");
                setLoading(false); // Убираем загрузку при ошибке
            });
    }, []);

    // Если идёт загрузка
    if (loading) {
        return <div className="menu-container">Loading menu...</div>;
    }

    // Если произошла ошибка
    if (error) {
        return <div className="menu-container error">{error}</div>;
    }

    // Отображение данных из API
    return (
        <div className="menu-container">
            {menuItems.map((dish) => (
                <div className="menu-card" key={dish.id}>
                    <img
                        src={dish.image}
                        alt={dish.name}
                        className="menu-image"
                    />
                    <h3 className="menu-card-title">{dish.name}</h3>
                    <p className="menu-description">{dish.description}</p>
                    <p className="menu-price">
                        {/* Проверка: если price — число, используем toFixed */}
                        {typeof dish.price === "number"
                            ? `$${dish.price.toFixed(2)}`
                            : dish.price}
                    </p>
                    <button className="menu-add-btn">+</button>
                </div>
            ))}
        </div>
    );

};

export default MenuPage;
