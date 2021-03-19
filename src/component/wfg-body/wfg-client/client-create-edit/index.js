import React, { useEffect, useReducer } from "react";

const initialState = {
  id: null,
  name: "",
  active: true,
  operation: null
};

let l_initState = null;

function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...l_initState, enableEditing: false };
    default:
      return state;
  }
}

const ClientCreateEdit = ({ clients, setClients, selectedClient }) => {
  l_initState = initialState;
  const [state, dispatch] = useReducer(reducer, l_initState);

  useEffect(() => {
    console.log("Selected client changed", selectedClient);
    if (selectedClient == null) return;
    l_initState = selectedClient;
    l_initState.id = selectedClient.id;
    dispatch({ type: "CLEAR_INPUT" });
  }, [selectedClient]);

  function onChange(e) {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
  }

  const createClientBtnClick = () => {
    l_initState = initialState;
    dispatch({ type: "CLEAR_INPUT" });
    dispatch({ type: "SET_INPUT", key: "enableEditing", value: true });
    dispatch({ type: "SET_INPUT", key: "operation", value: "NEW" });
  };

  const editClientBtnClick = () => {
    dispatch({ type: "SET_INPUT", key: "enableEditing", value: true });
    dispatch({ type: "SET_INPUT", key: "operation", value: "UPDATE" });
  };

  return (
    <div className="container-fluid py-2">
      <div className="row">
        <div className="col-12">
          <h6 className="text-uppercase text-muted">Create/Edit Client</h6>
          <hr />
          <button
            type="button"
            className="btn-sm text-uppercase font-weight-bold text-light btn-info"
            onClick={createClientBtnClick}
          >
            Create New Client
          </button>
          <button
            type="button"
            className={
              "btn-sm text-uppercase font-weight-bold text-light btn-info ml-2 " +
              (selectedClient ? "visible" : "invisible")
            }
            onClick={editClientBtnClick}
          >
            Edit Client
          </button>
          <hr />
        </div>
      </div>
      <div className="row py-2">
        <div className="col-12">
          <form action="">
            <fieldset
              disabled={
                state.enableEditing && state.enableEditing === true
                  ? ""
                  : "disabled"
              }
            >
              <div className="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  id="name"
                  onChange={onChange}
                  value={state.name}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className={
                    "btn-sm text-uppercase font-weight-bold text-light btn-info " +
                    (state.operation ? "" : "invisible")
                  }
                  //onClick={fnCreateUpdateClient}
                >
                  {state.operation && state.operation === "NEW"
                    ? "Create"
                    : "Update"}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientCreateEdit;
