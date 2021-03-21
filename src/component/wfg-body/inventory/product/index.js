import React, { useState } from "react";

import ProductCreateEdit from "./product-create-edit";
import ProductFilterList from "./product-filter-list";
import { InventoryCategory } from "./inventory-category";
import { InventoryBrand } from "./inventory-brand";

function Product() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
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
        <ProductCreateEdit
          categories={categories}
          brands={brands}
          products={products}
          setProducts={setProducts}
          selectedProduct={selectedProduct}
        />
        <hr />
        <InventoryCategory setCategories={setCategories} />
        <hr />
        <InventoryBrand setBrands={setBrands} />
      </div>
    </>
  );
}

export default Product;
