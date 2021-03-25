import React, { useReducer, useEffect } from "react";

import { doGet, doPost } from "../../../../utils/http-utils";

const initialState = {
  quantity: "",
  stockMovementType: "IN",
  referenceId: "",
  stockMovementReferenceType: "PO",
  comment: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_STOCK_MOVEMENTS":
      return { ...state, stockMovements: action.stockMovements };
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...initialState, stockMovements: state.stockMovements };
    default:
      return state;
  }
}

const StockMovement = ({ refreshStock, setRefreshStock, stock }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();
  }, [stock]);

  async function getData() {
    console.log("Fetching stock movement data...", stock.id);
    if (stock == null || stock.id == null) {
      alert("Something is wrong, please refresh..");
      return;
    }
    try {
      const params = {
        stockId: stock.id,
        _page_size: 5
      };
      doGet("stockMovement", params, true).then(
        response => {
          if (response.data) {
            dispatch({
              type: "SET_STOCK_MOVEMENTS",
              stockMovements: response.data
            });
          } else {
            dispatch({
              type: "SET_STOCK_MOVEMENTS",
              stockMovements: []
            });
          }
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error fetching stockMovements...", err);
    }
  }

  function onChange(e) {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
    if (e.target.name === "stockMovementType" && e.target.value === "IN") {
      dispatch({
        type: "SET_INPUT",
        key: "stockMovementReferenceType",
        value: "PO"
      });
    } else if (
      e.target.name === "stockMovementType" &&
      e.target.value === "OUT"
    ) {
      dispatch({
        type: "SET_INPUT",
        key: "stockMovementReferenceType",
        value: "THRASH"
      });
    }
  }

  async function fncreateStockMovement() {
    let {
      quantity,
      stockMovementType,
      referenceId,
      stockMovementReferenceType,
      comment
    } = state;
    let stockMovementStockId = stock.id;
    let stockId = stock.id;
    let storeId = stock.storeId;
    quantity = quantity ? parseInt(quantity) : null;
    if (quantity == null || quantity <= 0) return;
    referenceId = referenceId.trim();
    comment = comment.trim();
    if (referenceId === "") {
      alert("Reference ID is mandatory");
      return;
    }

    let createStockMovement = {
      quantity,
      stockMovementType,
      referenceId,
      stockMovementReferenceType,
      comment,
      stockMovementStockId,
      stockId,
      storeId
    };

    console.log("createStockMovement request: ", createStockMovement);

    try {
      doPost("stockMovement", createStockMovement, true).then(
        response => {
          alert("Stock movement record created");
          setRefreshStock(!refreshStock);
          dispatch({ type: "CLEAR_INPUT" });
        },
        error => {
          console.log(error);
          alert("Something went wrong :( Please refresh the page");
          return;
        }
      );
    } catch (err) {
      console.log("error creating stock movement...", err);
      alert("Some error occured");
    }
  }

  return (
    <div className="container-fluid mb-5 pt-5">
      <div className="row pb-5 align-items-center">
        <div className="col-12">
          <h5 className="text-muted mb-3">Stock Movements</h5>
          <table className="table table-dark table-hover text-center">
            <thead>
              <tr className="text-muted">
                <th>Date</th>
                <th>Time</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {state.stockMovements &&
                state.stockMovements.map(stockMovement => (
                  <tr>
                    <td>
                      {new Intl.DateTimeFormat("en-GB").format(
                        Date.parse(stockMovement.createdOn)
                      )}
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("default", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true
                      }).format(Date.parse(stockMovement.createdOn))}
                    </td>
                    <td>{stockMovement.quantity}</td>
                    <td>
                      <span
                        className={
                          "badge w-100 py-2 " +
                          (stockMovement.stockMovementType == "IN"
                            ? "badge-success"
                            : "badge-danger")
                        }
                        data-toggle="tooltip"
                        data-html="true"
                        title={stockMovement.referenceId}
                        data-placement="top"
                      >
                        {stockMovement.stockMovementReferenceType}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row pb-4 ">
        <div className="col-12">
          <h5 className="text-muted mb-3">Add/Remove Stocks</h5>
          <form action="">
            <div className="form-row form-group">
              <div className="col-12 col-md-6 py-2 py-md-0">
                <label for="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  onChange={onChange}
                  value={state.quantity}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-12 col-md-6 py-2 py-md-0">
                <label for="stockMovementType">Movement Type</label>
                <select
                  name="stockMovementType"
                  id="stockMovementType"
                  onChange={onChange}
                  value={state.stockMovementType}
                  className="form-control form-control-sm"
                >
                  <option value="IN">In</option>
                  <option value="OUT">Out</option>
                </select>
              </div>
            </div>
            <div className="form-row form-group">
              <div className="col-12 col-md-6 py-2 py-md-0">
                <label for="referenceId">Reference ID</label>
                <input
                  type="text"
                  name="referenceId"
                  id="referenceId"
                  onChange={onChange}
                  value={state.referenceId}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-12 col-md-6 py-2 py-md-0">
                <label for="stockMovementReferenceType">Reference Type</label>
                <select
                  name="stockMovementReferenceType"
                  id="stockMovementReferenceType"
                  onChange={onChange}
                  value={state.stockMovementReferenceType}
                  className="form-control form-control-sm"
                >
                  {state.stockMovementType === "IN" ? (
                    <option value="PO">Purchase Order</option>
                  ) : (
                    ""
                  )}
                  {state.stockMovementType === "IN" ? (
                    <option value="BILL">Bill</option>
                  ) : (
                    ""
                  )}
                  {state.stockMovementType === "IN" ? (
                    <option value="ORDER_RETURN">Order Return</option>
                  ) : (
                    ""
                  )}
                  {state.stockMovementType === "OUT" ? (
                    <option value="THRASH">Thrash</option>
                  ) : (
                    ""
                  )}
                  {state.stockMovementType === "OUT" && !stock.product.menu ? (
                    <option value="USAGE">Usage</option>
                  ) : (
                    ""
                  )}
                </select>
              </div>
            </div>
            <div className="form-row form-group">
              <div className="col-12 py-2 py-md-0">
                <label for="comment">Comment</label>
                <textarea
                  rows="2"
                  name="comment"
                  id="comment"
                  className="form-control"
                  onChange={onChange}
                  value={state.comment}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn-sm text-uppercase font-weight-bold text-light btn-info"
              onClick={fncreateStockMovement}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockMovement;
