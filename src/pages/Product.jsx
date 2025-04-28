import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContaxt } from "../contexts/ShopContext";
import { CartContext } from "../contexts/CartContext";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { currency } = useContext(ShopContaxt);
  const { addToCart } = useContext(CartContext); 
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data
  const fetchProductData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      setProductData(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  return (
    <section className="sec-product-detail bg0 p-t-90 p-b-60 mt-30">
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
                        alt={productData.product_name}
                        className="img-fluid"
                      />
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
                {productData.product_name}
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
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bor10 m-t-50 p-t-43 p-b-40">
          <div className="tab-content p-t-43">
            <div className="tab-pane fade show active" id="description" role="tabpanel">
              <div className="p-lr-15-md">
                <p className="stext-102 cl6">{productData.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProduct category={productData.categories?.name} />
      </div>
    </section>
  );
};

export default Product;