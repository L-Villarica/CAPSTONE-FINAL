/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import GetSingleProduct from "./GetSingleProduct";
import starFill from "../assets/star-fill.svg";

const BASE_URL = "https://fakestoreapi.com/products";

export default function GetAllProducts({
  addToCart,
  products,
  setProducts,
  filterKey, // Remove the filterKey prop
}) {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("name"); // Default sorting by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting in ascending order
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  async function FetchProducts() {
    try {
      const response = await fetch(`${BASE_URL}`);
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    FetchProducts();
  }, []);

  const handleSeeDetails = (productId) => {
    setSelectedProductId(productId);
  };

  const handleBackClick = () => {
    FetchProducts();
    setSelectedProductId(null);
  };

  useEffect(() => {
    if (filterKey) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(filterKey.toLowerCase())
      );
      setFilteredList(filtered);
    } else {
      setFilteredList(products);
    }
    console.log("Search Filter", filterKey);
  }, [filterKey, products]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter products by category
  const filteredByCategory = selectedCategory === "all"
    ? filteredList
    : filteredList.filter((product) => product.category === selectedCategory);

  return (
    <>
      <div className="filter">
        <label htmlFor="sortCriteria">Sort by:</label>
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <div className="category-buttons">
          <button
            onClick={() => handleCategorySelect("all")}
            className={selectedCategory === "all" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={() => handleCategorySelect("electronics")}
            className={selectedCategory === "electronics" ? "active" : ""}
          >
            Electronics
          </button>
          <button
            onClick={() => handleCategorySelect("men's clothing")}
            className={selectedCategory === "men's clothing" ? "active" : ""}
          >
            Mens Clothing
          </button>
          <button
            onClick={() => handleCategorySelect("women's clothing")}
            className={selectedCategory === "women's clothing" ? "active" : ""}
          >
            Womens Clothing
          </button>
          <button
            onClick={() => handleCategorySelect("jewelery")}
            className={selectedCategory === "jewelery" ? "active" : ""}
          >
            Jewelery
          </button>
        </div>
      </div>
      {selectedProductId ? (
        <GetSingleProduct
          addToCart={addToCart}
          productId={selectedProductId}
          onBackClick={handleBackClick}
        />
      ) : (
        <div className="all-products-container">
          {filteredByCategory
            .sort((a, b) => {
              const sortOrderMultiplier = sortOrder === "asc" ? 1 : -1;

              if (sortCriteria === "name") {
                return sortOrderMultiplier * a.title.localeCompare(b.title);
              } else if (sortCriteria === "price") {
                return sortOrderMultiplier * (a.price - b.price);
              } else if (sortCriteria === "rating") {
                return sortOrderMultiplier * (a.rating.rate - b.rating.rate);
              }
              return 0;
            })
            .map((product) => (
              <div key={product.id} className="all-products-container-card">
                <div className="all-products-container-card-wrapper">
                  <p className="product-title">{product.title}</p>
                  <p className="product-price">${product.price}</p>

                  <img
                    src={product.image}
                    className="all-products-container--image"
                    alt={product.title}
                  />
                  <p className="product-rating">
                    <span className="product-rating-rate">
                      {product.rating.rate}
                    </span>
                    <span className="product-rating-star">
                      <img src={starFill} alt="Star" />
                    </span>
                    <span className="product-rating-count">
                      {product.rating.count}
                    </span>
                  </p>
                  <div className="product-buttons-wrapper">
                    <button
                      className="product-details"
                      onClick={() => handleSeeDetails(product.id)}
                    >
                      See Details
                    </button>
                    <button
                      className="product-add-to-cart"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
