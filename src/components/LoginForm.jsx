import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './loginform.css';
// import MyVerticallyCenteredModal from "./Signup";
import { Link } from "react-router-dom";
// import MainPage from "./MainPage";
import Register from "./Register";

// Admin
// admin@admin.com
// admin



function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) =>{
        // e.preventDefault();
        console.log("Loging in...");
        
        // navigate('/');
      }
    




    return (
        <section className="vh-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 text-black">
                        <div className="px-5 ms-xl-2 d-flex justify-content-center align-items-center">
                            <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: "#709085" }}></i>
                            <span className="PULSE" style={{ fontSize: "60px", marginTop: "20px" }}>FitPulse</span>
                            <div id="container">
                                <div className="loader">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 pt-5 pt-xl-0 mt-xl-n5" style={{ marginTop: "-50px" }}>



                            <form name="login" style={{ width: "23rem" }} onSubmit={handleSubmit} method="POST" netlify>
                                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Log in</h3>

                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="form2Example18">Email address</label>
                                    <input name="useremail" type="email"  id="email" value={email} className="form-control form-control-lg" style={{ width: "350px" }} onChange={(e) => setEmail(e.target.value)} />

                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example28">Password</label>
                                    <input name="password" type="password"  id="password" value={password} className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />

                                </div>



                                <div className="pt-1 mb-2">
                                    <button className="btn btn-info btn-lg btn-block w-100 " type="submit" formAction=''>Login</button>
                                </div>

                                <Link to = '/main'>
                                <button className="btn btn-info btn-lg btn-block w-100 mb-4" type="button" formAction=''>Continue as Guest</button>
                                </Link>



                                <p>Don't have an account? <a href="/register" className="link-info">Register here</a></p>

                            </form>
                        </div>
                    </div>

                    <div className="col-lg-8 px-0 d-none d-md-block">
                        <img src="https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg"
                            alt="Login" className="w-100 vh-100" style={{ objectFit: "cover", objectPosition: "left top" }} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
