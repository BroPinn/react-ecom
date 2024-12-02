import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContaxt } from "../contexts/ShopContext";
import {CartContext }from "../contexts/CartContext";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { currency } = useContext(ShopContaxt);
  const { addToCart } = useContext(CartContext); 
  const [productData, setProductData] = useState(null);

  // Fetch product data
  const fetchProductData = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
      fetchProductData();
  }, [productId]); 

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="sec-product-detail bg0 p-t-90 p-b-60 mt-30 ">
      <div className="container">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6 col-lg-7 p-b-30">
            <div className="p-l-25 p-r-30 p-lr-0-lg">
              <div className="wrap-slick3 flex-sb flex-w">
                <div className="slick3 gallery-lb">
                  <div className="item-slick3">
                    <div className="wrap-pic-w pos-relative">
                      <img
                        src={productData.image}
                        alt={productData.title}
                        className="img-fluid"
                      />
                      <a
                        className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                        href={productData.image}
                      >
                        <i className="fa fa-expand"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-6 col-lg-5 p-b-30">
            <div className="p-r-50 p-t-5 p-lr-0-lg">
              <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                {productData.title}
              </h4>

              <span className="mtext-106 cl2">
                {currency}
                {productData.price}
              </span>

              <p className="stext-102 cl3 p-t-23">
                {productData.description}
              </p>

              {/* Add to Cart */}
              <div className="p-t-33">
                <button
                  onClick={() => addToCart(productData)}
                  className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                >
                  Add to cart
                </button>
              </div>

              {/* Social Share */}
              <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                <a
                  href="#"
                  className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 tooltip100"
                  data-tooltip="Facebook"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 tooltip100"
                  data-tooltip="Twitter"
                >
                  <i className="fa fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bor10 m-t-50 p-t-43 p-b-40">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item p-b-10">
              <a className="nav-link active" data-toggle="tab" href="#description" role="tab">
                Description
              </a>
            </li>
            <li className="nav-item p-b-10">
              <a className="nav-link" data-toggle="tab" href="#reviews" role="tab">
                Reviews ({productData.rating.count})
              </a>
            </li>
          </ul>

          <div className="tab-content p-t-43">
            <div className="tab-pane fade show active" id="description" role="tabpanel">
              <div className="p-lr-15-md">
                <p className="stext-102 cl6">{productData.description}</p>
              </div>
            </div>
            <div className="tab-pane fade" id="reviews" role="tabpanel">
              <p className="stext-102 cl6">No reviews yet.</p>
            </div>
          </div>
          <RelatedProduct category={productData.category} />
        </div>
      </div>
    </section>
  );
};

export default Product;