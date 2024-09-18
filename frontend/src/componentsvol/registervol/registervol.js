import React, { useState } from "react";
import "./registervol.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbar";
import img1 from "../../firstpage/images/logart.png";
import Footer from "../../commoncomponent/footer/footer2/footer2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Registervol = () => {
     const history = useHistory();
     const [user, setUser] = useState({
          firstname: "",
          lastname: "",
          address: "",
          city: "",
          state: "",
          gender: "",
          pnumber: "",
          email: "",
          passwd: "",
          reenterpassword: ""
     });

     const [showPassword, setShowPassword] = useState(false);  // Toggle for Password visibility
     const [showRePassword, setShowRePassword] = useState(false);  // Toggle for Confirm Password visibility

     const handleChange = e => {
          const { name, value } = e.target;
          setUser({
               ...user,
               [name]: value
          });
     };

     const registerVol = () => {
          const { firstname, lastname, address, city, state, gender, pnumber, email, passwd, reenterpassword } = user;
          if (emailErrorstatus === "false") {
               if (firstname && lastname && email && address && city && state && gender && pnumber && passwd) {
                    if (passwd === reenterpassword) {
                         axios.post("http://localhost:9002/registervol", user)
                              .then(res => alert(res.data.message));
                         history.push("/loginvol");
                    }
                    else {
                         alert("Passwords don't match.");
                    }
               }
               else {
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
               <div className="registervol" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="regvolbox" style={{ display: 'flex', justifyContent: 'center' }}>
                         <section className="leftvolreg">
                              <img src={img1} alt="login picture" width="400px" style={{ marginRight: "1px" }} />
                         </section>

                         <section className="">
                              <h1>User Registration</h1>
                              <br />
                              <div className="fields">
                                   <label> First name: </label>
                                   <input type="text" name="firstname" value={user.firstname} placeholder="Enter First name" onChange={handleChange}></input>
                              </div>
                              <div className="fields">
                                   <label> Last name: </label>
                                   <input type="text" name="lastname" value={user.lastname} placeholder="Enter Last name" onChange={handleChange}></input>
                              </div>
                              <div className="fields">
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
                              <div className="fields gender1 g1">
                                   <label> Gender: </label>
                                   <select name="gender" value={user.gender} onChange={handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                   </select>
                              </div>
                              <div className="fields">
                                   <label> Number: </label>
                                   <input type="text" name="pnumber" value={user.pnumber} placeholder="Enter your phone number" onChange={handleChange}></input>
                              </div>
                              <div className="fields">
                                   <label> E-mail: </label>
                                   <input type='email' name="email" value={user.email} placeholder="Enter your E-mail" onChange={handleChange} onInput={(e) => validateEmail(e)} ></input>
                                   <span style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                   }}>{emailError}</span>
                              </div>
                              <div className="fields">
                                   <label> Password: </label>
                                   <div style={{ display: "flex", alignItems: "center" }}>
                                        <input
                                             type={showPassword ? "text" : "password"}
                                             name="passwd"
                                             value={user.passwd}
                                             placeholder="Enter your password"
                                             onChange={handleChange}
                                        />
                                        <FontAwesomeIcon
                                             icon={showPassword ? faEyeSlash : faEye}
                                             onClick={() => setShowPassword(!showPassword)}
                                             style={{ cursor: 'pointer', marginLeft: "10px" }}
                                        />
                                   </div>
                              </div>
                              <div className="fields">
                                   <label> Confirm Password: </label>
                                   <div style={{ display: "flex", alignItems: "center" }}>
                                        <input
                                             type={showRePassword ? "text" : "password"}
                                             name="reenterpassword"
                                             value={user.reenterpassword}
                                             placeholder="Re-Enter your password"
                                             onChange={handleChange}
                                        />
                                        <FontAwesomeIcon
                                             icon={showRePassword ? faEyeSlash : faEye}
                                             onClick={() => setShowRePassword(!showRePassword)}
                                             style={{ cursor: 'pointer', marginLeft: "10px" }}
                                        />
                                   </div>
                              </div>
                              <div className="btn btn-outline-primary btn-lg" onClick={registerVol}> Register </div>
                              <div>OR</div>
                              <div>
                                   <text style={{ color: 'tomato' }}>Already have Account? </text>
                                   <a className="loglinkvol" onClick={() => history.push("/loginvol")} title="cliick here to sign in" style={{ cursor: 'pointer' }}> Sign In here </a>
                              </div>
                         </section>
                    </div>
               </div>
          </>
     )
}

export default Registervol;
