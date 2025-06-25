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
    images: []  // This will hold File objects
  });

  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const convertFilesToBase64 = (files) => {
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // base64 string
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      setError("Price must be a positive number");
      return;
    }

    if (formData.images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert images to base64
      const imageBase64Array = await convertFilesToBase64(formData.images);

      // Prepare data
      const cleanData = {
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        price: Number(formData.price),
        images: imageBase64Array
      };

      await addProduct(cleanData);
      navigate('/');
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.message || 'Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="form">
        {error && <div className="error-alert">{error}</div>}
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
          required
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
        <div className="add-back-btn">
          <button type="submit" className="form-btn" disabled={loading}>
            {loading ? 'Uploading...' : 'Add Product'}
          </button>
          <button type="button" className="form-btn" onClick={() => navigate('/products')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
