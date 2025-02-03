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
            .get("http://127.0.0.1:8000/api/menu/")
            .then((response) => {
                console.log(response.data);
                const ids = response.data.map(dish => dish.id);
                const uniqueIds = new Set(ids);
                if (uniqueIds.size !== ids.length) {
                    console.warn("Есть дубликаты ID!");
                }
                setMenuItems(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching menu:", err);
                setError("Failed to load menu. Try again later.");
                setLoading(false);
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
            {menuItems.map((dish, index) => (
                <div className="menu-card" key={index}>
                    <img
                        src={`http://127.0.0.1:8000${dish.image}`}
                        alt={dish.name}
                        className="menu-image"
                    />
                    <h3 className="menu-card-title">{dish.name}</h3>
                    <p className="menu-description">{dish.description}</p>
                    <p className="menu-price">
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
