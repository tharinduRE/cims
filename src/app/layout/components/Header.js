import React from "react";

export default function Header() {
  return (
    <>
      <div className="header bg-white header-fixed">
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
          <div className="d-flex align-items-strtch">
            <img
              src={process.env.PUBLIC_URL + "/images/logo-header-full.svg"}
              alt="header-logo"
              className="mh-80"
            />
          </div>
        </div>
      </div>
    </>
  );
}
