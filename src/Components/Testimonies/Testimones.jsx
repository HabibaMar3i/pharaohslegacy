import React from 'react';
import './Testimonies.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const Testimonies = () => {
    const testimonies = [
        {
            name: "John Doe",
            feedback: "Pharaohs Legacy made my trip to Egypt unforgettable. The service was excellent and the experience was truly magical.",
        },
        {
            name: "Jane Smith",
            feedback: "Exploring Egypt with Pharaohs Legacy was the best decision ever. The tour guides were knowledgeable and very friendly.",
        },
        {
            name: "Michael Johnson",
            feedback: "The best travel experience I've ever had! Thank you Pharaohs Legacy for the amazing service.",
        },
        {
            name: "Emily Davis",
            feedback: "An unforgettable adventure through Egypt. Highly recommend Pharaohs Legacy!",
        },
        {
            name: "David Brown",
            feedback: "A well-organized and delightful tour experience. Kudos to Pharaohs Legacy!",
        },
        {
            name: "Sarah Wilson",
            feedback: "Pharaohs Legacy made my dream trip to Egypt come true. Excellent service and great memories.",
        },
        {
            name: "Robert Martinez",
            feedback: "The attention to detail and customer service was top-notch. Thank you Pharaohs Legacy!",
        },
        {
            name: "Linda Garcia",
            feedback: "A truly wonderful experience exploring Egypt's history. Highly recommended!",
        },
        {
            name: "Charles Anderson",
            feedback: "Pharaohs Legacy offers a comprehensive and engaging tour experience. Loved it!",
        },
        {
            name: "Patricia Taylor",
            feedback: "A seamless and enjoyable trip. Pharaohs Legacy exceeded my expectations!",
        },
        {
            name: "James Thomas",
            feedback: "Highly professional and well-organized tours. Will definitely travel with them again.",
        },
        {
            name: "Barbara Lewis",
            feedback: "Fantastic experience! Pharaohs Legacy takes care of everything. Just relax and enjoy.",
        }
    ];

    const chunkArray = (myArray, chunk_size) => {
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];
        
        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index + chunk_size);
            tempArray.push(myChunk);
        }
        
        return tempArray;
    };

    const testimonyChunks = chunkArray(testimonies, 3);

    return (
        <section className="testimonies">
            <h2 className="section-title">What Our Clients Say</h2>
            <Carousel interval={5000}>
                {testimonyChunks.map((chunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="testimonies-container d-flex justify-content-center">
                            {chunk.map((testimony, idx) => (
                                <div className="testimony-card mx-2" key={idx}>
                                    <div className="testimony-content">
                                        <p className="testimony-feedback">"{testimony.feedback}"</p>
                                        <p className="testimony-name">- {testimony.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
};

export default Testimonies;
