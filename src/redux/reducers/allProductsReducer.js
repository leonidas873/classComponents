import { SET_ALL_PRODUCTS, SET_ACTIVE_CATEGORY, SET_CURRENCY, SET_PRODUCT_DETAIL_ID} from "../actions/actions";


const initialState = {
    clothes:[],
    tech:[],
    activeCategory:"clothes",
    currency:"USD",
    productDetailId:""
}



const allProductsReducer = (state = initialState, {type,payload}) => {
switch(type){
    case SET_ALL_PRODUCTS:
        return {...state,
            clothes:payload.clothes,
            tech:payload.tech
        };
    case SET_ACTIVE_CATEGORY:
        return {
            ...state,
            activeCategory:payload
        }  
    case SET_CURRENCY:
        return{
            ...state,
            currency:payload
        }       
    case SET_PRODUCT_DETAIL_ID:
        return{
            ...state,
            productDetailId:payload
        }      
    default:
        return state;    
}
}

export default allProductsReducer;