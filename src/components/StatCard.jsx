import React from 'react';

const StatCard = ({ title, count, icon, color, onClick }) => {
  return (
    <div 
      className={`stat-card ${color}`} 
      onClick={onClick}
    >
      <div className="stat-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stat-content">
        <h3>{count}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
