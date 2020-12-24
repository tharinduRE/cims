import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const today = new Date().getFullYear();

  return (
    <>
      {/* begin::Footer */}

      <div className="footer footer-fixed bg-white py-4 d-flex flex-lg-column">
        {/* begin::Container */}
        <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
          {/* begin::Copyright */}
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted font-weight-bold mr-">{today} &copy;</span>
            {` `}
            <a
              href="https://github.com/tharinduRE/cims-web-app"
              rel="noopener noreferrer"
              target="_blank"
              className="text-dark-75 text-hover-primary"
            >
              Tharindu Premasiri
            </a>
          </div>
          {/* end::Copyright */}
          {` `}
          {/* begin::Nav */}
          <Nav className="nav nav-dark order-1 order-md-2">
            <Nav.Item as={NavLink} to="/about" className= "pr-3 pl-0">
              About 
            </Nav.Item>
          </Nav>
          {/* end::Nav */}
        </div>
        {/* end::Container */}
      </div>
      {/* end::Footer */}
    </>
  );
}
