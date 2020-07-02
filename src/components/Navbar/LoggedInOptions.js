import React from 'react';
import {
  MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { connect } from 'react-redux';
import { store } from '../../store';
import { withRouter } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';

const LoggedInOptions = ({ users, authedUser, history }) => {
  const { name, avatarURL } = users[authedUser];
  const handleLogout = () => {
    store.dispatch(setAuthedUser(null));
    history.push('/login');
  }

  return (
    <MDBCollapse id="navbarCollapse3" isOpen={false} navbar>
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
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBDropdown>
            <MDBDropdownToggle className="dopdown-toggle" nav>
              <strong className="white-text mr-10">{name}</strong>
              <img
                alt="Preview..."
                src={avatarURL}
                className="rounded-circle z-depth-0"
                style={{ height: "35px", padding: 0 }}
              />
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default" right>
              <MDBDropdownItem onClick={handleLogout}>Log out</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBCollapse>
  );
}

const mapStateToProps = ({ users }) => {
  return {
    users
  };
}

export default withRouter(
  connect(mapStateToProps)(LoggedInOptions)
);
