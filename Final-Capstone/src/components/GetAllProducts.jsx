/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import GetSingleProduct from './GetSingleProduct';
import starFill from '../assets/star-fill.svg';

const BASE_URL = 'https://fakestoreapi.com/products';

export default function GetAllProducts({ addToCart, products, setProducts }) {
  // const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('name'); // Default sorting by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting in ascending order

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

  // Sorting function
  const sortedProducts = [...products].sort((a, b) => {
    const sortOrderMultiplier = sortOrder === 'asc' ? 1 : -1;

    if (sortCriteria === 'name') {
      return sortOrderMultiplier * a.title.localeCompare(b.title);
    } else if (sortCriteria === 'price') {
      return sortOrderMultiplier * (a.price - b.price);
    } else if (sortCriteria === 'rating') {
      return sortOrderMultiplier * (a.rating.rate - b.rating.rate);
    }
    return 0;
  });

  return (
    <>
      <div className='filter'>
        <label htmlFor='sortCriteria'>Sort by:</label>
        <select
          id='sortCriteria'
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value='name'>Name</option>
          <option value='price'>Price</option>
          <option value='rating'>Rating</option>
        </select>
        <label htmlFor='sortOrder'>Order:</label>
        <select
          id='sortOrder'
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
      {selectedProductId ? (
        <GetSingleProduct
          addToCart={addToCart}
          productId={selectedProductId}
          onBackClick={handleBackClick}
        />
      ) : (
        <div className='all-products-container'>
          {sortedProducts.map((product) => (
            <div key={product.id} className='all-products-container-card'>
              <div className='all-products-container-card-wrapper'>
                <p className='product-title'>{product.title}</p>
                <p className='product-price'>${product.price}</p>

                <img
                  src={product.image}
                  className='all-products-container--image'
                />
                <p className='product-rating'>
                  <span className='product-rating-rate'>
                    {product.rating.rate}
                  </span>
                  <span className='product-rating-star'>
                    <img src={starFill} />
                  </span>
                  <span className='product-rating-count'>
                    {product.rating.count}
                  </span>
                </p>
                <div className='product-buttons-wrapper'>
                  <button
                    className='product-details'
                    onClick={() => handleSeeDetails(product.id)}
                  >
                    See Details
                  </button>
                  <button
                    className='product-add-to-cart'
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
