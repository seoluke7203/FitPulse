import React from "react";

const Footer = () => {
  return (
    <div className="container-fluid">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">&copy; 2023 Luke Seo</p>

        <div className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span className="PULSE" style={{ fontSize: "30px" }}>FitPulse</span>
        </div>

        <div className="col-md-4 d-flex justify-content-end">
          <a className="btn btn-light btn-lg" href="/" role="button">Log Out</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
