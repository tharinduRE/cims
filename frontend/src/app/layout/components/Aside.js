import React from "react";
import { BsPerson } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import AsideMenu from "./AsideMenu";
import Brand from "./Brand";
import { AuthContext } from "../../pages/auth/AuthProvider";

export default function Aside() {
  const { state: AuthState } = React.useContext(AuthContext);
  const authUser = AuthState.user;

  return (
    <div className="aside aside-left d-flex flex-column">
      <Brand />
      <div
        className="aside-nav d-flex flex-column align-items-center flex-column-fluid pt-7 scroll"
        /*   style={{ height: "287px", overflow: "scroll" }} */
      >
        <AsideMenu />
      </div>
      <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-8">
        {authUser.authorities.includes("ROLE_ADMIN") ? (
          <ul className="nav">
            <NavLink to="/user/manage" className="nav-link btn btn-icon  btn-icon-white btn-lg">
              <BsPerson />
            </NavLink>
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
