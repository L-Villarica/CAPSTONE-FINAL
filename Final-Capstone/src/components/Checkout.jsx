/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function CheckoutPage({ cartItems, removeFromCart }) {
  return (
      <div className="checkout-form-container">
        <h2>Checkout</h2>
        <form className="checkout-form">
          <div className="form-group">
            <label>Name on Card</label>
            <input type="text" name="cardName" />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" name="cardNumber" />
          </div>
          <div className="form-group">
            <label>Expiration Date</label>
            <input type="text" name="expirationDate" />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input type="text" name="cvv" />
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <input type="text" name="shippingAddress" />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" name="state" />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input type="text" name="zipCode" />
          </div>
        </form>
        <button className="checkout-button-wrapper" type="submit">
            Checkout
          </button>
      </div>
  );
}
