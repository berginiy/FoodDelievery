import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/OrderForm.css";

const OrderForm = () => {
    const { dishId } = useParams();
    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        customerName: "",
        address: "",
        notes: "",
    });

    useEffect(() => {
        console.log(`Fetching dish with ID: ${dishId}`);
        const fetchDish = async () => {
            try {
                const response = await axios.get(`/api/menu/${dishId}/`);
                console.log("Response from API:", response.data);
                setDish(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Ошибка при загрузке блюда:", error.response || error);
                setError("Не удалось загрузить блюдо.");
                setLoading(false);
            }
        };
        fetchDish();
    }, [dishId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                customer_name: formData.customerName,
                address: formData.address,
                notes: formData.notes,
                dish: dishId,
            };
            await axios.post("/api/orders/", orderData);
            alert("Заказ успешно создан!");
        } catch (error) {
            console.error("Ошибка при создании заказа:", error);
            alert("Не удалось создать заказ.");
        }
    };

    if (loading) return <div className="loading-spinner">Загрузка...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="order-container">
            <h2 className="order-title">Оформление заказа: {dish.name}</h2>
            <p className="dish-description">{dish.description}</p>
            <p className="dish-price">
                Цена: ${(dish.price && !isNaN(parseFloat(dish.price))) ? parseFloat(dish.price).toFixed(2) : '0.00'}
            </p>
            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                    <label>Имя:</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Адрес доставки:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Примечания:</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button">Оформить заказ</button>
            </form>
        </div>
    );
};

export default OrderForm;