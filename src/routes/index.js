import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { store } from "../store";
import Home from "../components/Home";
import Login from "../components/Login";
import PrivateRoute from './PrivateRoute';
import Error404 from "../components/Error404";
import NewQuestion from "../components/NewQuestion";
import { handleInitialData } from "../actions/initialData";
import LeaderBoard from "../components/LeaderBoard";
import Question from "../components/Question";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [authedUser, setAuthedUser] = useState("");

  useEffect(() => {
    const getStateFromStore = () => {
      const { authedUser } = store.getState();
      setAuthedUser(authedUser);
      setLoading(false);
    }

    store.dispatch(handleInitialData())

    getStateFromStore();
    store.subscribe(getStateFromStore);
  }, [])

  return !loading && (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          exact
          path="/login"
          redirectUrl="/"
          component={Login}
          authedUser={authedUser}
        />
        <PrivateRoute
          exact
          path="/"
          component={Home}
          authedUser={authedUser}
        />
        <PrivateRoute
          exact
          path="/add"
          authedUser={authedUser}
          component={NewQuestion}
        />
        <PrivateRoute
          path="/questions/:question_id"
          authedUser={authedUser}
          component={Question}
        />
        <PrivateRoute
          exact
          path="/leaderboard"
          authedUser={authedUser}
          component={LeaderBoard}
        />
        <Route exact path='*' component={Error404} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;