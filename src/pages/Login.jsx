import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import schoolLogo from '../assets/school-logo.svg';
import { initAuth, login, isAuthenticated } from '../utils/auth';
import Notification from '../components/Notification';

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'error'
  });

  // Initialize authentication system on component mount
  useEffect(() => {
    initAuth();
    
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    const loginSuccess = login(password);
    
    if (loginSuccess) {
      // Show success notification
      setNotification({
        show: true,
        message: 'Login successful!',
        type: 'success'
      });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      // Show error notification
      setNotification({
        show: true,
        message: 'Invalid password. Please try again.',
        type: 'error'
      });
      setError('Invalid password');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      show: false
    });
  };

  return (
    <div className="login-container">
      {notification.show && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={closeNotification} 
        />
      )}
      
      <div className="login-card">
        <div className="login-logo">
          <img src={schoolLogo} alt="ESM School Logo" />
        </div>
        
        <h1>Welcome to ESM SRMS</h1>
        <p className="login-subtitle">Staff Record Management System</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password} 
                onChange={handlePasswordChange} 
                className={error ? 'error' : ''}
                placeholder="Enter your password"
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>
          
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        
        <div className="login-footer">
          <p>© {new Date().getFullYear()} ESM School. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
