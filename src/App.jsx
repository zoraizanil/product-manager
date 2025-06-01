import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

console.log({ Home, AddProduct, ProductList, ProductDetail });
 
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<AddProduct />} />
      <Route path='/products' element={<ProductList />} />
      <Route path='/products/:id' element={<ProductDetail />} />
    </Routes>
  );
};

export default App;
