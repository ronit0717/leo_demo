import React from "react";
import OrderId from "order-id";

import { doPost } from "../../../../utils/http-utils";

const OrderSummary = ({ headerStoreId, selectedItems, setSelectedItems }) => {
  async function fnCreateStoreOrder() {
    try {
      const orderId = OrderId("w@g0n");
      const orderSlug = orderId.generate();
      let cartEntities = [];
      for (let i = 0; i < selectedItems.length; i++) {
        cartEntities.push({
          quantity: selectedItems[i].count,
          stockId: selectedItems[i].id,
          unitPrice: selectedItems[i].product.price
            ? selectedItems[i].product.price
            : selectedItems[i].price,
          discountPercentage: selectedItems[i].product.discountPercentage
            ? selectedItems[i].product.discountPercentage
            : selectedItems[i].discountPercentage,
          cartEntityType: "PRODUCT"
        });
      }
      console.log("CartEntities", cartEntities);
      const cartRequest = {
        cartEntities
      };
      const createStoreOrderRequest = {
        storeId: headerStoreId,
        cartRequest,
        orderType: "UPFRONT_PAYMENT",
        orderSlug
      };
      console.log("createStoreOrderRequest", createStoreOrderRequest);
      doPost("storeOrder", createStoreOrderRequest, true).then(
        response => {
          const alertMessage =
            "Order created with id: " +
            response.data.orderSlug;
          alert(alertMessage);
          setSelectedItems([]);
        },
        error => {
          console.log(error);
          alert(error);
          alert("Something went wrong :( Please refresh the page");
        }
      );
    } catch (err) {
      console.log("error creating order...", err);
      alert("Some error occured");
    }
  }

  function getTotalCost() {
    return selectedItems.reduce(function(cost, item) {
      return cost + getSellingPrice(item);
    }, 0);
  }

  function getSellingPrice(stock) {
    if (stock == null) {
      return;
    }
    const price = stock.product.price ? stock.product.price : stock.price;
    const discount = stock.product.discountPercentage
      ? stock.product.discountPercentage
      : stock.discountPercentage;
    const sellingPrice = price * stock.count * (1 - discount / 100);
    return sellingPrice;
  }

  function incrementStockCount(stock) {
    if (stock.quantity && stock.quantity <= stock.count) {
      alert("Maximum quantity reached");
      return;
    }
    stock.count = stock.count + 1;
    updateStock(stock);
  }

  function decrementStockCount(stock) {
    if (stock.count === 1) {
      removeStock(stock);
      return;
    }
    stock.count = stock.count - 1;
    updateStock(stock);
  }

  function removeStock(stock) {
    const newSelectedItems = selectedItems.filter(item => item.id != stock.id);
    setSelectedItems(newSelectedItems);
  }

  function updateStock(stock) {
    let updatedSelectedItems = [...selectedItems];
    for (let i = 0; i < updatedSelectedItems.length; i++) {
      if (updatedSelectedItems[i].id === stock.id) {
        updatedSelectedItems[i] = stock;
        break;
      }
    }
    setSelectedItems(updatedSelectedItems);
  }

  return (
    <div>
      <h6 className="text-muted text-center mb-3">Summary</h6>
      {selectedItems == null || selectedItems.length == 0 ? (
        <div className="text-muted text-center">No product selected</div>
      ) : null}
      <table
        className={
          "table table-striped bg-white text-center " +
          (selectedItems == null || selectedItems.length == 0
            ? "invisible"
            : "")
        }
      >
        <thead>
          <tr className="text-muted">
            <th>Name</th>
            <th>Unit Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Final Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems &&
            selectedItems.map(item => (
              <tr>
                <td>{item.product.name}</td>
                <td>
                  {new Intl.NumberFormat("ja-JP", {
                    style: "currency",
                    currency: "INR"
                  }).format(item.product.price ? item.product.price : item.price)}
                </td>
                <td>
                  {item.product.discountPercentage
                    ? item.product.discountPercentage
                    : item.discountPercentage}
                  %
                </td>
                <td>
                  <i
                    className="fas fa-minus-square fa-lg mr-1"
                    onClick={() => decrementStockCount(item)}
                  />
                  {item.count}
                  <i
                    className="fas fa-plus-square fa-lg ml-1"
                    onClick={() => incrementStockCount(item)}
                  />
                </td>
                <td>
                  {new Intl.NumberFormat("ja-JP", {
                    style: "currency",
                    currency: "INR"
                  }).format(getSellingPrice(item))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div
        className={
          "row mt-3 " +
          (selectedItems == null || selectedItems.length == 0
            ? "invisible"
            : "")
        }
      >
        <div className="col-6 text-muted h3">
          Total:{" "}
          {new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "INR"
          }).format(getTotalCost())}
        </div>
        <div className="col-6 text-right">
          <button
            type="button"
            className="btn-sm text-uppercase font-weight-bold text-light btn-info"
            onClick={fnCreateStoreOrder}
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
