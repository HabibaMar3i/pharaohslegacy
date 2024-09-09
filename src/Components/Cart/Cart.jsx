import React, { useEffect, useState } from 'react';
import './Cart.css';
import toast, { Toaster } from 'react-hot-toast';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartUpdated, setCartUpdated] = useState(false);

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const touristId = localStorage.getItem('tourist_id');
                if (!touristId) {
                    console.error('Tourist ID not found');
                    return;
                }
                const response = await fetch('http://localhost/showcart.php', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Tourist-Id': touristId
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setCartItems(data.data);
                    setTotalPrice(data.total_price);
                    const quantities = data.data.reduce((acc, item) => {
                        acc[item.product_cart_id || item.service_cart_id] = item.quantity;
                        return acc;
                    }, {});
                    localStorage.setItem('cartQuantities', JSON.stringify(quantities));
                } else {
                    console.error('Failed to fetch cart details:', data.error);
                }
            } catch (error) {
                console.error('Error fetching cart details:', error);
            }
        };

        fetchCartDetails();
    }, [cartUpdated]);

    const removeFromCart = async (itemId, isService) => {
        try {
            const url = isService ? `http://localhost/del_s_cart.php?service_cart_id=${itemId}` : `http://localhost/del_p_cart.php?product_cart_id=${itemId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if (responseData.success) {
                setCartUpdated(prev => !prev);
                updateLocalStorageQuantities(itemId, 0);
            } else {
                console.error('Failed to remove item from cart:', responseData.error);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId, false);
            return;
        }

        try {
            const response = await fetch('http://localhost/squantity_update.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    product_cart_id: productId,
                    quantity: quantity
                })
            });
            const responseData = await response.json();
            if (responseData.success) {
                setCartUpdated(prev => !prev);
                updateLocalStorageQuantities(productId, quantity);
            } else {
                console.error('Failed to update quantity:', responseData.error);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const updateLocalStorageQuantities = (productId, quantity) => {
        const storedQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};
        if (quantity > 0) {
            storedQuantities[productId] = quantity;
        } else {
            delete storedQuantities[productId];
        }
        localStorage.setItem('cartQuantities', JSON.stringify(storedQuantities));
    };

    const proceedToOrder = async () => {
        try {
            const touristId = localStorage.getItem('tourist_id');
            if (!touristId) {
                console.error('Tourist ID not found');
                return;
            }
            const response = await fetch('http://localhost/order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Tourist-Id': touristId
                }
            });
            const responseData = await response.json();
            if (responseData.success) {
                toast("Order placed successfully");
                setCartItems([]);
                setTotalPrice(0);
                localStorage.removeItem('cartQuantities');
                window.location.href = '/order';
            } else {
                console.error('Failed to place order:', responseData.error);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="cart-container mt-5">
        <Toaster/>
            <h1 className="text-center mb-4 p-2 section-title">Your Shopping Cart</h1>
            <div className="cart-total-price">Total Cart Price: {totalPrice} EGP</div>
            {cartItems.length === 0 && (
                <div className="text-center">Your cart is empty.</div>
            )}
            {cartItems.map(item => (
                <div className="cart-card mb-3 card" key={item.product_cart_id || item.service_cart_id}>
                    <div className="cart-row row g-0">
                        <div className="cart-image-container col-md-4">
                            <img src={item.item_picture} className="cart-item-image img-fluid rounded-start" alt={item.item_name} />
                        </div>
                        <div className="cart-details col-md-8">
                            <div className="cart-body card-body">
                                <h5 className="cart-item-title card-title">{item.item_name}</h5>
                                <p className="cart-item-price card-text">Price: {item.price} EGP</p>
                                <div className="cart-item-actions">
                                    {item.product_cart_id ? (
                                        <div className="cart-quantity-controls">
                                            <button onClick={() => updateQuantity(item.product_cart_id, item.quantity - 1)} className="cart-quantity-decrease btn btn-outline-secondary me-2">
                                                {item.quantity > 1 ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-trash"></i>}
                                            </button>
                                            <span className="cart-quantity-display">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product_cart_id, parseInt(item.quantity, 10) + 1)} className="cart-quantity-increase btn btn-outline-secondary ms-2">
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                            <button className="cart-remove-button btn btn-danger ms-2" onClick={() => removeFromCart(item.product_cart_id, false)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="cart-remove-button btn btn-danger" onClick={() => removeFromCart(item.service_cart_id, true)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="cart-actions mt-4">
                {totalPrice > 0 && (
                    <button className="cart-order-button btn btn-logout" onClick={proceedToOrder}>Proceed to Order</button>
                )}
            </div>
        </div>
    );
};

export default Cart;

