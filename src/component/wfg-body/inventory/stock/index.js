import React, { useState } from "react";

import { FetchInventoryCategory } from "../product/inventory-category";
import { FetchInventoryBrand } from "../product/inventory-brand";
import ProductFilterList from "../product/product-filter-list";
import StockView from "./stock-view";

const Stock = ({ headerStoreId }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <FetchInventoryCategory setCategories={setCategories} />
      <FetchInventoryBrand setBrands={setBrands} />
      <div className="col-md-6">
        <ProductFilterList
          categories={categories}
          brands={brands}
          products={products}
          setProducts={setProducts}
          setSelectedProduct={setSelectedProduct}
        />
      </div>

      <div className="col-md-6">
        {selectedProduct && headerStoreId ? (
          <StockView
            selectedProduct={selectedProduct}
            storeId={headerStoreId}
          />
        ) : (
          <div className="container-fluid mb-5">
            <div className="row pb-4 align-items-center">
              <div className="col-12">
                <h5 className="text-muted text-center mb-3 mt-3">
                  Select a product
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Stock;
