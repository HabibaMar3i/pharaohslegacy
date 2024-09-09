import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feedback.css';
import Feedback from '../../Assets/tall (2).jpg';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast

const FeedbackPage = () => {
    const location = useLocation();
    const { orderId } = location.state;
    const [touristId, setTouristId] = useState('');

    useEffect(() => {
        const storedTouristId = localStorage.getItem('tourist_id');
        setTouristId(storedTouristId);
    }, []);

    const initialValues = {
        order_id: orderId,
        is_positive: true,
        comment: ''
    };

    const validationSchema = Yup.object({
        comment: Yup.string()
            .required('Comment is required')
            .max(500, 'Comment must be less than 500 characters'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
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
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <div className="container feedback-container">
            <div className="row justify-content-center feedback-form-container">
                <div className="col-md-6 p-0">
                    <img src={Feedback} alt="Feedback" className="feedback-image" />
                </div>
                <div className="col-md-6 p-0">
                    <div className="card h-100">
                        <div className="card-body">
                            <h3 className="card-title p-3 text-center">Feedback Form</h3>
                            <h5 className="card-title">We Value your Feedback</h5>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="comment">Do you have suggestions on what we can do to provide you with better service?</label>
                                            <Field as="textarea" name="comment" className="form-control" rows="4" />
                                            <ErrorMessage name="comment" component="div" className="text-danger" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Are you satisfied?</label>
                                            <div className="form-check">
                                                <Field type="radio" name="is_positive" value="true" className="form-check-input" id="feedbackRadioSatisfied" />
                                                <label className="form-check-label" htmlFor="feedbackRadioSatisfied">
                                                    Yes, I am satisfied.
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <Field type="radio" name="is_positive" value="false" className="form-check-input" id="feedbackRadioNotSatisfied" />
                                                <label className="form-check-label" htmlFor="feedbackRadioNotSatisfied">
                                                    No, I am not satisfied.
                                                </label>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-feedback w-100" disabled={isSubmitting}>
                                            {isSubmitting ? 'Sending...' : 'Send'}
                                        </button>

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;
