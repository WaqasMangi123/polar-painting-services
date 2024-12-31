import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./home.css";
import Footer from "./footer";
import Navbar from "./navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    service: "Residential Painting",
    date: "",
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    lazyLoad: "ondemand",
    accessibility: true,
  };

  const sliderImages = [
    "/backgroundhomepage.jpg",
    "/backgroundhomepage2.jpg",
    "/backgroundhomepage3.jpg",
    "/backgroundhomepage4.jpg",
    "/backgroundhomepage5.jpg",
  ];

  useEffect(() => {
    const targets = document.querySelectorAll(
      ".quote-block, .block-3, .block-4, .block-5"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the block is visible
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect(); // Clean up the observer on component unmount
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate the date input to ensure it's not in the past
  const handleDateChange = (e) => {
    const today = new Date().toISOString().split("T")[0];
    if (e.target.value < today) {
      e.target.setCustomValidity("Please select a future date.");
    } else {
      e.target.setCustomValidity("");
    }
    handleChange(e);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!quoteData.name || !quoteData.email || !quoteData.phone || !quoteData.zip || !quoteData.date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://polar-painting-services.onrender.com/api/quote/quote", { // Update URL to /api/quote/quote
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData), // Sending the form data
      });

      if (response.ok) {
        alert("Your quote has been sent!");
        setQuoteData({ name: "", email: "", phone: "", zip: "", service: "Residential Painting", date: "" }); // Reset the form
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="hero-slider">
        <Slider {...sliderSettings} aria-label="Hero Image Slider">
          {sliderImages.map((image, index) => (
            <div key={index} className="slider-item">
              <img
                src={image}
                alt={`Background slide ${index + 1}`}
                className="slider-image"
              />
            </div>
          ))}
        </Slider>
        <div className="overlay">
          <div className="content">
            <h1 className="hero-title">WELCOME TO POLAR PAINTING!</h1>
            <p className="hero-subtitle">
              Empowering your vision with professional and reliable services.
            </p>
            <div className="buttons">
              <button className="btn-primary" aria-label="Get Started">
                Get Started
              </button>
              <button className="btn-secondary" aria-label="Learn More">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Block with Image Background */}
      <div
        className="quote-block"
        data-animate="true"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="quote-overlay"></div>

        {/* Content */}
        <div className="quote-content">
          <h2 className="quote-title">Get a Free Quote</h2>
          <p className="quote-subtitle">
            Ready to bring your vision to life? Contact us today for a free quote
            and let’s get started!
          </p>
        </div>

        {/* Form */}
        <form className="quote-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="quote-input"
            name="name"
            value={quoteData.name}
            onChange={handleChange}
            required
            aria-label="Your full name"
          />
          <input
            type="email"
            placeholder="Email"
            className="quote-input"
            name="email"
            value={quoteData.email}
            onChange={handleChange}
            required
            aria-label="Your email address"
          />
          <input
            type="text"
            placeholder="Phone"
            className="quote-input"
            name="phone"
            value={quoteData.phone}
            onChange={handleChange}
            required
            aria-label="Your phone number"
          />
          <input
            type="text"
            placeholder="ZIP Code"
            className="quote-input"
            name="zip"
            value={quoteData.zip}
            onChange={handleChange}
            required
            aria-label="Your ZIP code"
          />
          <select
            className="quote-input"
            name="service"
            value={quoteData.service}
            onChange={handleChange}
            required
            aria-label="Select the type of service"
          >
            <option value="Residential Painting">Residential Painting</option>
            <option value="Commercial Painting">Commercial Painting</option>
            <option value="Interior Painting">Interior Painting</option>
            <option value="Exterior Painting">Exterior Painting</option>
          </select>
          <input
            type="date"
            className="quote-input"
            name="date"
            value={quoteData.date}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]} // Ensures the date is not in the past
            required
            aria-label="Select a preferred date for the service"
          />
          <button type="submit" className="quote-btn">
            🚀 GET FREE QUOTE
          </button>
        </form>
      </div>

      {/* Block 3 */}
      <div className="block-3">
        <div className="block-3-content">
          <h2 className="block-3-title">
            Transform Your Space with Professional Home Painting Services in Toronto
          </h2>
          <p className="block-3-description">
            Elevate the look and feel of your home with expert painting services that cater
            to both interior and exterior needs. Whether you’re interested in modern home
            interior paint colors or giving your kitchen cabinets a fresh look, we ensure
            quality and detail to reflect your unique style and personality.
          </p>
          <div className="block-3-icons">
            <div className="block-3-icon">
              <i className="fas fa-paint-roller"></i>
              <h4>Experienced Painters</h4>
              <p>
                Our team of experienced painters delivers exceptional results for every
                project, from interior home painting to exterior services.
              </p>
            </div>
            <div className="block-3-icon">
              <i className="fas fa-brush"></i>
              <h4>Customized Solutions</h4>
              <p>
                We offer tailored painting solutions to meet your specific needs, ensuring
                satisfaction as our priority.
              </p>
            </div>
          </div>
          <button className="block-3-btn">ABOUT US</button>
        </div>
        <div className="block-3-image">
          <img src="/block3.webp" alt="Professional Home Painting" />
        </div>
      </div>

      {/* Block 4 - Our Services */}
      <div className="block-4">
        <h2 className="block-4-title">Our Services</h2>
        <p className="block-4-subtitle">
          Our comprehensive painting services include interior and exterior home painting,
          kitchen cabinet painting, wallpaper removal, and installation, all designed to
          transform your space beautifully.
        </p>
        <div className="block-4-cards">
          <div className="service-card">
            <img src="/interiorpainting.jpeg" alt="Interior Painting" />
            <h3>Interior Painting</h3>
            <p>Transform your living spaces with modern colors for stunning results.</p>
          </div>
          <div className="service-card">
            <img src="/exteriorpainting.jpg" alt="Exterior Painting" />
            <h3>Exterior Painting</h3>
            <p>Boost your home’s curb appeal with professional exterior painting.</p>
          </div>
          <div className="service-card">
            <img src="/cabinetpainting.webp" alt="Cabinet Painting" />
            <h3>Cabinet Painting</h3>
            <p>Refresh your kitchen with our expert cabinet painting services.</p>
          </div>
          <div className="service-card">
            <img src="/commercialpainting.jpg" alt="Commercial Painting" />
            <h3>Commercial Painting</h3>
            <p>Enhance your business space with professional commercial painting.</p>
          </div>
          <div className="service-card">
            <img src="/condopainting.jpg" alt="Condo Painting" />
            <h3>Condo Painting</h3>
            <p>Specialized condo painting services tailored to your needs.</p>
          </div>
          <div className="service-card">
            <img src="/wallpaperinstallation.webp" alt="Wallpaper Installation" />
            <h3>Wallpaper Installation</h3>
            <p>Add style to your walls with seamless wallpaper installation.</p>
          </div>
        </div>
      </div>

    {/* Block 5 - Professional Home Painting */}
