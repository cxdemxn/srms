import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Notification from '../components/Notification';
import SchoolLogoAvatar from '../components/SchoolLogoAvatar';
import { academicRoles, roleOptions, facultyOptions, employmentTypes } from '../utils/formOptions';
import { getAllStaff, deleteStaff } from '../utils/dataService';

function StaffList() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Staff data state
  const [staff, setStaff] = useState([]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    type: '',
    faculty: '',
    department: ''
  });
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  
  // State for notifications
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Load staff data from localStorage when component mounts
  useEffect(() => {
    setStaff(getAllStaff());
  }, []);
  
  // Parse URL query parameters for filters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filterType = queryParams.get('filterType');
    const filterValue = queryParams.get('filterValue');
    
    if (filterType && filterValue && filterType !== 'none') {
      // Reset all filters first
      const newFilters = {
        role: '',
        type: '',
        faculty: '',
        department: ''
      };
      
      // Set the specific filter from URL
      newFilters[filterType] = filterValue;
      setFilters(newFilters);
      
      // Show notification about active filter
      setNotification({
        show: true,
        message: `Showing staff filtered by ${filterType}: ${filterValue}`,
        type: 'info'
      });
    }
  }, [location.search]);

  // Apply filters and search to staff list
  const filteredStaff = staff.filter(person => {
    // Apply search term filter
    const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      fullName.includes(searchLower) ||
      person.role.toLowerCase().includes(searchLower) ||
      person.email.toLowerCase().includes(searchLower) ||
      (person.department && person.department.toLowerCase().includes(searchLower)) ||
      (person.faculty && person.faculty.toLowerCase().includes(searchLower));
    
    // Apply role filter
    const matchesRole = !filters.role || person.role === filters.role;
    
    // Apply type filter
    const matchesType = !filters.type || person.type === filters.type;
    
    // Apply faculty filter
    const matchesFaculty = !filters.faculty || person.faculty === filters.faculty;
    
    // Apply department filter
    const matchesDepartment = !filters.department || person.department === filters.department;
    
    return matchesSearch && matchesRole && matchesType && matchesFaculty && matchesDepartment;
  });
  
  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStaff.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredStaff.length / recordsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      
      // Update URL with new filters (only if there are active filters)
      const hasActiveFilters = Object.values(newFilters).some(v => v);
      if (hasActiveFilters) {
        // Find the first active filter to use in URL
        const activeFilterType = Object.keys(newFilters).find(key => newFilters[key]) || '';
        const activeFilterValue = newFilters[activeFilterType] || '';
        
        if (activeFilterType && activeFilterValue) {
          navigate(`/staff?filterType=${activeFilterType}&filterValue=${encodeURIComponent(activeFilterValue)}`);
        }
      } else {
        // Clear filters from URL
        navigate('/staff');
      }
      
      return newFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      role: '',
      type: '',
      faculty: '',
      department: ''
    });
    navigate('/staff');
  };

  // Delete staff member
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff record?')) {
      const success = deleteStaff(id);
      
      if (success) {
        // Update the local state with the new data from localStorage
        setStaff(getAllStaff());
        
        // Show success notification
        setNotification({
          show: true,
          message: 'Staff record deleted successfully!',
          type: 'success'
        });
      } else {
        // Show error notification
        setNotification({
          show: true,
          message: 'Error deleting staff record. Please try again.',
          type: 'error'
        });
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Close notification
  const closeNotification = () => {
    setNotification({
      ...notification,
      show: false
    });
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => value);

  return (
    <div className="main-content">
      <div className="header">
        <h1>Staff Records</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
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

      <div className="filters-container">
        <div className="filter-group">
          <label>Role:</label>
          <select 
            value={filters.role} 
            onChange={(e) => handleFilterChange('role', e.target.value)}
          >
            <option value="">All Roles</option>
            {roleOptions.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Type:</label>
          <select 
            value={filters.type} 
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            {employmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Faculty:</label>
          <select 
            value={filters.faculty} 
            onChange={(e) => handleFilterChange('faculty', e.target.value)}
          >
            <option value="">All Faculties</option>
            {facultyOptions.map(faculty => (
              <option key={faculty} value={faculty}>{faculty}</option>
            ))}
          </select>
        </div>
        
        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            <i className="fas fa-times"></i> Clear Filters
          </button>
        )}
      </div>

      <div className="table-header">
        <p>{filteredStaff.length} records found</p>
        <div className="table-actions">
          {/* <button className="view-options"><i className="fas fa-th-large"></i></button>
          <button className="view-options"><i className="fas fa-list"></i></button> */}
          <button 
            className="add-employee" 
            onClick={() => navigate('/staff/add')}
          >
            <i className="fas fa-plus"></i> Add Staff
          </button>
        </div>
      </div>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th className="checkbox-col"><input type="checkbox" /></th>
              <th>NAME</th>
              <th>ROLE</th>
              <th>PHONE NUMBER</th>
              <th>EMAIL ADDRESS</th>
              <th>FACULTY</th>
              <th>DEPARTMENT</th>
              <th>TYPE</th>
              <th>DATE ADDED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map(person => (
              <tr key={person.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="employee-name">
                    <div className="avatar">{person.firstName[0]}{person.lastName[0]}</div>
                    <span>{person.firstName} {person.lastName}</span>
                  </div>
                </td>
                <td>{person.role}</td>
                <td>{person.phone}</td>
                <td>{person.email}</td>
                <td>{academicRoles.includes(person.role) ? person.faculty : '-'}</td>
                <td>{academicRoles.includes(person.role) ? person.department : '-'}</td>
                <td>
                  <span className={`status ${person.type.toLowerCase().replace(' ', '-')}`}>
                    {person.type}
                  </span>
                </td>
                <td>{formatDate(person.dateAdded)}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/staff/edit/${person.id}`} className="edit-btn">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(person.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStaff.length === 0 && (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <p>No staff records found matching your search criteria.</p>
          {hasActiveFilters && (
            <button className="reset-search" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      )}

      <div className="pagination-container">
        <div className="pagination-info">
          Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredStaff.length)} of {filteredStaff.length} records
        </div>
        <div className="pagination">
          <button 
            className="pagination-btn" 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          {/* Generate page buttons */}
          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            // Logic to show pages around current page
            let pageNumber;
            if (totalPages <= 5) {
              // If 5 or fewer pages, show all pages
              pageNumber = index + 1;
            } else if (currentPage <= 3) {
              // If on pages 1-3, show pages 1-5
              pageNumber = index + 1;
            } else if (currentPage >= totalPages - 2) {
              // If on last 3 pages, show last 5 pages
              pageNumber = totalPages - 4 + index;
            } else {
              // Otherwise show 2 pages before and after current page
              pageNumber = currentPage - 2 + index;
            }
            
            return (
              <button 
                key={pageNumber} 
                className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
          
          <button 
            className="pagination-btn" 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffList;
