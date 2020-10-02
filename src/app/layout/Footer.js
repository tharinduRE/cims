import React from "react";

export default function Footer() {
  const today = new Date().getFullYear();

  return (
    <div className="footer py-4 d-flex flex-lg-column">
      {/* begin::Container */}
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
        {/* begin::Copyright */}
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-">
            {today} &copy;
          </span>
          {` `}
          <a
            href="http://keenthemes.com/metronic"
            rel="noopener noreferrer"
            target="_blank"
            className="text-dark-75 text-hover-primary"
          >
            DesignX Crative Solutions
          </a>
        </div>
      </div>
    </div>
  );
}
