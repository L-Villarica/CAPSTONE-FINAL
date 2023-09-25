import React, { useState, useEffect } from "react";
import Cart from "./Cart.jsx";

const BASE_URL = "https://fakestoreapi.com/products";

export default function GetSingleProduct({ productId, onBackClick, addToCart }) {
  const [product, setProduct] = useState(null);

  async function fetchProductDetails() {
    try {
      const response = await fetch(`${BASE_URL}/${productId}`);
      const result = await response.json();
      setProduct(result);
    } catch (err) {
      console.error("Error fetching product", err);
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  },);

  const handleBackClick = () => {
    onBackClick();
  };


  return (
    <>
      {product && (
        <div className="single-product-container">
          <p>{product.title}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <p>{product.description}</p>
          <img src={product.image} className="single-product-container--image" />
          <button onClick={handleBackClick}>Back</button>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      )}
    </>
  );
}
