import React, { useState, useEffect } from 'react';
import { Card, Modal, Carousel } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import './Wishlist.css';

const fetchWishlist = async () => {
    const touristId = localStorage.getItem('tourist_id');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Tourist-Id': touristId
        }
    };
    const response = await fetch('http://localhost/wishlistshow.php', requestOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.map(place => ({
        ...place,
        pictures: [place.pic1, place.pic2, place.pic3, place.pic4].filter(pic => pic)
    }));
};

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        const loadWishlist = async () => {
            try {
                const data = await fetchWishlist();
                setWishlist(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setWishlist([]);
            }
        };

        loadWishlist();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPlace(null);
    };

    const handleRemoveFromWishlist = async (placeId) => {
        const touristId = localStorage.getItem('tourist_id');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Tourist-Id': touristId
            },
            body: JSON.stringify({ place_id: placeId })
        };
        try {
            const response = await fetch('http://localhost/delete_item.php', requestOptions);
            if (!response.ok) {
                throw new Error('Failed to remove from wishlist');
            }
            const updatedWishlist = wishlist.filter(item => item.place_id !== placeId);
            setWishlist(updatedWishlist);
            toast.success('Removed from wishlist successfully!');
        } catch (error) {
            toast.error('Failed to remove from wishlist. Please try again later.');
            console.error(error);
        }
    };

    return (
        <div className="wishlist-container container">
            <h1 className="text-center mb-4 p-2 section-title">Your Wishlist</h1>
            <Toaster />
            {loading ? (
                <div className="text-center loader-container">
                    <ClipLoader color="#a2801b" size={60} />
                </div>
            ) : (
                <div className="row">
                    {wishlist.map(place => (
                        <div key={place.place_id} className="col-md-4">
                            <Card className="historic-place-card h-100" onClick={() => {
                                setSelectedPlace(place);
                                setShowModal(true);
                            }}>
                                <div className="position-relative">
                                    <Carousel className="card-img-top">
                                        {place.pictures.map((pic, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    className="d-block w-100 place-img"
                                                    src={`http://localhost/${pic}`}
                                                    alt={`Slide ${index + 1}`}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                    <i className="fas fa-heart heart-icon added-to-wishlist"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFromWishlist(place.place_id);
                                        }}
                                    ></i>
                                </div>
                                <Card.Body>
                                    <Card.Title className="place-title text-center">{place.place_name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            {selectedPlace && (
                <Modal show={!!selectedPlace} onHide={handleCloseModal} centered>
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
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default Wishlist;
