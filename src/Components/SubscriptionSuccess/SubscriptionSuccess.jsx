import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SubscriptionSuccess.css';
import success from '../../Assets/success.png';

const SubscriptionSuccess = () => {
    const [subscriptionId, setSubscriptionId] = useState(null);

    useEffect(() => {
        const touristId = localStorage.getItem('tourist_id');
        axios
            .get(`http://localhost/subscription_success.php?tourist_id=${touristId}`)
            .then((response) => {
                if (response.data.success) {
                    localStorage.setItem('subscription_id', 2);
                    setSubscriptionId(2);
                }
            })
            .catch((error) => {
                console.error('There was an error updating the subscription!', error);
            });
    }, []);

    return (
        <div className="subscription-container">
            <div className="subscription-card">
                <div className="subscription-icon">
                    <img src={success} alt="Success Icon" className="success-icon" />
                </div>
                <h2>Thank you for subscribing!</h2>
                <p>You have successfully subscribed to our list.</p>
                <div className="subscription-buttonContainer">
                    <button className="subscription-button" onClick={() => window.location.href = '/ai'}>
                        Go to AI Page
                    </button>
                    <button className="subscription-button" onClick={() => window.location.href = '/planmeeting'}>
                        Plan meeting
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSuccess;
