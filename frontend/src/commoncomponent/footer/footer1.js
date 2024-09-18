import React from 'react';
import img3 from "../../firstpage/images/NGO_MANAGE.png";
import img1 from "../../firstpage/images/output-onlinepngtools.png";
import "./footer1.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={img1} alt="logo" />
      </div>
      <p>
        Copyright © 2024-2030 Event Manage Company S.L. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
