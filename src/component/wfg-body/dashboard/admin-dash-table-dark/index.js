import React, { Component } from "react";
//import "../admin-dash-table/admin-dash-table.css";

class AdminDashTable extends Component {
  render() {
    return (
      <div className="col-xl-6 col-12 mb-5 mb-xl-0">
        <h3 className="text-muted text-center mb-3">Recent Payments</h3>
        <table className="table table-dark table-hover text-center">
          <thead>
            <tr className="text-muted">
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Marco</td>
              <td>Rs 40,000</td>
              <td>30-07-2020</td>
              <td>
                <span className="badge badge-success w-75 py-2">Approved</span>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Stephen</td>
              <td>Rs 20,000</td>
              <td>12-06-2020</td>
              <td>
                <span className="badge badge-danger w-75 py-2">Pending</span>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>Jane</td>
              <td>Rs 40,000</td>
              <td>30-07-2020</td>
              <td>
                <span className="badge badge-success w-75 py-2">Approved</span>
              </td>
            </tr>
            <tr>
              <th>4</th>
              <td>Robert</td>
              <td>Rs 60,000</td>
              <td>1-07-2020</td>
              <td>
                <span className="badge badge-danger w-75 py-2">Pending</span>
              </td>
            </tr>
            <tr>
              <th>5</th>
              <td>Jorge</td>
              <td>Rs 30,000</td>
              <td>10-07-2020</td>
              <td>
                <span className="badge badge-danger w-75 py-2">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a href="/" className="page-link py-2 px-3">
                <span>previous</span>
              </a>
            </li>
            <li className="page-item active">
              <a href="/" className="page-link py-2 px-3">
                1
              </a>
            </li>
            <li className="page-item">
              <a href="/" className="page-link py-2 px-3">
                2
              </a>
            </li>
            <li className="page-item">
              <a href="/" className="page-link py-2 px-3">
                3
              </a>
            </li>
            <li className="page-item">
              <a href="/" className="page-link py-2 px-3">
                <span>next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default AdminDashTable;
