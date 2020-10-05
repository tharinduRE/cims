import React from "react";
import { BsHouse, BsSearch ,BsApp,BsPlus} from "react-icons/bs";
import Brand from "./Brand";

export default function Aside() {
  return (
    <div className="aside aside-left d-flex flex-column">
      {/* begin::Nav Wrapper */}
      <Brand />
      <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid pt-7">
        {/* begin::Nav */}
        <ul className="nav flex-column">
          <li
            className="nav-item mb-5"
            data-toggle="tooltip"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            title=""
            data-original-title="Latest Projects"
          >
            <a
              href="/"
              className="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active"
            >
              <BsSearch />
            </a>
          </li>
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
              href="/item/2"
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
        {/* end::Nav */}
      </div>
      {/* end::Nav Wrapper */}
    </div>
  );
}
