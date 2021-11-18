import React from "react";
import ProductDetails from "./productDetails/ProductDetails";
import {connect} from 'react-redux';
import {setProductDetailId} from '../../redux/actions/actions';
import { BsCart2 } from "react-icons/bs";
import "./main.css";

class Catalog extends React.Component {


getPrice = (prices) => {
let amount = prices.filter(price => price.currency === this.props.currency)[0].amount;
return amount;
}

setCurrencySymbol = (cur) => {
    switch (cur) {
      case "USD":
        return "$";
      case "GBP":
        return "£"
      case "AUD":
        return "$"
      case "JPY":
        return "¥";
      case "RUB":
        return "ƒ";
      default:
        return "$";
    }
  };



  render() {
    return (
      <div className="catalog">
        {this.props.products.map((product) => (
          <div className={"catalog__product " + (!product.inStock ? "not-inStock" : "")}  key={product.id} onClick={()=>{this.props.setProductDetailId(product.id)}}>
            <div className="product__overlay">OUT OF STOCK</div>
            <div className="product__img">
              <img src={product.gallery[0]} alt="" />
              <div className={"cart__logo-wrapper " + (this.props.cartProducts.filter(elem=>elem.id===product.id).length>0 ? "" : "cart__logo-wrapper--hidden")}>
              <BsCart2 className="cart__logo"/>
                </div>
              
            </div>
            <h4 className="product__title">{product.name}</h4>
            <p className="product__price">{this.setCurrencySymbol(this.props.currency)} {this.getPrice(product.prices)}</p>
            {this.props.productDetailId === product.id && <ProductDetails product={product} price={this.setCurrencySymbol(this.props.currency)+ " " +this.getPrice(product.prices)}/>}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    productDetailId: state.allProducts.productDetailId,
    cartProducts: state.cart.cartProducts

  }
}

const mapDispatchToProps = () => {
  return {
    setProductDetailId
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Catalog);
