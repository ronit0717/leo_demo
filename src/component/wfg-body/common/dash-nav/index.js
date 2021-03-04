import React from "react";

import { NavLink } from "react-router-dom";

import "./dash-nav.css";

const DashNav = ({ navList }) => {
  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {navList &&
            navList.map(nav => (
              <li className="nav-item mr-1">
                <NavLink
                  exact
                  className="nav-link nav-link-bottom"
                  to={nav.link}
                  activeClassName="active"
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default DashNav;
