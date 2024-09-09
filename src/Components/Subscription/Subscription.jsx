import React from 'react';
import './Subscription.css';
import { Link, useNavigate } from 'react-router-dom';

const Subscription = () => {
    const navigate = useNavigate();
    const subscriptionId = localStorage.getItem('subscription_id');
    const touristId = localStorage.getItem('tourist_id');

    const handleSubscribe = async () => {
        try {
            const response = await fetch('http://localhost/subscription.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Tourist-Id': touristId,
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.checkout_url) {
                    window.location.href = data.checkout_url; // Navigate to the checkout URL
                } else {
                    console.error('Subscription failed: Invalid response data');
                }
            } else {
                console.error('Subscription failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUnsubscribe = async () => {
        try {
            const response = await fetch('http://localhost/unsubscribe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Tourist-Id': touristId,
                }
            });

            if (response.ok) {
                // Handle successful unsubscription (e.g., reload the page or show a success message)
                window.location.reload();
            } else {
                console.error('Unsubscription failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="pricing6 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h3 className="section-title">Pricing Plan</h3>
                        <h6>We offer 100% satisfaction and Money back Guarantee</h6>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card card-shadow border-0 mb-4">
                            <div className="card-body p-4 subsplan">
                                <div className="d-flex align-items-center">
                                    <h5 className="font-weight-medium m-3 plan-name">Free Plan</h5>
                                </div>
                                <div className="row">
                                    <div className="col-lg-5 text-center">
                                        <div className="price-box my-3">
                                            <sup className='egp'>EGP</sup><span className="text-dark display-5">0</span>
                                            <h6 className="font-weight-light">MONTHLY</h6>
                                            {subscriptionId === '1' ? (
                                                <button className="btn btn-info-gradiant border-0  text-white p-2 btn-block mt-3 mb-0 mx-2" disabled>Your Current Plan</button>
                                            ) : (
                                                <button className="btn btn-info-gradiant border-0  text-white p-2 btn-block mt-3 mb-0 mx-2" onClick={handleUnsubscribe}>Switch to Free Plan</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-7 align-self-center">
                                        <ul className="list-inline pl-3 font-14 font-weight-medium text-dark">
                                            <li className="py-2"><i className="fa-solid fa-check mx-1"></i><span>Access to Historical Content</span></li>
                                            <li className="py-2"><i className="fa-solid fa-check mx-1"></i><span>Upcoming Events Information</span></li>
                                            <li className="py-2"><i className="fa-solid fa-check mx-1"></i><span>Access to Historical Content</span></li>
                                            <li className="py-2"><i className="fa-solid fa-check mx-1"></i><span>Upcoming Events Information</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card card-shadow border-0 mb-4">
                            <div className="card-body p-4 subsplan">
                                <div className="d-flex align-items-center">
                                    <h5 className="font-medium m-3 plan-name">Premium Plan</h5>
                                    <div className="ml-auto"><span className="badge badge-danger font-weight-normal p-2">Popular</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-5 text-center">
                                        <div className="price-box my-3">
                                            <sup className='egp'>EGP</sup><span className="text-dark display-5">70</span>
                                            <h6 className="font-weight-light">MONTHLY</h6>
                                            {subscriptionId === '2' ? (
                                                <button className="btn btn-info-gradiant border-0 text-white p-2 btn-block mt-3 mb-0 mx-2" disabled>Your Current Plan</button>
                                            ) : (
                                                <button className="btn btn-info-gradiant border-0 text-white p-2 btn-block mt-3 mb-0 mx-2" onClick={handleSubscribe}>Subscribe</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-7 align-self-center">
                                        <ul className="list-inline pl-3 font-14 font-weight-medium text-dark">
                                            <li className="py-2"><i className="fa-solid fa-check mx-1"></i><span>AI Chat</span></li>
                                            <li className="py-2"><i className="fa-solid fa-check mx-1"></i><span>Plan Meetings with Tour Guide</span></li>
                                            <li className="py-2"><i className="fa-solid fa-check mx-1"></i><span>Online Trip Planning</span></li>
                                            <li className="py-2"><i className="fa-solid fa-check mx-1"></i><span>Reservation System</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
