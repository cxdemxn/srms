import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    // Auto close notification after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
        <span>{message}</span>
      </div>
      <button className="close-btn" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Notification;
