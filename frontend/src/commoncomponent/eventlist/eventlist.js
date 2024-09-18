import React, {useRef, useState, useEffect } from "react";
import axios from "axios";
import "./eventlist.css";
import { useHistory } from "react-router-dom";
import img1 from "../../firstpage/images/output-onlinepngtools.png";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Footer from "../footer/footer2/footer2";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:9002/allevents")
      .then(res => {
        setEvents(res.data.events);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
      });
  }, []);

  const handleVolunteerLogin = () => {
    history.push("/loginvol");
  };

  return (
    <>
    <div className="eventlist">
      <div className="mainheadervol">
        <div className="logo">
          <a href="/"><img src={img1} alt="logo" className="logo-img" /></a>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/contactus">Contact</a>
          <a href="/aboutus">About Us</a>
        </nav>
      </div>
      <div style={{ width: '90%', margin: '3rem auto' }}>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Events</h1>
        <div className="row">
          {events.map(event => (
            <div className="col-3 mx-auto hov" key={event._id} >
              <Card
                style={{
                  width: 320,
                  height: 320,
                  backgroundColor: "whitesmoke",
                  boxShadow: '0px 0px 10px 5px grey'
                }}
              >
                <CardContent>
                  <Typography
                    style={{ fontSize: 14, display: 'flex', justifyContent: 'center' }}
                    color="textSecondary"
                    gutterBottom
                  >
                    <img src={event.images} alt={event.name} className="rounded" style={{ height: '100px' }} />
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Name: {event.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Address: {event.address}
                  </Typography>
                  <Typography color="textSecondary">
                    City: {event.city}
                  </Typography>
                  <Typography color="textSecondary">
                    Category: {event.category}
                  </Typography>
                  <Typography color="textSecondary">
                    Description: {event.description}
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <button className="btn btn-outline-info" onClick={handleVolunteerLogin}>
          Login as a Volunteer & Join Us
        </button>
      </div>
      {/* <Footer/> */}
    </div>
      
      </>
  );
};

export default EventList;
