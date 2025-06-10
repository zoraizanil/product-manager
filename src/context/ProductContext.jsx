import React, { createContext, useState, useEffect } from 'react';
import { 
  addProduct as fbAddProduct,
  getAllProducts,
  updateProduct as fbUpdateProduct,
  deleteProduct as fbDeleteProduct
} from '../firebase/CRUDoperations';

export const ProductContext = createContext();  // Named export

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const newProduct = await fbAddProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      const updatedProduct = await fbUpdateProduct(productId, productData);
      setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await fbDeleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error, 
      addProduct,
      updateProduct,
      deleteProduct,
      refreshProducts: fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider; // Default export