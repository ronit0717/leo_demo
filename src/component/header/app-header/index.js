import React, { useEffect, useState } from "react";

import { doGet } from "../../utils/http-utils";

import "./app-header.css";
import AppHeaderSidebar from "./sidebar";

const AppHeader = ({
  headerLocationId,
  setHeaderLocationId,
  headerStoreId,
  setHeaderStoreId,
  headerRefresh
}) => {
  const [locations, setLocations] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getData();
  }, [headerRefresh]);

  useEffect(() => {
    resetStore();
  }, [headerLocationId, locations]);

  async function resetStore() {
    let headerLocation = null;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].id == headerLocationId) {
        console.log("RC 2");
        headerLocation = locations[i];
        break;
      }
    }
    if (headerLocation && headerLocation.stores && headerLocation.stores.length > 0) {
      setHeaderStoreId(headerLocation.stores[0].id);
      setStores(headerLocation.stores);
    } else {
      setHeaderStoreId(null);
      setStores([]);
    }
  }

  async function getData() {
    setHeaderLocationId(headerLocationId ? headerLocationId : null);
    setHeaderStoreId(headerStoreId ? headerStoreId : null);
    try {
      doGet("location", null, true).then(
        response => {
          const locationData = response.data;
          console.log(locationData);
          setLocations(locationData);
          if (locationData && locationData.length > 0) {
            let headerLocation = locationData[0];
            setHeaderLocationId(
              headerLocationId ? headerLocationId : headerLocation.id
            );
          }
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error fetching locations...", err);
    }
  }

  function onChange(e) {
    if (e.target.name == "headerLocation") {
      setHeaderLocationId(e.target.value);
    } else if (e.target.name == "headerStore") {
      setHeaderStoreId(e.target.value);
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <button
        className="navbar-toggler ml-auto mb-2 bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#tdAppHeaderNavbar"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="tdAppHeaderNavbar">
        <div className="container-fluid">
          <div className="row">
            {/* sidebar */}
            <AppHeaderSidebar displayName={"John Doe"} />

            {/* top navbar */}
            <div className="col-lg-10 col-md-8 ml-auto bg-dark fixed-top top-navbar">
              <div className="row align-items-center">
              <div className="col-md-5">
                  <select
                    name="headerLocation"
                    id="category"
                    className="form-control form-control-sm bg-dark text-light"
                    value={headerLocationId}
                    onChange={onChange}
                  >
                    {locations &&
                      locations.map(location => (
                        <option value={location.id}>{location.name}</option>
                      ))}
                  </select>
                </div>
                <div className="col-md-5">
                  <select
                    name="headerStore"
                    id="category"
                    className="form-control form-control-sm bg-dark text-light"
                    value={headerStoreId}
                    onChange={onChange}
                  >
                    {stores &&
                      stores.map(store => (
                        <option value={store.id}>{store.name}</option>
                      ))}
                  </select>
                </div>
                <div className="col-md-2 text-right align-items-center">
                  <ul className="navbar-nav">
                    <li className="nav-item ml-md-auto">
                      <p
                        className="nav-link text-light align-items-center mb-0"
                        //onClick={() => signOut()}
                      >
                        Sign Out
                        <i className="fas fa-sign-out-alt td-theme-gray fa-lg ml-2" />
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
