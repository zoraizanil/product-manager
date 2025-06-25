import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  addProduct as fbAddProduct,
  getAllProducts as fbGetAllProducts,
  updateProduct as fbUpdateProduct,
  deleteProduct as fbDeleteProduct
} from '../firebase/CRUDoperations';
import { useAuth } from './AuthContext';

export const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [currentUser]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await fbGetAllProducts(currentUser?.uid);
      setProducts(data);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const productWithUser = {
        ...productData,
        userId: currentUser?.uid
      };
      const newProduct = await fbAddProduct(productWithUser);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updated = await fbUpdateProduct(id, productData);
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fbDeleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
