import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchEmployee } from './components/Employee/FetchEmployee';
import { AddEmployee } from './components/Employee/AddEmployee';
import {FetchCity} from './components/city/FetchCity';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetchemployee' component={FetchEmployee} />
        <Route path='/addemployee' component={AddEmployee} />
        <Route path='/employee/edit/:empid' component={AddEmployee} />  
        <Route path='/fetchcity' component={FetchCity} /> 
      </Layout>
    );
  }
}
