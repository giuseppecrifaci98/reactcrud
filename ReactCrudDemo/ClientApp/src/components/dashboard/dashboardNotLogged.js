import React, { Component } from 'react';

export class DashboardNotLoggedComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
        <h1>Welcome Guest'users</h1>
        <p>Welcome in your dashboard.</p>
        <p>This is the guest's dashboard.</p>
        <hr />
        <p>Plese loggin for the use the application.</p>
    </div>;
    }
}
