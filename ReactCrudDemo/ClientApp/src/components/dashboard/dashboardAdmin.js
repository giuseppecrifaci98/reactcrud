import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class DashboardAdminComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        
        <h1>Hello, world {this.props.username}</h1>
        <p>Welcome in your dashboard.</p>
        <p>This is the admin's dashboard.</p>
        <p>This application allow that Employee management (CRUD) and of Cities.</p>

        <div className="container">
          <div className="row">
            <div className="card col-xs-3 col-md-3 col-lg-3 mb-4 col-sm-12 ">
              <div className="card-header">
                Employee
              </div>
              <div className="card-body">
                <h5 className="card-title">Employee Management</h5>
                <p className="card-text">Accessing this section you can create, modify and delete Employee.</p>
                <Link to="/fetchemployee" className="btn btn-primary">Go</Link>
              </div>
            </div>

            <div className="card col-xs-3 col-md-3 col-lg-3 mb-4 col-sm-12">
              <div className="card-header">
                Cities
              </div>
              <div className="card-body">
                <h5 className="card-title">City Management</h5>
                <p className="card-text">Accessing this section you can create, modify and delete City.</p>
                <Link to="/fetchcity" className="btn btn-primary">Go</Link>
              </div>
            </div>

            <div className="card col-xs-3 col-md-3 col-lg-3 mb-4 col-sm-12">
              <div className="card-header">
                Cities
              </div>
              <div className="card-body">
                <h5 className="card-title">Department Management</h5>
                <p className="card-text">Accessing this section you can create, modify and delete Department.</p>
                <Link to="/fetchDepartment" className="btn btn-primary">Go</Link>
              </div>
            </div>

              <div className="card col-xs-3 col-md-3 col-lg-3 mb-4 col-sm-12">
                <div className="card-header">
                  Users
                </div>
                <div className="card-body">
                  <h5 className="card-title">Users Management</h5>
                  <p className="card-text">Accessing this section you can create, modify and delete Users.</p>
                  <Link to="/fetchuser" className="btn btn-primary">Go</Link>
                </div>
              </div>

              <div className="card col-xs-3 col-md-3 col-lg-3 mb-4 col-sm-12">
                <div className="card-header">
                  Tasks
                </div>
                <div className="card-body">
                  <h5 className="card-title">Tasks Management</h5>
                  <p className="card-text">Accessing this section you can create, modify and delete Tasks.</p>
                  <Link to="/fetchtask" className="btn btn-primary">Go</Link>
                </div>
              </div>

          </div>
        </div>
      </div>
    );
  }
}
