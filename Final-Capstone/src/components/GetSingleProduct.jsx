/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import starFill from "../assets/star-fill.svg";

const BASE_URL = "https://fakestoreapi.com/products";

export default function GetSingleProduct({
  productId,
  onBackClick,
  addToCart,
}) {
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
  });

  const handleBackClick = () => {
    onBackClick();
  };

  return (
    <>
      {product && (
        <div className="single-product-container">
          <div className="single-product-container-card">
            <p className="single-product-title">{product.title}</p>
            <p className="single-product-price">${product.price}</p>
            <p className="single-product-category">Category:{product.category}</p>
            <p className="single-product-description">{product.description}</p>
            <img
              src={product.image}
              className="single-product-container--image"
            />
            <p className="product-rating">
              <span className="product-rating-rate">{product.rating.rate}</span>
              <span className="product-rating-star">
                <img src={starFill} />
              </span>
              <span className="product-rating-count">
                {product.rating.count}
              </span>
            </p>
            <div className="single-product-buttons-wrapper">
            <button onClick={handleBackClick}>Back</button>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
