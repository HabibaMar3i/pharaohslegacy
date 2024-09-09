import React from 'react';
import './AboutUsSection.css';

const AboutUsSection = () => {
    return (
        <section className="about-us-section">
            <div className="about-us-overlay">
                <h2 className="section-title text-center">About Us</h2>
                <div className="about-us-section-content">
                    <div className="about-us-section-text">
                        <p>
                            Pharaohs Legacy is dedicated to revolutionizing the tourism experience in Egypt. By leveraging modern technology, we provide comprehensive user-friendly resources and services tailored to travelers interested in exploring ancient Egyptian heritage. Our platform offers detailed and engaging resources to help tourists plan their trips effectively.
                        </p>
                        <p>
                            Our mission is to make the exploration of Egypt's rich history accessible and enjoyable for everyone. We offer a variety of services, including guided tours, historical insights, and customized travel plans. Whether you're a history enthusiast or a casual traveler, Pharaohs Legacy ensures an unforgettable journey through the ancient wonders of Egypt.
                        </p>
                        <p>
                            Join us as we delve into the mysteries of the pyramids, discover the secrets of the pharaohs, and experience the grandeur of ancient Egyptian civilization. With Pharaohs Legacy, your adventure in Egypt is in safe and knowledgeable hands.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
