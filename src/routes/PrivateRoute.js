import React from "react";
import Navbar from '../components/Navbar';
import LoadingBar from 'react-redux-loading';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authedUser, redirectUrl = "/login", path, ...rest }) => {
  const cond = path === "/login" ? !authedUser : authedUser;
  return (
    <Route
      {...rest}
      path={path}
      render={props => cond ? (
        <>
          <LoadingBar style={{ background: "#026157" }} />
          <Navbar authedUser={authedUser} />
          <Component {...props} />
        </>
      ) : <Redirect to={redirectUrl} />}
    />
  );
}

export default PrivateRoute;