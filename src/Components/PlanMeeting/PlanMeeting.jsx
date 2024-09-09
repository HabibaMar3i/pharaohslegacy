import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './PlanMeeting.css';
import planpic from '../../Assets/footer (2).jpg';

const validationSchema = Yup.object({
    meeting_time: Yup.string().required("Meeting time is required"),
    meeting_date: Yup.string().required("Meeting date is required"),
    visit_start_date: Yup.string().required("Visit start date is required"),
    visit_end_date: Yup.string().required("Visit end date is required"),
    people_count: Yup.number().required("People count is required"),
    place: Yup.string().required("Place is required"),
    budget: Yup.number().required("Budget is required"),
    preference: Yup.string().required("Preference is required"),
    class: Yup.string().required("Class is required"),
});

function PlanMeeting() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const tourist_id = localStorage.getItem('tourist_id');
            const formData = new FormData();
            formData.append('meeting_time', values.meeting_time);
            formData.append('meeting_date', values.meeting_date);
            formData.append('visit_start_date', values.visit_start_date);
            formData.append('visit_end_date', values.visit_end_date);
            formData.append('people_count', values.people_count);
            formData.append('place', values.place);
            formData.append('budget', values.budget);
            formData.append('preference', values.preference);
            formData.append('class', values.class);
            formData.append('Tourist-Id', tourist_id);

            const headers = {
                'Content-Type': 'multipart/form-data',
                'Tourist-Id': tourist_id
            };

            const response = await axios.post('http://localhost/plan.php', formData, { headers });

            if (response.data.success) {
                formik.resetForm();
                toast.success('Meeting is planned successfully', { duration: 1000, position: 'top-center' });
                setIsSubmitted(true);
            } else {
                toast.error('Oops, Something went wrong..', { duration: 1000, position: 'top-center' });
            }
        } catch (error) {
            console.error('Plan meeting failed:', error.message);
            if (error.response && error.response.data) {
                alert(`Meeting plan creation failed: ${error.response.data.message}`);
            }
        }
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues: {
            meeting_time: '',
            meeting_date: '',
            visit_start_date: '',
            visit_end_date: '',
            people_count: '',
            place: '',
            budget: '',
            preference: '',
            class: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <div className="container plan-meeting-container">
            <div className="mt-5">
                <div className="card plan-meeting-card">
                    <h1 className="text-center m-2 section-title p-2">Plan Meeting</h1>
                    <div className="card-content">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <img src={planpic} alt="Tourist Attraction" className="form-image img-fluid mb-3 rounded" />
                            </div>
                            <div className="col-md-6">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="form-control"
                                                label="Meeting Time"
                                                id="meeting_time"
                                                name="meeting_time"
                                                placeholder="Specify the desired meeting time"
                                                value={formik.values.meeting_time}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.meeting_time && formik.errors.meeting_time ? (
                                                <div className="error-text">{formik.errors.meeting_time}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="form-control"
                                                label="Meeting Date"
                                                id="meeting_date"
                                                name="meeting_date"
                                                type="date"
                                                placeholder="Specify the meeting date"
                                                value={formik.values.meeting_date}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.meeting_date && formik.errors.meeting_date ? (
                                                <div className="error-text">{formik.errors.meeting_date}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="form-control"
                                                label="Visit Start Date"
                                                id="visit_start_date"
                                                name="visit_start_date"
                                                type="date"
                                                placeholder="Specify the visit start date"
                                                value={formik.values.visit_start_date}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.visit_start_date && formik.errors.visit_start_date ? (
                                                <div className="error-text">{formik.errors.visit_start_date}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="form-control"
                                                label="Visit End Date"
                                                id="visit_end_date"
                                                name="visit_end_date"
                                                type="date"
                                                placeholder="Specify the visit end date"
                                                value={formik.values.visit_end_date}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.visit_end_date && formik.errors.visit_end_date ? (
                                                <div className="error-text">{formik.errors.visit_end_date}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="form-control"
                                                label="People Count"
                                                id="people_count"
                                                name="people_count"
                                                type="number"
                                                placeholder="Specify the number of people"
                                                value={formik.values.people_count}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.people_count && formik.errors.people_count ? (
                                                <div className="error-text">{formik.errors.people_count}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="form-control"
                                                label="Place"
                                                id="place"
                                                name="place"
                                                placeholder="Specify the desired place"
                                                value={formik.values.place}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.place && formik.errors.place ? (
                                                <div className="error-text">{formik.errors.place}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="form-control"
                                                label="Class"
                                                id="class"
                                                name="class"
                                                placeholder="Specify the flight class"
                                                value={formik.values.class}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.class && formik.errors.class ? (
                                                <div className="error-text">{formik.errors.class}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                className="form-control"
                                                label="Budget"
                                                id="budget"
                                                name="budget"
                                                type="number"
                                                placeholder="Specify the budget"
                                                value={formik.values.budget}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.budget && formik.errors.budget ? (
                                                <div className="error-text">{formik.errors.budget}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <input
                                                className="form-control"
                                                label="Preference"
                                                id="preference"
                                                name="preference"
                                                placeholder="Specify any preferences"
                                                value={formik.values.preference}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.preference && formik.errors.preference ? (
                                                <div className="error-text">{formik.errors.preference}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className='btn btn-tickets'>
                                            Submit
                                        </button>
                                        {isSubmitted && (
                                            <div className="d-flex gap-2">
                                                <Link to="/meetingdetails" className="btn btn-tickets">
                                                    Go to Meeting Details
                                                </Link>
                                                <Link to="/relatives" className="btn btn-tickets">
                                                    Add Relative Details
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanMeeting;
