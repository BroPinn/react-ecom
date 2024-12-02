import React, { useContext, useEffect, useState } from 'react';
import { ShopContaxt } from "../contexts/ShopContext";
import {CartContext} from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { logo } from "../assets/index";


const Header = ({ toggleCart }) => {
  const { setShowSearch, navigate } = useContext(ShopContaxt);
  const { getCartCount } = useContext(CartContext);
  const handleSearchClick = () => {
    setShowSearch(true);
    navigate("/shop");
  };

  const closeSearch = () => {
    setSearchVisible(false); // Hide the search input
  };
  return (
    <header id="header">
      <div id="header-wrap">
        <nav className="secondary-nav border-bottom">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-4 header-contact">
                <p>
                  Let's talk! <strong>+57 444 11 00 35</strong>
                </p>
              </div>
              <div className="col-md-4 shipping-purchase text-center">
                <p>Free shipping on a purchase value of $200</p>
              </div>
              <div className="wrap-icon-header flex-w flex-r-m">
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                <i className="icon icon-search" onClick={handleSearchClick}></i>
              </div>
              <Link to="/feature">
                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                  data-notify={getCartCount()}
                  onClick={toggleCart}
                >
                  <i class="icon icon-shopping-cart"></i>
                  
                </div>
              </Link>

              <a
                href="#"
                className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                data-notify="0"
              >
                <i className="icon icon-heart"></i>
              </a>
            </div>
            </div>
          </div>
        </nav>

        <nav className="primary-nav padding-small">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-lg-2 col-md-2">
                <div className="main-logo">
                  <Link to="/">
                  <img src={logo} alt="logo" />{" "}
                  </Link>
                </div>
              </div>

              <div className="col-lg-10 col-md-10">
                <div className="navbar">
                  <div id="main-nav" className="stellarnav d-flex justify-content-end right">
                    <ul className="menu-list">
                      <li className="menu-item">
                        <Link to="/" className="item-anchor active d-flex align-item-center" data-effect="Home">
                          Home
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/shop" className="item-anchor" data-effect="Shop">
                          Shop
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/blog" className="item-anchor" data-effect="Blog">
                          Blog
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/contact" className="item-anchor" data-effect="Contact">
                          Contact
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/about" className="item-anchor" data-effect="About Us">
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header