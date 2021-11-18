// action types

export const SET_ALL_PRODUCTS = "SET_ALL_PRODUCTS";
export const SET_ACTIVE_CATEGORY = "SET_ACTIVE_CATEGORY";
export const SET_CURRENCY = "SET_CURRENCY";
export const SET_PRODUCT_DETAIL_ID = "SET_PRODUCT_DETAIL_ID";

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
export const TOOGLE_SHOW_CART = "TOOGLE_SHOW_CART";
export const TOGGLE_MINI_CART = "TOGGLE_MINI_CART";
export const CHANGE_ATTRIBUTE_VALUE = "CHANGE_ATTRIBUTE_VALUE";
// action creators
// all product actions

export const setAllProducts = (data) => {
    return{
        type:SET_ALL_PRODUCTS,
        payload:{
            clothes:data.categories.filter(res=>res.name==="clothes")[0].products,
            tech:data.categories.filter(res=>res.name==="tech")[0].products
        }
    }
}

export const setActiveCategory = (category) => {
    return{
        type:SET_ACTIVE_CATEGORY,
        payload:category
    }
}

export const setCurrency = (cur) => {
    return {
        type:SET_CURRENCY,
        payload:cur
    }
}

export const setProductDetailId = (ProductId) => {
    return {
        type:SET_PRODUCT_DETAIL_ID,
        payload:ProductId
    }
}

// cart actions

export const addProductToCart = (product,cartProducts,selectedAttrs) =>{
    let updatedCart = [...cartProducts];
    updatedCart.push({...product, quantity:1,selectedAttributes:selectedAttrs})
    return {
        type:ADD_PRODUCT_TO_CART,
        payload:updatedCart
    }
}


export const increaseProductQuantity = (product,cartProducts)=>{

let updatedCart = [...cartProducts];
updatedCart = updatedCart.map(item=>{
    if(item.id===product.id){
        return ({...item, quantity:item.quantity+1})
    } else {
        return item
    }
})
    return {
        type:INCREASE_PRODUCT_QUANTITY,
        payload:updatedCart
    }
}

export const decreaseProductQuantity = (product, cartProducts) => {

    let updatedCart = [...cartProducts];
updatedCart = updatedCart.map(item=>{
    if(item.id===product.id){
        return ({...item, quantity:item.quantity-1})
    } else {
        return item
    }
})


    return {
        type:DECREASE_PRODUCT_QUANTITY,
        payload:updatedCart
    }
}

export const deleteProductFromCart = (product,cartProducts) => {
    let updatedCart = [...cartProducts];
    updatedCart = updatedCart.filter(item=>
        item.id!==product.id
    )
    return {
        type:DELETE_PRODUCT_FROM_CART,
        payload:updatedCart
    }
}

export const toggleShowCart = (bool) => {

    return {
        type:TOOGLE_SHOW_CART,
        payload:bool
    }

} 

export const toggleMiniCart = (bool) => {
    return {
        type:TOGGLE_MINI_CART,
        payload:bool
    }
}


export const changeAttributeValue = (cartProducts,updatedProduct) => {

let updatedCart = cartProducts.map(product=>{

    if(product.id===updatedProduct.id){
        return updatedProduct
    } else {
        return product
    }
})

    return {
        type:CHANGE_ATTRIBUTE_VALUE,
        payload:updatedCart
    }
}