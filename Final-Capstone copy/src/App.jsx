import React, { useState} from "react";
import GetAllProducts from "./components/GetAllProducts";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Cart from "./components/Cart";
import GetSingleProduct from "./components/GetSingleProduct";
import { Routes, Route, Link } from "react-router-dom";
import smiley from "./assets/smiley-sticker.svg";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems from local storage or as an empty array
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  // const BASE_URL = "https://fakestoreapi.com/carts/2";

  // const FetchCart = async () => {
  //   try {
  //     // Fetch cart items only if cartItems is empty
  //     if (cartItems.length === 0) {
  //       const response = await fetch(`${BASE_URL}`);
  //       const result = await response.json();
  //       fetchAdditionalProductInfo(result.products);
  //     }
  //       const fetchAdditionalProductInfo = async (products) => {
  //   try {
  //     const promises = products.map(async (item) => {
  //       const response = await fetch(
  //         `https://fakestoreapi.com/products/${item.productId}`
  //       );
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
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    // Check if the product ID is already in the cart
    if (!cartItems.some((item) => item.id === product.id)) {
      // If not, add it to the cart
      const updatedCart = [...cartItems, product];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      console.log("Cart updated:", cartItems);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <>
      <nav className="navbar">
        <span className="navbar-searchbar-wrapper">
          <span>Searchbar</span>
        </span>
        <span>
          {" "}
          <img src={smiley}></img> AMAZIN{" "}
        </span>
        <span className="navbar-links-wrapper">
          <Link to="/">All Products</Link>
          <Link to="/signup"> Sign up</Link>
          <Link to="/login"> Log In</Link>
          <Link to="/cart"> Cart</Link>
        </span>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <GetAllProducts
              products={products}
              setProducts={setProducts}
              setCartItems={setCartItems}
              addToCart={addToCart}
            />
          }
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route
          path="/cart"
          element={
            <Cart
              products={products}
              cartItems={cartItems}
              setCartItems={setCartItems}
              removeFromCart={removeFromCart}
              token={token}
            />
          }
        ></Route>
      </Routes>
      <GetSingleProduct
        products={products}
        setProducts={setProducts}
        setCartItems={setCartItems}
        addToCart={addToCart}
      />
    </>
  );
}

export default App;
