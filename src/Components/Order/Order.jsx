import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handlePay = async () => {
        try {
            const touristId = localStorage.getItem('tourist_id');
            if (!touristId) {
                setError('Tourist-Id is missing from local storage');
                return;
            }

            const response = await axios.post(
                `http://localhost/create.php?order_id=${order.order_id}`,
                {},
                {
                    headers: {
                        'Tourist-Id': touristId
                    }
                }
            );

            if (response.data.success) {
                window.location.href = response.data.checkout_url;
            } else {
                setError('Failed to initiate payment');
            }
        } catch (err) {
            if (err.response) {
                setError(`Error: ${err.response.data.message || 'An error occurred while initiating payment'}`);
            } else if (err.request) {
                setError('No response received from the server. Please try again later.');
            } else {
                setError(`Request error: ${err.message}`);
            }
        }
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const touristId = localStorage.getItem('tourist_id');
                const response = await axios.get('http://localhost/showorder.php', {
                    headers: {
                        'Tourist-Id': touristId
                    }
                });

                if (response.data.success) {
                    const orderData = response.data.data[0];
                    setOrder(orderData);
                    localStorage.setItem('order_id', orderData.order_id);
                } else {
                    setError('Failed to fetch order details');
                }
            } catch (err) {
                setError(`Error fetching order details: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="container order-container">
            <h2 className="section-title text-center">Order Details</h2>
            {order ? (
                <div className="card order-card">
                    <div className="card-body">
                        <h5 className="card-order-title">Order ID: {order.order_id}</h5>
                        <p className="card-order-title">Address: {order.tourist_address}</p>
                        <p className="card-order-title">Total Quantity: {order.total_quantity}</p>
                        <p className="card-order-title">Total Price: {order.total_price} EGP</p>

                        <div className="accordion order-accordion" id="orderDetailsAccordion">
                            {order.order_details.products.length > 0 && (
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="productsHeading">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#productsCollapse"
                                            aria-expanded="true"
                                            aria-controls="productsCollapse"
                                        >
                                            Products
                                        </button>
                                    </h2>
                                    <div
                                        id="productsCollapse"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="productsHeading"
                                        data-bs-parent="#orderDetailsAccordion"
                                    >
                                        <div className="accordion-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.order_details.products.map((product, index) => (
                                                        <tr key={index}>
                                                            <td>{product.product_name}</td>
                                                            <td>{product.quantity}</td>
                                                            <td>{product.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {order.order_details.services.length > 0 && (
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="servicesHeading">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#servicesCollapse"
                                            aria-expanded="false"
                                            aria-controls="servicesCollapse"
                                        >
                                            Services
                                        </button>
                                    </h2>
                                    <div
                                        id="servicesCollapse"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="servicesHeading"
                                        data-bs-parent="#orderDetailsAccordion"
                                    >
                                        <div className="accordion-body">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Service Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.order_details.services.map((service, index) => (
                                                        <tr key={index}>
                                                            <td>{service.service_name}</td>
                                                            <td>{service.quantity}</td>
                                                            <td>{service.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="btn btn-logout mt-3" onClick={handlePay}>Pay</button>
                    </div>
                </div>
            ) : (
                <div className="no-order">No order details available</div>
            )}
        </div>
    );
};

export default Order;
