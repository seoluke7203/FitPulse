import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './bootstrap-social.css';
import './register.css';
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// import MyVerticallyCenteredModal from "./Signup";
import { Link, redirect } from "react-router-dom";
// import MainPage from "./MainPage";

// Admin
// admin@admin.com
// admin





function Register() {
  
  const query = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const msg = query.get('message');

  const errortype = msg?.text;

  if (msg === "error1"){
    Swal.fire({
      icon: 'failed',
      title: 'Failed!',
      text: 'Duplicated User, please try registering with different email',
      confirmButtonText: 'OK'
    }).then((result) =>{
      if (result.isConfirmed){
        navigate('/register');
      }
    })
  }


  const handleSubmit = (e) => {

    Swal.fire({
      icon: 'success',
      title: 'Registered!',
      text: 'You have been registered successfully!',
      confirmButtonText: 'OK'
    }).then((result) => {
      // Redirect to the homepage after showing the alert
      if (result.isConfirmed) {
        navigate('/');

      }
    });
  }




  return (
    <section class="vh-100 bg-image"
      style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');" }}>
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style={{ borderRadius: "15px" }}>
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                  <form onSubmit={handleSubmit} method="POST">

                    <div class="form-floating">
                      <input type="text" class="form-control top" name="userfName" placeholder="first" />
                      <label for="floatingInput">First Name</label>
                    </div>

                    <div class="form-floating">
                      <input type="text" class="form-control middle" name="userlName" placeholder="last" />
                      <label for="floatingInput">Last Name</label>
                    </div>

                    <div class="form-floating">
                      <input type="email" class="form-control middle" name="useremail" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                      <label for="floatingInput">Email Address</label>
                    </div>

                    <div class="form-floating">
                      <input type="password" class="form-control bottom " name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                      <label for="floatingInput">Password</label>
                    </div>


                    <div class="d-flex justify-content-center align-items-center card-body">
                      <button type="submit" id="btn-register"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100">Register</button>
                    </div>

                    <div class="strike mt-3 mb-3">
                      <span>or</span>
                    </div>


                    <div class="d-flex justify-content-center align-items-center card-body">
                      <GoogleLoginButton onClick={() =>
                        Swal.fire({
                          icon: 'failure',
                          title: 'Failed',
                          text: 'Sorry, Google Login is under maintenance',
                          confirmButtonText: 'OK'
                        })
                      }>
                        <span>Sign Up with Google</span>
                      </GoogleLoginButton>
                    </div>



                    <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="/"
                      class="fw-bold text-body"><u>Login here</u></a></p>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}

export default Register;
