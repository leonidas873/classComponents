import {
  ADD_PRODUCT_TO_CART,
  INCREASE_PRODUCT_QUANTITY,
  DECREASE_PRODUCT_QUANTITY,
  DELETE_PRODUCT_FROM_CART,
  TOOGLE_SHOW_CART,
  TOGGLE_MINI_CART,
  CHANGE_ATTRIBUTE_VALUE
} from "../actions/actions";

const initialState = {
  cartProducts: [],
  showCart:false,
  showMiniCart:false
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cartProducts:payload
      };
    case INCREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        cartProducts:payload
      };
    case DECREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        cartProducts:payload
      };
      case DELETE_PRODUCT_FROM_CART:
        return {
            ...state,
            cartProducts:payload
        }; 
      case TOGGLE_MINI_CART:
        return {
          ...state,
          showMiniCart:payload
        }  
      case TOOGLE_SHOW_CART:
        return {
          ...state,
          showCart:payload
        }  
      case CHANGE_ATTRIBUTE_VALUE: 
        return {
          ...state,
          cartProducts:payload
        }
         
    default:
      return state;
  }
};

export default cartReducer;
