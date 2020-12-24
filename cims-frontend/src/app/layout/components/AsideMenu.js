import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../Routes";
import _ from "lodash";

export default function AsideMenu() {
  const navRoutes = _.sortBy(_.filter(routes, "sideMenu"), ["sideMenu.index"]);

  return (
    <ul className="nav flex-column">
      {navRoutes.map((route, i) => (
        <MenuLink path={route.path} icon={<route.sideMenu.icon/>} key={i}/>
      ))}
    </ul>
  );
}

function MenuLink({ path, icon }) {
  return (
    <li className="nav-item mb-5">
      <NavLink to={path} className="nav-link btn btn-icon  btn-icon-white btn-lg">
        {icon}
      </NavLink>
    </li>
  );
}
