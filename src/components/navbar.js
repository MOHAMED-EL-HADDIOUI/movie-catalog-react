import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withAuth } from "@okta/okta-react";

import queryString from 'query-string'


class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  
    this.state = {
      authenticated: false,
      user: null,
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async getCurrentUser(){
    this.props.auth.getUser()
      .then(userinfo => console.log('category is ', userinfo)   );
  }

  async componentDidMount() {
   const authenticated = await this.props.auth.isAuthenticated();

    if (authenticated !== false) {
      console.log("User is authenticated- navbar");
      this.setState({
        authenticated: true,
      });
      // const user = await this.props.auth.getUser();
      // console.log("mera naam -> "+ JSON.stringify(user));
     // const value = queryString.parse(JSON.stringify(this.props.auth.getUser()));
      console.log('category is ', this.state.user);

    }
  }

  async logout() {
    this.setState({
      authenticated: false,
    });
    this.props.auth.logout("/");
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

 

  render() {
   const loginLogout = this.state.authenticated ? (
      <NavLink href="/" onClick={() => this.logout()}>Logout</NavLink>
    ) : (
      <NavLink href="/" onClick={() => this.props.auth.login()}>Sign In</NavLink>
    );
      
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink href="https://github.com/shefalibisht00/microservice-spring-boot-cloud-react">GitHub</NavLink>
          </NavItem>
          <NavItem>
            {loginLogout}
          </NavItem>
        {/* <NavItem>
            <NavLink href="https://github.com/shefalibisht00/microservice-spring-boot-cloud-react">GitHub</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="https://twitter.com/oktadev">{button}</NavLink>
          </NavItem>  */}
        </Nav>
      </Collapse>
    </Navbar>;
  }
}

export default withAuth(AppNavbar);