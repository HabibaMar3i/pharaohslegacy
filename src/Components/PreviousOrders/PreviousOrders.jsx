import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Box, Typography, Button, Fade, Backdrop } from '@mui/material';
import toast from 'react-hot-toast';
import '../Order/Order.css';  // Use the same CSS file for styling

const PreviousOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [touristId, setTouristId] = useState('');

    const fetchOrderDetails = async () => {
        try {
            const touristId = localStorage.getItem('tourist_id');
            const response = await axios.get('http://localhost/previous_order.php', {
                headers: {
                    'Tourist-Id': touristId
                }
            });

            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                setError('Failed to fetch order details');
            }
        } catch (err) {
            setError(`Error fetching order details: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = (orderId) => {
        setSelectedOrderId(orderId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const storedTouristId = localStorage.getItem('tourist_id');
        setTouristId(storedTouristId);
        fetchOrderDetails();
    }, []);

    const validationSchema = Yup.object({
        comment: Yup.string()
            .required('Comment is required')
            .max(500, 'Comment must be less than 500 characters'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('http://localhost/feedback.php', values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Tourist-Id': touristId
                }
            });
            console.log('Success:', response.data);
            toast.success('Thank you for your feedback!');
            resetForm();
            handleClose();
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container order-container mt-5">
            <h2 className="section-title text-center">Previous Orders</h2>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div className="card mb-4" key={order.order_id}>
                        <div className="card-body">
                            <h5 className="card-title">Order ID: {order.order_id}</h5>
                            <p className="card-text">Total Quantity: {order.total_quantity}</p>
                            <p className="card-text">Total Price: {order.total_price} EGP</p>

                            <div className="accordion" id={`orderDetailsAccordion${order.order_id}`}>
                                {order.order_details.products && order.order_details.products.length > 0 && (
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`productsHeading${order.order_id}`}>
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#productsCollapse${order.order_id}`}
                                                aria-expanded="true"
                                                aria-controls={`productsCollapse${order.order_id}`}
                                            >
                                                Products
                                            </button>
                                        </h2>
                                        <div
                                            id={`productsCollapse${order.order_id}`}
                                            className="accordion-collapse collapse show"
                                            aria-labelledby={`productsHeading${order.order_id}`}
                                            data-bs-parent={`#orderDetailsAccordion${order.order_id}`}
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
                                {order.order_details.services && order.order_details.services.length > 0 && (
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`servicesHeading${order.order_id}`}>
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#servicesCollapse${order.order_id}`}
                                                aria-expanded="false"
                                                aria-controls={`servicesCollapse${order.order_id}`}
                                            >
                                                Services
                                            </button>
                                        </h2>
                                        <div
                                            id={`servicesCollapse${order.order_id}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`servicesHeading${order.order_id}`}
                                            data-bs-parent={`#orderDetailsAccordion${order.order_id}`}
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

                            <button className="btn btn-subscribe mt-3" onClick={() => handleOpen(order.order_id)}>Make a Feedback</button>
                        </div>
                    </div>
                ))
            ) : (
                <div>No order details available</div>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={{ ...modalStyle, width: 600 }}>
                        <Typography variant="h6" component="h2" sx={{ color: '#302e2f' }}>
                            Feedback Form
                        </Typography>
                        <Formik
                            initialValues={{
                                order_id: selectedOrderId,
                                is_positive: true,
                                comment: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="comment" style={{ color: '#302e2f' }}>Do you have suggestions on what we can do to provide you with better service?</label>
                                        <Field as="textarea" name="comment" className="form-control" rows="4" />
                                        <ErrorMessage name="comment" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" style={{ color: '#302e2f' }}>Are you satisfied?</label>
                                        <div className="form-check">
                                            <Field type="radio" name="is_positive" value="true" className="form-check-input" id="feedbackRadioSatisfied" />
                                            <label className="form-check-label" htmlFor="feedbackRadioSatisfied" style={{ color: '#302e2f' }}>
                                                Yes, I am satisfied.
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <Field type="radio" name="is_positive" value="false" className="form-check-input" id="feedbackRadioNotSatisfied" />
                                            <label className="form-check-label" htmlFor="feedbackRadioNotSatisfied" style={{ color: '#302e2f' }}>
                                                No, I am not satisfied.
                                            </label>
                                        </div>
                                    </div>

                                    <Button type="submit" variant="contained" className='btn btn-logout' disabled={isSubmitting} fullWidth>
                                        {isSubmitting ? 'Sending...' : 'Send'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#cacaca',  // Light sand color for background
    border: '2px solid #302e2f',  // Terracotta color for border
    boxShadow: 24,
    p: 4,
};

export default PreviousOrders;
