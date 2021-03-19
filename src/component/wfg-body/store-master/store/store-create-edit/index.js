import React, { useEffect, useReducer } from "react";
import { doPost, doPut } from "../../../../utils/http-utils";

const initialState = {
  id: null,
  name: "",
  address: "",
  description: "",
  gstin: "",
  enableEditing: false,
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

const StoreCreateEdit = ({
  stores,
  setStores,
  selectedStore,
  headerLocationId,
  headerRefresh,
  setHeaderRefresh
}) => {
  l_initState = initialState;
  const [state, dispatch] = useReducer(reducer, l_initState);

  useEffect(() => {
    console.log("Selected store changed");
    if (selectedStore == null) return;
    l_initState = selectedStore;
    l_initState.id = selectedStore.id;
    dispatch({ type: "CLEAR_INPUT" });
  }, [selectedStore]);

  async function fnCreateUpdateStore() {
    let { name, description, gstin, address } = state;

    if (name.trim() === "") {
      alert("Mandatory param name is empty");
      return;
    }

    name = name.trim();

    const createUpdateStore = {
      name,
      gstin,
      description,
      address,
      locationId: headerLocationId
    };

    try {
      let l_successMessage = null;
      let newStores = null;
      if (state.operation != null && state.operation === "NEW") {
        l_successMessage = "Store successfully created";
        const createStore = createUpdateStore;
        console.log("Create store", createStore);
        doPost("store", createStore, true).then(
          response => {
            console.log("New Store:", response.data);
            console.log("Stores", stores);
            newStores = [response.data, ...stores];
            console.log("New Stores:", newStores);
            setStores(newStores);
            dispatch({ type: "CLEAR_INPUT" });
            alert(l_successMessage);
            setHeaderRefresh(!headerRefresh);
          },
          error => {
            console.log(error);
            alert("Something went wrong :( Please refresh the page");
            return;
          }
        );
      } else if (state.operation != null && state.operation === "UPDATE") {
        l_successMessage = "Store successfully updated";
        createUpdateStore.id = state.id;
        const updateStore = createUpdateStore;

        doPut("store", createUpdateStore.id, updateStore, true).then(
          response => {
            console.log(response);
            //updating the store in storeList
            let index = null;
            for (let i = 0; i < stores.length; i++) {
              if (response.data.id === stores[i].id) {
                console.log("Store updated with id", stores[i].id);
                index = i;
                break;
              }
            }
            console.log(index);
            if (index || index >= 0) {
              stores[index] = response.data;
              newStores = [...stores];
            }
            setStores(newStores);
            dispatch({ type: "CLEAR_INPUT" });
            alert(l_successMessage);
            setHeaderRefresh(!headerRefresh);
          },
          error => {
            console.log(error);
            alert("Something went wrong :( Please refresh the page");
            return;
          }
        );
      } else {
        alert("Something went wrong :( Please refresh the page");
        return;
      }
    } catch (err) {
      console.log("error creating store...", err);
      alert("Some error occured");
    }
  }

  function onChange(e) {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
  }

  const onToggle = e => {
    dispatch({
      type: "SET_INPUT",
      key: e.target.name,
      value: e.target.checked
    });
  };

  const createStoreBtnClick = () => {
    l_initState = initialState;
    dispatch({ type: "CLEAR_INPUT" });
    dispatch({ type: "SET_INPUT", key: "enableEditing", value: true });
    dispatch({ type: "SET_INPUT", key: "operation", value: "NEW" });
  };

  const editStoreBtnClick = () => {
    dispatch({ type: "SET_INPUT", key: "enableEditing", value: true });
    dispatch({ type: "SET_INPUT", key: "operation", value: "UPDATE" });
  };

  return (
    <div className="container-fluid py-2">
      <div className="row">
        <div className="col-12">
          <h6 className="text-uppercase text-muted">Create/Edit Store</h6>
          <hr />
          <button
            type="button"
            className="btn-sm text-uppercase font-weight-bold text-light btn-info"
            onClick={createStoreBtnClick}
          >
            Create New Store
          </button>
          <button
            type="button"
            className={
              "btn-sm text-uppercase font-weight-bold text-light btn-info ml-2 " +
              (selectedStore ? "visible" : "invisible")
            }
            onClick={editStoreBtnClick}
          >
            Edit Store
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
                <label htmlFor="name">Name</label>
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
                <label for="address">Address</label>
                <textarea
                  rows="2"
                  name="address"
                  id="description"
                  className="form-control"
                  onChange={onChange}
                  value={state.address}
                />
              </div>
              <div className="form-group">
                <label for="description">Description</label>
                <textarea
                  rows="2"
                  name="description"
                  id="description"
                  className="form-control"
                  onChange={onChange}
                  value={state.description}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">GSTIN</label>
                <input
                  type="text"
                  name="gstin"
                  required
                  id="gstin"
                  onChange={onChange}
                  value={state.gstin}
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
                  onClick={fnCreateUpdateStore}
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

export default StoreCreateEdit;
