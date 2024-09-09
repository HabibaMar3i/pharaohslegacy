import './Register.css';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Registration from '../../Assets/Registeration.jpg';
import toast, { Toaster } from 'react-hot-toast';

const validationSchema = Yup.object({
    firstname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name is required"),
    lastname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Too Short").max(14, "Too Long!").required("Password is required"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match").required("Confirmation password is required"),
    phone: Yup.string().required("Phone number is required"),
    DOB: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    language: Yup.string().required("Language is required"),
    ssn: Yup.string().required("SSN is required"),
    passportNO: Yup.string().required("Passport number is required"),
    nationality: Yup.string().required("Nationality is required"),
    address: Yup.string().required("Address is required"),
    postalcode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required")
});

function Register() {
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');

    async function getRegister(values, { setSubmitting }) {
        try {
            let formData = new FormData();
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });

            const response = await axios.post('http://localhost/register.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Registration successful!');
                formik.resetForm();
                navigate('/login');
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.response) {
                console.log('Response status:', error.response.status);
                console.log('Response data:', error.response.data);
                console.log('Response headers:', error.response.headers);
            }
            toast.error('Registration failed: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            firstname: '', lastname: '', email: '', password: '', confirmpassword: '', phone: '', DOB: '', gender: '', language: '', ssn: '', passportNO: '', nationality: '', address: '', postalcode: '', country: '', city: '', street: ''
        },
        validationSchema,
        onSubmit: getRegister
    });

    return (
        <section className="h-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-5 d-none d-xl-block">
                                    <img src={Registration} alt="Registeration" className="img-fluid" style={{ borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem", height: "920px", width:"720px" }} />
                                </div>
                                <div className="col-xl-7">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="text-center text-bold mb-4">Register Now</h3>
                                        <Toaster />
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="firstname" name="firstname" type="text" placeholder="First Name" value={formik.values.firstname} onChange={formik.handleChange} />
                                                    {formik.touched.firstname && formik.errors.firstname ? (<div className="text-danger">{formik.errors.firstname}</div>) : null}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="lastname" name="lastname" type="text" placeholder="Last Name" value={formik.values.lastname} onChange={formik.handleChange} />
                                                    {formik.touched.lastname && formik.errors.lastname ? (<div className="text-danger">{formik.errors.lastname}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <input className="form-control" id="email" name="email" type="email" placeholder="Email Address" value={formik.values.email} onChange={formik.handleChange} />
                                                {formik.touched.email && formik.errors.email ? (<div className="text-danger">{formik.errors.email}</div>) : null}
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="password" name="password" type="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                                                    {formik.touched.password && formik.errors.password ? (<div className="text-danger">{formik.errors.password}</div>) : null}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="confirmpassword" name="confirmpassword" type="password" placeholder="Confirm Password" value={formik.values.confirmpassword} onChange={formik.handleChange} />
                                                    {formik.touched.confirmpassword && formik.errors.confirmpassword ? (<div className="text-danger">{formik.errors.confirmpassword}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="phone" name="phone" type="text" placeholder="Phone Number" value={formik.values.phone} onChange={formik.handleChange} />
                                                    {formik.touched.phone && formik.errors.phone ? (<div className="text-danger">{formik.errors.phone}</div>) : null}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="DOB" name="DOB" type="date" placeholder="Date of Birth" value={formik.values.DOB} onChange={formik.handleChange} />
                                                    {formik.touched.DOB && formik.errors.DOB ? (<div className="text-danger">{formik.errors.DOB}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="gender" name="gender" type="text" placeholder="Gender" value={formik.values.gender} onChange={formik.handleChange} />
                                                    {formik.touched.gender && formik.errors.gender ? (<div className="text-danger">{formik.errors.gender}</div>) : null}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="language" name="language" type="text" placeholder="Language" value={formik.values.language} onChange={formik.handleChange} />
                                                    {formik.touched.language && formik.errors.language ? (<div className="text-danger">{formik.errors.language}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="ssn" name="ssn" type="text" placeholder="SSN" value={formik.values.ssn} onChange={formik.handleChange} />
                                                    {formik.touched.ssn && formik.errors.ssn ? (<div className="text-danger">{formik.errors.ssn}</div>) : null}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="passportNO" name="passportNO" type="text" placeholder="Passport Number" value={formik.values.passportNO} onChange={formik.handleChange} />
                                                    {formik.touched.passportNO && formik.errors.passportNO ? (<div className="text-danger">{formik.errors.passportNO}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="nationality" name="nationality" type="text" placeholder="Nationality" value={formik.values.nationality} onChange={formik.handleChange} />
                                                    {formik.touched.nationality && formik.errors.nationality ? (<div className="text-danger">{formik.errors.nationality}</div>) : null}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="address" name="address" type="text" placeholder="Address" value={formik.values.address} onChange={formik.handleChange} />
                                                    {formik.touched.address && formik.errors.address ? (<div className="text-danger">{formik.errors.address}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="postalcode" name="postalcode" type="text" placeholder="Postal Code" value={formik.values.postalcode} onChange={formik.handleChange} />
                                                    {formik.touched.postalcode && formik.errors.postalcode ? (<div className="text-danger">{formik.errors.postalcode}</div>) : null}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="country" name="country" type="text" placeholder="Country" value={formik.values.country} onChange={formik.handleChange} />
                                                    {formik.touched.country && formik.errors.country ? (<div className="text-danger">{formik.errors.country}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="city" name="city" type="text" placeholder="City" value={formik.values.city} onChange={formik.handleChange} />
                                                    {formik.touched.city && formik.errors.city ? (<div className="text-danger">{formik.errors.city}</div>) : null}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <input className="form-control" id="street" name="street" type="text" placeholder="Street" value={formik.values.street} onChange={formik.handleChange} />
                                                    {formik.touched.street && formik.errors.street ? (<div className="text-danger">{formik.errors.street}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="signin-form text-center">
                                                <button type="submit" className="btn btn-submit px-4">Submit</button>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="mb-0 me-2">Already have an account?</p>
                                                <button type="button" className="btn btn-outline-dark">
                                                    <Link className="login-link" to="/login">Log in</Link>
                                                </button>
                                            </div>
                                        </form>
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

export default Register;
