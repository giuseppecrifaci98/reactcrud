import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class DashboardUser extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello, world {this.props.username}</h1>
        <p>Welcome in your dashboard.</p>
        <p>This is the user's dashboard.</p>

        <div className="container">
          <div className="row">
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
