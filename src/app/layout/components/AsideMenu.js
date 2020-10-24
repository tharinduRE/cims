import React from "react";
/* import { OverlayTrigger, Tooltip } from "react-bootstrap";
 */ import { BsHouse, BsSearch, BsArchive, BsCollection, BsFileText, BsFillLayersFill } from "react-icons/bs";
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
                    className="nav-link btn btn-icon  btn-icon-white btn-lg"
                >
                    <BsSearch />
                </NavLink>
                {/*             </OverlayTrigger>
                 */}{" "}
            </li>
            <li className="nav-item mb-5">
                <NavLink to="/home" className="nav-link btn btn-icon  btn-icon-white btn-lg">
                    <BsHouse />
                </NavLink>
            </li>
            <li className="nav-item mb-5">
                <NavLink to="/browse" className="nav-link btn btn-icon  btn-icon-white btn-lg">
                    <BsCollection />
                </NavLink>
            </li>
            <li className="nav-item mb-5">
                <NavLink to="/orders" className="nav-link btn btn-icon  btn-icon-white btn-lg">
                    <BsFillLayersFill />
                </NavLink>
            </li>
            <li className="nav-item mb-5">
                <NavLink to="/waste-store" className="nav-link btn btn-icon  btn-icon-white btn-lg">
                    <BsArchive />
                </NavLink>
            </li>
            <li className="nav-item mb-5">
                <NavLink to="/reports" className="nav-link btn btn-icon  btn-icon-white btn-lg">
                    <BsFileText />
                </NavLink>
            </li>
        </ul>
    );
}
