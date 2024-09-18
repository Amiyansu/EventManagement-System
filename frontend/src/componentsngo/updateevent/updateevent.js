import React, { useState } from "react";
import "../addevent/addevents.css";
import axios from "axios";
import './updateevent.css';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Navbar from '../../commoncomponent/navbarngo/navbar';
import { Convert } from 'mongo-image-converter';
import Footer from "../../commoncomponent/footer/footer2/footer2";

const Updateevents = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const eventdata = JSON.parse(localStorage.getItem("currentEvent"));
    const history = useHistory();

    const [name, setName] = useState(eventdata.name || "");
    const [organizer, setOrganizer] = useState(eventdata.organizer || "");
    const [edate, setEdate] = useState(eventdata.edate || "");
    const [etime, setEtime] = useState(eventdata.etime || "");
    const [address, setAddress] = useState(eventdata.address || "");
    const [city, setCity] = useState(eventdata.city || "");
    const [state, setState] = useState(eventdata.state || "");
    const [category, setCategory] = useState(eventdata.category || "");
    const [contact, setContact] = useState(eventdata.contact || "");
    const [email, setEmail] = useState(eventdata.email || "");
    const [description, setDescription] = useState(eventdata.description || "");
    const [Image, setImage] = useState("");

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const onOrganizerChange = (event) => {
        setOrganizer(event.target.value);
    };

    const onEdateChange = (event) => {
        setEdate(event.target.value);
    };

    const onEtimeChange = (event) => {
        setEtime(event.target.value);
    };

    const onAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const onCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const onCityChange = (event) => {
        setCity(event.target.value);
    };

    const onStateChange = (event) => {
        setState(event.target.value);
    };

    const onContactChange = (event) => {
        setContact(event.target.value);
    };

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const onImageChange = async (e) => {
        const convertedImage = await Convert(e);
        setImage(convertedImage);
    };

    

    const updateEvents = () => {
        const variables = {
            name: name,
            organizer: organizer,
            ngoid: user.user.NGOID,
            address: address,
            city: city,
            state: state,
            category: category,
            contact: contact,
            email: email,
            description: description,
            edate: edate,
            etime: etime,
            id: eventdata._id
        };

        const Data = JSON.stringify({ ...variables, Image });

            axios.post("http://localhost:9002/updateevents", { Data, "Content-Type": "application/json" })
                .then(res => {
                    alert(res.data.message);
                    history.push("/homepagengo");
                })
                .catch(error => {
                    console.error("Error updating event:", error);
                    alert("Failed to update event. Please try again.");
                });

    };

    return (
        <>
            <div id="back">
                <Navbar />
                <div className="addevents" style={{ display: 'flex', justifyContent: 'center' }}>

                    <br />

                    <div className="addevents_box" >
                        <h1 style={{ textAlign: 'center' }}>Update Event Details</h1>
                        <h4 style={{ textAlign: 'center' }}>Please fill the fields you wish to edit:</h4>
                        <br />

                        <div className="fields">
                            <label htmlFor="file">Choose Images:</label>
                            <input type="file" filename="Images" style={{ width: '250px' }} onChange={(e) => { onImageChange(e.target.files[0]) }} />
                        </div>

                        <div className="fields">
                            <label>Event Name:</label>
                            <input type="text" name="name" value={name} onChange={onNameChange} />
                        </div>

                        <div className="fields">
                            <label>Category:</label>
                            <select name="category" value={category} onChange={onCategoryChange}>
                                <option value="Human">Human</option>
                                <option value="Animal">Animal</option>
                                <option value="Birds">Birds</option>
                                <option value="Social Services">Social Services</option>
                                <option value="Nature">Nature</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="fields">
                            <label>NGOID:</label>
                            <label>{user.user.NGOID}</label>
                        </div>

                        <div className="fields">
                            <label>Organizer:</label>
                            <input type="text" name="organizer" value={organizer} onChange={onOrganizerChange} />
                        </div>

                        <div className="fields">
                            <label>Event Date:</label>
                            <TextField
                                name="edate"
                                type="date"
                                value={edate}
                                onChange={onEdateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div className="fields">
                            <label>Time:</label>
                            <input type="time" name="etime" value={etime} onChange={onEtimeChange} />
                        </div>

                        <div className="fields">
                            <label>Address:</label>
                            <textarea name="address" value={address} onChange={onAddressChange} />
                        </div>

                        <div className="fields">
                            <label>City:</label>
                            <input type="text" name="city" value={city} onChange={onCityChange} />
                        </div>

                        <div className="fields">
                            <label>State:</label>
                            <input type="text" name="state" value={state} onChange={onStateChange} />
                        </div>

                        <div className="fields">
                            <label>Contact:</label>
                            <input type="text" name="contact" value={contact} onChange={onContactChange} />
                        </div>

                        <div className="fields">
                            <label>E-mail:</label>
                            <input type="text" name="email" value={email} onChange={onEmailChange}/>
                            
                        </div>

                        <div className="fields" style={{ display: 'flex', justifyContent: 'center' }}>
                            <label>Description:</label>
                            <textarea name="description" value={description} onChange={onDescriptionChange} />
                        </div>

                        <br />
                        <div className="btn btn-outline-success btn-lg" style={{ width: '200px', margin: 'auto', display: 'block' }} onClick={updateEvents}>Update Event</div>
                    </div>

                </div>
                <br />
            </div>
            <Footer />
        </>
    );
};

export default Updateevents;
