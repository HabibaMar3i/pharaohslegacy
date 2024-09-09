import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Services.css';

const fetchServices = async () => {
    const { data } = await axios.get('http://localhost/service.php');
    if (!data.success) {
        throw new Error(data.message);
    }
    return data.data;
};

const Services = ({ limit }) => {
    const [searchedServices, setSearchedServices] = useState([]);
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const [addedToCart, setAddedToCart] = useState({});

    const { data: services, error, isLoading } = useQuery('services', fetchServices, {
        cacheTime: 2000,
        refetchOnMount: false
    });

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        if (services) {
            let filteredServices = services;

            if (filterCategory !== 'all') {
                filteredServices = services.filter(service => service.category.toLowerCase() === filterCategory);
            }

            if (sortOrder === 'lowToHigh') {
                filteredServices.sort((a, b) => a.price - b.price);
            } else {
                filteredServices.sort((a, b) => b.price - a.price);
            }

            setSearchedServices(filteredServices);
        }
    }, [services, filterCategory, sortOrder]);

    async function addToCart(serviceId, quantity = 1, price) {
        try {
            const touristId = localStorage.getItem('tourist_id');
            if (!touristId) {
                throw new Error('Tourist-Id is missing from local storage');
            }

            const formData = new FormData();
            formData.append('service_id', serviceId);
            formData.append('quantity', quantity);
            formData.append('price', price);

            const response = await axios.post('http://localhost/add_s_cart.php', formData, {
                headers: {
                    'Tourist-Id': touristId,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Service added to cart successfully!');
            setAddedToCart(prev => ({ ...prev, [serviceId]: true }));
        } catch (error) {
            console.error('Error adding service to cart:', error);
            toast.error('Service already added');
        }
    }

    function searchService(e) {
        const term = e.target.value.toLowerCase();
        const filteredServices = services.filter(service =>
            service.name.toLowerCase().includes(term) || service.category.toLowerCase().includes(term)
        );
        setSearchedServices(filteredServices);
    }

    if (isLoading) return <div className="text-center loader-container"><ClipLoader color="#F9BA22" size={60} /></div>;
    if (error) return <div className="text-center text-danger">Error: {error.message}</div>;

    return (
        <div className="container mt-2 services-container ">
            <h1 className="text-center mb-4 p-2 section-title">Our Services</h1>
            <Toaster />
            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control services-search-input"
                        placeholder="Search for services..."
                        onChange={searchService}
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-select" onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value="all">All Categories</option>
                        <option value="hotel">Hotel</option>
                        <option value="car">Car</option>
                        <option value="flight">Flight</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="row">
                {searchedServices.slice(0, limit).map((service, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                        <div className="card services-card" >
                            <img className="card-img-top services-image" src={service.image} alt={service.name} />
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="services-card-title">{service.name}</h5>
                                    <span className="services-price">{service.price} EGP</span>
                                </div>
                                <p className="services-card-text">{service.description}</p>
                            </div>
                            <div className="services-category-overlay">
                                {service.category}
                            </div>
                            <div className="services-cart-icon-overlay">
                                {addedToCart[service.service_id] ? (
                                    <Link to="/cart" className="btn btn-logout">
                                        Go to Cart
                                    </Link>
                                ) : (
                                    <button onClick={() => addToCart(service.service_id, 1, service.price)} className="btn btn-logout add-cart-icon">
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
