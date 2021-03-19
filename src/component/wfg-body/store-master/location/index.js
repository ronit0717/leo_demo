import React, { useState } from "react";

import LocationFilterList from "./location-filter-list";
import LocationCreateEdit from "./location-create-edit";

const Location = ({ headerRefresh, setHeaderRefresh }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <div className="col-md-6 col-12">
        <LocationFilterList
          locations={locations}
          setLocations={setLocations}
          setSelectedLocation={setSelectedLocation}
          headerRefresh={headerRefresh}
        />
      </div>
      <div className="col-md-6 col-12">
        <LocationCreateEdit
          locations={locations}
          setLocations={setLocations}
          selectedLocation={selectedLocation}
          headerRefresh={headerRefresh}
          setHeaderRefresh={setHeaderRefresh}
        />
      </div>
    </>
  );
};

export default Location;
