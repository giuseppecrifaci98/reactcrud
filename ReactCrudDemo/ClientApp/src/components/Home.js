import React, { Component } from 'react';
import axios from 'axios';
import { DashboardUser } from './dashboard/dashboardUser';
import {DashboardNotLoggedComponent} from './dashboard/dashboardNotLogged';
import { DashboardAdminComponent } from './dashboard/dashboardAdmin';

export class Home extends Component {

  constructor() {
    super();
    this.state = {
      username: null,
      isAuthenticate: false,
      role: ''
    };
  }

  componentDidMount() {
    localStorage.clear();
    this.getUserLogged();
  }

  getUserLogged() {
    axios.post('api/login/CheckLogin').then(responseJson => {
      if (responseJson.data != null) {
        var email = responseJson.data['email'];
        var role = responseJson.data['role'];
        if (email != null) {
          this.setState({ isAuthenticate: true, username: email, role: role })
          localStorage.setItem('email', email);
          localStorage.setItem('login', true);
          localStorage.setItem('role',role);
        } else if (email == null)
          this.setState({ username: null, isAuthenticate: false, role:null });
      }
    });
  }

  render(){
    let bottone;

    if(this.state.role==null){
      bottone =(
        <DashboardNotLoggedComponent />
      )
    }

      if(this.state.role=='admin'){
        bottone =(
          <DashboardAdminComponent usermame={this.state.username} />
        )
      }
      else if(this.state.role=='user'){
        bottone =(
        <DashboardUser usermame={this.state.username} />
        );
      }

    return <div>{bottone}</div>;
  }

}
