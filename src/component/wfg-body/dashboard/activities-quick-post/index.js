import React, { Component } from 'react';

class ActivitiesQuickPost extends Component {
    render() {
        return (
            <div className="row align-items-center mb-5">
                
                {/* Comments section*/}
                <div className="col-xl-7">
                    <h4 className="text-muted mb-4">Recent Customer Activities</h4>
                    <div id="accordion">
                        <div className="card">
                            <div className="card-header">
                                <span className="btn-block bg-secondary text-light text-left" data-toggle="collapse" data-target="#collapse-1">
                                    <img src="https://placeimg.com/150/150/people" width="50" className="mr-3 rounded p-2" />
                                    John posted a new comment
                                </span>
                            </div>
                            <div className="collapse show" id="collapse-1" data-parent="#accordion">
                                <div className="card-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat.
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <span className="btn-block bg-secondary text-light text-left rounded" data-toggle="collapse" data-target="#collapse-2">
                                    <img src="https://placeimg.com/160/160/people" width="50" className="mr-3 rounded p-2" />
                                    Mark posted a new comment
                                </span>
                            </div>
                            <div className="collapse" id="collapse-2" data-parent="#accordion">
                                <div className="card-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat.
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <span className="btn-block bg-secondary text-light text-left rounded" data-toggle="collapse" data-target="#collapse-3">
                                    <img src="https://placeimg.com/170/170/people" width="50" className="mr-3 rounded p-2" />
                                    Rupert posted a new comment
                                </span>
                            </div>
                            <div className="collapse" id="collapse-3" data-parent="#accordion">
                                <div className="card-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat.
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <span className="btn-block bg-secondary text-light text-left rounded" data-toggle="collapse" data-target="#collapse-4">
                                    <img src="https://placeimg.com/180/180/people" width="50" className="mr-3 rounded p-2" />
                                    Monica posted a new comment
                                </span>
                            </div>
                            <div className="collapse" id="collapse-4" data-parent="#accordion">
                                <div className="card-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat.
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <span className="btn-block bg-secondary text-light text-left rounded" data-toggle="collapse" data-target="#collapse-5">
                                    <img src="https://placeimg.com/190/190/people" width="50" className="mr-3 rounded p-2" />
                                    Bob posted a new comment
                                </span>
                            </div>
                            <div className="collapse" id="collapse-5" data-parent="#accordion">
                                <div className="card-body">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Post for Admin*/}
                <div className="col-xl-5 mt-5 bg-white">
                    <div classNAme="card rounded">
                        <div className="card-body">
                            <h5 className="text-muted text-center mb-4">Quick Status Post</h5>
                            <ul className="list-inline text-center py-3">
                                <li className="list-inline-item mr-4">
                                    <a href="/">
                                        <li className="fas fa-pencil-alt text-success"></li>
                                        <span className="h6 text-muted">Status</span>
                                    </a>
                                </li>
                                <li className="list-inline-item mr-4">
                                    <a href="/">
                                        <li className="fas fa-camera text-info"></li>
                                        <span className="h6 text-muted">Photo</span>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/">
                                        <li className="fas fa-map-marker-alt text-primary"></li>
                                        <span className="h6 text-muted">Check-in</span>
                                    </a>
                                </li>
                            </ul>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control py-2 mb-3" placeholder="What's Your Status..." />
                                    <button type="button" className="btn btn-block text-uppercase font-weight-bold text-light bg-info py-2 mb-5">
                                        Submit Post
                                    </button>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-6">
                                    <div className="card bg-light">
                                        <i className="far fa-calendar-alt fa-8x text-warning d-block m-auto py-3"></i>
                                        <div className="card-body">
                                            <p className="card-text text-center text-center font-weight-bold text-uppercase">
                                                Wed, July 29
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card bg-light">
                                        <i className="far fa-clock fa-8x text-info d-block m-auto py-3"></i>
                                        <div className="card-body">
                                            <p className="card-text text-center text-center font-weight-bold text-uppercase">
                                                11:11 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActivitiesQuickPost;