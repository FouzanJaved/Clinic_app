import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import doctorImage from "../assets/doctor-image.png";
import playstoreImg from "../assets/playstore.png";
import appleImg from "../assets/apple.png";
import "./Dashboard.css";

function Dashboard({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h1 className="logo">ola<span>doc</span></h1>
          <ul className="nav-links">
            <li>Doctors</li>
            <li>Hospitals</li>
            <li>Labs and Diagnostics</li>
            <li>Surgeries</li>
            <li>Health Blog</li>
          </ul>
        </div>
        <div className="nav-right">
          <button className="nav-btn phone-btn">02138140600</button>
          <button className="nav-btn join-btn">Join as Doctor</button>
          <div className="profile-wrapper">
            <div className="profile-avatar" onClick={() => setShowDropdown(!showDropdown)}>
              {(user.displayName || user.email)[0].toUpperCase()}
            </div>
            {showDropdown && (
              <div className="profile-dropdown">
                <p className="dropdown-name">{user.displayName || user.email}</p>
                <button className="dropdown-settings">Settings</button>
                <button className="dropdown-logout" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Find and Book the<br /><span className="highlight">Best Doctors</span> near you</h2>
          <div className="patients-badge">50M+ patients served</div>
          <div className="search-bar">
            <div className="search-location">
              <input type="text" placeholder="Karachi" />
              <button className="detect-btn">Detect</button>
            </div>
            <input type="text" className="search-input" placeholder="Doctors, Hospital, Conditions" />
            <button className="search-btn">Search</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="doctor-placeholder"></div>
          <img src={doctorImage} alt="Doctor" className="doctor-img" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="service-card">
          <div className="service-img consult-img"></div>
          <div className="online-badge">20 Doctors Online Now</div>
          <h3>Consult Online Now</h3>
          <p>Instantly connect with Specialists through Video call.</p>
        </div>
        <div className="service-card">
          <div className="service-img clinic-img"></div>
          <h3>In-Clinic Appointments</h3>
          <p>Book an In-Person visit to doctor's clinic.</p>
        </div>
        <div className="service-card">
          <div className="service-img lab-img"></div>
          <h3>Laboratory Tests</h3>
          <p>Avail Exclusive discounts on lab tests.</p>
        </div>
        <div className="service-card">
          <div className="service-img surgery-img"></div>
          <h3>Procedures & Surgeries</h3>
          <p>Plan your surgeries at discounted Rates.</p>
        </div>
        <div className="service-card">
          <div className="service-img medicine-img"></div>
          <h3>Medicines</h3>
          <p>Know your medicines better</p>
        </div>
      </section>

      {/* Consult Doctors Section */}
      <section className="doctors-section">
        <div className="doctors-header">
          <h2>Consult best doctors online</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        <div className="doctors-grid">
          {[
            { name: "Dermatologist", emoji: "🔍" },
            { name: "Gynecologist", emoji: "🤰" },
            { name: "Urologist", emoji: "🩺" },
            { name: "Gastroenterologist", emoji: "🫁" },
            { name: "Dentist", emoji: "🦷" },
            { name: "Obesity Specialist", emoji: "⚖️" },
            { name: "ENT Specialist", emoji: "👂" },
            { name: "Orthopedic Surgeon", emoji: "🦴" },
            { name: "Sexologist", emoji: "🧠" },
            { name: "Neurologist", emoji: "🧠" },
            { name: "Child Specialist", emoji: "👶" },
            { name: "Pulmonologist", emoji: "🫁" },
            { name: "Eye Specialist", emoji: "👓" },
            { name: "General Physician", emoji: "🩺" },
          ].map((doctor, index) => (
            <div className="doctor-item" key={index}>
              <div className="doctor-icon">
                <span>{doctor.emoji}</span>
              </div>
              <p>{doctor.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search by Condition Section */}
      <section className="doctors-section" style={{ marginTop: "20px" }}>
        <div className="doctors-header">
          <h2>Search doctor by condition</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        <div className="doctors-grid">
          {[
            { name: "Fever", emoji: "🤒" },
            { name: "Heart Attack", emoji: "❤️" },
            { name: "Pregnancy", emoji: "🤰" },
            { name: "High Blood Pressure", emoji: "🩺" },
            { name: "Piles", emoji: "🩸" },
            { name: "Diarrhea", emoji: "💊" },
            { name: "Acne", emoji: "😷" },
          ].map((condition, index) => (
            <div className="doctor-item" key={index}>
              <div className="doctor-icon">
                <span>{condition.emoji}</span>
              </div>
              <p>{condition.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Esteemed Partners Section */}
      <section className="partners-section">
        <h2>Our Esteemed Partners</h2>
        <p>Avail Exclusive partnership benefits for your brand, clients and employees.</p>
        <button className="partner-btn">Partner with oladoc</button>
      </section>

      {/* Partners Logos Slider */}
      <section className="logos-section">
        <div className="logos-slider">
          <div className="logos-track">
            {[
              { name: "USAID", text: "USAID" },
              { name: "ibex", text: "ibex." },
              { name: "RAK Services", text: "RAK SERVICES" },
              { name: "Gaper", text: ">GAPER" },
              { name: "IGI Insurance", text: "IGI Insurance" },
              { name: "Beiersdorf", text: "Beiersdorf" },
              { name: "Maqsad", text: "مقصد" },
              { name: "FHM Engage", text: "FHM ENGAGE" },
              { name: "USAID", text: "USAID" },
              { name: "ibex", text: "ibex." },
              { name: "RAK Services", text: "RAK SERVICES" },
              { name: "Gaper", text: ">GAPER" },
              { name: "IGI Insurance", text: "IGI Insurance" },
              { name: "Beiersdorf", text: "Beiersdorf" },
              { name: "Maqsad", text: "مقصد" },
              { name: "FHM Engage", text: "FHM ENGAGE" },
            ].map((partner, index) => (
              <div className="logo-card" key={index}>
                <span className="logo-text">{partner.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="reviews-section">
        <h2>Our Customers <strong>love us</strong></h2>
        <p className="reviews-subtitle">Check out the reviews from our satisfied customers</p>
        <div className="reviews-grid">
          {[
            {
              name: "Umer Fayyaz",
              review: "Great platform, very efficient and works really well on both phone and web. I think this is the most easiest way of booking appointments in Pakistan as it has made the whole process much more efficient.",
              initial: "U",
            },
            {
              name: "Aneeb Ryan",
              review: "A very helpful app for booking appointments and searching for the required doctors. Has made my life a lot easy. I would strongly recommend this to all",
              initial: "A",
            },
            {
              name: "Zainab Tariq",
              review: "Literally the best website to book the appointments online for Doctors. The service is great, helpline guys are very cooperative and understanding. And I don't have to hassle through different hospitals anymore now.",
              initial: "Z",
            },
          ].map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-top">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"{review.review}"</p>
              </div>
              <div className="review-bottom">
                <div className="review-avatar">
                  <span>{review.initial}</span>
                </div>
                <p className="review-name">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download App Section */}
      <section className="download-section">
        <div className="download-content">
          <h2>Download the <strong style={{ color: "#1a1a6e" }}>oladoc</strong> <span style={{ color: "#1a1a6e" }}>App</span></h2>
          <p>Download oladoc app today and avail exclusive health discounts.</p>
          <div className="store-buttons">
            <div className="store-btn">
              <img src={playstoreImg} alt="Play Store" className="store-icon" />
              <div>
                <span className="store-label">GET IT ON</span>
                <span className="store-name">Google Play</span>
              </div>
            </div>
            <div className="store-btn">
              <img src={appleImg} alt="App Store" className="store-icon" />
              <div>
                <span className="store-label">Download on the</span>
                <span className="store-name">App Store</span>
              </div>
            </div>
          </div>
        </div>
        <div className="download-phone">
          <div className="orange-bg"></div>
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="phone-header">
                <span>Current city</span>
                <span>Login</span>
              </div>
              <div className="phone-search">Find Doctors, Specialties, Disease...</div>
              <div className="phone-cards">
                <div className="phone-card-row">
                  <div className="phone-card">Consult Online</div>
                  <div className="phone-card">In-Clinic</div>
                </div>
                <div className="phone-card-row">
                  <div className="phone-card">Lab Tests</div>
                  <div className="phone-card">Surgeries</div>
                  <div className="phone-card">Medicines</div>
                </div>
              </div>
              <p className="phone-looking">I am looking for</p>
              <div className="phone-specialists">
                <span>ENT</span><span>Gynecologist</span><span>Skin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors by City Section */}
      <section className="doctors-city-section">
        <div className="city-column">
          <h3>Doctors in Lahore</h3>
          <ul>
            {["Dermatologist", "Gynecologist", "Urologist", "Sexologist", "Internal Medicine Specialist", "Child Specialist", "Orthopedic Surgeon", "Eye Specialist", "ENT Specialist", "Cardiologist", "Neurologist", "Nephrologist", "Psychiatrist"].map((doc, i) => (
              <li key={i}><span className="arrow">›</span> Best {doc} in Lahore</li>
            ))}
          </ul>
        </div>
        <div className="city-column">
          <h3>Doctors in Karachi</h3>
          <ul>
            {["Dermatologist", "Gynecologist", "Urologist", "Sexologist", "Internal Medicine Specialist", "Child Specialist", "Orthopedic Surgeon", "Eye Specialist", "ENT Specialist", "Cardiologist", "Neurologist", "Nephrologist", "Psychiatrist"].map((doc, i) => (
              <li key={i}><span className="arrow">›</span> Best {doc} in Karachi</li>
            ))}
          </ul>
        </div>
        <div className="city-column">
          <h3>Doctors in Islamabad</h3>
          <ul>
            {["Dermatologist", "Gynecologist", "Urologist", "Sexologist", "Internal Medicine Specialist", "Child Specialist", "Orthopedic Surgeon", "Eye Specialist", "ENT Specialist", "Cardiologist", "Neurologist", "Nephrologist", "Psychiatrist"].map((doc, i) => (
              <li key={i}><span className="arrow">›</span> Best {doc} in Islamabad</li>
            ))}
          </ul>
        </div>
        <div className="city-column">
          <h3>Doctors in Other Cities</h3>
          <ul>
            {[
              "Nephrologist in Multan", "Pulmonologist in Multan", "Cardiologist in Multan",
              "Neuro Physician in Multan", "Gynecologist in Peshawar", "Urologist in Faisalabad",
              "Dentist in Faisalabad", "Dermatologist in Faisalabad", "Gynecologist in Gujranwala",
              "Neurologist in Multan", "Psychiatrist in Faisalabad", "Dermatologist in Gujranwala",
              "Cardiologist in Faisalabad"
            ].map((doc, i) => (
              <li key={i}><span className="arrow">›</span> Best {doc}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-about">
            <h2 className="footer-logo">ola<span>doc</span></h2>
            <p>Book appointments with the best Doctors and Specialists such as Gynecologists, Skin Specialists, Child Specialists, Surgeons, etc. Avail test services such as MRI, CT scan, Ultrasound, X-Ray, etc. and Online Doctor Video Consultations all across Pakistan conveniently.</p>
            <h4>Company</h4>
            <ul>
              {["About us", "Privacy policy", "Delivery Policy", "Refund Policy", "Payment Terms", "Contact us", "Terms of Use", "Cancelation Policy", "FAQs", "Process"].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <h4>Major Cities</h4>
            <ul>
              {["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Multan", "Peshawar", "Gujranwala", "Faisalabad", "Sargodha", "Bahawalpur", "Quetta", "Wah Cantt", "Hyderabad"].map((city, i) => (
                <li key={i}>{city}</li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <h4>Top Hospitals</h4>
            <ul>
              {["Doctors Hospital", "Hameed Latif Hospital", "National Hospital", "Fatima Memorial Hospital", "Omar Hospital & Cardiac Centre", "Ali Medical Centre", "Shifa International Hospital", "Quaid-e-Azam International Hospital", "Advanced International Hospital", "Maroof International Hospital", "South City Hospital", "Dr. Ziauddin Hospital (North Nazimabad)", "Park Lane Hospital", "National Medical Centre", "Liaquat National Hospital & Medical College"].map((hospital, i) => (
                <li key={i}>{hospital}</li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <h4>Lab Test</h4>
            <ul>
              {["MRI in Lahore", "X-RAY in Lahore", "CT Scan in Lahore", "Mammography in Lahore", "Ultrasound in Lahore"].map((test, i) => (
                <li key={i}>{test}</li>
              ))}
            </ul>
            <h4 className="footer-more">More</h4>
            <ul>
              {["Health Blog", "Forum", "For Doctors", "Pharmacy", "Labs", "Lab Tests", "Get Fit with oladoc"].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <h4 className="footer-app-title">Get the oladoc App</h4>
            <div className="footer-store-buttons">
              <div className="store-btn">
                <img src={appleImg} alt="App Store" className="store-icon" />
                <div>
                  <span className="store-label">Download on the</span>
                  <span className="store-name">App Store</span>
                </div>
              </div>
              <div className="store-btn">
                <img src={playstoreImg} alt="Play Store" className="store-icon" />
                <div>
                  <span className="store-label">GET IT ON</span>
                  <span className="store-name">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
        <svg viewBox="0 0 32 32" width="32" height="32" fill="#fff">
          <path d="M16.004 0C7.164 0 .004 7.16.004 16c0 2.822.736 5.584 2.136 8.012L.004 32l8.188-2.1A15.92 15.92 0 0 0 16.004 32C24.844 32 32 24.84 32 16S24.844 0 16.004 0zm0 29.2a13.14 13.14 0 0 1-7.06-2.052l-.504-.3-4.856 1.248 1.296-4.7-.336-.528A13.12 13.12 0 0 1 2.804 16c0-7.28 5.924-13.2 13.2-13.2S29.2 8.72 29.2 16s-5.92 13.2-13.196 13.2zm7.24-9.876c-.396-.2-2.348-1.16-2.712-1.292-.364-.132-.628-.2-.892.2s-1.024 1.292-1.256 1.556c-.232.264-.46.296-.856.1-.396-.2-1.672-.616-3.184-1.964-1.176-1.048-1.972-2.344-2.2-2.74-.232-.396-.024-.612.172-.808.18-.18.396-.46.596-.696.2-.232.264-.396.396-.66.132-.264.068-.496-.032-.696-.1-.2-.892-2.148-1.22-2.94-.324-.776-.652-.672-.892-.684l-.76-.012c-.264 0-.692.1-1.056.496-.364.396-1.388 1.356-1.388 3.308s1.42 3.836 1.62 4.1c.2.264 2.796 4.268 6.776 5.984.948.408 1.688.652 2.264.836.952.3 1.82.26 2.504.156.764-.112 2.348-.96 2.68-1.888.332-.928.332-1.724.232-1.888-.1-.168-.364-.264-.76-.464z"/>
        </svg>
      </a>
    </div>
  );
}

export default Dashboard;
