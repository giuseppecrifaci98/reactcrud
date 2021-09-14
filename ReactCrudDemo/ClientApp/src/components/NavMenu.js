import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import axios from 'axios';

export class NavMenu extends Component {
  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    const isLogged = localStorage.getItem('login')  ? true: false;
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">ReactCrudDemo</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetchemployee">Employee List</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetchcity">City List</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetchDepartment">Department List</NavLink>
                </NavItem>
                {isLogged && <NavItem>
                <NavLink tag={Link} className="text-dark" to='/fetchuser'>User List</NavLink>
                </NavItem>}
                {!isLogged && <NavItem>
                <NavLink tag={Link} className="text-dark" to='/login'>Login</NavLink>
                </NavItem>}
                <NavItem>
                <NavLink tag={Link} className="text-dark" to='/register'>Register</NavLink>
                </NavItem>
                {isLogged && <NavItem>
                <NavLink tag={Link} className="text-dark" to='/logout'>Logout</NavLink>
                </NavItem>}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
