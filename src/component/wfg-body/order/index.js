import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import DashNav from "../common/dash-nav";
import OrderCreateEdit from "./order-create-edit";
import OrderList from "./order-list";

const Order = ({ headerStoreId }) => {
  const [navList] = useState([
    {
      name: "Orders",
      link: "/app/order"
    },
    /*
    {
      name: "QR Scan",
      link: "/webapp/scanner"
    },
    */
    {
      name: "Create",
      link: "/app/order/create-edit"
    }
  ]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-lg-10 col-md-8 ml-auto">
            <div className="row pt-md-5 mt-md-3">
              <div className="col-12 mb-3">
                <DashNav navList={navList} />
              </div>
              <Switch>
                <Route path="*/create-edit">
                  <OrderCreateEdit headerStoreId={headerStoreId} />
                </Route>
                <Route>
                  <OrderList headerStoreId={headerStoreId} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
