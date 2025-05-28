import React from 'react';
import schoolLogo from '../assets/school-logo.svg';

const SchoolLogoAvatar = () => {
  return (
    <div className="user-avatar">
      <img src={schoolLogo} alt="School Logo" className="avatar-logo" />
    </div>
  );
};

export default SchoolLogoAvatar;
