import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import CRUDoperations from './firebase/CRUDoperations';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './pages/EditProduct';

console.log({ Home, AddProduct, ProductList, ProductDetail });
 
const App = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/' element={<ProductList />} />
      <Route path='/add' element={<AddProduct />} />
      <Route path='/products' element={<ProductList />} />
      <Route path='/products/:id' element={<ProductDetail />} />
      <Route path='/edit/:id' element={<EditProduct />} />
    </Routes>
  );
};

export default App;
