import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderForm = () => {
    const { dishId } = useParams();
    const [dishDetails, setDishDetails] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/menu/${dishId}`)
            .then(response => response.json())
            .then(data => setDishDetails(data))
            .catch(error => console.error('Error fetching dish details:', error));
    }, [dishId]);

    if (!dishDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{dishDetails.name}</h2>
            <p>{dishDetails.description}</p>
            <p>${dishDetails.price.toFixed(2)}</p>
        </div>
    );
};

export default OrderForm;
