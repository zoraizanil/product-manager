import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipboardList } from 'lucide-react';
import '../style.css';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-title">
            <ClipboardList size={24} color="white" />
            Product Manager
          </Link>
        </div>
        <div className="navbar-links">
          {currentUser ? (
            <>
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/add" className="nav-link">Add Product</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
