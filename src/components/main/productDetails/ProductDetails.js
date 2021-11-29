import React from "react";
import { Markup } from "interweave";
import {
  addProductToCart,
  increaseProductQuantity,
} from "../../../redux/actions/actions";
import "./productDetails.css";
import { connect } from "react-redux";
import { gql } from "@apollo/client";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

class ProductDetails extends React.Component {
  state = {
    zoomedImage: "",
    selectedAttributes: [],
    activeProduct: false,
    indexOfProductToBeUpdated: 0,
    showImageArrows: false,
  };

  componentDidMount() {
    this.props.client &&
      this.props.client
        .query({
          query: gql`query GetSingleProduct {
            product(id:"${this.props.productId}"){
               id
                              name
                              inStock
                              gallery
                              description
                              category
                              attributes{
                                    id
                            name
                            type
                            items{
                                displayValue
                            value
                            id
                            }
                              }
                              prices{
                                 currency
                                    amount
                              }
                              brand
            }
            }`,
        })
        .then((result) => {
          this.setState({ activeProduct: result.data.product });
          this.setState({ zoomedImage: result.data.product.gallery[0] });
        });
  }

  setZoomedImage = (imageSrc) => {
    this.setState({ zoomedImage: imageSrc });
  };

  selectAttributes = (attr, value) => {
    let productAttrs = [...this.state.selectedAttributes];
    productAttrs = productAttrs.filter((elem) => elem.name !== attr.name);
    productAttrs.push({ name: attr.name, value: value.value });
    this.setState({ selectedAttributes: productAttrs });
  };

  handleCartUpdate = () => {
    let result = true;
    for (let i = 0; i < this.props.cartProducts.length; i++) {
      if (
        this.props.cartProducts[i].id === this.state.activeProduct.id &&
        JSON.stringify(this.props.cartProducts[i].selectedAttributes)
          .split("")
          .sort()
          .join("") ===
          JSON.stringify(this.state.selectedAttributes)
            .split("")
            .sort()
            .join("")
      ) {
        // if same product exists with same attributes
        this.setState({ indexOfProductToBeUpdated: i });
        result = true;
        break;
      } else {
        result = false;
      }
    }
    return result;
  };

  onAddToCart = (product) => {
    if (
      this.state.selectedAttributes.length !==
      this.state.activeProduct.attributes.length
    ) {
      alert("please select all attributes");
    } else if (
      // if this product exists in cart
      this.props.cartProducts.filter(
        (product) => product.id === this.state.activeProduct.id
      ).length > 0
    ) {
      if (
        this.props.cartProducts.filter(
          (product) =>
            product.id === this.state.activeProduct.id &&
            JSON.stringify(product.selectedAttributes)
              .split("")
              .sort()
              .join("") ===
              JSON.stringify(this.state.selectedAttributes)
                .split("")
                .sort()
                .join("")
        ).length > 0
      ) {
        this.props.increaseProductQuantity(
          this.props.cartProducts,
          this.state.activeProduct,
          this.state.selectedAttributes
        );
        console.log(this.state.indexOfProductToBeUpdated);
      }
      // if even one attr doesnt match
      else {
        this.props.addProductToCart(
          product,
          this.props.cartProducts,
          this.state.selectedAttributes
        );
        console.log("add to card");
      }
    } else {
      // if this product doesnt exist in cart
      this.props.addProductToCart(
        product,
        this.props.cartProducts,
        this.state.selectedAttributes
      );
    }
  };

  zoomNextImage = () => {
    let galleryLength = this.state.activeProduct.gallery.length;
    let currentZoomdImageIndex = this.state.activeProduct.gallery.indexOf(
      this.state.zoomedImage
    );
    let photoGallery = this.state.activeProduct.gallery;
    console.log(currentZoomdImageIndex);
    if (currentZoomdImageIndex < galleryLength - 1) {
      this.setState({ zoomedImage: photoGallery[currentZoomdImageIndex + 1] });
    } else {
      currentZoomdImageIndex = -1;
      this.setState({ zoomedImage: photoGallery[currentZoomdImageIndex + 1] });
    }
  };

  zoomPrevImage = () => {
    let galleryLength = this.state.activeProduct.gallery.length;
    let currentZoomdImageIndex = this.state.activeProduct.gallery.indexOf(
      this.state.zoomedImage
    );
    let photoGallery = this.state.activeProduct.gallery;
    console.log(currentZoomdImageIndex);
    if (currentZoomdImageIndex > 0) {
      this.setState({ zoomedImage: photoGallery[currentZoomdImageIndex - 1] });
    } else {
      currentZoomdImageIndex = galleryLength;
      this.setState({ zoomedImage: photoGallery[currentZoomdImageIndex - 1] });
    }
  };

  render() {
    return (
      <>
        {this.state.activeProduct && (
          <div className="productDetails" onClick={(e) => e.stopPropagation()}>
            <div className="productDetails__gallery">
              {this.state.activeProduct.gallery.map((imgSrc) => (
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
            <div
              className="productDetails__photo--zoomed"
              onMouseEnter={() => this.setState({ showImageArrows: true })}
              onMouseLeave={() => this.setState({ showImageArrows: false })}
            >
              {this.state.showImageArrows && (
                <MdOutlineArrowBackIosNew
                  className="arrow-back"
                  onClick={() => this.zoomPrevImage()}
                />
              )}
              {<img src={this.state.zoomedImage} alt="" />}
              {this.state.showImageArrows && (
                <MdOutlineArrowForwardIos
                  className="arrow-forward"
                  onClick={() => this.zoomNextImage()}
                />
              )}
            </div>
            <div className="productDetails__properties">
              <h4 className="productDetails__title">
                {this.state.activeProduct.name}
              </h4>
              {this.state.activeProduct.attributes.map((attr) => (
                <div className="productDetails__attribute" key={attr.id}>
                  <h5 className="attribute__heading">{attr.name}:</h5>
                  <div className="attribute__options">
                    {attr.items.map((item) => (
                      <div
                        className={
                          "attribute__option " +
                          (this.state.selectedAttributes.filter(
                            (elem) =>
                              elem.name === attr.name &&
                              elem.value === item.value
                          ).length > 0
                            ? attr.type === "swatch"
                              ? "swatch-attribute--selected"
                              : "attribute__option--selected"
                            : "")
                        }
                        onClick={() => {
                          this.selectAttributes(attr, item);
                        }}
                        key={item.id}
                        style={{
                          background:
                            attr.type === "swatch" ? item.value : "transparant",
                        }}
                      >
                        {attr.type === "swatch" ? "" : item.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="productDetails__price">
                <h6>price:</h6>
                <p>
                  {getSymbolFromCurrency(this.props.currency)}{" "}
                  {
                    this.state.activeProduct.prices.filter(
                      (price) => price.currency === this.props.currency
                    )[0].amount
                  }{" "}
                </p>
              </div>
              <button
                className="productDetails__cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  this.state.activeProduct.inStock
                    ? this.onAddToCart(this.state.activeProduct)
                    : alert("this product is not in stock");
                }}
                // disabled={!this.state.activeProduct.inStock}
              >
                ADD TO CART
              </button>
              <div className="productDetails__description">
                <Markup content={this.state.activeProduct.description} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.cartProducts,
    client: state.allProducts.client,
    currency: state.allProducts.currency,
  };
};

const mapDispatchToProps = () => {
  return {
    addProductToCart,
    increaseProductQuantity,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductDetails);
