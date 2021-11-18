import React from "react";
import { Markup } from "interweave";
import {
  addProductToCart,
  increaseProductQuantity,
} from "../../../redux/actions/actions";
import "./productDetails.css";
import { connect } from "react-redux";

class ProductDetails extends React.Component {
  state = {
    zoomedImage: this.props.product.gallery[0],
    selectedAttributes:[]
  };

  setZoomedImage = (imageSrc) => {
    this.setState({ zoomedImage: imageSrc });
  };

  selectAttributes = (attr,value) => {
    let productAttrs = [...this.state.selectedAttributes]; 
    productAttrs = productAttrs.filter(elem=>elem.attributeName!==attr.name);
    productAttrs.push({attributeName:attr.name, value:value.value})
    this.setState({selectedAttributes:productAttrs});
    
    
  }


  onAddToCart = (product) => {
    if(this.state.selectedAttributes.length!==this.props.product.attributes.length){
      alert("please select all attributes")
    }
    else if (
      this.props.cartProducts.filter(
        (product) => product.id === this.props.product.id
      ).length > 0
    ) {
      // this.props.increaseProductQuantity(product, this.props.cartProducts);
      alert("wthis product is already in cart")
    } else {
      this.props.addProductToCart(product, this.props.cartProducts,this.state.selectedAttributes);
    }
    
  };

  render() {
    
    return (
      <div className="productDetails" onClick={(e) => e.stopPropagation()}>
        <div className="productDetails__gallery">
          {this.props.product.gallery.map((imgSrc) => (
            <img
              className={
                "gallery__photo " +
                (imgSrc === this.state.zoomedImage
                  ? "gallery__photo--hilighted"
                  : "")
              }
              src={imgSrc}
              alt=""
              onClick={() => this.setZoomedImage(imgSrc)}
              key={imgSrc}
            />
          ))}
        </div>
        <div className="productDetails__photo--zoomed">
          {<img src={this.state.zoomedImage} alt="" />}
        </div>
        <div className="productDetails__properties">
          <h4 className="productDetails__title">{this.props.product.name}</h4>
          {this.props.product.attributes.map((attr) => (
            <div className="productDetails__attribute" key={attr.id}>
              <h5 className="attribute__heading">{attr.name}:</h5>
              <ul className="attribute__options">
                {attr.items.map((item) => (
                  <li
                    className={"attribute__option " + (this.state.selectedAttributes.filter(elem=>elem.attributeName===attr.name && elem.value ===item.value).length>0 ? "attribute__option--selected" : "" )}
                    onClick={()=>{this.selectAttributes(attr,item)}}
                    key={item.id}
                    style={{
                      background:
                        attr.type === "swatch" ? item.value : "transparant",
                    }}
                  >
                    {attr.type === "swatch" ? "" : item.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="productDetails__price">
            <h6>price:</h6>
            <p>{this.props.price}</p>
          </div>
          <button
            className="productDetails__cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              this.props.product.inStock ? this.onAddToCart(this.props.product) : alert("this product is not in stock")
            }}
            // disabled={!this.props.product.inStock}
          >
            ADD TO CART
          </button>
          <div className="productDetails__description">
            <Markup content={this.props.product.description} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.cartProducts,
  };
};

const mapDispatchToProps = () => {
  return {
    addProductToCart,
    increaseProductQuantity,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductDetails);
