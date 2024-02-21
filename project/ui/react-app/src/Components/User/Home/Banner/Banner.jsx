import React from 'react';
import './Banner.css';
const Banner = () => {
    return (
        <div className="banner">
            <img src="https://couponsclouds.com/wp-content/uploads/2023/12/Store-Page-Banner.webp" alt="Banner" className="banner-image" /> 
            <div className="banner-content">
                <h1 className="banner-title">Step into the future with BassHeads</h1>
                <p className="banner-subtitle">
"Discover the latest in audio technology at our headphone website. Explore premium headphones designed for immersive sound experiences. From noise-canceling to wireless options, find the perfect pair for every lifestyle. Browse our curated collection of top brands and elevate your listening journey today. Join our community of audio enthusiasts and unlock exclusive deals and offers."</p>
                <button className="banner-button">Learn More</button>
            </div>
        </div>
    );
}

export default Banner;
