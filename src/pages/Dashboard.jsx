import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import StatCard from '../components/StatCard';
import SchoolLogoAvatar from '../components/SchoolLogoAvatar';
import { getAllStaff } from '../utils/dataService';
import { 
  getTotalStaffCount,
  getStaffCountByRole,
  getStaffCountByType,
  getStaffCountByDepartment,
  getStaffCountByFaculty
} from '../utils/dataUtils';
import { roleOptions, academicRoles } from '../utils/formOptions';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Staff data state
  const [staffData, setStaffData] = useState([]);
  
  // Load staff data from localStorage when component mounts
  useEffect(() => {
    setStaffData(getAllStaff());
  }, []);
  
  // State for notification
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  
  // Calculate statistics
  const totalStaff = getTotalStaffCount(staffData);
  const roleStats = getStaffCountByRole(staffData);
  const typeStats = getStaffCountByType(staffData);
  const departmentStats = getStaffCountByDepartment(staffData);
  const facultyStats = getStaffCountByFaculty(staffData);
  
  // Navigate to staff list with filter
  const navigateWithFilter = (filterType, filterValue) => {
    navigate(`/staff?filterType=${filterType}&filterValue=${encodeURIComponent(filterValue)}`);
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
        <h1>Dashboard</h1>
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
      
      <div className="dashboard-content">
        <div className="stat-section">
          <h2>Overview</h2>
          <div className="stat-cards">
            <StatCard 
              title="Total Staff" 
              count={totalStaff} 
              icon="fa-users" 
              color="primary" 
              onClick={() => navigate('/staff')}
            />
            
            {typeStats.map((stat, index) => (
              <StatCard 
                key={`type-${index}`}
                title={`${stat.type} Staff`} 
                count={stat.count} 
                icon="fa-id-badge" 
                color={stat.type === 'Full time' ? 'success' : 
                      stat.type === 'Part time' ? 'warning' : 
                      'info'}
                onClick={() => navigateWithFilter('type', stat.type)}
              />
            ))}
          </div>
        </div>
        
        <div className="stat-section">
          <h2>Staff by Role</h2>
          <div className="stat-cards">
            {roleStats
              .filter(stat => stat.count > 0) // Only show roles with staff
              .map((stat, index) => (
                <StatCard 
                  key={`role-${index}`}
                  title={stat.role} 
                  count={stat.count} 
                  icon="fa-user-tie" 
                  color={index % 2 === 0 ? "info" : "purple"}
                  onClick={() => navigateWithFilter('role', stat.role)}
                />
              ))}
          </div>
        </div>
        
        <div className="stat-section">
          <h2>Staff by Department</h2>
          <div className="stat-cards">
            {departmentStats
              .filter(stat => stat.department && stat.count > 0) // Filter out empty departments
              .map((stat, index) => (
                <StatCard 
                  key={`dept-${index}`}
                  title={stat.department} 
                  count={stat.count} 
                  icon="fa-building" 
                  color={index % 3 === 0 ? "primary" : (index % 3 === 1 ? "success" : "info")}
                  onClick={() => navigateWithFilter('department', stat.department)}
                />
              ))}
          </div>
        </div>
        
        <div className="stat-section">
          <h2>Staff by Faculty</h2>
          <div className="stat-cards">
            {facultyStats
              .filter(stat => stat.faculty && stat.count > 0) // Filter out empty faculties
              .map((stat, index) => (
                <StatCard 
                  key={`faculty-${index}`}
                  title={stat.faculty} 
                  count={stat.count} 
                  icon="fa-university" 
                  color={index % 2 === 0 ? "danger" : "teal"}
                  onClick={() => navigateWithFilter('faculty', stat.faculty)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
