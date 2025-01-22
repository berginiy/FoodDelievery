import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css'; // Подключение стилей

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]); // Состояние для хранения данных меню
    const [loading, setLoading] = useState(true);  // Состояние для отображения загрузки
    const [error, setError] = useState(null);      // Состояние для обработки ошибок

    // Получение данных из API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/menu/')
            .then(response => {
                setMenuItems(response.data);
                setLoading(false); // Убираем загрузку
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
                setError('Failed to load menu. Try again later.');
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

    // Рендер меню
    return (
        <div className="menu-container">
            <h2>Popular dishes with delivery</h2>
            <p>The most delicious and healthy dishes from our chefs...</p>
            <div className="menu-grid">
                {menuItems.map(item => (
                    <div className="menu-item" key={item.id}>
                        <img src={item.image} alt={item.name} className="menu-image" />
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <button className="add-to-cart">+</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
