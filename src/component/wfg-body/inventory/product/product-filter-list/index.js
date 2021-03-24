import React, { useEffect } from "react";

import { textTruncate } from "../../../../utils";
import { doGet } from "../../../../utils/http-utils";

const ProductFilterList = ({ brands, categories, products, setProducts, setSelectedProduct }) => {
  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getData() {
    console.log("Get Data called..product");
    doGet("product", null, true).then(
      response => {
        setProducts(response.data);
      },
      error => {
        console.log(error);
        alert(error);
        alert("Something went wrong :( Please refresh the page");
      }
    );
  }

  return (
    <div className="container-fluid mt-3 mb-5">
      {/* Product List */}
      {products == null || products.length === 0 ? (
        <div className="text-muted text-center">No products</div>
      ) : null}
      {products &&
        products.map(product => (
          <div
            className="row py-2 mb-2 task-border bg-white shadow"
            key={product.id}
            onClick={() => setSelectedProduct(product)}
          >
            <div
              className="col-6 h6"
              data-toggle="tooltip"
              data-html="true"
              title={product.name}
              data-placement="top"
            >
              {textTruncate(product.name, 30)}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductFilterList;
