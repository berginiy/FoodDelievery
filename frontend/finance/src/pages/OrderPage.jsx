import React from "react";
import { useParams } from "react-router-dom";
import OrderForm from "../components/OrderForm";

const OrderPage = () => {
    const { dishId } = useParams();

    return (
        <div className="order-page">
            <h2>Order Dish</h2>
            <OrderForm dishId={dishId} onOrderCreated={() => console.log("Order created!")} />
        </div>
    );
};

export default OrderPage;
