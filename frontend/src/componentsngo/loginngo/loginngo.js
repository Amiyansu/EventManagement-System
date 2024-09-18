import React, { useState } from "react";
import "./loginngo.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbar";
import img1 from "../../firstpage/images/ngolog.png";
import Footer from "../../commoncomponent/footer/footer2/footer2";

const Loginngo = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: "",
        passwd: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const loginNgo = () => {
        if (emailErrorstatus === "false") {
            axios.post("http://localhost:9002/loginngo", user).then(res => {
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                const ngo = JSON.parse(localStorage.getItem("currentUser"));

                if (ngo.message === "Login Successful") {
                    alert("Login Successful.");
                    history.push("/homepagengo");
                } else if (ngo.message === "Password incorrect") {
                    alert(ngo.message);
                } else {
                    alert(ngo.message);
                }
            });
        } else {
            alert("Please enter a valid email.");
        }
    };

    const [emailError, setEmailError] = useState("");
    const [emailErrorstatus, setEmailErrorstatus] = useState("");

    const validateEmail = e => {
        let email = e.target.value;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            setEmailError("Valid Email :)");
            setEmailErrorstatus("false");
            handleChange(e);
        } else {
            setEmailError("Enter a valid Email!");
            setEmailErrorstatus("true");
        }
    };

    return (
        <>
            <Navbar />
            <div className="loginngo">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <section className="Formlogngo">
                        <section className="leftvol">
                            <img src={img1} alt="login picture" width="500px" />
                        </section>

                        <section className="rightngo">
                            <div>
                                <h1>Login as an Admin</h1>
                                <br />
                                <div className="fields">
                                    <label style={{ paddingRight: "10px", color: "purple" }}>Email id:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        onInput={validateEmail}
                                        placeholder="Enter email address"
                                    />
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            color: "red",
                                        }}
                                    >
                                        {emailError}
                                    </span>
                                </div>
                                <br />

                                {/* Password field with show/hide icon */}
                                <div className="fields password-field" style={{ position: "relative" }}>
                                    <label style={{ paddingRight: "10px" }}>Password:</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="passwd"
                                        value={user.passwd}
                                        onChange={handleChange}
                                        placeholder="Enter Your password"
                                        style={{ paddingRight: "50px"}} // Extra space for the icon
                                    />
                                    <i
                                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "30%",
                                            transform: "translateY(-50%)",
                                            cursor: "pointer",
                                            color: "blue",
                                            marginTop:"12px"
                                        }}
                                    ></i>
                                </div>
                                <br />

                                <button className="btn btn-outline-primary btn-lg" onClick={loginNgo}>
                                    Login
                                </button>
                                <br />
                                <h7>or</h7>
                                <br />
                                <text>Don't have an Account?</text>
                                <a id="reglinkngo" onClick={() => history.push("/registerngo")} title="click here to Sign up">
                                    Sign up here
                                </a>
                            </div>
                        </section>
                    </section>
                </div>
                <br />
            </div>
        </>
    );
};

export default Loginngo;
