import React from 'react';
import './cart.css';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import getSymbolFromCurrency from "currency-symbol-map";
import { connect } from "react-redux";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

import {
  increaseProductQuantity,
  decreaseProductQuantity,
  changeAttributeValue,
  deleteProductFromCart,
} from "../../../redux/actions/actions";


class SingleCartProduct extends React.Component {


state={
    currentImageIndex:0
}

setNextImage = () => {
let galleryLength = this.props.product.gallery.length;
let currentIndex = this.state.currentImageIndex;
if(currentIndex<galleryLength-1){
    this.setState({currentImageIndex:currentIndex+1})
} else {

    this.setState({currentImageIndex:0})
}

}

setPrevImage = () => {
    let galleryLength = this.props.product.gallery.length;
    let currentIndex = this.state.currentImageIndex;
    if(currentIndex>0){
        this.setState({currentImageIndex:currentIndex-1})
    } else {
    
        this.setState({currentImageIndex:galleryLength-1})
    }
}

    getPrice = (prices) => {
        let amount = prices.filter(
          (price) => price.currency === this.props.currency
        )[0].amount;
        return amount;
      };
      onDecreaseProductQuantity = (product) => {
        if (product.quantity > 1) {
          this.props.decreaseProductQuantity(
            this.props.cartProducts,
            product,
            product.selectedAttributes
          );
        } else if (product.quantity === 1) {
          this.props.deleteProductFromCart(
            this.props.cartProducts,
            product,
            product.selectedAttributes
          );
        }
      };

    render() { 
        return (
            <div
            className="cart__product"
            key={this.props.cartProducts.indexOf(this.props.product)}
          >
            <div className="cart__product-col--ver">
              <div className="cart__product-brand">{this.props.product.brand}</div>
              <h4 className="cart__product-title">{this.props.product.name}</h4>
              <p className="cart__product-price">
                {getSymbolFromCurrency(this.props.currency)}{" "}
                {this.getPrice(this.props.product.prices)}
              </p>
              <div className="cart__product-attribute">
                <div className="cart__attributes">
                  {this.props.product.attributes.map((attr) => (
                    <div className="cart__attribute" key={attr.id}>
                      <h5 className="attribute__name">{attr.name}:</h5>
                      <ul className="cart__attribute-options">
                        {attr.items.map((item) => (
                          <li
                            className={
                              "cart__attribute-option " +
                              (this.props.product.selectedAttributes.filter(
                                (elem) =>
                                  elem.name === attr.name &&
                                  elem.value === item.value
                              ).length > 0
                              ? attr.type === "swatch"
                              ? ""
                              : "attribute__option--selected"
                            : "")
                            }

                            key={item.id}
                            style={{
                              background:
                                attr.type === "swatch"
                                  ? item.value
                                  : "transparant",
                            }}
                          >
                            {attr.type === "swatch" ? "" : item.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="cart__product-col--hor">
              <div className="cart__product-qty">
                <AiOutlinePlusSquare
                  onClick={() =>
                    this.props.increaseProductQuantity(
                      this.props.cartProducts,
                      this.props.product,
                      this.props.product.selectedAttributes
                    )
                  }
                />
                <span>{this.props.product.quantity}</span>
                <AiOutlineMinusSquare
                  onClick={() => this.onDecreaseProductQuantity(this.props.product)}
                />
              </div>
              <div className="cart__image-wrapper">
                 {this.props.product.gallery.length>1 && <MdKeyboardArrowLeft className="cart__image-arrow1" onClick={()=>this.setPrevImage()}/>}
              <img
                className="cart__product-image"
                src={this.props.product.gallery[this.state.currentImageIndex]}
                alt=""
              />
              {this.props.product.gallery.length>1 && <MdKeyboardArrowRight className="cart__image-arrow2" onClick={()=>{this.setNextImage()}}/>}
              </div>
            </div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps())(SingleCartProduct);
  