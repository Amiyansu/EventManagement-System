import React from 'react';
import './AboutUs.css';
import Navbar from '../navbar';
import logo from './logo.png';
import Footer from '../footer/footer1';

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <div className="aboutus-container">
      <div className="aboutus-card">
        <h2 className="aboutus-header">About Us</h2>
        <div className="aboutus-content">
          <div className="aboutus-text">
            <p>
            Welcome to our Event Management System, a platform designed to make organizing and attending events simple and enjoyable. We help organizers create, manage, and promote their events with ease, while offering attendees a convenient way to discover and register for events. Our mission is to connect people through seamless event experiences and foster community engagement.
            <br />
            We also prioritize security and convenience, providing a safe platform for ticketing and event management, ensuring every transaction is smooth and reliable. Let’s make your next event a success!
            </p>
          </div>
          <div className="aboutus-image-container">
            <img src={logo} alt="NGO" className="aboutus-image" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
    </>
    
    
  );
};

export default AboutUs;
