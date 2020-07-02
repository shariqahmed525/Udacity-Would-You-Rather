import React from 'react';
import {
  MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse,
} from "mdbreact";

const LoggedOutOptions = () => {
  return (
    <MDBCollapse id="navbar-logged-out" isOpen={false} navbar>
      <MDBNavbarNav left>
        <MDBNavItem>
          <MDBNavLink to="/">Home</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/add">New Question</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/leaderboard">Leader Board</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBCollapse>
  );
}

export default LoggedOutOptions;
