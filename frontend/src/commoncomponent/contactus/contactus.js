import React from 'react';
import Navbar from '../navbar';
import emailjs from "emailjs-com";
import Footer from '../footer/footer1';
import './contactus.css';

const Contactus = () => {
    function onFormSubmit(e) {
        e.preventDefault();

        emailjs.sendForm(
            'service_p5ff6vb',
            'template_ydofbeq',
            e.target,
            "PIOhpIvW-4RUu5A5a"
        )
            .then(res => {
                console.log(res);
                alert("Your feedback successfully submitted!");
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <Navbar />
            <div className="contact-container">
                <h2 className="contact-header">Contact Us</h2>
                
                <form className="contact-form" onSubmit={onFormSubmit}>
                    <label>Full Name :</label>
                    <input type='text' name='name' className='form-control' />
                    <label>Email ID :</label>
                    <input type='email' name='email' className='form-control' />
                    <label>Subject:</label>
                    <input type='text' name='subject' className='form-control' />
                    <label>Message:</label>
                    <textarea name='message' rows='3' className='form-control' />
                    <button type='submit' className='submit-button'>Submit</button>
                </form>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>

                {/* <div className="contact-info">
                    <a href='tel:7683866998'>
                        <button type='button' className='info-button'>
                            Phone No: +91 7683866998
                        </button>
                    </a>
                    <a href="eventmanager2024@gmail.com" target="_blank" rel="noopener noreferrer">
                        <button type='button' className='info-button'>
                            Email ID: eventmanager2024@gmail.com
                        </button>
                    </a>
                    <a href="https://www.instagram.com/amiyansu_patra/" target="_blank" rel="noopener noreferrer">
                        <button type='button' className='info-button'>
                            Instagram: amiyansu
                        </button>
                    </a>
                </div> */}
            <Footer />
            </div>
        </>
    );
};

export default Contactus;
