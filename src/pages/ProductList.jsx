import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import '../style.css';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className='container'>
      <h2>All Products</h2>
      <div className='card-container'>
        {products.map(product => (
          <div
            key={product.id}
            className='card'
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <h3>{product.name}</h3>
            <p>{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;