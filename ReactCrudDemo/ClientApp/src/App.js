import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchEmployee } from './components/Employee/FetchEmployee';
import { AddEmployee } from './components/Employee/AddEmployee';
import { FetchCity } from './components/city/FetchCity';
import { AddCity } from './components/city/AddCity';
import { FetchDepartment } from './components/Department/FetchDepartment';
import { AddDepartment } from './components/Department/AddDepartment';
import { RegisterComponent } from './components/Register/Register';
import { LoginComponent } from './components/Login/Login';
import { LogoutComponent } from './components/logout/logout';
import { FetchUsersComponent } from './components/User/FetchUser';
import { EditUsersComponent } from './components/User/EditUser';
import { FetchTaskComponent } from './components/Tasks/FetchTask';
import { CreateTaskComponent } from './components/Tasks/CreateTask';
import { DashboardUser } from './components/dashboard/dashboardUser';
import { DashboardAdminComponent } from './components/dashboard/dashboardAdmin';
import {DashboardNotLoggedComponent} from './components/dashboard/dashboardNotLogged';
import { RecoveryPasswordComponent } from './components/User/recoverypassword';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetchemployee' component={FetchEmployee} />
        <Route path='/addemployee' component={AddEmployee} />
        <Route path='/employee/edit/:empid' component={AddEmployee} />
        <Route path='/fetchcity' component={FetchCity} />
        <Route path='/addnewcity' component={AddCity} />
        <Route path='/city/edit/:cityid' component={AddCity} />
        <Route path='/fetchDepartment' component={FetchDepartment} />
        <Route path='/adddepartment' component={AddDepartment} />
        <Route path='/department/edit/:depid' component={AddDepartment} />
        <Route path='/register' component={RegisterComponent} />
        <Route path='/login' component={LoginComponent} />
        <Route path='/logout' component={LogoutComponent} />
        <Route path='/recoveryPassword' component={RecoveryPasswordComponent} />
        <Route path='/fetchuser' component={FetchUsersComponent} />
        <Route path='/user/edit/:id' component={EditUsersComponent} />
        <Route path='/fetchtask' component={FetchTaskComponent} />
        <Route path='/task/edit/:taskid' component={CreateTaskComponent} />
        <Route path='/addnewtask' component={CreateTaskComponent} />
        <Route path='/dashboard/user' component={DashboardUser} />
        <Route path='/dashboard/admin' component={DashboardAdminComponent} />
        <Route path='/dashbord/guest' component={DashboardNotLoggedComponent} />
      </Layout>
    );
  }
}
