import React from 'react';
import Hero from '../Hero/Hero';
import './HomePage.css';
import WhyUs from '../WhyUs/WhyUs';
import Testimonies from '../Testimonies/Testimones';
import AboutUsSection from '../AboutUsSection/AboutUsSection';
import OurGallery from '../OurGallery/OurGallery';

function HomePage() {
    return (
        <>

        <Hero />
        <OurGallery />
        <AboutUsSection />
        <WhyUs />
        <Testimonies />
        </>
    );
}

export default HomePage;
