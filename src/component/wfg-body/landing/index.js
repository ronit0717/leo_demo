import React, {useState} from "react";

const Landing = () => {
  const [formStatus, setFormStatus] = useState("")

  const submitForm = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setFormStatus("SUCCESS")
      } else {
        setFormStatus("ERROR")
      }
    };
    xhr.send(data);
  }

  return (
    <>
      {/* Hero Area */}
      <section className="hero-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 order-lg-2">
              <div className="hero-image">
                <img src="./images/undraw_in_sync.svg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="hero-content">
                <h1>Go E-Commerce seamlessly.</h1>
                <p>
                  Automate your store operations with clicks and digitalize
                  your business with Wefungo.
                </p>
                <div className="hero-form">
                  <form  
                    onSubmit={(e)=>submitForm(e)}
                    action="https://formspree.io/f/myybdpkr"
                    method="POST"
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="info"
                        placeholder="Enter email/phone"
                        required
                      />
                      {formStatus === "SUCCESS" ? <p>Thanks!</p> : <button type="submit" className="submit-btn">Contact Us</button>}
                      {formStatus === "ERROR" && <p>Ooops! There was an error.</p>}
                    </div>
                    <p className="form-text">
                      Already using Wefungo?{" "}
                      <a href="#link" className="link">
                        Sign In
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 */}
      <section className="feature-section">
        <div className="shape">
          <img src="./image/landing-1-shape.svg" alt="" />
        </div>
        <div className="container">
          <div className="section-title text-center">
            <h2>Mark your next step</h2>
          </div>
          <div className="row mb-d-30">
            <div className="col-md-6 col-lg-4 mb--30">
              <div className="feature-card">
                <div className="card-icon">
                  <i className="icon icon-check-circle-07" />
                </div>
                <div className="card-content">
                  <h3>Targeted Marketing</h3>
                  <p>
                    Whether it’s a small internal app or a new for millions of
                    customers, our design and development teams.
                  </p>
                  <a href className="btn btn-link right-icon">
                    Learn more <i className="icon icon-minimal-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb--30">
              <div className="feature-card">
                <div className="card-icon">
                  <i className="icon icon-send" />
                </div>
                <div className="card-content">
                  <h3>Easy Communicaton</h3>
                  <p>
                    Whether it’s a small internal app or a new for millions of
                    customers, our design and development teams.
                  </p>
                  <a href className="btn btn-link right-icon">
                    Learn more <i className="icon icon-minimal-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb--30">
              <div className="feature-card">
                <div className="card-icon">
                  <i className="icon icon-settings" />
                </div>
                <div className="card-content">
                  <h3>Fastest Setup</h3>
                  <p>
                    Whether it’s a small internal app or a new for millions of
                    customers, our design and development teams.
                  </p>
                  <a href className="btn btn-link right-icon">
                    Learn more <i className="icon icon-minimal-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
