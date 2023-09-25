import React, { useState, useEffect } from "react";

const BASE_URL = "https://fakestoreapi.com/carts/4";

export default function Cart({ removeFromCart, setCartItems, cartItems }) {
  // const [userCart, setUserCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

async function FetchCart() {
  try {
    const response = await fetch(`${BASE_URL}`);
    const result = await response.json()
    setCartItems(result.products)
    fetchAdditionalProductInfo(result.products)
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}

const fetchAdditionalProductInfo = async (products) => {
  try {
    const promises = products.map(async (item) => {
      const response = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
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
  FetchCart();
}, [])

useEffect(() => {
  // Calculate the total price whenever cartItems change
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.price * item.count;
  });
  setTotalPrice(totalPrice);
}, [cartItems]);

  // useEffect(() => {
  //   fetch(BASE_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCartItems(data.products);
  //       fetchAdditionalProductInfo(data.products);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching cart items:", error);
  //     });
  // }, []);

  // const fetchAdditionalProductInfo = async (products) => {
  //   try {
  //     const promises = products.map(async (item) => {
  //       const response = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
  //       const productInfo = await response.json();
  //       productInfo.count = item.quantity;
  //       return productInfo;
  //     });

  //     const productDetails = await Promise.all(promises);
  //     setCartItems(productDetails);
  //   } catch (error) {
  //     console.error("Error fetching additional product info:", error);
  //   }
  // };

  // const updateQuantity = (productId, newQuantity) => {
  //   const updatedCart = cartItems.map((item) => {
  //     if (item.id === productId) {
  //       item.count = newQuantity;
  //     }
  //     return item;
  //   });
  //   setCartItems(updatedCart);
  // };

  return ( cartItems.length === 0 ? (
     <h2 className="cart_total">Your cart is currently empty.</h2>
   ) : (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>Quantity: {item.count}</p>
          <button onClick={() => updateQuantity(item.id, item.count + 1)}>+</button>
          <button onClick={() => updateQuantity(item.id, item.count - 1)}>-</button>
          <button onClick={() => removeFromCart(item.id)}>Remove Item</button>
          <p>${item.price}</p>
          <p>{item.date}</p>
          <img src={item.image} alt={item.title} className="cart-container--image" />
        </div>
      ))}
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  ));
}
