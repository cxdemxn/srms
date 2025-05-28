import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  roleOptions, 
  facultyOptions, 
  academicRoles, 
  departmentsByFaculty, 
  employmentTypes 
} from '../utils/formOptions';
import Notification from '../components/Notification';
import SchoolLogoAvatar from '../components/SchoolLogoAvatar';
import { getStaffById, addStaff, updateStaff } from '../utils/dataService';

const StaffForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    phone: '',
    email: '',
    faculty: '',
    department: '',
    type: 'Full time',
    dateAdded: new Date().toISOString().split('T')[0]
  });
  
  // UI state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Check if role requires faculty
  const requiresFaculty = academicRoles.includes(formData.role);
  
  // Get departments based on selected faculty
  const availableDepartments = formData.faculty ? departmentsByFaculty[formData.faculty] || [] : [];
  
  // Load staff data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      const staffData = getStaffById(id);
      
      if (staffData) {
        setFormData(staffData);
      } else {
        // Show error notification if staff record not found
        setNotification({
          show: true,
          message: 'Staff record not found',
          type: 'error'
        });
        // Redirect back to staff list after a short delay
        setTimeout(() => {
          navigate('/staff');
        }, 2000);
      }
      
      setLoading(false);
    }
  }, [id, isEditMode, navigate]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for role changes
    if (name === 'role') {
      const newFormData = { ...formData, [name]: value };
      
      // Clear faculty and department if new role doesn't require them
      if (!academicRoles.includes(value)) {
        newFormData.faculty = '';
        newFormData.department = '';
      }
      
      setFormData(newFormData);
    }
    // Special handling for faculty changes
    else if (name === 'faculty') {
      setFormData({
        ...formData,
        [name]: value,
        department: '' // Reset department when faculty changes
      });
    }
    // Handle all other fields normally
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear any error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Faculty and department validation for academic roles
    if (requiresFaculty) {
      if (!formData.faculty) newErrors.faculty = 'Faculty is required for this role';
      if (!formData.department) newErrors.department = 'Department is required for this role';
    }
    
    if (!formData.type) newErrors.type = 'Employment type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isEditMode) {
        // Update existing staff record
        const updatedStaff = updateStaff(id, formData);
        
        if (updatedStaff) {
          // Show success notification
          setNotification({
            show: true,
            message: 'Staff record updated successfully!',
            type: 'success'
          });
          
          // Redirect to staff list after a short delay
          setTimeout(() => {
            navigate('/staff');
          }, 2000);
        } else {
          throw new Error('Failed to update staff record');
        }
      } else {
        // Add new staff record
        const newStaff = addStaff(formData);
        
        if (newStaff) {
          // Show success notification
          setNotification({
            show: true,
            message: 'Staff record created successfully!',
            type: 'success'
          });
          
          // Redirect to staff list after a short delay
          setTimeout(() => {
            navigate('/staff');
          }, 2000);
        } else {
          throw new Error('Failed to create staff record');
        }
      }
    } catch (error) {
      // Show error notification
      setNotification({
        show: true,
        message: error.message || 'An error occurred while saving the staff record',
        type: 'error'
      });
    } finally {
      setLoading(false);
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
        <h1>{isEditMode ? 'Edit Staff Record' : 'Add New Staff'}</h1>
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
      
      <div className="staff-form-container">
        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="staff-form">
            <div className="form-section">
              <h2>Personal Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name*</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name*</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <input 
                    type="text" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h2>Position Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role*</label>
                  <select 
                    id="role" 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange}
                    className={errors.role ? 'error' : ''}
                  >
                    <option value="">Select a role</option>
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {errors.role && <span className="error-message">{errors.role}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="type">Employment Type*</label>
                  <select 
                    id="type" 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    className={errors.type ? 'error' : ''}
                  >
                    {employmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && <span className="error-message">{errors.type}</span>}
                </div>
              </div>
              
              {requiresFaculty && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="faculty">Faculty*</label>
                    <select 
                      id="faculty" 
                      name="faculty" 
                      value={formData.faculty} 
                      onChange={handleChange}
                      className={errors.faculty ? 'error' : ''}
                    >
                      <option value="">Select a faculty</option>
                      {facultyOptions.map(faculty => (
                        <option key={faculty} value={faculty}>{faculty}</option>
                      ))}
                    </select>
                    {errors.faculty && <span className="error-message">{errors.faculty}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="department">Department*</label>
                    <select 
                      id="department" 
                      name="department" 
                      value={formData.department} 
                      onChange={handleChange}
                      disabled={!formData.faculty}
                      className={errors.department ? 'error' : ''}
                    >
                      <option value="">Select a department</option>
                      {availableDepartments.map(department => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </select>
                    {errors.department && <span className="error-message">{errors.department}</span>}
                  </div>
                </div>
              )}
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dateAdded">Date Added</label>
                  <input 
                    type="date" 
                    id="dateAdded" 
                    name="dateAdded" 
                    value={formData.dateAdded} 
                    onChange={handleChange}
                    readOnly={isEditMode} // Can't change date in edit mode
                  />
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => navigate('/staff')}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? 'Saving...' : (isEditMode ? 'Update Staff' : 'Add Staff')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StaffForm;
