import React, { useState } from "react";
import "./registerngo.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbar";
import img1 from "../../firstpage/images/ngolog.png";
import Footer from "../../commoncomponent/footer/footer2/footer2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons

const Registerngo = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        NGOID: "",
        pnumber: "",
        email: "",
        passwd: "",
        reenterpassword: ""
    });

    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
    const [activeField, setActiveField] = useState(""); // Track the currently active field

    const handleChange = e => {
        const { name, value } = e.target;

        // Validate only the field being typed into
        if (name === "passwd") {
            validatePassword(value, "passwd");
        } else if (name === "reenterpassword") {
            validatePassword(value, "reenterpassword");
        }

        setUser({
            ...user,
            [name]: value
        });
    };

    const validatePassword = (password, field) => {
        const specialCharacterRegex = /[^a-zA-Z0-9]/;

        let error = "";
        if (password.length < 4) {
            error = "Password must be at least 4 characters long.";
        } else if (password.length > 8) {
            error = "Password cannot be more than 8 characters long.";
        } else if (specialCharacterRegex.test(password)) {
            error = "Password cannot contain special characters.";
        }

        if (field === "passwd") {
            setPasswordError(error);
        } else if (field === "reenterpassword") {
            setConfirmPasswordError(error);
        }
    };

    const registerNgo = () => {
        const { name, address, city, state, NGOID, pnumber, email, passwd, reenterpassword } = user;
        if (emailErrorstatus === "false") {
            if (name && email && address && city && state && NGOID && pnumber && passwd) {
                if (passwd === reenterpassword) {
                    if (!passwordError && !confirmPasswordError) {
                        axios.post("http://localhost:9002/registerngo", user)
                            .then(res => alert(res.data.message));
                        history.push("/loginngo");
                    } else {
                        alert("Please fix the password errors.");
                    }
                } else {
                    alert("Passwords don't match");
                }
            } else {
                alert("Please check whether all the fields have been filled.");
            }
        }
    };

    const [emailError, setEmailError] = useState('');
    const [emailErrorstatus, setEmailErrorstatus] = useState('');

    const validateEmail = (e) => {
        let email = e.target.value;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            setEmailError('Valid Email :)');
            setEmailErrorstatus("false");
            handleChange(e);
        } else {
            setEmailError('Enter valid Email!');
            setEmailErrorstatus("true");
        }
    };

    return (
        <>
            <Navbar />

            <div className="registerngo" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="regngobox" style={{ display: 'flex', justifyContent: 'center', marginTop: '250px' }}>
                    <section className="leftvolreg">
                        <img src={img1} alt="login picture" width="400px" style={{ marginRight: "100px" }} />
                    </section>
                    <section className="">
                        <h1 style={{ color: 'purple' }}>Register as an Event Organiser</h1>
                        <br></br>
                        <div className="fields">
                            <label> Event name: </label>
                            <input type="text" name="name" value={user.name} placeholder="Enter Event name" onChange={handleChange}></input>
                        </div>

                        <div className="fields" style={{ display: 'flex', justifyContent: 'center' }}>
                            <label> Address: </label>
                            <input name="address" value={user.address} placeholder="Enter your address" onChange={handleChange}></input>
                        </div>
                        <div className="fields">
                            <label> City: </label>
                            <input type="text" name="city" value={user.city} placeholder="Enter your city" onChange={handleChange}></input>
                        </div>
                        <div className="fields">
                            <label> State: </label>
                            <input type="text" name="state" value={user.state} placeholder="Enter your state" onChange={handleChange} ></input>
                        </div>

                        <div className="fields">
                            <label> Event ID: </label>
                            <input type="text" name="NGOID" value={user.NGOID} placeholder="Enter your NGO ID" onChange={handleChange} ></input>
                        </div>
                        <div className="fields">
                            <label> Number: </label>
                            <input type="text" name="pnumber" value={user.pnumber} placeholder="Enter your phone number" onChange={handleChange}></input>
                        </div>
                        <div                         className="fields">
                            <label> E-mail: </label>
                            <input type="email" name="email" value={user.email} placeholder="Enter your E-mail" onChange={handleChange} onInput={(e) => validateEmail(e)} ></input>
                            <span style={{ fontWeight: 'bold', color: 'red' }}>{emailError}</span>
                        </div>
                        
                        {/* Password Field with Toggle and Conditional Warning */}
                        <div className="fields">
                            <label> Password : </label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="passwd"
                                    value={user.passwd}
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    onFocus={() => setActiveField("passwd")}
                                    onBlur={() => setActiveField("")}
                                />
                                <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </span>
                            </div>
                            {/* Show password error only when the user is focused on the password field */}
                            {activeField === "passwd" && passwordError && (
                                <span style={{ fontWeight: 'bold', color: 'red' }}>{passwordError}</span>
                            )}
                        </div>

                        {/* Confirm Password Field with Toggle and Conditional Warning */}
                        <div className="fields">
                            <label> Confirm Password: </label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="reenterpassword"
                                    value={user.reenterpassword}
                                    placeholder="Re-Enter your password"
                                    onChange={handleChange}
                                    onFocus={() => setActiveField("reenterpassword")}
                                    onBlur={() => setActiveField("")}
                                />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                    {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </span>
                            </div>
                            {/* Show confirm password error only when the user is focused on the confirm password field */}
                            {activeField === "reenterpassword" && confirmPasswordError && (
                                <span style={{ fontWeight: 'bold', color: 'red' }}>{confirmPasswordError}</span>
                            )}
                        </div>

                        <button className="btn btn-outline-primary btn-lg" onClick={registerNgo}> Register </button>
                        <div>OR</div>
                        <div>
                            <text style={{ color: 'purple' }}>Already have Account? </text>
                            <a className="loglinkngo" onClick={() => history.push("/loginngo")} title="click here to sign in" style={{ cursor: 'pointer' }}> Sign In here </a>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Registerngo;

