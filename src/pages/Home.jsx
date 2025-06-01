import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <h1>Product Manager</h1>
      <button onClick={() => navigate('/add')} className='btn'>Add Product</button>
      <button onClick={() => navigate('/products')} className='btn'>View All Products</button>
    </div>
  );
};

export default Home;
