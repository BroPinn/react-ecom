import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { ShopContaxt } from "../contexts/ShopContext";
import Title from "../components/Title.jsx";
import PayPalComponent from "../components/Paypal.jsx";
import { paypal } from "../assets/index";
import { visa } from "../assets/index";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContaxt);
  const [cartTotal, setCartTotal] = useState(0);

  const handleTotalChange = (total) => {
    setCartTotal(total);
  };

  const handleError = (err) => {
    toast.warning("An error occurred during the transaction.");
  };

  const handleApprove = (details) => {
    toast.success(`Transaction completed by ${details.payer.name.given_name}`);
  };

  return (
    <div className="bg0 p-t-75 p-b-90">
      <div className="container">
        <div className="row">
          {/* Delivery Information */}
          <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">

            <div className="card p-4 shadow-sm">
              <div className="fw-bold">
                <Title text1="Delivery" text2="Information" />
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Email address" />
                </div>
                <div className="mb-3">
                  <label>Street Address</label>
                  <input type="text" className="form-control" placeholder="Street" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>City</label>
                    <input type="text" className="form-control" placeholder="City" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>State</label>
                    <input type="text" className="form-control" placeholder="State" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Zipcode</label>
                    <input type="text" className="form-control" placeholder="Zipcode" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Country</label>
                    <input type="text" className="form-control" placeholder="Country" />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input type="text" className="form-control" placeholder="Phone" />
                </div>
              </form>
            </div>
          </div>

          {/* Cart Total and Payment */}
          <div className="col-lg-10 col-xl-5 mx-auto mb-5">
            {/* Cart Total Component */}
            <CartTotal onTotalChange={handleTotalChange} className="" />

            {/* Payment Method Card */}
            <div className="card shadow-sm p-4">
              <h4 className="mb-3 text-center">Payment Method</h4>

              {/* Payment Options */}
              <div className="d-flex flex-column gap-3">
                {/* PayPal Option */}
                <div
                  className={`border rounded p-3 d-flex align-items-center justify-content-between ${method === "paypal" ? "bg-light border-primary shadow-sm" : ""
                    }`}
                  onClick={() => setMethod("paypal")}
                >
                  <label className="form-check-label d-flex align-items-center">
                    <input
                      type="radio"
                      name="payment"
                      checked={method === "paypal"}
                      onChange={() => setMethod("paypal")}
                      className="form-check-input me-2"
                    />
                    <img
                      src={paypal}
                      alt="PayPal Logo"
                      className="img-fluid"
                      style={{ height: "30px" }}
                    />
                  </label>
                </div>

                {/* Visa Option */}
                <div
                  className={`border rounded p-3 d-flex align-items-center justify-content-between ${method === "visa" ? "bg-light border-primary shadow-sm" : ""
                    }`}
                  onClick={() => setMethod("visa")}
                >
                  <label className="form-check-label d-flex align-items-center">
                    <input
                      type="radio"
                      name="payment"
                      checked={method === "visa"}
                      onChange={() => setMethod("visa")}
                      className="form-check-input me-2"
                    />
                    <img
                      src={visa}
                      alt="Visa Logo"
                      className="img-fluid"
                      style={{ height: "30px" }}
                    />
                  </label>
                </div>

                {/* Cash on Delivery Option */}
                <div
                  className={`border rounded p-3 d-flex align-items-center justify-content-between ${method === "cod" ? "bg-light border-primary shadow-sm" : ""
                    }`}
                  onClick={() => setMethod("cod")}
                >
                  <label className="form-check-label d-flex align-items-center">
                    <input
                      type="radio"
                      name="payment"
                      checked={method === "cod"}
                      onChange={() => setMethod("cod")}
                      className="form-check-input me-2"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Place Order or PayPal Button */}
              <div className="mt-4">
                {method === "paypal" ? (
                  <PayPalComponent
                    total={cartTotal}
                    onApprove={handleApprove}
                    onError={handleError}
                  />
                ) : (
                  <button
                    className="btn btn-dark w-100"
                    onClick={() => navigate("/order")}
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