<div className="block-5">
  <div className="block-5-container">
    {/* Image Section */}
    <div className="block-5-image">
      <img src="/block5.jpg" alt="Professional Painting Services" />
    </div>

    {/* Content Section */}
    <div className="block-5-content">
      <h2 className="block-5-title">
        Professional Home Painting Services: Transform Your Home Inside and Out
      </h2>
      <p className="block-5-description">
        Our expert home painting services cover everything from interior transformations to exterior
        revamps. With skilled painters and high-quality materials, we ensure your home reflects your
        unique style and stands out with stunning finishes.
      </p>

      {/* Features Section */}
      <div className="block-5-features">
        <div className="feature">
          <i className="fas fa-paint-roller"></i>
          <div>
            <h4>Skilled Painters</h4>
            <p>Our skilled painters deliver flawless finishes every time.</p>
          </div>
        </div>
        <div className="feature">
          <i className="fas fa-leaf"></i>
          <div>
            <h4>Eco-Friendly Painting</h4>
            <p>Eco-friendly services using low-VOC paints for a healthier environment.</p>
          </div>
        </div>
        <div className="feature">
          <i className="fas fa-tools"></i>
          <div>
            <h4>High-Quality Materials</h4>
            <p>Durable results with high-quality materials for all projects.</p>
          </div>
        </div>
        <div className="feature">
          <i className="fas fa-check-circle"></i>
          <div>
            <h4>Attention to Detail</h4>
            <p>Ensuring a perfect finish, inside and out, with precision and care.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


     {/* Block 6 - Work Process */}
     
\{/* Block 6 - Work Process */}
<div className="block-6">
  <h2 className="block-6-title">Our Work Process</h2>
  <p className="block-6-subtitle">
    Designed to provide you with a stress-free painting experience, from start to finish.
  </p>
  
  <div className="block-6-steps">
    {/* Step 1 */}
    <div className="work-step">
      <div className="work-step-image">
        <img src="/preparation4.jpeg" alt="Preparation" />
      </div>
      <div className="work-step-content">
        <h3>Step 1</h3>
        <p>Preparation</p>
      </div>
    </div>

    {/* Step 2 */}
    <div className="work-step">
      <div className="work-step-image">
        <img src="/painting.jpg" alt="Painting" />
      </div>
      <div className="work-step-content">
        <h3>Step 2</h3>
        <p>Painting</p>
      </div>
    </div>

    {/* Step 3 */}
    <div className="work-step">
      <div className="work-step-image">
        <img src="/inspection.webp" alt="Inspection" />
      </div>
      <div className="work-step-content">
        <h3>Step 3</h3>
        <p>Inspection</p>
      </div>
    </div>

    {/* Step 4 */}
    <div className="work-step">
      <div className="work-step-image">
        <img src="/cleanup.jpg" alt="Cleanup" />
      </div>
      <div className="work-step-content">
        <h3>Step 4</h3>
        <p>Cleanup</p>
      </div>
    </div>
  </div>
