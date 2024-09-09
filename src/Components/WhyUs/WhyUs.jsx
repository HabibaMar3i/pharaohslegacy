import React from 'react';
import './WhyUs.css';
import imageLeft from '../../Assets/whyus (1).jpg';
import imageRight from '../../Assets/whyus (2).jpg';

const WhyUs = () => {
    return (
        <section className="why-us">
            <h2 className="section-title text-center">Why Choose Us?</h2>
            <div className="why-us-content">
                <div className="why-us-image">
                    <img src={imageLeft} alt="Why Us Left" className="image-left"/>
                </div>
                <div className="why-us-text">
                    <ul>
                        <li>Expert tour guides with in-depth knowledge of Egyptian history and culture.</li>
                        <li>Personalized itineraries to suit your interests and preferences.</li>
                        <li>Seamless booking process and excellent customer service.</li>
                        <li>Commitment to sustainable tourism and supporting local communities.</li>
                    </ul>
                </div>
                <div className="why-us-image">
                    <img src={imageRight} alt="Why Us Right" className="image-right"/>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
