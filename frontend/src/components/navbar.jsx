import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For React Router navigation
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo2.png" alt="Company Logo" className="logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="navbar-links">
        <ul>
          <li><Link to="/" className="nav-link">HOME</Link></li>
          <li><Link to="/about" className="nav-link">ABOUT</Link></li>
          
          {/* Dropdown for Services */}
          <li className="nav-item" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <Link to="/services" className="nav-link">SERVICES</Link>
            <i className="fa fa-chevron-down"></i>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/costestimator" className="dropdown-link">Cost Estimator</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/faq" className="nav-link">FAQS</Link></li>
          <li><Link to="/blog" className="nav-link">BLOG</Link></li>
          <li><Link to="/contact" className="nav-link">CONTACT</Link></li>
        </ul>
      </nav>

      {/* Contact Section */}
      <div className="navbar-contact">
        <a href="tel:+4162387373" className="contact-button">
          <i className="fa fa-phone"></i> (416) 238-7373
        </a>
      </div>
    </header>
  );
};

export default Navbar;
