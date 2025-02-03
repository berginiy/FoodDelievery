import React from "react";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h2 className="footer-logo">🍕 Food Delivery</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam...
                    </p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-behance"></i></a>
                        <a href="#"><i className="fab fa-globe"></i></a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Tracking</a></li>
                        <li><a href="#">Shipping</a></li>
                        <li><a href="#">Locations</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p><i className="fas fa-phone"></i> (209) 555-0104</p>
                    <p><i className="fas fa-envelope"></i> michelle.rivera@example.com</p>
                    <p><i className="fas fa-map-marker-alt"></i> 2715 Ash Dr. San Jose, South Dakota 83475</p>
                </div>
                <div className="footer-section subscribe">
                    <h3>Subscribe</h3>
                    <form>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <button type="submit" className="btn">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright 2023 | Uitaskca - All rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
