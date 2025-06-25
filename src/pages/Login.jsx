import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/products');  // ✅ Redirect after login
    } catch (err) {
      setError(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
