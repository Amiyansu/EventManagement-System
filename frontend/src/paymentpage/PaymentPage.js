import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Paymentpage.css'
import upi from './upi.jpeg';

const PaymentPage = () => {
  const history = useHistory();
  const [isRazorpay, setIsRazorpay] = useState(true);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'hysca',
      amount: 50000, 
      currency: 'INR',
      name: 'Being Volunteer',
      description: 'Donation',
      image: 'C:\Users\rattl\Downloads\new updated\NGO-and-Volunteer-Management-System-master\frontend\src\firstpage\images\NGO_MANAGE.png',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        history.push('/thankyou');
      },
      prefill: {
        name: 'Your Name',
        email: 'youremail@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Event Organiser Office Address',
      },
      theme: {
        color: '#020080',
      },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        {isRazorpay ? (
          <div className="razorpay-section">
            <h2 className="payment-header">Make a Payment</h2>
            <button className="payment-button" onClick={displayRazorpay}>
              Pay with Razorpay
            </button>
          </div>
        ) : (
          <div className="upi-section">
            <h2 className="payment-header">Pay via UPI</h2>
            <img src={upi} alt="UPI Screenshot" className="upi-image" />
            <button className="payment-button" onClick={() => history.push('/thankyou')}>
              Simulate UPI Payment
            </button>
          </div>
        )}
        <div className="toggle-switch">
          <button className={`toggle-button ${isRazorpay ? 'active' : ''}`} onClick={() => setIsRazorpay(true)}>
            Razorpay
          </button>
          <button className={`toggle-button ${!isRazorpay ? 'active' : ''}`} onClick={() => setIsRazorpay(false)}>
            UPI
          </button>
        </div>
      </div>
    </div>
  );
};


export default PaymentPage;
