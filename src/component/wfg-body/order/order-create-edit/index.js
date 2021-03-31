import React, { useState } from "react";

import OrderMenu from "./order-menu";
import OrderSummary from "./order-summary";

const OrderCreateEdit = ({ headerStoreId }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <>
      <div className="col-md-5">
        <OrderMenu
          headerStoreId={headerStoreId}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <div className="col-md-7">
        <OrderSummary
          headerStoreId={headerStoreId}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </>
  );
};

export default OrderCreateEdit;
