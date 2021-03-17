import React, { Component } from "react";
import "./admin-dash-table.css";

class AdminDashTable extends Component {
  render() {
    return (
      <div className="col-xl-6 col-12 mb-5 mb-xl-0">
        <h3 className="text-muted text-center mb-3">Staff Salary</h3>
        <table className="table table-striped bg-white text-center">
          <thead>
            <tr className="text-muted">
              <th>#</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Date</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>John</td>
              <td>Rs 40,000</td>
              <td>30-07-2020</td>
              <td>
                <button type="button" className="btn btn-dash-tab btn-info btn-sm">
                  Message
                </button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Mark</td>
              <td>Rs 50,000</td>
              <td>31-07-2020</td>
              <td>
                <button type="button" className="btn btn-dash-tab btn-info btn-sm">
                  Message
                </button>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>Robin</td>
              <td>Rs 30,000</td>
              <td>30-08-2020</td>
              <td>
                <button type="button" className="btn btn-dash-tab btn-info btn-sm">
                  Message
                </button>
              </td>
            </tr>
            <tr>
              <th>4</th>
              <td>Park</td>
              <td>Rs 50,000</td>
              <td>31-07-2020</td>
              <td>
                <button type="button" className="btn btn-dash-tab btn-info btn-sm">
                  Message
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a href="/" className="page-link py-2 px-3">
                <span>&laquo;</span>
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
                <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default AdminDashTable;
