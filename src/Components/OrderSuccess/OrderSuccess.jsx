import React, { useEffect } from 'react';
import axios from 'axios';
import './OrderSuccess.css';
import success from '../../Assets/success.png';

const OrderSuccess = () => {

    useEffect(() => {
        const fetchOrderSuccess = async () => {
            try {
                const touristId = localStorage.getItem('tourist_id');
                const orderId = localStorage.getItem('order_id');

                if (!touristId || !orderId) {
                    console.error('Tourist ID or Order ID is missing from local storage');
                    return;
                }

                const response = await axios.get('http://localhost/order_success.php', {
                    params: {
                        tourist_id: touristId,
                        order_id: orderId
                    }
                });

                if (!response.data.success) {
                    console.error('Failed to fetch order success details');
                }
            } catch (error) {
                console.error(`Error fetching order success details: ${error.message}`);
            }
        };

        fetchOrderSuccess();
    }, []);

    return (
        <div className="subscription-container">
            <div className="subscription-card">
                <div className="subscription-icon">
                    <img src={success} alt="Success Icon" className="success-icon" />
                </div>
                <h2>Thank you!</h2>
                <p>Your order has been confirmed and paid successfully.</p>
                <div className="subscription-buttonContainer">
                    <button className="subscription-button" onClick={() => window.location.href = '/previousorders'}>
                        Go to Previous Orders
                    </button>
                    <button className="subscription-button" onClick={() => window.location.href = '/homepage'}>
                        Return to Home Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
