import React from 'react';
import { useHistory } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push('/');
  };

  return (
    <div className="thankyou-container">
      <h2 className="thankyou-header">Thank You for Your Payment!</h2>
      <p className="thankyou-message">Your support is greatly appreciated.</p>
      <button className="thankyou-button" onClick={goToHome}>
        Go to Home
      </button>
    </div>
  );
};

export default ThankYouPage;
