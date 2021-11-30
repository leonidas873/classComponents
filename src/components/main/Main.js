import React from "react";
import Catalog from "./Catalog";
import { connect } from "react-redux";
import Cart from "./cart/Cart";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <h2 className="main__category-heading">
          {!this.props.showCart ? this.props.activeCategory : "CART"}
        </h2>
        {!this.props.showCart ? (
          <Catalog
            products={
              this.props.activeCategory === "clothes"
                ? this.props.clothes
                : this.props.tech
            }
            activeCategory={this.props.activeCategory}
            currency={this.props.currency}
          />
        ) : (
          <Cart />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tech: state.allProducts.tech,
    clothes: state.allProducts.clothes,
    activeCategory: state.allProducts.activeCategory,
    currency: state.allProducts.currency,
    showCart: state.cart.showCart,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps())(Main);
