import React, { useEffect, useState } from "react";

import "./app-header.css";
import AppHeaderSidebar from "./sidebar";

const auth_redirects =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  window.location.port;

  async function signOut() {
    try {
      alert("Signout Called");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

const AppHeader = () => {

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <button
        className="navbar-toggler ml-auto mb-2 bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#tdAppHeaderNavbar"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="tdAppHeaderNavbar">
        <div className="container-fluid">
          <div className="row">
            {/* sidebar */}
            <AppHeaderSidebar displayName={"John Doe"} />

            {/* top navbar */}
            <div className="col-lg-10 col-md-8 ml-auto bg-dark fixed-top top-navbar">
              <div className="row align-items-center">
                <div className="col-md-7 align-items-center text-light">
                  Dashboard
                </div>
                <div className="col-md-5 text-right align-items-center">
                  <ul className="navbar-nav">
                    <li className="nav-item ml-md-auto">
                      <p
                        className="nav-link text-light align-items-center mb-0"
                        onClick={() => signOut()}
                      >
                        Sign Out
                        <i className="fas fa-sign-out-alt td-theme-gray fa-lg ml-2" />
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
