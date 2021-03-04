import React, { Component } from "react";

//components
import AdminDashCard from './admin-dash-card'
import AdminDashTable from './admin-dash-table'
import AdminDashTableDark from './admin-dash-table-dark'
import ProgressTaskList from './progress-task-list'
import ActivitiesQuikrPost from './activities-quick-post'

class DashboardDemo extends Component {
  render() {
    return (
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 col-md-8 ml-auto">
              <div className="row pt-md-5 mt-md-3 mb-5">
                <AdminDashCard />
              </div>
              <div className="row align-items-center">
                <AdminDashTable />
                <AdminDashTableDark />
              </div>
            </div>
            <div className="col-lg-10 col-md-8 ml-auto">
              <ProgressTaskList />
            </div>
            <div className="col-lg-10 col-md-8 ml-auto">
              <ActivitiesQuikrPost />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DashboardDemo;
