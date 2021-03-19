import React, { useEffect } from "react";

import { textTruncate } from "../../../../utils";
import { doGet } from "../../../../utils/http-utils";

const LocationFilterList = ({ locations, setLocations, setSelectedLocation, headerRefresh }) => {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    console.log("Get Data called");
    doGet("location", null, true).then(
      response => {
        setLocations(response.data);
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
      {/* Location List */}
      {locations == null || locations.length === 0 ? (
        <div className="text-muted text-center">No more locations</div>
      ) : null}
      {locations &&
        locations.map(location => (
          <div
            className="row py-2 mb-2 task-border bg-white shadow"
            key={location.id}
            onClick={() => setSelectedLocation(location)}
          >
            <div
              className="col-6 h6"
              data-toggle="tooltip"
              data-html="true"
              title={location.name}
              data-placement="top"
            >
              {textTruncate(location.name, 30)}
            </div>
            <div className="col-6 text-right h6">
              {location.pincode ? (
                <span className="text-light badge badge-warning p-1 mr-2 text-uppercase">
                  pincode: {location.pincode}
                </span>
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
};

export default LocationFilterList;
