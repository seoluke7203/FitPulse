import React from "react";

const Footer = () => {
    return (
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p class="col-md-4 mb-0 text-muted">&copy; 2023 Luke Seo</p>

                <a class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">

                    <span className="PULSE" style={{ fontSize: "30px" }}>FitPulse</span>
                </a>

                <ul class="nav col-md-4 justify-content-end">
                    <a class="btn btn-light btn-lg" href="/" role="button">Log Out</a>
                </ul>
            </footer>
        </div>
    )

}

export default Footer;