import React, { useState, useEffect } from "react";
import "./services.css";

const Services = () => {
  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    service: "Residential Painting",
    date: "",
  });

  useEffect(() => {
    const container = document.querySelector(".services-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add("active");
          } else {
            container.classList.remove("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

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
       const response = await fetch("http://localhost:5000/api/quote/quote", { // Update URL to /api/quote/quote
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
    <div className="services-page">
      {/* Intro Section */}
      <section className="services-intro-block">
        <div
          className="services-bg"
          style={{ backgroundImage: `url('/services.jpg')` }}
        ></div>
        <div className="services-content">
          <h1 className="services-heading">Our Services</h1>
          <p className="services-subtext">
            Whether you're looking to refresh your space or create a new look,
            our team can help with a range of painting services.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <div className="services">
        <div className="services-video">
          <video autoPlay loop muted playsInline>
            <source src="/servicevideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="services-container">
          <h2 className="services-title">Explore Our Services</h2>
          <p className="services-description">
            Discover our comprehensive range of services tailored to meet your
            needs.
          </p>
          <div className="services-grid">
            {[{
              img: "/interiorpainting.jpeg",
              title: "Interior Painting",
              description: "Transform your living spaces with modern colors for stunning results.",
            },
            {
              img: "/exteriorpainting.jpg",
              title: "Exterior Painting",
              description: "Boost your home’s curb appeal with professional exterior painting.",
            },
            {
              img: "/cabinetpainting.webp",
              title: "Cabinet Painting",
              description: "Refresh your kitchen with expert cabinet painting services.",
            },
            {
              img: "/commercialpainting.jpg",
              title: "Commercial Painting",
              description: "Enhance your business spaces with professional commercial painting.",
            },
            {
              img: "/condopainting.jpg",
              title: "Condo Painting",
              description: "Specialized condo painting services tailored to your needs.",
            },
            {
              img: "/wallpaperinstallation.webp",
              title: "Wallpaper Installation",
              description: "Add style to your walls with seamless wallpaper installation.",
            }].map((service, index) => (
              <div className="services-card" key={index}>
                <img src={service.img} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div
        className="quote-block"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="quote-overlay"></div>
        <div className="quote-content">
          <h2 className="quote-title">Get a Free Quote</h2>
          <p className="quote-subtitle">
            Ready to bring your vision to life? Contact us today for a free quote
            and let’s get started!
          </p>
        </div>
        <form className="quote-form" onSubmit={handleSubmit}>
          {[{ name: "name", type: "text", placeholder: "Name" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "zip", type: "text", placeholder: "ZIP Code" }].map((field, index) => (
            <input
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              className="quote-input"
              name={field.name}
              value={quoteData[field.name]}
              onChange={handleChange}
              required
            />
          ))}
          <select
            className="quote-input"
            name="service"
            value={quoteData.service}
            onChange={handleChange}
            required
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
            required
          />
          <button type="submit" className="quote-btn">
            🚀 GET FREE QUOTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Services;
