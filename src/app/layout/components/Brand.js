import React from "react";
import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <>
      <div className="aside-brand d-flex flex-column align-items-center flex-column-auto py-lg-2 bg-info" style={{height:"85px",}}>
        <Link to="/">
          <div className="d-flex" >
          <img
            src={process.env.PUBLIC_URL + "/images/pera-logo.png"}
            width="70px"
            alt="brand-logo"
            className="img-fluid"
          />
          </div>
         
        </Link>
      </div>
    </>
  );
}
