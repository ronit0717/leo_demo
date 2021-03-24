import React, { useEffect, useReducer } from "react";

import { doGet, doPost, doDelete } from "../../../../utils/http-utils";

const initialState = {
  name: "",
  categoryType: "PRODUCT"
};

// create reducer to update state
function reducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.categories };
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...initialState, categories: state.categories };
    default:
      return state;
  }
}

function FetchInventoryCategory({ setCategories }) {
  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getData() {
    try {
      doGet("category", null, true).then(
        response => {
          setCategories(response.data);
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error fetching categories...", err);
    }
  }

  return <></>;
}

function InventoryCategory({ setCategories }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getData() {
    try {
      doGet("category", null, true).then(
        response => {
          dispatch({
            type: "SET_CATEGORIES",
            categories: response.data
          });
          setCategories(response.data);
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error fetching categories...", err);
    }
  }

  async function createCategory() {
    const { name } = state;
    if (name.trim() === "") return;

    let createCategory = { name, categoryType: "PRODUCT" };

    try {
      doPost("category", createCategory, true).then(
        response => {
          const categories = [...state.categories, response.data];
          dispatch({ type: "SET_CATEGORIES", categories });
          setCategories(categories);
          dispatch({ type: "CLEAR_INPUT" });
          console.log("category created!");
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error creating category...", err);
      alert("Some error occured");
    }
  }

  async function deleteCategory(id) {
    console.log("Delete Category", id);
    try {
      doDelete("category", id, null, true).then(
        response => {
          if (response.data) {
            const categories = state.categories.filter(cat => cat.id != id);
            dispatch({ type: "SET_CATEGORIES", categories });
            setCategories(categories);
            dispatch({ type: "CLEAR_INPUT" });
            console.log("Category Deleted");
          } else {
            alert("Failed to delete category, please refresh");
          }
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error deleting category...", err);
    }
  }

  function onChange(e) {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
  }

  return (
    <div className="container-fluid bg-light mt-3">
      <h6 className="text-uppercase text-muted">Create/Edit Category</h6>
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
                placeholder="Product Category"
              />
            </div>
            <div className="col-2">
              <button
                type="button"
                onClick={createCategory}
                className="btn-sm text-uppercase font-weight-bold text-light btn-info"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row my-2 pl-3 pr-3 pb-3">
        {state.categories &&
          state.categories.map(category => (
            <span
              key={category.id}
              onClick={() => deleteCategory(category.id)}
              className="text-light bg-warning p-1 m-1 rounded removable"
            >
              {category.name}
            </span>
          ))}
      </div>
    </div>
  );
}

export { FetchInventoryCategory, InventoryCategory };
