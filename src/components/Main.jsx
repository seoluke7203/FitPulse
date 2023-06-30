import React, { useState, useEffect } from 'react';
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import "./main.css";

function Main() {

    // const [fName, setfName] = useState("");


    const query = new URLSearchParams(window.location.search);
    const fName = query.get('fName') || "Guest";
    const lName = query.get('lName') || "";
    const email = query.get('email');
    console.log(fName, lName);


    return (

        <div>
            {/* Welcome, {fName} {lName}!! */}
            <Header />
            <div className="content-wrapper">
            <h2>Welcome, {fName}!</h2>
                <form method="POST">
                    <input type="hidden" name="id" value={email}></input>

                    <div class="d-flex justify-content-center align-items-center card-body">
                        <button type="submit" id="btn-register"
                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-30">Save</button>
                    </div>
                </form>


            </div>
            <Footer />
        </div>
    )
}
export default Main;