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
import getSymbolFromCurrency from 'currency-symbol-map';

class Header extends React.Component {
  state = {
    showCurencies: false,
    
  };
  calcTotalQuantity = () => {
    let quantity = 0;
this.props.cartProducts.forEach(product=>{quantity = quantity+product.quantity; return product})
return quantity;
  }
  showCurencies = () => {
    this.setState({ showCurencies: !this.state.showCurencies });
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
              this.setState({ showCurencies:false})
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
          <div className="currency" onClick={()=>{this.showCurencies();this.props.toggleMiniCart(false);}}>
            
            <p>{getSymbolFromCurrency(this.props.currency)}</p>
            <IoIosArrowDown
              className={
                "arrow" + (!this.state.showCurencies ? "" : " arrow-up")
              }
            />
            <div
              className={
                "curencies " +
                (this.state.showCurencies ? "" : " curencies--hide")
              }
            >
              {this.props.allCurrencies.map(cur=>
                <div onClick={() => this.props.setCurrency(cur)} key={cur}>{getSymbolFromCurrency(cur)} {cur}</div>
                )}

            </div>
            <div
                className={"currencies__background-overlay"+
                (this.state.showCurencies ? "" : " currencies__background-overlay--hidden")}
                 onClick={()=>{this.setState({ showCurencies:false})}}
              ></div>
          </div>
          <div className="miniCart">
            <div className="miniCart__logo" onClick={()=>{this.props.toggleMiniCart(!this.props.showMiniCart); this.setState({ showCurencies:false})}}>
              <FiShoppingCart className="miniCart-icon" />
              <p className="miniCart__items-qty">{this.calcTotalQuantity()}</p>
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
    showMiniCart: state.cart.showMiniCart,
    allCurrencies:state.allProducts.allCurrencies
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
