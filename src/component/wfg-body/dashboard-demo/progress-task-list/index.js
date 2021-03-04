import React, { Component } from 'react';
import './progress-task-list.css'

class ProgressTaskList extends Component {
    render() {
        return (
            <div className="row mt-4 mb-4 align-items-center">
                {/* Progress Bar */}
                <div className="col-12 col-xl-6 mb-4 mb-xl-0">
                    <div className="bg-dark text-white p-4 rounded">
                        <h4 className="mb-4">Conversion Rates</h4>
                        <h6 className="mt-3 mb-1">Google Chrome</h6>
                        <div className="progress" style={{height: "20px"}}>
                            <div 
                                className="progress-bar progress-bar-striped font-weight-bold" 
                                style={{width: "91%"}}
                            >
                                91%
                            </div>
                        </div>
                        <h6 className="mt-3 mb-1">Mozilla Firefox</h6>
                        <div className="progress" style={{height: "20px"}}>
                            <div 
                                className="progress-bar progress-bar-striped font-weight-bold bg-success" 
                                style={{width: "82%"}}
                            >
                                82%
                            </div>
                        </div>
                        <h6 className="mt-3 mb-1">Safari</h6>
                        <div className="progress" style={{height: "20px"}}>
                            <div 
                                className="progress-bar progress-bar-striped font-weight-bold bg-danger" 
                                style={{width: "67%"}}
                            >
                                67%
                            </div>
                        </div>
                        <h6 className="mt-3 mb-1">IE</h6>
                        <div className="progress" style={{height: "20px"}}>
                            <div 
                                className="progress-bar progress-bar-striped font-weight-bold bg-info" 
                                style={{width: "10%"}}
                            >
                                10%
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Task List */}
                <div className="col-xl-6 col-12 bg-white">
                    <h4 className="text-muted p-3 mb-3">Tasks:</h4>
                    <div className="container-fluid">
                        <div className="row py-3 mb-4 task-border">
                            <div className="col-1">
                                <input type="checkbox" checked />
                            </div>
                            <div className="col-sm-9 col-8">
                                Lorem Ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                            <div className="col-1">
                                <a href="#" data-toggle="tooltip" data-html="true" title="<h6>edit</h6>" data-placement="top">
                                    <i className="fas fa-edit fa-lg text-success mr-2" />
                                </a>
                            </div>
                            <div className="col-1">
                                <a href="#" data-toggle="tooltip" data-html="true" title="delete" data-placement="top">
                                    <i className="fas fa-trash-alt fa-lg text-danger" />
                                </a>
                            </div>
                        </div>
                        <div className="row py-3 mb-4 task-border align-item-center">
                            <div className="col-1">
                                <input type="checkbox" checked />
                            </div>
                            <div className="col-sm-9 col-8">
                                Lorem Ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                            <div className="col-1">
                                <a href="#" data-toggle="tooltip" data-html="true" title="<h6>edit</h6>" data-placement="top">
                                    <i className="fas fa-edit fa-lg text-success mr-2" />
                                </a>
                            </div>
                            <div className="col-1">
                                <a href="#" data-toggle="tooltip" data-html="true" title="delete" data-placement="top">
                                    <i className="fas fa-trash-alt fa-lg text-danger" />
                                </a>
                            </div>
                        </div>
                        <div className="row py-3 mb-4 task-border align-item-center">
                            <div className="col-1">
                                <input type="checkbox" checked />
                            </div>
                            <div className="col-sm-9 col-8">
                                Lorem Ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                            <div className="col-1">
                                <a href="#" data-toggle="tooltip" data-html="true" title="<h6>edit</h6>" data-placement="top">
                                    <i className="fas fa-edit fa-lg text-success mr-2" />
                                </a>
                            </div>
                            <div className="col-1">
                                <a href="#" data-toggle="tooltip" data-html="true" title="delete" data-placement="top">
                                    <i className="fas fa-trash-alt fa-lg text-danger" />
                                </a>
                            </div>
                        </div>
                        <div className="row py-3 mb-4 task-border align-item-center">
                            <div className="col-1">
                                <input type="checkbox" checked />
                            </div>
                            <div className="col-sm-9 col-8">
                                Lorem Ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                            <div className="col-1">
                                <a href="#" data-toggle="tooltip" data-html="true" title="<h6>edit</h6>" data-placement="top">
                                    <i className="fas fa-edit fa-lg text-success mr-2" />
                                </a>
                            </div>
                            <div className="col-1">
                                <a href="#" data-toggle="tooltip" data-html="true" title="delete" data-placement="top">
                                    <i className="fas fa-trash-alt fa-lg text-danger" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressTaskList;