import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { ImagePlus } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select 
          name='category' 
          value={formData.category}
          onChange={handleChange} 
          required 
          className='form-select'
        >
          <option value=''>Select Category</option>
          <option value='electronics'>Electronics</option>
          <option value='fashion'>Fashion</option>
          <option value='home'>Home</option>
          <option value='books'>Books</option>
          <option value='toys'>Toys</option>
        </select>

        <input
          type='text'
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <div style={{ textAlign: 'center' }}>
          <button
            type='button'
            onClick={() => document.getElementById('image-upload').click()}
            className='form-img-btn'
          >
           <ImagePlus size={24} color="white" /> Upload Image
          </button>
          <input
            type='file'
            id='image-upload'
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {formData.imageUrl && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={formData.imageUrl}
              alt="Product Preview"
              className="image-preview"
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button type="submit" className="form-btn">Add Product</button>
          <button type="button" className="form-btn" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;