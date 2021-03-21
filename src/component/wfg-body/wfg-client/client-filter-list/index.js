import React, { useEffect } from "react";

import { textTruncate } from "../../../utils";
import { doGet } from "../../../utils/http-utils";

const ClientFilterList = ({ clients, setClients, setSelectedClient }) => {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    console.log("Get Data called");
    doGet("client", null, false).then(
      response => {
        setClients(response.data);
      },
      error => {
        console.log(error);
        alert("Something went wrong :( Please refresh the page");
      }
    );
  }

  return (
    <div className="container-fluid mt-3 mb-5">
      {/* Client List */}
      {clients == null || clients.length === 0 ? (
        <div className="text-muted text-center">No Clients</div>
      ) : null}
      {clients &&
        clients.map(client => (
          <div
            className="row py-2 mb-2 task-border bg-white shadow"
            key={client.id}
            onClick={() => setSelectedClient(client)}
          >
            <div
              className="col-6 h6"
              data-toggle="tooltip"
              data-html="true"
              title={client.name}
              data-placement="top"
            >
              {textTruncate(client.name, 30)}
            </div>
            <div className="col-6 text-right h6">
              {client.slug ? (
                <span className="text-light badge badge-warning p-1 mr-2 text-uppercase">
                  {client.slug}
                </span>
              ) : null}
              {client.active ? (
                <span className="text-light badge badge-success p-1 mr-2">
                  Active
                </span>
              ) : (
                <span className="text-light badge badge-danger p-1 mr-2">
                  In Active
                </span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ClientFilterList;
