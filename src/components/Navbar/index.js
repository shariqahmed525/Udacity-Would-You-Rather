import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand
} from "mdbreact";
import LoggedInOptions from './LoggedInOptions';
import LoggedOutOptions from './LoggedOutOptions';

const Navbar = ({ authedUser }) => {
  return (
    <>
      <MDBNavbarBrand>
        <h2>
          <strong className="navbar-brand-text">Would You Rather?</strong>
        </h2>
      </MDBNavbarBrand>
      <MDBNavbar color="default-color" dark expand="md">
        <MDBContainer fluid>
          {authedUser ? <LoggedInOptions authedUser={authedUser} /> : <LoggedOutOptions />}
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default Navbar;
