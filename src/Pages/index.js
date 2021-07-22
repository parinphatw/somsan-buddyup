import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home";

const RouteApp = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
};

export default RouteApp;
