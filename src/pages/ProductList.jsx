import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../style.css';

const ProductList = () => {
  const { products, loading, error, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleEdit = (e, productId) => {
    e.stopPropagation();
    navigate(`/edit/${productId}`);
  };

  const handleDelete = async (e, productId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return <div className="container">Loading products...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  console.log(products)
  return (
    <div className='master-card'>
      <div className='container'>
        <h2 style={{ margin: '0 0 5px 0', color: '#2965a5' }}>Product List</h2>

        <div className='card-container'>
          {products.length === 0 ? (
            <p>No products found. Add some products to get started!</p>
          ) : (
            products.map(product => (
              <div
                key={product.id}
                className='card'
                onClick={() => handleCardClick(product.id)}
              >
                <div className='card-actions'>
                  <button
                    className='edit-btn'
                    onClick={(e) => handleEdit(e, product.id)}
                    title="Edit product"
                  >
                    <Edit size={20} color="white" />
                  </button>
                  <button
                    className='delete-btn'
                    onClick={(e) => handleDelete(e, product.id)}
                    title="Delete product"
                  >
                    <Trash2 size={20} color="white" />
                  </button>
                </div>

                {product.images && product.images.length > 0 ? (
                  <div className="carousel-wrapper" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={product.images[0]}
                      alt={`Product`}
                      className="card-image"
                    />
                    {/* <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                      autoPlay
                      interval={3000}
                      stopOnHover
                    > */}
                      {/* {product.images.map((url, idx) => (
                        <div key={idx}>
                        </div> */}
                      ))}
                    {/* </Carousel> */}
                  </div>
                ) : product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="card-image"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="no-image-placeholder">
                    <p>No images available</p>
                  </div>
                )}

                <div className='card-desc'>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  {product.price && (
                    <p style={{ fontWeight: 'bold', color: '#2965a5' }}>
                      Price: {Number(product.price).toLocaleString()}$
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => navigate('/add')}
        className='add-product-btn'
      >
        <Plus size={20} color="white" />
      </button>
    </div>
  );
};

export default ProductList;
