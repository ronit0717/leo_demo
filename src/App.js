import React from "react";
import { Offline, Online } from "react-detect-offline";

import "./App.css";

import AppPage from "./component/app-page";
import ErrorPage from "./component/error-page"

const Screens = () => (
  <>
    <Offline>
      <ErrorPage msg="Please Check your Internet Connection" />
    </Offline>
    <Online>
      <AppPage />
    </Online>
  </>
);

export default Screens;
