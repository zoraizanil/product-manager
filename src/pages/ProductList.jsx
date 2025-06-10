import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, Trash2} from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
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

  return (
    <div className='container'>
      <h2 style={{ margin: '0 0 5px 0' }}>Product Manager</h2>
      
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
              
              {product.imageUrl && (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="card-image"
                  // style={{ 
                  //   width: '100%',
                  //   height: '160px',
                  //   objectFit: 'contain',
                  //   borderRadius: '8px',
                  //   marginBottom: '12px'
                  // }}
                />
              )}
              <div className='card-desc'>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                {product.price && (
                  <p style={{ fontWeight: 'bold', color: '#2965a5' }}>
                    {Number(product.price).toLocaleString()}RS
                  </p>
                )}
              </div>
            </div>
          ))
        )}
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