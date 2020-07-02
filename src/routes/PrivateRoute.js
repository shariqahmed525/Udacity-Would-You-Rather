import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../store";
import { setPrevPath } from "../actions/savePrevPath";

const PrivateRoute = ({ component: Component, authedUser, redirectUrl, path, ...rest }) => {
  const cond = path === "/login" ? !authedUser : authedUser;

  const setPath = () => {
    const pathname = window.location.pathname;
    setTimeout(() => store.dispatch(setPrevPath(pathname)), 0)
  }

  if (path !== "/login") {
    setPath();
  }

  const { savePrevPath } = store.getState();
  const url = redirectUrl || "/login";

  return (
    <Route
      {...rest}
      path={savePrevPath || path}
      render={props => cond ? <Component {...props} /> : <Redirect to={url} />}
    />
  );
}

export default PrivateRoute;