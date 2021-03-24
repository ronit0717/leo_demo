import React, { useEffect, useReducer } from "react";

import { doGet, doPost, doDelete } from "../../../../utils/http-utils";

const initialState = {
  name: ""
};

// create reducer to update state
function reducer(state, action) {
  switch (action.type) {
    case "SET_BRANDS":
      return { ...state, brands: action.brands };
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...initialState, brands: state.brands };
    default:
      return state;
  }
}

function FetchInventoryBrand({ setBrands }) {
  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getData() {
    try {
      doGet("brand", null, true).then(
        response => {
          setBrands(response.data);
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error fetching brands...", err);
    }
  }

  return <></>;
}

function InventoryBrand({ setBrands }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getData() {
    try {
      doGet("brand", null, true).then(
        response => {
          dispatch({
            type: "SET_BRANDS",
            brands: response.data
          });
          setBrands(response.data);
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error fetching brands...", err);
    }
  }

  async function createBrand() {
    const { name } = state;
    if (name.trim() === "") return;

    let createBrand = { name };

    try {
      doPost("brand", createBrand, true).then(
        response => {
          const brands = [...state.brands, response.data];
          dispatch({ type: "SET_BRANDS", brands });
          setBrands(brands);
          dispatch({ type: "CLEAR_INPUT" });
          console.log("brand created!");
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error creating brand...", err);
      alert("Some error occured");
    }
  }

  async function deleteBrand(id) {
    console.log("Delete Brand", id);
    try {
      doDelete("brand", id, null, true).then(
        response => {
          if (response.data) {
            const brands = state.brands.filter(brand => brand.id != id);
            dispatch({ type: "SET_BRANDS", brands });
            setBrands(brands);
            dispatch({ type: "CLEAR_INPUT" });
            console.log("Brand Deleted");
          } else {
            alert("Failed to delete brand, please refresh page and retry");
          }
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error deleting brand...", err);
    }
  }

  function onChange(e) {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
  }

  return (
    <div className="container-fluid bg-light mt-3">
      <h6 className="text-uppercase text-muted">Create/Edit Brand</h6>
      <div className="row p-3">
        <form>
          <div className="form-row">
            <div className="col-10">
              <input
                type="text"
                name="name"
                onChange={onChange}
                value={state.name}
                className="form-control form-control-sm"
                placeholder="Product Brand"
              />
            </div>
            <div className="col-2">
              <button
                type="button"
                onClick={createBrand}
                className="btn-sm text-uppercase font-weight-bold text-light btn-info"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row my-2 pl-3 pr-3 pb-3">
        {state.brands &&
          state.brands.map(brand => (
            <span
              key={brand.id}
              onClick={() => deleteBrand(brand.id)}
              className="text-light bg-warning p-1 m-1 rounded removable"
            >
              {brand.name}
            </span>
          ))}
      </div>
    </div>
  );
}

export { FetchInventoryBrand, InventoryBrand };
