import React, { useState, useEffect } from "react";
import GetSingleProduct from "./GetSingleProduct";

const BASE_URL = "https://fakestoreapi.com/products";

export default function GetAllProducts({addToCart, products, setProducts}) {
  // const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [sortCriteria, setSortCriteria] = useState("name"); // Default sorting by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting in ascending order

  // const addToCart = (product) => {
  //   console.log("Adding to cart:", product);
  //   // Check if the product ID is already in the cart
  //   if (!cartItems.some((item) => item.id === product.id)) {
  //     // If not, add it to the cart
  //     setCartItems([...cartItems, product]);
  //     console.log("Cart updated:", cartItems);
  //   }
  // };

  // const removeFromCart = (itemId) => {
  //   const updatedCart = cartItems.filter((item) => item.id !== itemId);
  //   setCartItems(updatedCart);
  // };

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
  },[]);

  const handleSeeDetails = (productId) => {
    setSelectedProductId(productId);
  };

  const handleBackClick = () => {
    FetchProducts();
    setSelectedProductId(null);
  };

  // Sorting function
  const sortedProducts = [...products].sort((a, b) => {
    const sortOrderMultiplier = sortOrder === "asc" ? 1 : -1;

    if (sortCriteria === "name") {
      return sortOrderMultiplier * a.title.localeCompare(b.title);
    } else if (sortCriteria === "price") {
      return sortOrderMultiplier * (a.price - b.price);
    } else if (sortCriteria === "rating") {
      return sortOrderMultiplier * (a.rating.rate - b.rating.rate)
    }
    return 0;
  });

  return (
    <>
      <div>
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
      </div>
      {selectedProductId ? (
        <GetSingleProduct addToCart={addToCart} productId={selectedProductId} onBackClick={handleBackClick} />
      ) : (
        <div className="all-products-container">
          {sortedProducts.map((product) => (
            <div key={product.id}>
              <p>{product.title}</p>
              <p>${product.price}</p>
              <p>{product.rating.rate}</p>
              <p>{product.rating.count}</p>
              <img src={product.image} className="all-products-container--image" />
              <button onClick={() => handleSeeDetails(product.id)}>See Details</button>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        
      )}
    </>
  );
}
