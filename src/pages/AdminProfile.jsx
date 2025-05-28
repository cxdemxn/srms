import React, { useState } from 'react';
import { changePassword } from '../utils/auth';
import Notification from '../components/Notification';
import schoolLogo from '../assets/school-logo.svg';
import SchoolLogoAvatar from '../components/SchoolLogoAvatar';

const AdminProfile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  // Toggle password form visibility
  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    // Reset form when toggling
    if (!showPasswordForm) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  // Handle password change submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        show: true,
        message: 'New password and confirmation do not match',
        type: 'error'
      });
      return;
    }
    
    // Validate password length
    if (passwordData.newPassword.length < 6) {
      setNotification({
        show: true,
        message: 'Password must be at least 6 characters long',
        type: 'error'
      });
      return;
    }
    
    // Attempt to change password
    const success = changePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (success) {
      setNotification({
        show: true,
        message: 'Password changed successfully',
        type: 'success'
      });
      // Reset form and hide it
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    } else {
      setNotification({
        show: true,
        message: 'Current password is incorrect',
        type: 'error'
      });
    }
  };

  // Close notification
  const closeNotification = () => {
    setNotification({
      ...notification,
      show: false
    });
  };

  return (
    <div className="main-content">
      <div className="header">
        <h1>Admin Profile</h1>
        <div className="header-icons">
          <i className="far"></i>
          <i className="fas"></i>
          <SchoolLogoAvatar />
        </div>
      </div>
      
      {notification.show && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={closeNotification} 
        />
      )}
      
      <div className="admin-profile-content">
        <div className="admin-profile-card">
          <div className="admin-profile-image">
            <img src={schoolLogo} alt="School Logo" className="school-logo" />
          </div>
          <div className="admin-tag">Administrator</div>
          
          <button 
            className="change-password-btn" 
            onClick={togglePasswordForm}
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
          
          {showPasswordForm && (
            <form className="password-change-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input 
                  type="password" 
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input 
                  type="password" 
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input 
                  type="password" 
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <button type="submit" className="save-password-btn">
                Save New Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
