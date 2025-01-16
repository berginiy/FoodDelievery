import React from "react";
import "../styles/HeroSection.css";
import foodImage from "../assets/foodImage.png";

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-text">
                <h1>
                    <span className="highlight">Fast</span>
                    <span className="twoline">Food Delivery</span>
                </h1>
                <p className="description">
                    Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium.
                </p>
                <div className="buttons">
                    <button className="order-button">Order Now</button>
                    <button className="video-button">Watch Video</button>
                </div>
                <div className="rating">
                    <div className="stars">★★★★★</div>
                    <p>5 star rating based on 1788 reviews</p>
                </div>
            </div>
            <div className="hero-image">
                <img src={foodImage} alt="Food" className="image" />
            </div>
        </section>
    );
}

export default HeroSection;
