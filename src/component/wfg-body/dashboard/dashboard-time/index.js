import React, { useState, useEffect } from "react";
import "./progress-task-list.css";

const DashboardTime = () => {
  const [time, setTime] = useState(null);
  const [dashDate, setDashDate] = useState(null);
  const dashDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dashMonth = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];

  function currentTime() {
    let date = new Date(); /* creating object of Date class */
    let hour = date.getHours();
    let midday = "AM";
    midday = hour >= 12 ? "PM" : "AM";
    hour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    let min = date.getMinutes();
    //let sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);

    setTime(hour + " : " + min + " " + midday);
    setDashDate(dashDay[date.getDay()] + ", " + dashMonth[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
    /*
    let t = setTimeout(function() {
      currentTime();
    }, (60 - sec)* 1000);
    */
  }

  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    } else {
      return k;
    }
  }

  useEffect(() => {
    currentTime();
  });

  return (
    <div className="row mt-4 mb-4">
      <div className="col-12">
        <div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-12 p-2">
                <div className="card bg-white">
                  <i className="far fa-calendar-alt fa-8x text-warning d-block m-auto py-3"></i>
                  <div className="card-body">
                    <p className="card-text text-center text-center font-weight-bold text-uppercase">
                      {dashDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 p-2">
                <div className="card bg-light">
                  <i className="far fa-clock fa-8x text-info d-block m-auto py-3"></i>
                  <div className="card-body">
                    <p className="card-text text-center text-center font-weight-bold text-uppercase">
                      {time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTime;
