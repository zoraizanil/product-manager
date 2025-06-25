import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ImagePlus } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    images: []
  });

  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const product = products.find(p => p.id === id);
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description || '',
        price: product.price || '',
        images: product.images || []
      });
      setPreviewUrls(product.images || []);
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
    
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="form-container">
      <button 
        onClick={() => navigate('/')}
        className="back-btn"
        title="Back to products"
      >
        <ArrowLeft size={20} color="white" style={{ marginRight: '4px' }} /> Back
      </button>
      <h2>Edit Product</h2>
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
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
          <option value="books">Books</option>
          <option value="toys">Toys</option>
        </select>

        <input
          type="text"
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
            type="button"
            onClick={() => document.getElementById('image-upload').click()}
            className="form-img-btn"
          >
            <ImagePlus size={24} color="white" /> Upload Images
          </button>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="image-preview-container">
          {previewUrls.map((url, idx) => (
            <img key={idx} src={url} alt={`preview-${idx}`} className="image-preview" />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button type="submit" className="form-btn">Update Product</button>
          <button type="button" className="form-btn" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
