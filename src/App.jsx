import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />  {/* 👈 Now login is landing page */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
