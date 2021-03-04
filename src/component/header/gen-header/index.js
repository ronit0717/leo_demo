import React, { Component } from "react";
import { Link } from "react-router-dom"
import wfgLogo from "../../images/wfg-logo.svg"
import "../header.css"

class GenHeader extends Component {
  render() {
    return (
        <header className="site-header">
          <div className="container">
            <div className="row justify-content-center align-items-center position-relative">
              <div className="col-sm-3 col-6 col-lg-3 col-xl-3 order-lg-1">
                <div className="brand">
                  <a href="/">
                    <img src={wfgLogo} alt="" />
                    <span>Wefungo</span>
                    <small className="pl-1">BETA</small>
                  </a>
                </div>
              </div>
              <div className="col-sm-8 col-lg-2 col-xl-2 d-none d-sm-block order-lg-3">
                <div className="header-btns">
                  <div className="btn-2">
                    <Link to="/app">Sign In</Link>
                  </div>
                  {/* <div className="btn-2">
                    <a href="">Login/Register</a>
                  </div> */}
                </div>
              </div>
              {/* Menu Block */}
              <div className="col-sm-1 col-6 col-lg-6 col-xl-6 offset-xl-1 position-static order-lg-2">
                <div className="main-navigation">
                  <ul className="main-menu">
                    <li className="menu-item has-dropdown">
                      <a href="#features">Free Landing Pages</a>
                      <ul className="menu-dropdown">
                        <li className="single-item">
                          <a href="../s01/index.html">
                            <h3>Mobile Application</h3>
                            <p>Best for Mobile App Presentation</p>
                          </a>
                        </li>
                        <li className="single-item">
                          <a href="../s02/index.html">
                            <h3>Web Application</h3>
                            <p>Best for Mobile App Presentation</p>
                          </a>
                        </li>
                        <li className="single-item">
                          <a href="../s03/index.html">
                            <h3>SaaS Application</h3>
                            <p>Best for Mobile App Presentation</p>
                          </a>
                        </li>
                        <li className="single-item">
                          <a href="../s04/index.html">
                            <h3> SaaS Subscription</h3>
                            <p>Best for Mobile App Presentation</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item ">
                      <a href="#features">Features</a>
                    </li>
                    <li className="menu-item">
                      <a href="#services">Services</a>
                    </li>
                    <li className="menu-item">
                      <a href="#pricing">Pricing</a>
                    </li>
                    <li className="menu-item">
                      <a href="#contact">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="mobile-menu" />
              </div>
            </div>
          </div>
        </header>
    );
  }
}

export default GenHeader;
