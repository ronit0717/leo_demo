import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./wfg-body.css";

//components
import DashboardDemo from "./dashboard-demo";
import Dashboard from "./dashboard";
import Client from "./wfg-client";
import AppHeader from "../header/app-header";
import AppFooter from "../footer/app-footer";

const WfgBody = () => {
  return (
    <div>
      <>
        <AppHeader />
        <Switch>
            <Route path={`/app/dashboard`} component={Dashboard} />
            <Route path={`/app/demo`} component={DashboardDemo} />
            <Route path={`/app/client`} component={Client} />
            <Redirect exact path="/app" to="/app/dashboard" />
        </Switch>
        <AppFooter />
      </>
    </div>
  );
};

export default WfgBody;
