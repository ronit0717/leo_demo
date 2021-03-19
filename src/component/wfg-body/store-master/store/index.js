import React, { useState } from "react";

import StoreFilterList from "./store-filter-list";
import StoreCreateEdit from "./store-create-edit";

const Store = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <>
      <div className="col-md-6 col-12">
        <StoreFilterList
          stores={stores}
          setStores={setStores}
          setSelectedStore={setSelectedStore}
          headerLocationId={1}
        />
      </div>
      <div className="col-md-6 col-12">
        <StoreCreateEdit
          stores={stores}
          setStores={setStores}
          selectedStore={selectedStore}
          headerLocationId={1}
        />
      </div>
    </>
  );
};

export default Store;
