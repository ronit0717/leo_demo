import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import wfgLogoLight from "../../../images/wfg-logo-light.svg";

const AppHeaderSidebar = ({ displayName }) => {
  const [navList] = useState([
    {
      name: "Dashboard",
      link: "/app/dashboard",
      logo: "fas fa-home"
    },
    {
      name: "Order",
      link: "/app/order",
      logo: "fas fa-shopping-cart"
    },
    {
      name: "Inventory",
      link: "/app/inventory",
      logo: "fas fa-boxes"
    },
    {
      name: "Store",
      link: "/app/store",
      logo: "fas fa-store"
    },
    /*
    {
      name: "Profile",
      link: "/app/user",
      logo: "fa fa-user"
    },
    {
      name: "Client",
      link: "/app/client",
      logo: "fa fa-users"
    }
    */
  ]);

  return (
    <div className="col-lg-2 col-md-4 sidebar fixed-top">
      <a
        href="/"
        className="navbar-brand text-white d-block mx-auto 
                                text-center py-3 mb-4 bottom-border app-sidebar-logo bottom-border"
      >
        <img src={wfgLogoLight} alt="Wefungo" />
        <span className="side-bar-font-brand">Wefungo</span>
      </a>

      <div className="bottom-border pb-3 text-white d-block mx-auto text-center side-bar-font">
        Hi {displayName ? displayName.substr(0, 15) : "User"}
      </div>
      <ul className="navbar-nav flex-column mt-3">
        {navList &&
          navList.map(nav => (
            <li className="nav-item" key={nav.name}>
              <NavLink
                to={nav.link}
                className="nav-link text-white p-3 mb-2 sidebar-link"
                activeClassName="current"
              >
                <i className={"text-light fa-lg mr-3 " + nav.logo}></i>
                {nav.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AppHeaderSidebar;
