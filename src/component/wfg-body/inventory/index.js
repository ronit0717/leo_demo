import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./inventory.css";

//components
import DashNav from "../common/dash-nav";
import Product from "./product";
import Stock from "./stock";

const Inventory = ({ headerStoreId }) => {

  const [navList] = useState([
    {
      name: "Stock",
      link: "/app/inventory"
    },
    {
      name: "Product",
      link: "/app/inventory/product"
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
                <Route path="*/product" component={Product} />
                <Route>
                  <Stock headerStoreId={headerStoreId} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
