import React, { useState } from "react";

import StoreFilterList from "./store-filter-list";
import StoreCreateEdit from "./store-create-edit";

const Store = ({ headerLocationId, headerRefresh, setHeaderRefresh }) => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <>
      <div className="col-md-6 col-12">
        <StoreFilterList
          stores={stores}
          setStores={setStores}
          setSelectedStore={setSelectedStore}
          headerLocationId={headerLocationId}
        />
      </div>
      <div className="col-md-6 col-12">
        <StoreCreateEdit
          stores={stores}
          setStores={setStores}
          selectedStore={selectedStore}
          headerLocationId={headerLocationId}
          headerRefresh={headerRefresh}
          setHeaderRefresh={setHeaderRefresh}
        />
      </div>
    </>
  );
};

export default Store;
