/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CheckoutPage from "./Checkout";

const BASE_URL = "https://fakestoreapi.com/carts/2";

export default function Cart({ removeFromCart, setCartItems, cartItems }) {
  const [totalPrice, setTotalPrice] = useState(0);

  async function FetchCart() {
    try {
      if (cartItems.length === 0) {
        const response = await fetch(`${BASE_URL}`);
        const result = await response.json();
        fetchAdditionalProductInfo(result.products);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const fetchAdditionalProductInfo = async (products) => {
    try {
      const promises = products.map(async (item) => {
        const response = await fetch(
          `https://fakestoreapi.com/products/${item.productId}`
        );
        const productInfo = await response.json();
        productInfo.count = item.quantity;
        return productInfo;
      });

      const productDetails = await Promise.all(promises);
      setCartItems(productDetails);
    } catch (error) {
      console.error("Error fetching additional product info:", error);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        item.count = newQuantity;
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  useEffect(() => {
    // Calculate the total price whenever cartItems change
    if (cartItems.length > 0) {
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice += item.price * item.count;
      });
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  useEffect(() => {
    FetchCart();
  }, []);

  return cartItems.length === 0 ? (
    <h2 className="cart-total">Your cart is currently empty.</h2>
  ) : (
    <div className="cart">
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="cart-container-card">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-wrapper">
              <div className="cart-wrapper--image">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-container--image"
                />
              </div>
              <div className="cart-wrapper--text">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-quantity">Quantity: {item.count}</p>

                <div className="cart-buttons-wrapper">
                  <button
                    onClick={() => updateQuantity(item.id, item.count + 1)}
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.count - 1)}
                  >
                    -
                  </button>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove Item
                  </button>
                </div>
                <p>${item.price}</p>
                <p>{item.date}</p>
              </div>
            </div>
          ))}

          {totalPrice !== null && (
            <p className="total">Total Price: ${totalPrice.toFixed(2)}</p>
          )}
        </div>
      </div>
      <CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
}
