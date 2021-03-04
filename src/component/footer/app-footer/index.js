import React, { Component } from 'react';

class index extends Component {
    render() {
        return (
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 ml-auto">
                            {/* 
                            <div className="row pt-5 mt-2 text">
                                <div className="col-12 text-center">
                                    <span>A <b>Ubsilon India Pvt. Ltd.</b> product</span>
                                </div>
                            </div>
                            */}
                            <div className="row align-items-center border-top pt-3">
                                <div className="col-lg-6 text-center">
                                    <ul className="list-inline">
                                        <li className="list-inline-item mr-2">
                                            <a href="#" className="text-dark">Wefungo Sales</a>
                                        </li>
                                        <li className="list-inline-item mr-2">
                                            <a href="#" className="text-dark">sales@wefungo.com</a>
                                        </li>
                                        <li className="list-inline-item mr-2">
                                            <a href="#" className="text-dark">+91-9988998787</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 text-center">
                                    <p>
                                        &copy; 2021 Copyright. Vinava Labs
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default index;