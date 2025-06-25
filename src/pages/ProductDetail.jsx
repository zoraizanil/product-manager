import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { ArrowLeft } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../style.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const product = products.find(p => p.id.toString() === id);

  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="detail-container">
      <button 
        onClick={() => navigate('/products')}
        className="back-btn"
        title="Back to products"
      >
        <ArrowLeft size={20} color="white" style={{ marginRight: '4px' }} /> Back
      </button>

      <div className="detail-card">
        <div className="detail-image-container">
          {product.images?.length > 0 ? (
            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
              {product.images.map((url, idx) => (
                <div key={idx}>
                  <img src={url} alt={`Product ${idx}`} className="detail-image" />
                </div>
              ))}
            </Carousel>
          ) : product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="detail-image"
            />
          ) : (
            <div className="no-image-placeholder">
              <p>No images available</p>
            </div>
            
          )}
        </div>

        <div className="detail-content">
          <h2 className="detail-title">{product.name}</h2>

          <div className="detail-info">
            <div className="info-item">
              <span className="info-label">Description</span>
              <span className="info-value">{product.description || 'No description available'}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Category</span>
              <span className="info-value">{product.category}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Price</span>
              <span className="info-value price">{Number(product.price).toLocaleString()}$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
