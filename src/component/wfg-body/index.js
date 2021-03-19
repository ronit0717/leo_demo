import React, { useState } from "react";
import "./wfg-body.css";

//components
import AppHeader from "../header/app-header";
import AppFooter from "../footer/app-footer";
import Body from "./body"

const WfgBody = () => {
  const [headerLocationId, setHeaderLocationId] = useState(null);
  const [headerStoreId, setHeaderStoreId] = useState(null);
  const [headerRefresh, setHeaderRefresh] = useState(false);
  return (
    <div>
      <>
        <AppHeader headerLocationId={headerLocationId}
          setHeaderLocationId={setHeaderLocationId}
          headerStoreId={headerStoreId}
          setHeaderStoreId={setHeaderStoreId}
          headerRefresh={headerRefresh} />
        <Body
          headerLocationId={headerLocationId}
          headerStoreId={headerStoreId}
          headerRefresh={headerRefresh}
          setHeaderRefresh={setHeaderRefresh}
        />
        <AppFooter />
      </>
    </div>
  );
};

export default WfgBody;
