import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home";
import VideoTestA from "./VideoTest_A";
import VideoTestB from "./VideoTest_B";

const RouteApp = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/videotest_a">
        <VideoTestA />
      </Route>
      <Route exact path="/videotest_b">
        <VideoTestB />
      </Route>
    </Switch>
  );
};

export default RouteApp;
