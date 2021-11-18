import React from "react";
import "./header.css";
import logo1 from "../../images/svg3.png";
import logo2 from "../../images/svg19.png";
import { IoIosArrowDown } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import MiniCart from "./MiniCart";

import { connect } from "react-redux";
import {
  setActiveCategory,
  setCurrency,
  setProductDetailId,
  toggleMiniCart,
  toggleShowCart
} from "../../redux/actions/actions";

class Header extends React.Component {
  state = {
    showCurencies: false,
    
  };

  showCurencies = () => {
    this.setState({ showCurencies: !this.state.showCurencies });
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

  render() {
    
    return (
      <div className="header">
        <div className="categories">
          <p
            className={`category ${
              this.props.activeCategory === "clothes" ? "category-active" : ""
            }`}
            onClick={() => {
              this.props.setActiveCategory("clothes");
              this.props.setProductDetailId("");
              this.props.toggleMiniCart(false);
              this.props.toggleShowCart(false);
            }}
          >
            clothes
          </p>
          <p
            className={`category ${
              this.props.activeCategory === "tech" ? "category-active" : ""
            }`}
            onClick={() => {
              this.props.setActiveCategory("tech");
              this.props.setProductDetailId("");
              this.props.toggleMiniCart(false);
              this.props.toggleShowCart(false);
            }}
          >
            tech
          </p>
        </div>
        <div className="logo">
          <img className="logo__back" src={logo1} alt="" />
          <img className="logo__front" src={logo2} alt="" />
        </div>
        <div className="curAndCart">
          <div className="currency" onClick={this.showCurencies}>
            <p>{this.setCurrencySymbol(this.props.currency)}</p>
            <IoIosArrowDown
              className={
                "arrow" + (!this.state.showCurencies ? "" : " arrow-up")
              }
            />
            <ul
              className={
                "curencies " +
                (this.state.showCurencies ? "" : " curencies--hide")
              }
            >
              <li onClick={() => this.props.setCurrency("USD")}>$ USD</li>
              <li onClick={() => this.props.setCurrency("GBP")}>£ GBP</li>
              <li onClick={() => this.props.setCurrency("AUD")}>$ AUD</li>
              <li onClick={() => this.props.setCurrency("JPY")}>¥ JPY</li>
              <li onClick={() => this.props.setCurrency("RUB")}>ƒ RUB</li>
            </ul>
          </div>
          <div className="miniCart">
            <div className="miniCart__logo" onClick={()=>{this.props.toggleMiniCart(!this.props.showMiniCart)}}>
              <FiShoppingCart className="miniCart-icon" />
              <p className="miniCart__items-qty">{this.props.cartProducts.length}</p>
            </div>
            <div
              className={
                "miniCart-wrapper " +
                (this.props.showMiniCart ? "" : "miniCart__wrapper--hidden")
              }
            >
              <div
                className="miniCart__background-overlay"
                onClick={()=>this.props.toggleMiniCart(false)}
              ></div>
              <MiniCart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCategory: state.allProducts.activeCategory,
    currency: state.allProducts.currency,
    cartProducts:state.cart.cartProducts,
    showMiniCart: state.cart.showMiniCart
  };
};

const mapDispatchToProps = () => {
  return {
    setActiveCategory,
    setCurrency,
    setProductDetailId,
    toggleMiniCart,
    toggleShowCart

    
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Header);
