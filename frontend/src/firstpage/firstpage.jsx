import React from "react";
import "./firstpage.css";
import img1 from "./images/output-onlinepngtools.png";
import img2 from "./images/art.png";
import img3 from "./images/NGO_MANAGE.png";
import img4 from "./images/pngtree-donation-box-vector-png-image_6657731.png";

import { useHistory } from "react-router-dom";
import ParticlesBG from "./ParticlesBG";

const Firstpage = () => {
  const history = useHistory();

  return (
    <header>
      <ParticlesBG/>
      
      <section className="mainheaderfg">
        <div className="logo">
          <a href="/"><img src={img1} alt="logo" /></a>
        </div>

        <nav className="mmm">
          <a style={{color:'tomato'}} href="/">Home</a>
          <a style={{color:'white'}} href="/help">Help</a>
          <a style={{color:'white'}} href="/contactus">Contact Us</a>
          <a style={{color:'white'}} href="/aboutus">About us</a>
        </nav>
      </section>

      <main>
      <section className="left">
          <h4 style={{color:'#A6A7FA',fontSize:'29px'}}>SIMPLIFY YOUR EVENT PLANNING JOURNEY WITH US.</h4>
          <h1 style={{color:'#CF5652',fontSize:'60px'}}><span style={{color:'white',fontSize:'90px'}}>A</span> SEAMLESS PLATFORM FOR ORGANIZERS AND ATTENDEES</h1>
          <h2 style={{color:'#A6A7FA',marginTop:'100px'}}>HOW DO YOU WANT TO LOG IN ?</h2>

          <button onClick={() => history.push("/loginngo")} style={{ color: '#020049' }}>Admin</button>
          <button onClick={() => history.push("/loginvol")} style={{ color: '#020049' }}>User</button>
          {/* <button onClick={() => history.push("/payment")} style={{ color: '#020049' }}>Payment</button> */}

          <h2 style={{color:'#A6A7FA',marginTop:'40px'}}>Watch all the ongoing Events :-</h2>
          <button onClick={() => history.push("/eventlist")} style={{ color: '#020049' }}>On Going Events</button>
        </section>

        <section className="right">
          <figure>
            <img src={img2} alt="illustration" height="400px" width="650px" />
          </figure>
        </section>
      </main>

      {/* <footer>
        <div className="logo">
          <img src={img3} alt="logo" />
        </div>
        <p>
          Copyright © 2023-2030 Volunteer Manage Company S.L. All rights reserved.
        </p>
      </footer> */}
    </header>
  );
}

export default Firstpage;
