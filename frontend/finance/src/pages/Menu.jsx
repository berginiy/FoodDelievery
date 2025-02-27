import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Menu.css";

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get("/api/menu/");
                setMenuItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Ошибка при загрузке меню:", error);
                setError("Не удалось загрузить меню.");
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    if (loading) return <div className="loading-spinner">Загрузка меню...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="menu-container">
            <h2 className="menu-title">Меню доставки</h2>
            <div className="menu-grid">
                {menuItems.map((item) => (
                    <div className="menu-item" key={item.id}>
                        <div className="menu-item-inner">
                            <img src={item.image} alt={item.name} className="menu-image" />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p className="price">${parseFloat(item.price).toFixed(2)}</p>
                            <Link to={`/order/${item.id}`} className="order-link">
                                Заказать
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;