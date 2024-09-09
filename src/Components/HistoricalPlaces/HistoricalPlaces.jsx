import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Carousel from 'react-bootstrap/Carousel';
import { Modal } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HistoricalPlaces.css';

const fetchHistoricalPlaces = async () => {
    const response = await fetch('http://localhost/historical_places.php');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const addToWishList = async (placeId) => {
    const touristId = localStorage.getItem('tourist_id');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tourist-Id': touristId
        },
        body: JSON.stringify({
            action: 'add',
            place_id: placeId
        })
    };
    const response = await fetch('http://localhost/wishlist_place.php', requestOptions);
    if (!response.ok) {
        throw new Error('Failed to add to wish list');
    }
};

const HistoricalPlaces = ({ limit }) => {
    const { data: places, error, isLoading } = useQuery('historicalPlaces', fetchHistoricalPlaces, {
        cacheTime: 3600000, // Cache for 1 hour (3600 seconds * 1000 milliseconds)
        refetchOnMount: false
    });

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [wishlist, setWishlist] = useState({});

    const handleClose = () => setSelectedPlace(null);

    const handleAddToWishList = async (placeId, e) => {
        e.stopPropagation(); // Prevent modal from opening
        try {
            await addToWishList(placeId);
            setWishlist(prevWishlist => ({ ...prevWishlist, [placeId]: true }));
            toast.success('Added to wish list successfully!');
        } catch (error) {
            toast.error('Failed to add to wish list. Please try again later.');
            console.error(error);
        }
    };

    if (isLoading) return (
        <div className="text-center loader-container">
            <ClipLoader color="#F9BA22" size={60} />
        </div>
    );
    if (error) return <div className="text-center text-danger">An error has occurred: {error.message}</div>;

    return (
        <div className="container historical-places-container">
            <h1 className="text-center mb-4 p-2 section-title">Historical Places</h1>
            <Toaster />
            <div className="row mb-4">
                {places?.data.slice(0, limit).map(place => (
                    <div key={place.place_id} className="col-sm-6 col-md-4 col-lg-4 mb-5">
                        <div className="card h-100 place-card">
                            <div className="position-relative">
                                <Carousel>
                                    {place.pictures.map((pic, index) => (
                                        <Carousel.Item key={index}>
                                            <img src={pic} className="d-block w-100 card-img-top place-img" alt={`Slide ${index}`} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <i className={`fas fa-heart heart-icon ${wishlist[place.place_id] ? 'added-to-wishlist' : ''}`}
                                    onClick={(e) => handleAddToWishList(place.place_id, e)}
                                ></i>
                                <div className="card-overlay" onClick={() => setSelectedPlace(place)}></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title place-title text-center">{place.place_name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPlace && (
                <Modal show={!!selectedPlace} onHide={handleClose} centered>
                    <Modal.Header closeButton className="modal-header">
                        <Modal.Title>{selectedPlace.place_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <p>{selectedPlace.place_description}</p>
                        <iframe
                            title={selectedPlace.place_name}
                            width="100%"
                            height="200"
                            src={selectedPlace.maps}
                        ></iframe>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default HistoricalPlaces;