</div>




{/* Customer Testimonial Block */}
<div className="google-reviews-widget">
  {/* Testimonial Title */}
  <h2 className="testimonial-title">
    Our <span>Google Reviews</span>
  </h2>

  {/* Testimonial Rating */}
  <div className="testimonial-rating">
    <div className="review-rating">
      <span className="star">&#9733;</span>
      <span className="star">&#9733;</span>
      <span className="star">&#9733;</span>
      <span className="star">&#9733;</span>
      <span className="star">&#9733;</span>
    </div>
    <p className="review-count">4.9 out of 34 reviews</p>
  </div>

  {/* Write a Review Button */}
  <div className="write-review-button">
    <a href="/write-review" className="review-button">Write a Review</a>
  </div>

  {/* Testimonial Content */}
  <div className="testimonial-container">
    <div className="testimonial-slider">
      <Slider
        dots={true}
        infinite={true}
        speed={1000}
        slidesToShow={3} // Show 3 testimonials at a time
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={4000}
        arrows={false}
      >
        {/* Testimonial 1 */}
        <div className="testimonial-slide">
          <div className="client-image-wrapper">
            <img src="/client1.jpeg" alt="Client 1" className="client-image" />
          </div>
          <div className="review-rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9734;</span>
          </div>
          <p className="testimonial-text">
            "The team did an incredible job! Highly professional and exceeded my expectations."
          </p>
          <h3 className="client-name">Charles Sullivan</h3>
          <span className="client-role">Teacher</span>
        </div>

        {/* Testimonial 2 */}
        <div className="testimonial-slide">
          <div className="client-image-wrapper">
            <img src="/client2.jpeg" alt="Client 2" className="client-image" />
          </div>
          <div className="review-rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
          </div>
          <p className="testimonial-text">
            "Amazing work! Great communication and stunning results. Highly recommend!"
          </p>
          <h3 className="client-name">Jane Doe</h3>
          <span className="client-role">Interior Designer</span>
        </div>

        {/* Testimonial 3 */}
        <div className="testimonial-slide">
          <div className="client-image-wrapper">
            <img src="/client33.jpeg" alt="Client 3" className="client-image" />
          </div>
          <div className="review-rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9734;</span>
          </div>
          <p className="testimonial-text">
            "Absolutely outstanding service! They understood my vision and delivered perfectly."
          </p>
          <h3 className="client-name">Emily Johnson</h3>
          <span className="client-role">Project Manager</span>
        </div>

        {/* Testimonial 4 */}
        <div className="testimonial-slide">
          <div className="client-image-wrapper">
            <img src="/client4.jpg" alt="Client 4" className="client-image" />
          </div>
          <div className="review-rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9734;</span>
            <span className="star">&#9734;</span>
          </div>
          <p className="testimonial-text">
            "Professional, punctual, and efficient. A pleasure to work with from start to finish."
          </p>
          <h3 className="client-name">Michael Brown</h3>
          <span className="client-role">Entrepreneur</span>
        </div>

        {/* Testimonial 5 */}
        <div className="testimonial-slide">
          <div className="client-image-wrapper">
            <img src="/client5.jpeg" alt="Client 5" className="client-image" />
          </div>
          <div className="review-rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
          </div>
          <p className="testimonial-text">
            "Top-notch quality and excellent customer support. I couldn’t be happier!"
          </p>
          <h3 className="client-name">Sophia Williams</h3>
          <span className="client-role">Marketing Specialist</span>
        </div>
      </Slider>
    </div>
  </div>
</div>



<div className="block-8">
  {/* Background Image */}
  <div className="block-8-background">
    <img src="https://images.pexels.com/photos/6764289/pexels-photo-6764289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Background" className="block-8-bg-image" />
  </div>

  {/* Overlay */}
  <div className="block-8-overlay"></div>

  {/* Content */}
  <div className="block-8-content">
    <h2 className="block-8-title">Get Your Space Ready for a Fresh Start!</h2>
    <p className="block-8-description">
      From bold colors to unique finishes, we can help you achieve the look you
      want. Contact us for your project.
    </p>

    {/* Divider */}
    <div className="block-8-divider"></div>

    {/* Contact Information */}
    <div className="block-8-contact">
      <button className="block-8-phone">
        <i className="fas fa-phone-alt"></i> (416) 238-7373
      </button>
      <div className="block-8-links">
        <span>
          <i className="fas fa-envelope"></i> info@northernpainting.ca
        </span>
        <span>
          <i className="fas fa-paper-plane"></i> Contact Us
        </span>
      </div>
    </div>
  </div>
</div>





    </div>
  );
};

export default Home;
