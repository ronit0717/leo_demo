import React, { Component } from 'react';
import './gen-footer.css'

import wfgLogo from "../../images/wfg-logo.svg"

class GenFooter extends Component {
    render() {
      return (
        <div className="footer-section">
          <div className="container">
            <div className="footer-newsletter-section">
              <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-8">
                  <div className="footer-newsletter-content">
                    <h2>Join our rich newsletter now</h2>
                    <p>
                      We designed and tested prototypes that helped identify pain
                      points in the account creation process. Together, we shaped
                      the new standard.
                    </p>
                  </div>
                </div>
                <div className="col-lg-7 col-xl-6">
                  <div className="footer-newsletter-form">
                    <form action>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your email address"
                        />
                        <button className="submit-btn">Subscribe</button>
                      </div>
                      <p className="form-text">
                        <i className="icon icon-lock" />
                        Your data is protected. We never spam in your inbox
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row margin-decrese">
              <div className="col-xl-4 col-lg-5 col-margin">
                <div className="single-footer">
                  <div className="footer-title">
                    <img src={wfgLogo} alt="" />
                    <span className="company-stamp">Developed by <b><a href="https://www.linkedin.com/in/ronitc/" target="blank">Ronit Chattopadhyay</a></b></span>
                  </div>
                  <div className="footer-text">
                      <p>
                          I am a software engineer working <a href="https://www.quikr.com/" target="blank">@Quikr</a>, having over 4 years of experience developing applications and tools in E-Commerce industry.
                      </p>
                  </div>
                  <ul className="footer-social-list">
                    <li>
                      <a href>
                        <i className="icon icon-logo-fb-simple" />
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="icon icon-logo-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="icon icon-google" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-sm-4 col-6 offset-lg-1 col-margin">
                <div className="single-footer">
                  <div className="footer-title">
                    <h6>Help Menu</h6>
                  </div>
                  <ul className="footer-list">
                    <li>
                      <a href>About</a>
                    </li>
                    <li>
                      <a href>Features</a>
                    </li>
                    <li>
                      <a href>Works</a>
                    </li>
                    <li>
                      <a href>Career</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-sm-4 col-6 col-margin">
                <div className="single-footer">
                  <div className="footer-title">
                    <h6>Support</h6>
                  </div>
                  <ul className="footer-list">
                    <li>
                      <a href>Contact</a>
                    </li>
                    <li>
                      <a href>Help &amp; Support</a>
                    </li>
                    <li>
                      <a href>Privacy Policy</a>
                    </li>
                    <li>
                      <a href>Terms &amp; Conditions</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-sm-4 col-margin">
                <div className="single-footer">
                  <div className="footer-title">
                    <h6>Products</h6>
                  </div>
                  <ul className="footer-list">
                    <li>
                      <a href> Shades Pro</a>
                    </li>
                    <li>
                      <a href>Essential Blocks</a>
                    </li>
                    <li>
                      <a href>Avasta Dash</a>
                    </li>
                    <li>
                      <a href>vApp Landing Page</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default GenFooter;