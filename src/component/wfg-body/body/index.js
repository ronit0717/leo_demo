import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import DashboardDemo from "../dashboard-demo";
import Dashboard from "../dashboard";
import Client from "../wfg-client";
import StoreMaster from "../store-master";
import Inventory from "../inventory";

const Body = ({
  headerLocationId,
  headerStoreId,
  headerRefresh,
  setHeaderRefresh
}) => {
  return (
    <Switch>
      <Route path={`/app/dashboard`} component={Dashboard} />
      <Route path={`/app/demo`} component={DashboardDemo} />
      <Route path={`/app/client`} component={Client} />
      <Route path={`/app/store`}>
        <StoreMaster
          headerLocationId={headerLocationId}
          headerRefresh={headerRefresh}
          setHeaderRefresh={setHeaderRefresh}
        />
      </Route>
      <Route path={`/app/inventory`}>
        <Inventory headerStoreId={headerStoreId} />
      </Route>
      <Redirect exact path="/app" to="/app/dashboard" />
    </Switch>
  );
};

export default Body;
