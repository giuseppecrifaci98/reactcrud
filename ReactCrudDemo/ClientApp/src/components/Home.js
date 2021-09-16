import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Home extends Component {

  constructor() {
    super();
    this.state = {
      username: null,
      isAuthenticate: false,
      isAnonymous: false,
    };
  }

  componentDidMount() {
    this.getUserLogged();
  }

  getUserLogged() {
    axios.post('api/login/CheckLogin').then(responseJson => {
      if (responseJson.data != null) {
        var email = responseJson.data['email'];
        var isAnonymous = responseJson.data['isAnonymous'];
        if (!isAnonymous && email != null) {
          this.setState({ username: email, isAuthenticate: !isAnonymous, isAnonymous: isAnonymous })
          localStorage.setItem('email', email);
        }
        else
          this.setState({ isAnonymous: isAnonymous, isAuthenticate: !isAnonymous })
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world {this.state.username}</h1>
        <p>Welcome in this application</p>
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

            {(this.state.isAuthenticate && !this.state.isAnonymous) &&
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
            }

          </div>
        </div>

      </div>
    );
  }
}
