import React, { Component } from "react";

//components
import AdminDashCard from './admin-dash-card'
import DashboardTime from './dashboard-time'

class Dashboard extends Component {
  render() {
    return (
      <section>
        <div className="container-fluid my-lg-5">
          <div className="row">
            <div className="col-lg-10 col-md-8 ml-auto">
              <div className="row pt-md-5 mt-md-3 mb-5 align-items-center">
                <div className="col-lg-7 col-12">
                  <AdminDashCard />
                </div>
                <div className="col-lg-5 col-12">
                  <DashboardTime />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
