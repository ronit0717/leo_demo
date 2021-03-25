import React, { useReducer } from "react";

import { doPost, doPut } from "../../../../utils/http-utils";

const initialState = {
  id: null,
  quantity: null,
  refillLevel: null,
  forSale: true,
  price: 0,
  discountPercentage: 0,
  storeId: null,
  productId: null,
  operation: "NEW"
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...initialState };
    default:
      return state;
  }
}

const StockCreateEdit = ({
  selectedProduct,
  refreshStock,
  setRefreshStock,
  stock,
  storeId,
  operation
}) => {
  //initializing the initial state
  if (selectedProduct == null || storeId == null) {
    alert("Some error occured.. Please refresh");
  }
  let l_initialState = operation === "NEW" ? initialState : stock;
  l_initialState.operation = operation;
  l_initialState.price = selectedProduct.price
    ? selectedProduct.price
    : initialState.price;
  l_initialState.discountPercentage = selectedProduct.discountPercentage
    ? selectedProduct.discountPercentage
    : initialState.discountPercentage;
  l_initialState.storeId = storeId;
  l_initialState.productId = selectedProduct.id;

  const [state, dispatch] = useReducer(reducer, l_initialState);

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

  async function fnCreateUpdateStock() {
    console.log("fnCreateUpdateStock called...");
    let {
      id,
      quantity,
      refillLevel,
      forSale,
      price,
      discountPercentage,
      storeId,
      productId
    } = state;

    price = price ? parseFloat(price) : null;
    discountPercentage = discountPercentage
      ? parseFloat(discountPercentage)
      : 0;
    if (
      discountPercentage &&
      (discountPercentage < 0 || discountPercentage > 100)
    ) {
      alert("Invalid base discount percentage");
      return;
    }
    quantity = quantity ? parseInt(quantity) : null;
    refillLevel = refillLevel ? parseInt(refillLevel) : null;

    try {
      let l_successMessage = null;
      if (state.operation === "NEW") {
        l_successMessage = "Stock successfully created";
        const createStock = {
          quantity,
          refillLevel,
          forSale,
          price,
          discountPercentage,
          storeId,
          productId
        };
        console.log("Creating new stock...", createStock);
        doPost("stock", createStock, true).then(
          response => {
            dispatch({ type: "CLEAR_INPUT" });
            alert(l_successMessage);
            setRefreshStock(!refreshStock);
          },
          error => {
            console.log(error);
            alert("Something went wrong :( Please refresh the page");
            return;
          }
        );
      } else if (state.operation === "EDIT") {
        l_successMessage = "Stock successfully updated";
        const updateStock = {
          id,
          quantity,
          refillLevel,
          forSale,
          price,
          discountPercentage,
          storeId,
          productId
        };
        console.log("Updating stock...", updateStock);
        doPut("stock", id, updateStock, true).then(
          response => {
            dispatch({ type: "CLEAR_INPUT" });
            alert(l_successMessage);
            setRefreshStock(!refreshStock);
          },
          error => {
            console.log(error);
            alert("Something went wrong :( Please refresh the page");
            return;
          }
        );
      } else {
        alert("Something is wrong ... refresh the page");
        return;
      }
    } catch (err) {
      console.log("error creating stock...", err);
      alert("Some error occured");
    }
  }

  return (
    <div className="container-fluid py-2 mt-3">
      <h5 className="text-muted">
        {operation === "NEW" ? "Create" : "Update"} Stock
      </h5>
      <hr />
      <div className="row">
        <div className="col-12">
          <form action="">
            <div className="form-row form-group">
              <div className="col-12 col-md-6 py-2 py-md-0">
                <label for="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  onChange={onChange}
                  value={state.price}
                  placeholder="In Rupees"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-12 col-md-6 py-2 py-md-0">
                <label for="discountPercentage">Discount</label>
                <input
                  type="number"
                  name="discountPercentage"
                  id="discountPercentage"
                  onChange={onChange}
                  value={state.discountPercentage}
                  placeholder="In Percentage"
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="form-row form-group">
              <div className="col-12 col-md-6 py-2 py-md-0">
                <label for="quantity">
                  {state.id ? "Quantity" : "Stock Opening Quantity"}
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  onChange={onChange}
                  value={state.quantity}
                  disabled={state.operation === "NEW" ? "" : "disabled"}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-12 col-md-6 py-2 py-md-0">
                <label for="refillLevel">Refill Level</label>
                <input
                  type="number"
                  name="refillLevel"
                  id="refillLevel"
                  onChange={onChange}
                  value={state.refillLevel}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="form-row form-group">
              <div class="col-12 col-md-6 py-2 py-md-0 ml-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={state.forSale}
                  onChange={onToggle}
                  id="forSale"
                  name="forSale"
                />
                <label class="form-check-label" for="forSale">
                  For Sale
                </label>
              </div>
            </div>
            <button
              type="button"
              className="btn-sm text-light bg-info rounded p-1"
              onClick={fnCreateUpdateStock}
            >
              {state.operation === "NEW" ? "Create" : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockCreateEdit;
