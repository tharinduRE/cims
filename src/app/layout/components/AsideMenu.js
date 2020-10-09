import React from 'react'
/* import { OverlayTrigger, Tooltip } from "react-bootstrap";
 */import { BsHouse, BsSearch, BsApp, BsPlus,BsList } from "react-icons/bs";

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
              <a
                href="/"
                className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active"
              >
                <BsSearch />
              </a>
{/*             </OverlayTrigger>
 */}          </li>
          <li className="nav-item mb-5">
            <a
              href="/home"
              className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active"
            >
              <BsHouse />
            </a>
          </li>
          <li className="nav-item mb-5">
            <a
              href="/listall"
              className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active"
            >
              <BsList />
            </a>
          </li>

          <li className="nav-item mb-5">
            <a
              href="/order"
              className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active"
            >
              <BsApp />
            </a>
          </li>
          <li className="nav-item mb-5">
            <a
              href="/addItem"
              className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active"
            >
              <BsPlus />
            </a>
          </li>
        </ul>
    )
}
