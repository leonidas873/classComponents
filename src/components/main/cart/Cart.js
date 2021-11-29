import React from "react";
import "./cart.css";
import { connect } from "react-redux";

import {
  increaseProductQuantity,
  decreaseProductQuantity,
  changeAttributeValue,
  deleteProductFromCart,
} from "../../../redux/actions/actions";
import SingleCartProduct from "./SingleCartProduct";

class Cart extends React.Component {



  render() {
    return (
      <div className="cart">
        {this.props.cartProducts.map((product) => (
          <SingleCartProduct product={product} key={this.props.cartProducts.indexOf(product)}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.cartProducts,
    currency: state.allProducts.currency,
    showCart: state.cart.showCart,
  };
};

const mapDispatchToProps = () => {
  return {
    increaseProductQuantity,
    decreaseProductQuantity,
    changeAttributeValue,
    deleteProductFromCart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Cart);
