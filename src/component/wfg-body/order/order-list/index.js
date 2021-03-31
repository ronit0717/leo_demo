import React, { useState, useEffect, useReducer } from "react";

import { doGet, doPut } from "../../../utils/http-utils";

const initialState = {
  orderSlug: null,
  nextToken: null,
  previousTokens: [],
  searchToken: null
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.orders };
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...initialState, filter: null };
    default:
      return state;
  }
}

const OrderList = ({ headerStoreId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderRefToFocus = React.createRef();

  useEffect(() => {
    console.log("Selected order changed");
    if (orderRefToFocus.current) {
      orderRefToFocus.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [selectedOrder]);

  useEffect(() => {
    console.log("Refetching order data...");
    getData();
  }, [headerStoreId, state.orderStatus]);

  async function getData() {
    if (!headerStoreId) {
      return;
    }
    try {
      const params = {
        storeId: headerStoreId
      };
      doGet("storeOrder", params, true).then(
        response => {
          console.log("StoreOrders", response.data);
          dispatch({
            type: "SET_ORDERS",
            orders: response.data
          });
        },
        error => {
          console.log(error);
          alert(error);
          alert("Something went wrong :( Please refresh the page");
        }
      );
    } catch (err) {
      console.log("error fetching orders...", err);
    }
  }

  const onChange = e => {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
  };

  const getOrderStatusBadge = order => {
    let badge = "badge-info";
    if (order && order.orderStatus && order.orderStatus === "PROCESSING") {
      badge = "badge-warning";
    } else if (
      order &&
      order.orderStatus &&
      order.orderStatus === "DELIVERED"
    ) {
      badge = "badge-success";
    } else if (
      order &&
      order.orderStatus &&
      order.orderStatus === "CANCELLED"
    ) {
      badge = "badge-danger";
    }
    return badge;
  };

  async function fnUpdateStoreOrder(orderStatus, id) {
    const alertMsg =
      "Mark order as " +
      (orderStatus === "DELIVERED" ? "delivered ?" : "cancelled ?");
    let confirmation = window.confirm(alertMsg);
    if (!confirmation) {
      return;
    }

    const controller = "storeOrder/status/" + orderStatus;
    doPut(controller, id, null, true).then(
      response => {
        //updating the product in productsList
        const updatedStoreOrder = response.data;
        let index = null;
        for (let i = 0; i < state.orders.length; i++) {
          if (updatedStoreOrder.id === state.orders[i].id) {
            console.log("Order updated with id", state.orders[i].id);
            index = i;
            break;
          }
        }
        console.log(index);
        if (index || index >= 0) {
          state.orders[index] = updatedStoreOrder;
          const newOrders = [...state.orders];
          dispatch({
            type: "SET_ORDERS",
            orders: newOrders
          });
          setSelectedOrder(updatedStoreOrder);
        }
      },
      error => {
        console.log(error);
        alert(error);
        alert("Something went wrong :( Please refresh the page");
      }
    );
  }

  return (
    <>
      <div className="col-md-6">
        <div className="container-fluid mt-3 mb-5">
          {/* Product List */}
          {state.orders == null || state.orders.length == 0 ? (
            <div className="text-muted text-center">No order found...</div>
          ) : null}
          {state.orders &&
            state.orders.map(order => (
              <div
                className="row py-2 mb-2 task-border bg-white shadow"
                key={order.id}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="col-6 h6 text-muted">{order.orderSlug}</div>
                <div className="col-6 text-right h6">
                  {order.orderStatus ? (
                    <span
                      className={
                        "badge text-light mr-2 " + getOrderStatusBadge(order)
                      }
                    >
                      {order.orderStatus}
                    </span>
                  ) : null}
                  <span className="badge badge-info mr-2">
                    {order.cart.cartEntityResponses.length}
                  </span>
                  <span
                    className={
                      "badge " +
                      (order.orderType === "PICKUP"
                        ? "badge-primary"
                        : "badge-dark")
                    }
                  >
                    {order.orderType === "PICKUP" ? "P" : "D"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Order Information */}
      <div className="col-md-6">
        {selectedOrder ? null : (
          <div className="container-fluid mb-5 pt-5" ref={orderRefToFocus}>
            <div className="row pb-4 align-items-center">
              <div className="col-12">
                <h5 className="text-muted text-center">Select an order...</h5>
              </div>
            </div>
          </div>
        )}
        {selectedOrder && (
          <div className="container-fluid mb-2 pt-5" ref={orderRefToFocus}>
            <div className="row pb-4 align-items-center">
              <div className="col-12">
                <h6 className="text-muted mb-1 mt-1">
                  {"Order ID: " + selectedOrder.orderSlug}
                </h6>
              </div>
            </div>
            <div className="row py-2 align-items-center bg-white">
              <div className="col-4 text-muted">Status</div>
              <div className="col-1 text-muted">:</div>
              <div className="col-7 text-muted">
                {selectedOrder.orderStatus}
              </div>
            </div>
            <div className="row py-2 align-items-center rounded">
              <div className="col-4 text-muted">Type</div>
              <div className="col-1 text-muted">:</div>
              <div className="col-7 text-muted">{selectedOrder.orderType}</div>
            </div>
            <div className="row py-2 align-items-center bg-white">
              <div className="col-4 text-muted">Total items</div>
              <div className="col-1 text-muted">:</div>
              <div className="col-7 text-muted">
                {selectedOrder.cart.cartEntityResponses.length}
              </div>
            </div>
            {selectedOrder.orderStatus &&
            selectedOrder.orderStatus === "PROCESSING" ? (
              <div className="row mt-2 py-2 align-items-center">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn-sm text-uppercase font-weight-bold text-light btn-success"
                    onClick={() => fnUpdateStoreOrder("DELIVERED", selectedOrder.id)}
                  >
                    MARK DELIVERED
                  </button>
                </div>
                <div className="col-6 text-right">
                  <button
                    type="button"
                    className="btn-sm text-uppercase font-weight-bold text-light btn-danger"
                    onClick={() => fnUpdateStoreOrder("CANCELLED", selectedOrder.id)}
                  >
                    MARK CANCELLED
                  </button>
                </div>
              </div>
            ) : null}
            <hr />
            <div className="row py-2 align-items-center">
              <div className="col-12 h6 text-muted text-uppercase">Items</div>

              <table className="table table-striped bg-white text-center p-2">
                <thead>
                  <tr className="text-muted">
                    <th>Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder &&
                    selectedOrder.cart.cartEntityResponses.map(item => (
                      <tr>
                        <td>{item.stock.product.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderList;
