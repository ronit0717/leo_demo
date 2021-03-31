import React, { useEffect, useState } from "react";

import { doGet } from "../../../../utils/http-utils";

import StockCreateEdit from "../stock-create-edit";
import StockMovement from "../stock-movement";

function StockView({ selectedProduct, storeId }) {
  const [stock, setStock] = useState(null);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [refreshStock, setRefreshStock] = useState(false);
  const [operation, setOperation] = useState(null);

  const stockRefToFocus = React.createRef();

  useEffect(() => {
    console.log("Selected product changed");
    setOperation(null);
    getData();
    if (stockRefToFocus.current) {
      stockRefToFocus.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [selectedProduct, refreshStock, storeId]);

  async function getData() {
    console.log("Get data called.. storeId : ", storeId);
    console.log("Selected product : ", selectedProduct);
    try {
      const params = {
        store_id: storeId,
        product_id: selectedProduct.id
      };
      doGet("stock/store", params, true).then(
        response => {
          const stockData = response.data;
          console.log("Stock data", stockData);
          setPriceFields(stockData ? stockData : null);
          setStock(stockData ? stockData : null);
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

  function setPriceFields(stock) {
    if (stock == null) {
      return;
    }
    const price = stock.product.price ? stock.product.price : stock.price;
    const discount = stock.product.discountPercentage
      ? stock.product.discountPercentage
      : stock.discountPercentage;
    const sellingPrice = price * (1 - discount / 100);
    setPrice(price);
    setDiscount(discount);
    setSellingPrice(sellingPrice);
  }

  return (
    <>
      {stock ? null : (
        <div className="container-fluid mb-5 pt-5" ref={stockRefToFocus}>
          <div className="row pb-4 align-items-center">
            <div className="col-12">
              <h5 className="text-muted mb-3 mt-3">
                No stock found for {selectedProduct.name}
              </h5>
            </div>
            <div className="col-12">
              <button
                className="btn-sm text-light bg-info rounded p-1"
                onClick={() => setOperation("NEW")}
              >
                Create New Stock
              </button>
            </div>
          </div>
        </div>
      )}
      {stock && (
        <div className="container-fluid mb-2 pt-5" ref={stockRefToFocus}>
          <div className="row pb-4 align-items-center">
            <div className="col-12">
              <h5 className="text-muted mb-3 mt-3">{stock.product.name}</h5>
              {stock.product.category ? (
                <span className="text-light bg-warning p-1 mr-2 rounded">
                  {stock.product.category.name}
                </span>
              ) : (
                ""
              )}
              <button
                className="btn-sm text-light bg-info rounded p-1 float-right"
                onClick={() => setOperation("EDIT")}
              >
                Edit Stock
              </button>
            </div>
          </div>
          <div className="row py-2 align-items-center bg-white">
            <div className="col-4 text-muted">Quantity</div>
            <div className="col-1 text-muted">:</div>
            <div className="col-7 text-muted">
              {!isNaN(parseFloat(stock.quantity)) ? stock.quantity : "NA"}
            </div>
          </div>
          <div className="row py-2 align-items-center rounded">
            <div className="col-4 text-muted">Price</div>
            <div className="col-1 text-muted">:</div>
            <div className="col-7 text-success">
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "INR"
              }).format(sellingPrice)}
              <del
                className={
                  "text-danger ml-2 " +
                  (discount && discount > 0 ? "" : "invisible")
                }
              >
                {new Intl.NumberFormat("ja-JP", {
                  style: "currency",
                  currency: "INR"
                }).format(price)}
              </del>
            </div>
          </div>
          <div className="row py-2 align-items-center bg-white">
            <div className="col-4 text-muted">Status</div>
            <div className="col-1 text-muted">:</div>
            <div className="col-7 text-muted">
              {stock.forSale && stock.forSale === true
                ? "For Sale"
                : "Not for sale"}
            </div>
          </div>
          <div className="row py-2 align-items-center">
            <div className="col-4 text-muted">Refill Level</div>
            <div className="col-1 text-muted">:</div>
            <div className="col-7 text-muted">
              {stock.refillLevel ? stock.refillLevel : "NA"}
            </div>
          </div>
          <div className="row py-2 align-items-center rounded bg-white">
            <div className="col-4 text-muted">Description</div>
            <div className="col-1 text-muted">:</div>
            <div className="col-7 text-muted">{stock.product.description}</div>
          </div>
        </div>
      )}
      {operation ? (
        <StockCreateEdit
          selectedProduct={selectedProduct}
          refreshStock={refreshStock}
          setRefreshStock={setRefreshStock}
          stock={stock}
          storeId={storeId}
          operation={operation}
        />
      ) : (
        <></>
      )}

      {stock ? (
        <StockMovement
          refreshStock={refreshStock}
          setRefreshStock={setRefreshStock}
          stock={stock}
          storeId={storeId}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default StockView;
