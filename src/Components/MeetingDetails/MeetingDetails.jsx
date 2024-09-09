import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './MeetingDetails.css';

const Meeting = () => {
    const [meeting, setMeeting] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
    }, []);

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const tourist_id = localStorage.getItem('tourist_id');
                const headers = {
                    'Tourist-Id': tourist_id
                };
                const response = await axios.get('http://localhost/meeting.php', { headers });
                if (response.data.success) {
                    setMeeting(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        fetchMeeting();
    }, []);

    if (!meeting) {
        return (
            <div className="meeting-container">
                <div className="background-image"></div>
                <div className="meeting-card-overlay" data-aos="fade-up">
                    <h1 className="heading">Upcoming Meeting</h1>
                    {error && <p className="error-message">Error: {error}</p>}
                    <p className="loading">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="meeting-container">
            <div className="background-image"></div>
            <div className="meeting-card-overlay" data-aos="zoom-in">
                <h1 className="section-title">Upcoming Meeting</h1>
                {error && <p className="error-message">Error: {error}</p>}
                <div className="meeting-card">
                    <div className="meeting-header text-center">
                        <p className="confirmation">Your appointment is confirmed</p>
                        <div className="text-center">
                            with {meeting.tourguidename}
                        </div>
                    </div>
                    <div className="meeting-details">
                        <p className="location">{meeting.location}</p>
                        <p className="date-time">{meeting.meeting_date} - {meeting.meeting_time}</p>
                    </div>
                    <a href={meeting.meeting_link} className="reschedule-btn" target="_blank" rel="noopener noreferrer">
                        Join Meeting
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Meeting;
