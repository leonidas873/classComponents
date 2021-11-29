import React from "react";
import ProductDetails from "./productDetails/ProductDetails";
import { connect } from "react-redux";
import { setProductDetailId, addProductToCart } from "../../redux/actions/actions";
import { BsCart2 } from "react-icons/bs";
import getSymbolFromCurrency from "currency-symbol-map";
import "./main.css";

class Catalog extends React.Component {

state={

  showGrayCart:false

}

  getPrice = (prices) => {
    let amount = prices.filter(
      (price) => price.currency === this.props.currency
    )[0].amount;
    return amount;
  };

onCartIconClick = (product) => {
  if(this.props.cartProducts.filter(item=>item.id===product.id).length===0){
  let selectedAttrs = product.attributes.map(attr=>({name:attr.name, value:attr.items[0].value}))
  this.props.addProductToCart(product,this.props.cartProducts,selectedAttrs)
}
  
}

  render() {
    return (
      <div className="catalog">
        {this.props.products.map((product) => (
          <div
            className={
              "catalog__product " + (!product.inStock ? "not-inStock" : "")
            }
            key={product.id}
            onClick={() => {
              this.props.setProductDetailId(product.id);
            }}
            onMouseEnter={()=>{this.setState({showGrayCart:product.id})}}
            onMouseLeave={()=>{this.setState({showGrayCart:false})}}
          >
            <div className="product__overlay">OUT OF STOCK</div>
            <div className="product__img">
              <img src={product.gallery[0]} alt="" />
              <div
                className={
                  "cart__logo-wrapper " +
                  (this.props.cartProducts.filter(
                    (elem) => elem.id === product.id
                  ).length > 0
                    ? ""
                    : "cart__logo-wrapper--hidden") +

                    ((this.state.showGrayCart === product.id && this.props.cartProducts.filter(
                      (elem) => elem.id === product.id
                    ).length <= 0 && product.inStock) ? " cart__logo-wrapper--gray" : "")
                }

                onClick={(e)=>{e.stopPropagation();this.onCartIconClick(product)}}
              >
                <BsCart2 className="cart__logo" />
              </div>
            </div>
            <h4 className="product__title">{product.name} <span className="product__brand">{product.brand}</span></h4>
            <p className="product__price">
              {getSymbolFromCurrency(this.props.currency)}{" "}
              {this.getPrice(product.prices)}
            </p>
            {this.props.productDetailId === product.id && (
              <ProductDetails
                productId={product.id}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productDetailId: state.allProducts.productDetailId,
    cartProducts: state.cart.cartProducts,
  };
};

const mapDispatchToProps = () => {
  return {
    setProductDetailId,
    addProductToCart
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Catalog);
