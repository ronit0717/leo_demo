import React, { useEffect } from "react";

import { textTruncate } from "../../../../utils";
import { doGet } from "../../../../utils/http-utils";

const StoreFilterList = ({ stores, setStores, setSelectedStore, headerLocationId }) => {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    console.log("Get Data called");
    const params = {
        "location_id" : headerLocationId
    }
    doGet("store", params, true).then(
      response => {
        setStores(response.data);
      },
      error => {
        console.log(error);
        alert(error);
        alert("Something went wrong :( Please refresh the page");
      }
    );
  }

  return (
    <div className="container-fluid mt-3 mb-5">
      {/* Store List */}
      {stores == null || stores.length === 0 ? (
        <div className="text-muted text-center">No more stores</div>
      ) : null}
      {stores &&
        stores.map(store => (
          <div
            className="row py-2 mb-2 task-border bg-white shadow"
            key={store.id}
            onClick={() => setSelectedStore(store)}
          >
            <div
              className="col-6 h6"
              data-toggle="tooltip"
              data-html="true"
              title={store.name}
              data-placement="top"
            >
              {textTruncate(store.name, 30)}
            </div>
            <div className="col-6 text-right h6">
              {store.gstin ? (
                <span className="text-light badge badge-warning p-1 mr-2 text-uppercase">
                  GSTIN: {store.gstin}
                </span>
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
};

export default StoreFilterList;
