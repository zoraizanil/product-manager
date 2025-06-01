import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import '../style.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '' });
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    navigate('/');
  };

  return (
    <div className='container'>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input type='text' name='name' placeholder='Name' onChange={handleChange} required />
        <input type='text' name='description' placeholder='Description' onChange={handleChange} required />
        <input type='number' name='price' placeholder='Price' onChange={handleChange} required />
        <input type='text' name='category' placeholder='Category' onChange={handleChange} required />
        <button type='submit' className='btn'>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;