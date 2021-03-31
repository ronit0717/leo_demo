import React, { useEffect, useReducer } from "react";
import { doGet } from "../../../../utils/http-utils";

const initialState = {
  selectedCategory: null,
  selectedBrand: null
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_STOCKS":
      return { ...state, stocks: action.stocks };
    case "SET_CATEGORIES":
      return { ...state, categories: action.categories };
    case "SET_BRANDS":
      return { ...state, brands: action.brands };
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...initialState };
    default:
      return state;
  }
}

const OrderMenu = ({ headerStoreId, selectedItems, setSelectedItems }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Re-fetching stock data...");
    getData();
  }, [headerStoreId]);

  async function getData() {
    if (!headerStoreId) {
      return;
    }
    try {
      const params = {
        store_id: headerStoreId,
        for_sale: true
      };
      doGet("stock", params, true).then(
        response => {
          console.log(response.data);
          dispatch({
            type: "SET_STOCKS",
            stocks: response.data
          });
          setCategories(response.data);
          setBrands(response.data);
        },
        error => {
          console.log(error);
          alert(error);
          alert("Something went wrong :( Please refresh the page");
        }
      );
    } catch (err) {
      console.log("error fetching stocks...", err);
    }
  }

  const setCategories = allItems => {
    let l_categories = new Set(
      allItems
        .filter(item => item.product && item.product.category)
        .map(item => item.product.category.name)
    );
    console.log("Categories... ", l_categories);
    dispatch({
      type: "SET_CATEGORIES",
      categories: Array.from(l_categories)
    });
  };

  const setBrands = allItems => {
    let l_brands = new Set(
      allItems
        .filter(item => item.product && item.product.brand)
        .map(item => item.product.brand.name)
    );
    console.log("Brands... ", l_brands);
    console.log(Array.from(l_brands));
    dispatch({
      type: "SET_BRANDS",
      brands: Array.from(l_brands)
    });
  };

  const filterStock = stock => {
    return (
      stock &&
      stock.forSale &&
      stock.product &&
      (!stock.quantity || stock.quantity > 0) &&
      (state.selectedCategory == null ||
        state.selectedCategory == "null" ||
        state.selectedCategory === (stock.product.category ? stock.product.category.name : null)) &&
      (state.selectedBrand == null ||
        state.selectedBrand == "null" ||
        state.selectedBrand === (stock.product.brand ? stock.product.brand.name : null))
    );
  };

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

  const addStockItem = stock => {
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i].id === stock.id) {
        return;
      }
    }
    stock.count = 1;
    const newSelectedItems = [...selectedItems, stock];
    console.log("RC LOG SELECTED ITEMS: ", newSelectedItems);
    setSelectedItems(newSelectedItems);
  };

  return (
    <div>
      <h6 className="text-muted text-center">Menu</h6>
      <div className="container-fluid mt-3 mb-5">
        {/* Product List Filter */}
        <form>
          <div className="form-row form-group align-items-center">
            <div className="col-6 form-inline">
              <select
                name="selectedCategory"
                className="form-control form-control-sm"
                onChange={onChange}
              >
                <option value="null">--Select Category--</option>
                {state.categories &&
                  state.categories.map(category => (
                    <option value={category}>{category}</option>
                  ))}
              </select>
            </div>
            <div className="col-6 form-inline">
              <select
                name="selectedBrand"
                className="form-control form-control-sm ml-2"
                onChange={onChange}
              >
                <option value="null">--Select Brand--</option>
                {state.brands &&
                  state.brands.map(brand => (
                    <option value={brand}>{brand}</option>
                  ))}
              </select>
            </div>
          </div>
        </form>

        {/* Product List */}
        {state.stocks == null || state.stocks.length == 0 ? (
          <div className="text-muted text-center">No products</div>
        ) : null}
        {state.stocks &&
          state.stocks
            .filter(stock => filterStock(stock))
            .map(stock => (
              <div
                className="row py-2 mb-2 task-border bg-white shadow"
                key={stock.id}
              >
                <div className="col-5 h6">{stock.product.name}</div>
                <div className="col-7 text-right h6">
                  {stock.product.category && stock.product.category.name ? (
                    <span className="text-light badge badge-warning mr-1">
                      {stock.product.category.name}
                    </span>
                  ) : null}
                  {stock.product.brand && stock.product.brand.name ? (
                    <span className="text-light badge badge-dark mr-1">
                      {stock.product.brand.name}
                    </span>
                  ) : null}
                  <i
                    className="fas fa-plus-circle fa-lg ml-1"
                    onClick={() => addStockItem(stock)}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default OrderMenu;
