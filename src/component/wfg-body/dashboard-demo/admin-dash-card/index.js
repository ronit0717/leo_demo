import React, { Component } from 'react';
import './admin-dash-card.css'

class AdminDashCard extends Component {
    render() {
        return (
            <>
              <div className="col-sm-6 col-md-6 col-lg-3 p-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-shopping-cart fa-3x text-warning"></i>
                        <div className="text-right text-secondary">
                          <h5>Sales</h5>
                          <h3>Rs 25,000</h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-secondary">
                      <i className="fas fa-sync mr-3"></i>
                      <span>Updated Now</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 p-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-money-bill-alt fa-3x text-success"></i>
                        <div className="text-right text-secondary">
                          <h5>Expenses</h5>
                          <h3>Rs 12,000</h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-secondary">
                      <i className="fas fa-sync mr-3"></i>
                      <span>Updated Now</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 p-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-users fa-3x text-info"></i>
                        <div className="text-right text-secondary">
                          <h5>Users</h5>
                          <h3>5,000</h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-secondary">
                      <i className="fas fa-sync mr-3"></i>
                      <span>Updated Now</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 p-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-chart-line fa-3x text-danger"></i>
                        <div className="text-right text-secondary">
                          <h5>Visitors</h5>
                          <h3>10,000</h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-secondary">
                      <i className="fas fa-sync mr-3"></i>
                      <span>Updated Now</span>
                    </div>
                  </div>
                </div>  
            </>
        );
    }
}

export default AdminDashCard;