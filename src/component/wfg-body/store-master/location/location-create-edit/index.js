import React, { useEffect, useReducer } from "react";
import { doPost, doPut } from "../../../../utils/http-utils"

const initialState = {
  id: null,
  name: "",
  pincode: "",
  description: "",
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

const LocationCreateEdit = ({ locations, setLocations, selectedLocation }) => {
  l_initState = initialState;
  const [state, dispatch] = useReducer(reducer, l_initState);

  useEffect(() => {
    console.log("Selected location changed");
    if (selectedLocation == null) return;
    l_initState = selectedLocation;
    l_initState.id = selectedLocation.id;
    dispatch({ type: "CLEAR_INPUT" });
  }, [selectedLocation]);

  async function fnCreateUpdateLocation() {
    let { name, pincode, description } = state;

    if (name.trim() === "") {
      alert("Mandatory param name is empty");
      return;
    }

    name = name.trim();

    const createUpdateLocation = {
      name,
      pincode,
      description
    };

    try {
      let l_successMessage = null;
      let newLocations = null;
      if (state.operation != null && state.operation === "NEW") {
        l_successMessage = "Location successfully created";
        const createLocation = createUpdateLocation;
        console.log("Create location", createLocation);
        doPost("location", createLocation, true)
          .then(
            response => {
              console.log(response);
              newLocations = [response.data, ...locations];
            },
            error => {
              console.log(error);
              alert("Something went wrong :( Please refresh the page");
              return;
            }
          );
      } else if (state.operation != null && state.operation === "UPDATE") {
        l_successMessage = "Location successfully updated";
        createUpdateLocation.id = state.id;
        const updateLocation = createUpdateLocation;
        
        doPut("location", createUpdateLocation.id, updateLocation, true).then(
          response => {
            console.log(response);
            //updating the location in locationList
            let index = null;
            for (let i = 0; i < locations.length; i++) {
              if (response.data.id === locations[i].id) {
                console.log("Location updated with id", locations[i].id);
                index = i;
                break;
              }
            }
            console.log(index);
            if (index || index >= 0) {
              locations[index] = response.data;
              newLocations = [...locations];
            }
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
      setLocations(newLocations);
      dispatch({ type: "CLEAR_INPUT" });
      alert(l_successMessage);
      //setHeaderRefresh(!headerRefresh);
    } catch (err) {
      console.log("error creating location...", err);
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

  const createLocationBtnClick = () => {
    l_initState = initialState;
    dispatch({ type: "CLEAR_INPUT" });
    dispatch({ type: "SET_INPUT", key: "enableEditing", value: true });
    dispatch({ type: "SET_INPUT", key: "operation", value: "NEW" });
  };

  const editLocationBtnClick = () => {
    dispatch({ type: "SET_INPUT", key: "enableEditing", value: true });
    dispatch({ type: "SET_INPUT", key: "operation", value: "UPDATE" });
  };

  return (
    <div className="container-fluid py-2">
      <div className="row">
        <div className="col-12">
          <h6 className="text-uppercase text-muted">Create/Edit Location</h6>
          <hr />
          <button
            type="button"
            className="btn-sm text-uppercase font-weight-bold text-light btn-info"
            onClick={createLocationBtnClick}
          >
            Create New Location
          </button>
          <button
            type="button"
            className={
              "btn-sm text-uppercase font-weight-bold text-light btn-info ml-2 " +
              (selectedLocation ? "visible" : "invisible")
            }
            onClick={editLocationBtnClick}
          >
            Edit Location
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
                <label htmlFor="name">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  id="pincode"
                  onChange={onChange}
                  value={state.pincode}
                  className="form-control form-control-sm"
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
                <button
                  type="button"
                  className={
                    "btn-sm text-uppercase font-weight-bold text-light btn-info " +
                    (state.operation ? "" : "invisible")
                  }
                  onClick={fnCreateUpdateLocation}
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

export default LocationCreateEdit;
