import React, { useState, useEffect, useRef } from "react";
import "./faq.css";

const FAQHeader = () => {
  const backgrounds = ["faq1.jpg", "faq2.jpg", "faq3.jpg"];
  const [currentBackground, setCurrentBackground] = useState(0);
  const faqRefs = useRef([]);
  const [visibleQuestions, setVisibleQuestions] = useState([]);
  const block3Ref = useRef(null);
  const [block3Visible, setBlock3Visible] = useState(false);

  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    service: "Residential Painting",
    date: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Intersection Observer for FAQ questions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleQuestions((prev) => {
              if (!prev.includes(entry.target.dataset.index)) {
                return [...prev, entry.target.dataset.index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    faqRefs.current.forEach((faq) => {
      if (faq) observer.observe(faq);
    });

    return () => {
      faqRefs.current.forEach((faq) => {
        if (faq) observer.unobserve(faq);
      });
    };
  }, []);

  // Intersection Observer for Block 3
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBlock3Visible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (block3Ref.current) {
      observer.observe(block3Ref.current);
    }

    return () => {
      if (block3Ref.current) {
        observer.unobserve(block3Ref.current);
      }
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What types of painting services do you offer?",
      answer:
        "We offer residential, commercial, interior, exterior, and specialty painting services tailored to your needs.",
    },
    {
      question: "How do I get started with your painting services?",
      answer:
        "Contact us via phone or fill out our online form to request a free consultation and estimate.",
    },
    {
      question: "How long does a typical painting project take?",
      answer:
        "The duration depends on the project size, but we strive to complete most jobs efficiently within the agreed timeframe.",
    },
    {
      question: "What types of paint do you use?",
      answer:
        "We use high-quality, environmentally friendly paints that ensure durability and safety.",
    },
    {
      question: "Can you help me choose the right colors?",
      answer:
        "Yes! Our color consultants can guide you in selecting the perfect palette for your space.",
    },
    {
      question: "Are your painters licensed and insured?",
      answer:
        "Yes, all our painters are fully licensed, insured, and trained professionals.",
    },
    {
      question: "What happens if I'm not satisfied with the work?",
      answer:
        "Customer satisfaction is our priority. If you’re unhappy with any aspect of the project, we’ll make it right.",
    },
    {
      question: "Do you provide warranties on your painting services?",
      answer:
        "Yes, we offer a comprehensive warranty on all painting services for your peace of mind.",
    },
    {
      question: "Do you handle surface preparation before painting?",
      answer:
        "Yes, we handle all necessary preparation, including sanding, patching, and priming, to ensure a flawless finish.",
    },
    {
      question: "What safety measures do you follow during projects?",
      answer:
        "We prioritize safety by adhering to industry standards and using non-toxic, eco-friendly materials.",
    },
    {
      question: "Can you accommodate special schedules?",
      answer:
        "Absolutely! We work around your schedule to minimize disruption to your home or business.",
    },
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
    <>
      {/* Header Section */}
      <div
        className="faq-header"
        style={{ backgroundImage: `url(${backgrounds[currentBackground]})` }}
      >
        <div className="faq-overlay">
          <h1 className="faq-title">FAQ</h1>
          <p className="faq-subtitle">Frequently Asked Questions</p>
        </div>
        <div className="faq-wave">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,320L60,288C120,256,240,192,360,176C480,160,600,192,720,202.7C840,213,960,203,1080,176C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* FAQ Block Section */}
      <div className="faq-block2-full">
        <div className="faq-block2">
          <h2 className="faq-block2-title">
            Have a query regarding our services? Check out our FAQs for answers!
          </h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                ref={(el) => (faqRefs.current[index] = el)}
                data-index={index}
                className={`faq-item ${
                  visibleQuestions.includes(index.toString())
                    ? "animate-faq"
                    : ""
                } ${activeIndex === index ? "active" : ""}`}
                key={index}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="faq-icon">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
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
    
    </>
  );
};

export default FAQHeader;
