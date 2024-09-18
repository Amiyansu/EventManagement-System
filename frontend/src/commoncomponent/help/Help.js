import React from "react";
import "./Help.css";
import Navbar from '../navbar';
import Footer from "../footer/footer1";

const Help = () => {
  return (
    <>
      <Navbar />

      <main className="help-container" >
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
        <div className="bubble bubble-7"></div>
        <div className="bubble bubble-8"></div>
        <div className="bubble bubble-9"></div>

        <h1 className="help-heading">Help & Support</h1>

        <section className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How do I create an event?</h3>
            <p>To create an event, navigate to the "Create Event" section and fill in the necessary details such as event title, date, location, and ticketing options. Once submitted, you can manage and promote your event through your dashboard.</p>
          </div>
          <div className="faq-item">
            <h3>How do I register as an attendee?</h3>
            <p>Attendees can register by visiting the "Sign Up" section, creating an account, and logging in. Once registered, you can browse, discover, and join upcoming events of interest.</p>
          </div>
          <div className="faq-item">
            <h3>How can I contact event organizers?</h3>
            <p>You can reach out to event organizers directly through the "Event Details" page by using the built-in messaging or contact features.</p>
          </div>
        </section>

        <section className="help-section" style={{marginBottom:'150px'}}>
          <h2>Guides</h2>
          <div className="guide-item">
            <h3>How to use the platform</h3>
            <p>Our platform is designed for simplicity. Just sign up, log in, and start exploring events. You can create, manage, or join events with a few clicks. For detailed guidance, refer to our user manual in the help section.</p>
          </div>
          <div className="guide-item">
            <h3>Creating and Managing Events</h3>
            <p>Event organizers can create and manage events through the "Manage Events" section. Add event details such as time, date, location, and ticket prices, and track registrations and sales through your dashboard.

</p>
          </div>
        </section>
        <Footer />
      </main>

    </>
  );
}

export default Help;
