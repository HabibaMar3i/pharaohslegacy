import React from 'react';
import './OurGallery.css';
import image1 from '../../Assets/gallery (1).jpg';
import image2 from '../../Assets/gallery (2).jpg';
import image3 from '../../Assets/gallery (3).jpg';
import image4 from '../../Assets/gallery (4).jpg';
import image5 from '../../Assets/gallery (5).jpg';
import image6 from '../../Assets/gallery (6).jpg';

const OurGallery = () => {
    const images = [image1, image2, image3, image4, image5, image6];

    return (
        <section className="our-gallery">
            <h2 className="section-title text-center">Our Gallery</h2>
            <div className="gallery-container">
                {images.map((image, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={image} alt={`Gallery item ${index + 1}`} className="gallery-image"/>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurGallery;
