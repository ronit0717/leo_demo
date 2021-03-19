import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

//components
import DashNav from "../common/dash-nav";
import Store from "./store";
import Location from "./location";

const StoreMaster = ({
  headerLocationId,
  headerRefresh,
  setHeaderRefresh
}) => {
  const [navList] = useState([
    {
      name: "Store",
      link: "/app/store"
    },
    {
      name: "Location",
      link: "/app/store/location"
    }
  ]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 col-md-8 ml-auto">
            <div className="row pt-md-5 mt-md-3">
              <div className="col-12">
                <DashNav navList={navList} />
              </div>
              <Switch>
                <Route path="*/location">
                  <Location
                    headerRefresh={headerRefresh}
                    setHeaderRefresh={setHeaderRefresh}
                  />
                </Route>
                <Route>
                  <Store
                    headerLocationId={headerLocationId}
                    headerRefresh={headerRefresh}
                    setHeaderRefresh={setHeaderRefresh}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreMaster;
