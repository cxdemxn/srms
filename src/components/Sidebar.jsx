import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  
  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Handle logout click
  const handleLogoutClick = (e) => {
    e.preventDefault();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">SR</div>
      <div className="sidebar-icons">
        <Link to="/dashboard" className={`icon ${isActive('/dashboard') ? 'active' : ''}`}>
          <i className="fas fa-home"></i>
        </Link>
        <Link to="/staff/add" className={`icon ${isActive('/staff/add') || isActive('/staff/edit') ? 'active' : ''}`}>
          <i className="fas fa-user-plus"></i>
        </Link>
        <Link to="/staff" className={`icon ${isActive('/staff') && !isActive('/staff/add') && !isActive('/staff/edit') ? 'active' : ''}`}>
          <i className="fas fa-users"></i>
        </Link>
        <Link to="/admin" className={`icon ${isActive('/admin') ? 'active' : ''}`}>
          <i className="fas fa-user-shield"></i>
        </Link>
      </div>
      <div className="sidebar-footer">
        <a href="#" className="icon" onClick={handleLogoutClick}>
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
