import { SET_ACTIVE_CATEGORY, SET_CURRENCY, SET_PRODUCT_DETAIL_ID, SET_CLOTHES, SET_TECH, SET_ALL_CURRENCIES, SET_APOLLO_CLIENT} from "../actions/actions";


const initialState = {
    client:{},
    clothes:[],
    tech:[],
    allCurrencies:[],
    activeCategory:"clothes",
    currency:"USD",
    productDetailId:""
}



const allProductsReducer = (state = initialState, {type,payload}) => {
switch(type){

    case SET_CLOTHES:
        return {
            ...state,
            clothes:payload
        }    
        case SET_TECH:
        return {
            ...state,
            tech:payload
        }   
       case SET_ALL_CURRENCIES:
           return {
               ...state,
               allCurrencies:payload
           }   
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
    case SET_APOLLO_CLIENT:
        return{
            ...state,
            client:payload
        }        
    default:
        return state;    
}
}

export default allProductsReducer;