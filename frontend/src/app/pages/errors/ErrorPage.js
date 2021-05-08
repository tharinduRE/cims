
import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex flex-row-fluid flex-column p-10 p-sm-30 min-vh-100"
        style={{
          backgroundImage: `url(${ process.env.PUBLIC_URL + ("/error/bg6.jpg")})`,
          backgroundSize:"auto",
          backgroundPositionX:"center",
          backgroundPositionY:"bottom",
        }}
      >
        <h1
          className="font-size-sm-100 font-weight-boldest text-dark-75 mt-15"
          style={{ fontSize: "150px" }}
        >
          404
        </h1>
        <p className="font-size-h3 font-weight-light">
          OOPS! Something went wrong here
        </p>
        <NavLink to="/"><Button variant="info">Go Back</Button></NavLink>
      </div>
    </div>
  );
}
