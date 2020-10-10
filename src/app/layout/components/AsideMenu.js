import React from "react";
/* import { OverlayTrigger, Tooltip } from "react-bootstrap";
 */ import { BsHouse, BsSearch, BsApp, BsPlus, BsList } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function AsideMenu() {
  return (
    <ul className="nav flex-column">
      <li
        className="nav-item mb-5"
        data-toggle="tooltip"
        data-placement="right"
        data-container="body"
        data-boundary="window"
        title=""
      >
        {/* <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip-right">Search</Tooltip>}
            > */}
        <NavLink
          to={{ pathname: "/search" }}
          className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg"
        >
          <BsSearch />
        </NavLink>
        {/*             </OverlayTrigger>
         */}{" "}
      </li>
      <li className="nav-item mb-5">
        <NavLink
          to="/home"
          className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg"
        >
          <BsHouse />
        </NavLink>
      </li>
      <li className="nav-item mb-5">
        <NavLink
          to="/listall"
          className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active"
        >
          <BsList />
        </NavLink>
      </li>

      <li className="nav-item mb-5">
        <NavLink
          to="/issue"
          className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg"
        >
          <BsApp />
        </NavLink>
      </li>
      <li className="nav-item mb-5">
        <NavLink
          to="/addItem"
          className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg"
        >
          <BsPlus />
        </NavLink>
      </li>
    </ul>
  );
}
