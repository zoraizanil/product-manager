import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import '../style.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find(p => p.id === id);

  if (!product) return <div className='container'>Product not found</div>;

  return (
    <div className='container'>
      <h2>{product.name}</h2>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
    </div>
  );
};

export default ProductDetail;