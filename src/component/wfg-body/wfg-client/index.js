import React, { useState } from "react";

import ClientFilterList from "./client-filter-list";
import ClientCreateEdit from "./client-create-edit";

const WfhClient = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <section>
      <div className="container-fluid my-lg-5">
        <div className="row">
          <div className="col-lg-10 col-md-8 ml-auto">
            <div className="row pt-md-5 mt-md-3 mb-5 align-items-center">
              <div className="col-md-6">
                <ClientFilterList
                  clients={clients}
                  setClients={setClients}
                  setSelectedClient={setSelectedClient}
                />
              </div>
              <div className="col-md-6">
                <ClientCreateEdit
                  clients={clients}
                  setClients={setClients}
                  selectedClient={selectedClient}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WfhClient;
