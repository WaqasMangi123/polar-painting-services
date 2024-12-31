import React, { useEffect } from "react";
import "./about.css";
import Navbar from "./navbar";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Counter Animation
    const counters = document.querySelectorAll(".stat-number");
    const speed = 200;

    const startCounter = (counter) => {
      const target = +counter.getAttribute("data-target");
      const increment = target / speed;

      const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach((counter) => observer.observe(counter));
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* About Us Section with Wave */}
      <section className="about-us-block">
        <div className="about-us-overlay" aria-hidden="true"></div>
        <div className="about-us-content" data-aos="fade-up">
          <h1 className="about-us-title">About Us</h1>
          <p className="about-us-subtitle">
            The Best Painting Company in Town!
          </p>
        </div>
        <div className="wave-shape" aria-hidden="true"></div>
      </section>

      {/* About Exqute Block */}
      <section className="about-exqute-block">
        <div className="about-exqute-container">
          <div className="about-exqute-text" data-aos="fade-left">
            <h2 className="about-exqute-title">Who We Are</h2>
            <h3 className="about-exqute-subtitle">About Polar Painting</h3>
            <p>
              At Painting, we specialize in transforming homes across Toronto
              and Ontario with our expert residential and exterior home painting
              services. From modern home interior paint colors to kitchen
              cabinet painting and wallpaper installation, our skilled painters
              deliver high-quality results using low-VOC paints for a beautiful
              and safe finish.
            </p>
            <p>
              Proudly Canadian-owned and operated, Northern Painting is
              committed to customer satisfaction and attention to detail. We
              service all of Ontario and soon, the rest of Canada, ensuring that
              every project reflects your unique style. Trust us to bring your
              vision to life, one brushstroke at a time.
            </p>
          </div>

          <div className="about-exqute-image" data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Professional Painting Services"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Block */}
<section className="mission-vision-block" data-aos="fade-up">
  <h2 className="section-heading">Our Mission & Vision</h2>
  <div className="mission-vision-container">
    <div className="mission-block hover-block">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h3 className="block-title">Our Mission</h3>
        </div>
        <div className="flip-card-back">
          <p>
            Our mission is to deliver exceptional painting services that
            enhance the beauty and value of homes and businesses, while
            maintaining a commitment to quality, sustainability, and
            customer satisfaction.
          </p>
        </div>
      </div>
    </div>

    <div className="vision-block hover-block">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h3 className="block-title">Our Vision</h3>
        </div>
        <div className="flip-card-back">
          <p>
            Our vision is to be the leading painting company, known for
            innovation, reliability, and a relentless pursuit of excellence
            in creating vibrant, long-lasting spaces.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Stats Counter Block */}
      <section className="stats-block" data-aos="fade-up">
        <div className="stats-container">
          <div className="stat-item">
            <h3 className="stat-number" data-target="70">0</h3>
            <p className="stat-label">Projects Complete</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number" data-target="130">0</h3>
            <p className="stat-label">Satisfied Clients</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number" data-target="890">0</h3>
            <p className="stat-label">Cups of Coffee</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number" data-target="370">0</h3>
            <p className="stat-label">Days of Work</p>
          </div>
        </div>
      </section>

      {/* Our Values Block with Image Background */}
<section className="values-block" data-aos="fade-up">
  <div className="image-container">
    <img
      src="/valuesour.jpg" // Replace with your image file in the public folder
      alt="Values Background"
      className="background-image"
    />
  </div>

  <div className="values-content">
    <h2 className="values-heading">Our Values</h2>
    <p>We firmly uphold the following fundamental principles:</p>

    <div className="values-list">
      <div className="value-item" data-aos="fade-right">
        <h3>Integrity</h3>
        <p>Doing what is right in the eyes of our customers at all times.</p>
      </div>

      <div className="value-item" data-aos="fade-right" data-aos-delay="200">
        <h3>Excellence</h3>
        <p>Delivering the best results using the latest methods.</p>
      </div>

      <div className="value-item" data-aos="fade-right" data-aos-delay="400">
        <h3>Innovation</h3>
        <p>Constantly striving for creative and efficient solutions.</p>
      </div>
    </div>
  </div>
</section>





<section className="satisfaction-block">
  {/* Video Background */}
  <div className="video-background">
    <video autoPlay muted loop>
      <source src="/satisfiedcustomer.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Text Content Container */}
  <div className="satisfaction-container">
    <h2 className="satisfaction-heading">Satisfaction Guarantee</h2>
    <p className="satisfaction-description">
      At Northern Painting, your satisfaction is our top priority. We stand by
      the quality of our work, ensuring that every project meets the highest
      standards. From start to finish, we focus on delivering results that not
      only meet but exceed your expectations.
    </p>
    <p className="satisfaction-description">
      We offer a satisfaction guarantee on all our services, from interior and
      exterior home painting to wallpaper installation and kitchen cabinet
      painting. If you’re not completely satisfied with the outcome, we will
      work with you until you are, because your home deserves nothing less.
    </p>
    {/* Contact Button */}
    <div className="satisfaction-cta">
      
      <a href="/contact" className="cta-button contact-us">
        Contact Us
      </a>
    </div>
  </div>
</section>


    </>
  );
};

export default AboutUs;
