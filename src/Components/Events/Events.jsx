import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Events.css';

const fetchEvents = async () => {
    const { data } = await axios.get('http://localhost/events2.php');
    if (!data.success) {
        throw new Error(data.message);
    }
    return data.data;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return { month, day, year };
};

const Events = ({ limit }) => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const { data: events, error, isLoading } = useQuery('events', fetchEvents, {
        cacheTime: 2000,
        refetchOnMount: false
    });

    if (isLoading) return (
        <div className="text-center loader-container">
            <ClipLoader color="#F9BA22" size={60}/>
        </div>
    );
    if (error) return <div className="text-center text-danger">Error: {error.message}</div>;

    return (
        <div className="container events-container mt-5">
            <h1 className="text-center mb-4 p-2 section-title" >Upcoming Events</h1>
            {events.slice(0, limit).map(event => {
                const { month, day, year } = formatDate(event.date);
                return (
                    <div className="card event-card mb-4" key={event.event_id} >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <div className="event-image-container">
                                    <img src={event.picture} alt={event.event_name} className="img-fluid event-image" />
                                    <div className="event-date-overlay">
                                        <div className="event-date-day">{day}</div>
                                        <div className="event-date-month">{month}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body event-details">
                                    <h3 className="event-title">{event.event_name}</h3>
                                    <p className="event-description">{event.event_description}</p>
                                    <p className="event-organizer"><i className="fas fa-user"></i> <strong>Organizer:</strong> {event.organizer}</p>
                                    {event.ticket_price && <p className="event-ticket-price"><i className="fas fa-ticket-alt"></i> <strong>Ticket Price:</strong> {event.ticket_price}</p>}
                                    <a href={event.event_link} className="btn btn-tickets w-100 event-link" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i> Get Tickets</a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Events;
