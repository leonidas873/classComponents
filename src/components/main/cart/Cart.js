import React from "react";
import "./cart.css";
import { connect } from "react-redux";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  changeAttributeValue
} from "../../../redux/actions/actions";

class Cart extends React.Component {
  onDecreaseProductQuantity = (product) => {
    if (product.quantity > 1) {
      this.props.decreaseProductQuantity(product, this.props.cartProducts);
    } else if (product.quantity === 1) {
      this.props.deleteProductFromCart(product, this.props.cartProducts);
    }
  };
  getPrice = (prices) => {
    let amount = prices.filter(
      (price) => price.currency === this.props.currency
    )[0].amount;
    return amount;
  };

  setCurrencySymbol = (cur) => {
    switch (cur) {
      case "USD":
        return "$";
      case "GBP":
        return "£";
      case "AUD":
        return "$";
      case "JPY":
        return "¥";
      case "RUB":
        return "ƒ";
      default:
        return "$";
    }
  };


  onAttributeClick = (product,attrName,attrValue) => {

    let selectedAttr = {attributeName:attrName,value:attrValue};
    let updatedSelectedAttributes = product.selectedAttributes.map(attr=>{
      if(attr.attributeName===attrName){
        return selectedAttr
      } else {
        return attr
      }
    })
    let updatedProduct = {...product,selectedAttributes:updatedSelectedAttributes};
    console.log(updatedProduct);
   this.props.changeAttributeValue(this.props.cartProducts,updatedProduct);
  }


  render() {
    return (
      <div className="cart">
        {this.props.cartProducts.map((product) => (
          <div className="cart__product">
            <div className="cart__product-col--ver">
              <h4 className="cart__product-title">{product.name}</h4>
              <p className="cart__product-price">
                {this.setCurrencySymbol(this.props.currency)}{" "}
                {this.getPrice(product.prices)}
              </p>
              <div className="cart__product-attribute">
                <div className="cart__attributes">
                  {product.attributes.map((attr) => (
                    <div className="cart__attribute" key={attr.id}>
                      <ul className="cart__attribute-options">
                        {attr.items.map((item) => (
                          <li
                            className={
                              "cart__attribute-option " +
                              (product.selectedAttributes.filter(
                                (elem) =>
                                  elem.attributeName === attr.name &&
                                  elem.value === item.value
                              ).length > 0
                                ? "cart__attribute-option--selected"
                                : "")
                            }
                            onClick={() =>
                              this.onAttributeClick(
                                product,
                                attr.name,
                                item.value
                              )
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
                      product,
                      this.props.cartProducts
                    )
                  }
                />
                <span>{product.quantity}</span>
                <AiOutlineMinusSquare
                  onClick={() => this.onDecreaseProductQuantity(product)}
                />
              </div>
              <img
                className="cart__product-image"
                src={product.gallery[0]}
                alt=""
              />
            </div>
          </div>
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
    changeAttributeValue
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Cart);
