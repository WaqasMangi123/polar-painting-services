import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        {/* Logo and About */}
        <div className="footer-column">
          <div className="footer-logo">
            <img src="/logo2.png" alt="Northern Painting Logo" />
          </div>
          <p>
            Delivering premium painting services with customized solutions for
            every space.
          </p>
        </div>

        {/* Useful Links */}
        <div className="footer-column links">
          <h3 className="footer-subtitle">Useful Links</h3>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Legal Disclaimer</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-column right">
          <h3 className="footer-subtitle">Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <i className="fas fa-phone-alt"></i> (416) 238-7373
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@northernpainting.ca
            </li>
            <li>
              <i className="fas fa-clock"></i> Mon - Sun: 8AM - 6PM
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="footer-social-icons">
        <a href="#">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      {/* Bottom Wave */}
      <div className="footer-wave">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0V46.29c87.7,22.9,174.7,43.71,261.6,41.8C437.2,84.2,524.3,23.5,600,15.6,675.7,7.7,762.8,68.5,938.4,88.1c86.9,1.9,174-18.9,261.6-41.8V0Z"></path>
        </svg>
      </div>

      {/* Bottom Text */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Northern Painting. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
