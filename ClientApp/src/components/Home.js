import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <p>Welcome in this application</p>
        <p>This application allow that Employee management (CRUD) and of Cities.</p>
        
        <div className="container">
          <div className="row">
        <div className="card col-xs-4 col-md-4 col-lg-4 mb-4 col-sm-12 ">
        <div className="card-header">
          Employee
        </div>
        <div className="card-body">
          <h5 className="card-title">Employee Management</h5>
          <p className="card-text">Accessing this section you can create, modify and delete Employee.</p>
          <Link to="/fetchemployee" className="btn btn-primary">Go</Link>
        </div>
      </div>
      
      <div className="card col-xs-4 col-md-4 col-lg-4 mb-4 col-sm-12">
        <div className="card-header">
          Cities
        </div>
        <div className="card-body">
          <h5 className="card-title">City Management</h5>
          <p className="card-text">Accessing this section you can create, modify and delete City.</p>
          <Link to="/fetchcity" className="btn btn-primary">Go</Link>
        </div>
      </div>

      <div className="card col-xs-4 col-md-4 col-lg-4 mb-4 col-sm-12">
        <div className="card-header">
          Cities
        </div>
        <div className="card-body">
          <h5 className="card-title">Department Management</h5>
          <p className="card-text">Accessing this section you can create, modify and delete Department.</p>
          <Link to="/fetchDepartment" className="btn btn-primary">Go</Link>
        </div>
      </div>

      </div>
        </div>
        
      </div>
    );
  }
}
