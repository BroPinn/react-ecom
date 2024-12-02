import React, { useEffect, useState, useContext } from "react";
import ProductItem from "../components/ProductItem";
import { ShopContaxt } from "../contexts/ShopContext";

const Shop = () => {
  // Context values
  const { products, search, showSearch } = useContext(ShopContaxt);

  // Local state for filtering and sorting
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [searchText, setSearchText] = useState("");

  // Toggle category filter
  const toggleCategory = (e) => {
    const value = e.target.value;

    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Apply filters and sorting logic
  const applyFiltersAndSort = () => {
    let productCopy = [...products];

    // Apply search filter
    if (showSearch && (search || searchText)) {
      productCopy = productCopy.filter((item) =>
        item.title?.toLowerCase().includes((search || searchText).toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.includes(item.category));
    }

    // Apply sorting logic
    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(productCopy);
  };

  // Initialize product list
  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  // Reapply filters and sorting when values change
  useEffect(() => {
    applyFiltersAndSort();
  }, [category, search, showSearch, sortType, searchText]);

  return (
    <div>
      <section className="bg0 p-t-30">
  <div className="container">
    {/* Section Title */}
    <div className="p-b-10">
      <h3 className="ltext-103 cl5 text-center">Product Overview</h3>
    </div>

    {/* Filter and Sorting Section */}
    <div className="d-flex justify-content-between align-items-center p-b-52 flex-wrap">
      {/* Filter Buttons */}
      <div className="d-flex flex-wrap mb-3">
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${category.length === 0 ? "how-active1" : ""}`}
          onClick={() => setCategory([])}
        >
          All Products
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${category.includes("women's clothing") ? "how-active1" : ""}`}
          value="women's clothing"
          onClick={toggleCategory}
        >
          Women
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${category.includes("men's clothing") ? "how-active1" : ""}`}
          value="men's clothing"
          onClick={toggleCategory}
        >
          Men
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${category.includes("electronics") ? "how-active1" : ""}`}
          value="electronics"
          onClick={toggleCategory}
        >
          Electronics
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${category.includes("jewelery") ? "how-active1" : ""}`}
          value="jewelery"
          onClick={toggleCategory}
        >
          Jewelry
        </button>
      </div>

      {/* Sorting Dropdown */}
      <div className="flex-w flex-c-m m-tb-10">
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border border-secondary text-sm stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04"
        >
          <option value="relavent">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>
    </div>

    {/* Product Listing */}
    <div className="row isotope-grid">
      {filterProduct.map((item, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item">
          <ProductItem
            name={item.title}
            id={item.id}
            price={item.price}
            image={item.image}
          />
        </div>
      ))}
    </div>

    {/* Load More Button (Optional) */}
    {/* <div className="flex-c-m flex-w w-full p-t-45">
      <a href="#" className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
        Load More
      </a>
    </div> */}
  </div>
</section>

    </div>
  );
};

export default Shop;
