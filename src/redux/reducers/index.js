import { combineReducers } from "redux";
import allProductsReducer from "./allProductsReducer";
import cartReducer from "./cartReducer";



export default combineReducers({
    allProducts:allProductsReducer,
    cart:cartReducer
});