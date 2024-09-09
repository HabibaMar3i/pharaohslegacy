import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AboutUs.css';
import historicalPhoto from '../../Assets/homepagecarousel (1).jpg';
import ourVisionImage from '../../Assets/our-vision.jpg';
import ourMissionImage from '../../Assets/our-mission.jpg';

const AboutUs = () => {
    const ownerData = [
        { name: 'Habiba Hassan', initials: 'HH' },
        { name: 'Dina Ahmed', initials: 'DA' },
        { name: 'Roaa Khalid', initials: 'RK' },
        { name: 'Passant Mohamed', initials: 'PM' },
        { name: 'Fareeda Mohamed', initials: 'FM' },
        { name: 'Lobna Ihab', initials: 'LI' },
    ];

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className="container py-5 about-us-container" data-aos="fade-up">
            <div className="row">
                <div className="col-md-9 mx-auto">
                    <section className="about-section mb-4" >
                        <h1 className="section-title text-center">About Pharaohs Legacy</h1>
                        <h2 className="about-subtitle text-center">Bridging the Past and the Present</h2>
                        <p className="about-description">
                            Pharaohs Legacy is dedicated to enhancing the tourism experience in Egypt by providing comprehensive resources and services tailored to the needs of travelers. Our mission is to celebrate and preserve Egypt's rich cultural heritage while promoting sustainable and responsible tourism practices.
                        </p>
                    </section>

                    <hr className="my-4" />

                    <section className="about-section mb-4" >
                        <h2 className="section-title text-center">Our Story</h2>
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center">
                                <img src={historicalPhoto} alt="Historical Egypt" className="img-fluid mb-3 rounded" />
                            </div>
                            <div className="col-md-6 text-center">
                                <p className="section-description">
                                    Pharaohs Legacy was founded with the vision of making Egypt's ancient wonders accessible and engaging for tourists from around the world. We are passionate about history and committed to providing authentic experiences that highlight the grandeur of ancient Egyptian civilization.
                                </p>
                            </div>
                        </div>
                    </section>

                    <hr className="my-4" />

                    <section className="about-section mb-4" >
                        <h2 className="section-title text-center">Meet Our Team</h2>
                        <div className="row">
                            {ownerData.map(owner => (
                                <div className="col-md-4 mb-3" key={owner.name}>
                                    <div className="card team-card h-100">
                                        <div className="card-img-top rounded-circle avatar-icon">
                                            {owner.initials}
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{owner.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="my-4" />

                    <section className="about-section mb-4" >
                        <h2 className="section-title text-center">Our Vision</h2>
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center">
                                <img src={ourVisionImage} alt="Our Vision" className="img-fluid mb-3 rounded" />
                            </div>
                            <div className="col-md-6 text-center">
                                <p className="section-description">
                                    Our vision is to be the leading authority on ancient Egyptian history and culture, inspiring curiosity, discovery, and appreciation for this timeless civilization. We envision a world where the wonders of Egypt are accessible to all, fostering cross-cultural understanding and appreciation.
                                </p>
                            </div>
                        </div>
                    </section>

                    <hr className="my-4" />

                    <section className="about-section mb-4" >
                        <h2 className="section-title text-center">Our Mission</h2>
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center">
                                <p className="section-description">
                                    Our mission is to provide unparalleled experiences that bring ancient Egypt to life, enriching travelers' lives through immersive tours, educational resources, and cultural exchanges. We are committed to preserving Egypt's cultural heritage, promoting sustainable tourism practices, and contributing to the communities we serve.
                                </p>
                            </div>
                            <div className="col-md-6 text-center">
                                <img src={ourMissionImage} alt="Our Mission" className="img-fluid mb-3 rounded" />
                            </div>
                        </div>
                    </section>

                    <hr className="my-4" />

                    <section className="about-section mb-4" >
                        <h2 className="section-title text-center">Our Core Values</h2>
                        <div className="row">
                            {['Heritage Preservation', 'Authenticity', 'Sustainability', 'Transparency', 'Inclusivity', 'Excellence', 'Innovation', 'Education', 'Responsibility'].map((value, index) => (
                                <div className="col-md-4 mb-3" key={index}>
                                    <div className="card core-value-card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title mb-1 text-center">{value}</h5>
                                            <p className="card-text">{valueDescriptions[value]}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="my-4" />

                    <section className="about-section mb-4" >
                        <h2 className="section-title text-center">Our Services</h2>
                        <div className="row">
                            {['Travel Planning Assistance', 'AI-Powered Features', 'Souvenir Marketplace'].map((service, index) => (
                                <div className="col-md-4 mb-3" key={index}>
                                    <div className="card service-card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title mb-1 text-center">{service}</h5>
                                            <p className="card-text">{serviceDescriptions[service]}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="my-4" />

                    <section className="about-section mb-4" >
                        <h2 className="section-title text-center">Get in Touch</h2>
                        <p className="section-description text-center">
                            We would love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out to us.
                        </p>
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <p className="section-description">
                                    <i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> Banks Center St, New Cairo 1, Cairo Governorate 4730112, Egypt
                                </p>
                                <p className="section-description">
                                    <i className="fas fa-phone"></i> <strong>Phone:</strong> +20 1XX XXX XXXX
                                </p>
                                <p className="section-description">
                                    <i className="fas fa-envelope"></i> <strong>Email:</strong> support@pharaohslegacy.com
                                </p>
                            </div>
                            <div className="col-md-6 text-center">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13818.648658981898!2d31.406946627979774!3d30.017855538688416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d028cb4e5c9%3A0x30387fde5456377b!2sMakateb!5e0!3m2!1sen!2seg!4v1713055553427!5m2!1sen!2seg"
                                    width="100%"
                                    height="350"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                ></iframe>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const valueDescriptions = {
    'Heritage Preservation': 'Committed to preserving and safeguarding the rich cultural heritage of ancient Egypt for future generations.',
    'Authenticity': 'Upholding authenticity in all aspects of our project, from content creation to souvenirs and experiences.',
    'Sustainability': 'Promoting sustainable tourism practices that support local communities and contribute to the long-term preservation of Egypt\'s resources.',
    'Transparency': 'Providing clear and honest information about pricing, services, and partnerships.',
    'Inclusivity': 'Embracing diversity and inclusivity, welcoming visitors from all backgrounds.',
    'Excellence': 'Striving for excellence in every aspect of the project to deliver an exceptional experience.',
    'Innovation': 'Leveraging modern technology to enhance the tourist experience.',
    'Education': 'Promoting education and cultural exchange through engaging content.',
    'Responsibility': 'Taking responsibility for the social, cultural, and environmental impacts of tourism.',
};

const serviceDescriptions = {
    'Travel Planning Assistance': 'Detailed descriptions of travel planning services, including accommodation, transportation, and guided tours.',
    'AI-Powered Features': 'Overview of AI tools like chatbots and statue recognition technology that enhance user interaction.',
    'Souvenir Marketplace': 'Information about the online marketplace offering authentic Egyptian souvenirs.',
};

export default AboutUs;
