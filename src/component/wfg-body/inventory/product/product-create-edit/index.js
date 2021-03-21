import React, { useEffect, useReducer } from "react";

import { doPost, doPut } from "../../../../utils/http-utils";

const initialState = {
  id: null,
  name: "",
  description: "",
  price: "",
  discountPercentage: "",
  categoryId: "null",
  brandId: "null",
  quantityType: "UNIT",
  productPricingType: "FIXED_PRICE",
  enableEditing: false,
  operation: null
};

let l_initState = null;

function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...l_initState, enableEditing: false };
    default:
      return state;
  }
}

function ProductCreateEdit({
  categories,
  brands,
  products,
  setProducts,
  selectedProduct
}) {
  l_initState = initialState;
  const [state, dispatch] = useReducer(reducer, l_initState);

  useEffect(() => {
    console.log("Selected product changed");
    if (selectedProduct == null) return;
    l_initState = selectedProduct;
    l_initState.categoryId = selectedProduct.categoryId
      ? selectedProduct.categoryId
      : null;
    l_initState.brandId = selectedProduct.brandId
      ? selectedProduct.brandId
      : null;
    l_initState.id = selectedProduct.id;
    dispatch({ type: "CLEAR_INPUT" });
  }, [selectedProduct]);

  async function fnCreateUpdateProduct() {
    let {
      name,
      description,
      price,
      discountPercentage,
      categoryId,
      brandId,
      quantityType
    } = state;

    if (name.trim() === "") {
      alert("Mandatory param name is empty");
      return;
    }

    name = name.trim();
    description = description && description.trim() !== "" ? description : null;
    price = price ? parseFloat(price) : null;
    discountPercentage = discountPercentage
      ? parseFloat(discountPercentage)
      : null;
    if (
      discountPercentage &&
      (discountPercentage < 0 || discountPercentage > 100)
    ) {
      alert("Invalid base discount percentage");
      return;
    }

    const createUpdateProduct = {
      name,
      description,
      price,
      discountPercentage,
      categoryId,
      brandId,
      quantityType,
      productPricingType: "FIXED_PRICE"
    };
    console.log("Create Update Product Request: ", createUpdateProduct);

    try {
      let l_successMessage = null;
      let newProducts = null;
      if (state.operation != null && state.operation === "NEW") {
        l_successMessage = "Product successfully created";
        const createProduct = createUpdateProduct;
        console.log("Creating product");
        doPost("product", createProduct, true).then(
          response => {
            console.log("Product created", response.data);
            newProducts = [response.data, ...products];
            setProducts(newProducts);
            dispatch({ type: "CLEAR_INPUT" });
            alert(l_successMessage);
          },
          error => {
            console.log(error);
            alert("Something went wrong :( Please refresh the page");
            return;
          }
        );
      } else if (state.operation != null && state.operation === "UPDATE") {
        l_successMessage = "Product successfully updated";
        createUpdateProduct.id = state.id;
        const updateProduct = createUpdateProduct;
        console.log("Updating product with id", updateProduct.id);
        doPut("product", createUpdateProduct.id, updateProduct, true).then(
          response => {
            console.log("Product updated", response.data);
            const updatedProduct = response.data;
            //updating the product in productsList
            let index = null;
            for (let i = 0; i < products.length; i++) {
              if (updatedProduct.id === products[i].id) {
                console.log("Product updated with id", products[i].id);
                index = i;
                break;
              }
            }
            console.log(index);
            if (index || index >= 0) {
              products[index] = updatedProduct;
              newProducts = [...products];
            }
            setProducts(newProducts);
            dispatch({ type: "CLEAR_INPUT" });
            alert(l_successMessage);
          },
          error => {
            console.log(error);
            alert("Something went wrong :( Please refresh the page");
            return;
          }
        );
      } else {
        alert("Something went wrong :( Please refresh the page");
        return;
      }
    } catch (err) {
      console.log("error creating product...", err);
      alert("Some error occured");
    }
  }

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

  const createProductBtnClick = () => {
    l_initState = initialState;
    dispatch({ type: "CLEAR_INPUT" });
    dispatch({ type: "SET_INPUT", key: "enableEditing", value: true });
    dispatch({ type: "SET_INPUT", key: "operation", value: "NEW" });
  };

  const editProductBtnClick = () => {
    dispatch({ type: "SET_INPUT", key: "enableEditing", value: true });
    dispatch({ type: "SET_INPUT", key: "operation", value: "UPDATE" });
  };

  return (
    <div className="container-fluid py-2">
      <div className="row">
        <div className="col-12">
          <h6 className="text-uppercase text-muted">Create/Edit Product</h6>
          <hr />
          <button
            type="button"
            className="btn-sm text-uppercase font-weight-bold text-light btn-info"
            onClick={createProductBtnClick}
          >
            Create New Product
          </button>
          <button
            type="button"
            className={
              "btn-sm text-uppercase font-weight-bold text-light btn-info ml-2 " +
              (selectedProduct ? "visible" : "invisible")
            }
            onClick={editProductBtnClick}
          >
            Edit Product
          </button>
          <hr />
        </div>
      </div>
      <div className="row py-2">
        <div className="col-12">
          <form action="">
            <fieldset
              disabled={
                state.enableEditing && state.enableEditing === true
                  ? ""
                  : "disabled"
              }
            >
              <div className="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  id="name"
                  onChange={onChange}
                  value={state.name}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="form-row form-group">
                <div className="col-12 col-md-6 col-lg-4 py-2 py-md-0">
                  <label for="categoryId">Category</label>
                  <select
                    name="categoryId"
                    id="categoryId"
                    onChange={onChange}
                    className="form-control form-control-sm"
                    value={state.categoryId}
                  >
                    <option value="0">--None--</option>
                    {categories &&
                      categories.map(category => (
                        <option value={category.id}>{category.name}</option>
                      ))}
                  </select>
                </div>
                <div className="col-12 col-md-6 col-lg-4 py-2 py-md-0">
                  <label for="productCode">Price</label>
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
                <div className="col-12 col-md-6 col-lg-4 py-2 py-md-0">
                  <label for="productCode">Discount</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="discountPercentage"
                    id="discountPercentage"
                    onChange={onChange}
                    value={state.discountPercentage}
                    placeholder="In percentage"
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="form-row form-group">
                <div className="col-12 col-md-6 col-lg-4 py-2 py-md-0">
                  <label for="category">Quantity Type</label>
                  <select
                    name="quantityType"
                    id="quantityType"
                    type="number"
                    className="form-control form-control-sm"
                    onChange={onChange}
                    value={state.quantityType}
                  >
                    <option value="UNIT">Unit</option>
                    <option value="KG">KG</option>
                    <option value="LITRE">Litre</option>
                  </select>
                </div>
                <div className="col-12 col-md-6 col-lg-4 py-2 py-md-0">
                <label for="brandId">Brand</label>
                  <select
                    name="brandId"
                    id="brandId"
                    onChange={onChange}
                    className="form-control form-control-sm"
                    value={state.brandId}
                  >
                    <option value="0">--None--</option>
                    {brands &&
                      brands.map(brand => (
                        <option value={brand.id}>{brand.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label for="description">Description</label>
                <textarea
                  rows="2"
                  name="description"
                  id="description"
                  className="form-control"
                  onChange={onChange}
                  value={state.description}
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className={
                    "btn-sm text-uppercase font-weight-bold text-light btn-info " +
                    (state.operation ? "" : "invisible")
                  }
                  onClick={fnCreateUpdateProduct}
                >
                  {state.operation && state.operation == "NEW"
                    ? "Create"
                    : "Update"}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductCreateEdit;
