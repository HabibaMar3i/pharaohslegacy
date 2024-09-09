import React from 'react';
import { Button } from 'react-bootstrap';
import heroImage from '../../Assets/homepagecarousel (1).jpg'; // replace with the path to your hero image
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero-section">
            <img src={heroImage} className="hero-image" alt="Hero" />
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1>Discover the Legacy of the Pharaohs</h1>
                <p>Explore ancient wonders and unravel the mysteries of Egyptian civilization.</p>
                <Button variant="primary" size="lg" className="hero-button">Explore Now</Button>
            </div>
        </div>
    );
};

export default Hero;
