// action types

export const SET_CLOTHES = "SET_CLOTHES";
export const SET_TECH = "SET_TECH";
export const SET_ACTIVE_CATEGORY = "SET_ACTIVE_CATEGORY";
export const SET_CURRENCY = "SET_CURRENCY";
export const SET_ALL_CURRENCIES = "SET_ALL_CURRENCIES";
export const SET_PRODUCT_DETAIL_ID = "SET_PRODUCT_DETAIL_ID";
export const SET_APOLLO_CLIENT = "SET_APOLLO_CLIENT";

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
export const TOOGLE_SHOW_CART = "TOOGLE_SHOW_CART";
export const TOGGLE_MINI_CART = "TOGGLE_MINI_CART";
export const CHANGE_ATTRIBUTE_VALUE = "CHANGE_ATTRIBUTE_VALUE";
export const UPDATE_CART = "UPDATE_CART";

// action creators
// all product actions

export const setClothes = (data) => {
  return {
    type: SET_CLOTHES,
    payload: data,
  };
};

export const setTech = (data) => {
  return {
    type: SET_TECH,
    payload: data,
  };
};

export const setAllCurrencies = (data) => {
  return {
    type: SET_ALL_CURRENCIES,
    payload: data,
  };
};

export const setActiveCategory = (category) => {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload: category,
  };
};

export const setCurrency = (cur) => {
  return {
    type: SET_CURRENCY,
    payload: cur,
  };
};

export const setProductDetailId = (ProductId) => {
  return {
    type: SET_PRODUCT_DETAIL_ID,
    payload: ProductId,
  };
};

// cart actions

export const addProductToCart = (product, cartProducts, selectedAttrs) => {
  let updatedCart = [...cartProducts];
  updatedCart.push({
    ...product,
    quantity: 1,
    selectedAttributes: selectedAttrs,
  });
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: updatedCart,
  };
};

export const toggleShowCart = (bool) => {
  return {
    type: TOOGLE_SHOW_CART,
    payload: bool,
  };
};

export const toggleMiniCart = (bool) => {
  return {
    type: TOGGLE_MINI_CART,
    payload: bool,
  };
};

export const changeAttributeValue = (cartProducts, updatedProduct) => {
  let updatedCart = cartProducts.map((product) => {
    if (product.id === updatedProduct.id) {
      return updatedProduct;
    } else {
      return product;
    }
  });

  return {
    type: CHANGE_ATTRIBUTE_VALUE,
    payload: updatedCart,
  };
};

export const increaseProductQuantity = (
  cart,
  activeProduct,
  selectedAttributes
) => {
  let index = 0;
  for (let i = 0; i < cart.length; i++) {
    if (
      cart[i].id === activeProduct.id &&
      JSON.stringify(cart[i].selectedAttributes).split("").sort().join("") ===
        JSON.stringify(selectedAttributes).split("").sort().join("")
    ) {
      // if same product exists with same attributes
      index = i;
      break;
    }
  }

  let updatedCart = cart.map((product, ind) => {
    if (ind === index) {
      return { ...product, quantity: product.quantity + 1 };
    } else {
      return product;
    }
  });
  return {
    type: INCREASE_PRODUCT_QUANTITY,
    payload: updatedCart,
  };
};

export const decreaseProductQuantity = (
  cart,
  activeProduct,
  selectedAttributes
) => {
  let index = 0;
  for (let i = 0; i < cart.length; i++) {
    if (
      cart[i].id === activeProduct.id &&
      JSON.stringify(cart[i].selectedAttributes).split("").sort().join("") ===
        JSON.stringify(selectedAttributes).split("").sort().join("")
    ) {
      // if same product exists with same attributes
      index = i;
      break;
    }
  }

  let updatedCart = cart.map((product, ind) => {
    if (ind === index) {
      return { ...product, quantity: product.quantity - 1 };
    } else {
      return product;
    }
  });

  return {
    type: DECREASE_PRODUCT_QUANTITY,
    payload: updatedCart,
  };
};

export const deleteProductFromCart = (
  cart,
  activeProduct,
  selectedAttributes
) => {
  let updatedCart = [...cart];
  updatedCart = updatedCart.filter(
    (item) =>
      item.id !== activeProduct.id ||
      JSON.stringify(item.selectedAttributes).split("").sort().join("") !==
        JSON.stringify(selectedAttributes).split("").sort().join("")
  );
  return {
    type: DELETE_PRODUCT_FROM_CART,
    payload: updatedCart,
  };
};

// apolo client

export const setApolloClient = (client) => {
  return {
    type: SET_APOLLO_CLIENT,
    payload: client,
  };
};
