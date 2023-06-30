import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.css';
import BMImodal from "./BMImodal";

function Header() {


    const [modalShow, setModalShow] = useState(false);

    return (
        <header className="p-0 " style={{ backgroundColor: "#f8eddf" }}>
            <div class="container" >
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul class="nav col-12 col-lg-auto me-lg-auto justify-content-center mb-md-0">
                        <li className="PULSE" class="nav-link px-2" style={{ fontSize: "40px", marginLeft: "-100px", color: "#000000" }}>FitPulse     </li>
                        <div id="container">
                            <div className="loader" style={{ marginLeft: "-5px" }}>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </ul>


                    <div class="text-end">
                        <button type="button" class="btn btn-primary" onClick={() => setModalShow(true)}>Calculate your BMI</button>
                    </div>

                    <BMImodal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    >
                    </BMImodal>
                </div>
            </div>
        </header>
    )
}

export default Header;