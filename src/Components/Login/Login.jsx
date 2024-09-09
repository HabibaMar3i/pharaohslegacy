import React from 'react';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min(2, 'Password is too short')
        .max(14, 'Password is too long')
        .required('Password is required'),
});

function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                let params = new URLSearchParams();
                params.append('email', values.email);
                params.append('password', values.password);

                const response = await axios.post(
                    'http://localhost/login1.php',
                    params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );

                if (response.data.success) {
                    localStorage.setItem('user_type', response.data.user_type);
                    localStorage.setItem('session_id', response.data.session_id);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('name', response.data.name);

                    if (response.data.user_type === 'admin') {
                        localStorage.setItem('admin_id', response.data.person_data.admin_id);
                        window.location.href = '/adminhomepage'; 
                    } else if (response.data.user_type === 'tourist') {
                        localStorage.setItem('tourist_id', response.data.person_data.tourist_id);
                        localStorage.setItem('subscription_id', response.data.person_data.subscription_id);
                        window.location.href = '/homepage';
                    } else if (response.data.user_type === 'tour_personnel') {
                        localStorage.setItem('tp_id', response.data.person_data.tp_id);
                    }

                    formik.resetForm();
                    Cookies.set('user_type', response.data.user_type);
                    Cookies.set('PHPSESSID', response.data.session_id);
                    Cookies.set('tourist_id', response.data.person_data.tourist_id);

                    toast.success('Login successful!');
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                toast.error(`Login failed: ${error.message}`);
                console.error('Login failed:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });
    
    return (
        <section className="h-100 gradient-form login-form">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="login-card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center p-4">
                                            <img src="https://pics.clipartpng.com/Egypt_Pyramids_PNG_Clip_Art-3128.png"
                                                style={{ width: '185px' }} alt="logo" />
                                        </div>

                                        <form onSubmit={formik.handleSubmit}>
                                            <p>Please login to your account</p>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Enter your Email address"
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="text-danger">{formik.errors.email}</div>
                                                ) : null}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                    name="password"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="text-danger">{formik.errors.password}</div>
                                                ) : null}
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    className="btn btn-login btn-block fa-lg mb-3"
                                                    type="submit"
                                                >
                                                    {formik.isSubmitting ? 'Logging in...' : 'Log in'}
                                                </button>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Don't have an account?</p>
                                                <button type="button" className="btn btn-login">
                                                    <Link className='link-register' to="/register">Create new</Link>
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Pharaohs Legacy is dedicated to revolutionizing the tourism experience in Egypt. By leveraging modern technology, we provide comprehensive user-friendly resources and services tailored to travelers interested in exploring ancient Egyptian heritage. Our platform offers detailed and engaging resources, to help tourists plan their trips effectively. We integrate AI-powered tools to enhance user interaction and ensure transparent pricing for all services, promoting sustainable tourism and supporting local economies.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
