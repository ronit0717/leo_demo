import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";

import "./App.css";

import AppPage from "./component/app-page";
import ErrorPage from "./component/error-page";
import GeneralPage from "./component/gen-page";

const Screens = () => (
  <Router>
    <Switch>
      <Route path="/app">
        <>
          <Offline>
            <ErrorPage msg="Please Check your Internet Connection" />
          </Offline>
          <Online>
            <AppPage />
          </Online>
        </>
      </Route>
      <Route component={GeneralPage} />
    </Switch>
  </Router>
);

export default Screens;
