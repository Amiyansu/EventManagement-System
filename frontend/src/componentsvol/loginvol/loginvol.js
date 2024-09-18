import React, { useState } from "react";
import "./loginvol.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbar";
import img1 from "../../firstpage/images/logart.png"
import Footer from "../../commoncomponent/footer/footer2/footer2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons

const Loginvol = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: "",
        passwd: "",
    });

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const loginVol = () => {
        if (emailErrorstatus === "false") {
            console.log("logged in");
            axios.post("http://localhost:9002/loginvol", user)
                .then(res => {
                    localStorage.setItem("currentUser", JSON.stringify(res.data));

                    const vol = JSON.parse(localStorage.getItem("currentUser"));

                    if (vol.message === "Login Successful") {
                        alert("Login Successful.");
                        history.push("/homepage");
                    } else if (vol.message === "Password incorrect") {
                        alert(vol.message);
                    } else {
                        alert(vol.message);
                    }
                });
        }
    };

    const [emailError, setEmailError] = useState('');
    const [emailErrorstatus, setEmailErrorstatus] = useState('');

    const validateEmail = (e) => {
        let email = e.target.value;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(e);
        if (re.test(email)) {
            setEmailError('');
            setEmailErrorstatus("false");
            handleChange(e);
        } else {
            setEmailErrorstatus("true");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    return (
        <>
            <Navbar />
            <div className="loginvol">
                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <section className="Formlogvol">
                        <section className="leftvol">
                            <img style={{ marginRight: '50px' }} src={img1} alt="login picture" width="500px" />
                        </section>

                        <section className="rightvol">
                            <div>
                                <h1>Login as a User</h1><br />
                                <div className="fields">
                                    <label style={{ paddingRight: '20px' }}>Email id:</label>
                                    <input
                                        style={{
                                            border: '1px solid #8320ed',
                                            borderRadius: '12px',
                                            padding: '13px',
                                            fontSize: '16px',
                                            marginLeft:'14px'
                                        }}
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        onInput={(e) => validateEmail(e)}
                                        placeholder="Enter email address"
                                    />
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: 'black',
                                    }}>{emailError}</span>
                                </div><br />

                                <div className="fields">
                                    <label style={{ paddingRight: '30px' }}>Password:</label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            style={{
                                                border: '1px solid #8320ed',
                                                borderRadius: '12px',
                                                paddingRight: '40px' // Leave space for the eye icon
                                            }}
                                            type={showPassword ? "text" : "password"} // Toggle input type
                                            name="passwd"
                                            value={user.passwd}
                                            onChange={handleChange}
                                            placeholder="Enter Your password"
                                        />
                                        <span
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                                        </span>
                                    </div>
                                </div><br />
                                <button className="btn btn-outline-primary btn-lg" onClick={loginVol}>Login</button><br />
                                <h7>or</h7><br />
                                <text style={{ color: 'black' }}>Don't have Account?</text>
                                <a style={{ color: 'red' }} id="reglinkvol" onClick={() => history.push("/registervol")} title="click here to Sign up"> Sign up here </a>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Loginvol;
