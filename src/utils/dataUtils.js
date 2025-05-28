// Utility functions for data aggregation and manipulation

// Get count of staff by role
export const getStaffCountByRole = (staffList) => {
  const roleCounts = {};
  
  staffList.forEach(staff => {
    if (roleCounts[staff.role]) {
      roleCounts[staff.role]++;
    } else {
      roleCounts[staff.role] = 1;
    }
  });
  
  return Object.entries(roleCounts).map(([role, count]) => ({
    role,
    count
  }));
};

// Get count of staff by employment type
export const getStaffCountByType = (staffList) => {
  const typeCounts = {};
  
  staffList.forEach(staff => {
    if (typeCounts[staff.type]) {
      typeCounts[staff.type]++;
    } else {
      typeCounts[staff.type] = 1;
    }
  });
  
  return Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count
  }));
};

// Get count of staff by department
export const getStaffCountByDepartment = (staffList) => {
  const deptCounts = {};
  
  staffList.forEach(staff => {
    if (staff.department) {
      if (deptCounts[staff.department]) {
        deptCounts[staff.department]++;
      } else {
        deptCounts[staff.department] = 1;
      }
    }
  });
  
  return Object.entries(deptCounts).map(([department, count]) => ({
    department,
    count
  }));
};

// Get count of staff by faculty
export const getStaffCountByFaculty = (staffList) => {
  const facultyCounts = {};
  
  staffList.forEach(staff => {
    if (staff.faculty) {
      if (facultyCounts[staff.faculty]) {
        facultyCounts[staff.faculty]++;
      } else {
        facultyCounts[staff.faculty] = 1;
      }
    }
  });
  
  return Object.entries(facultyCounts).map(([faculty, count]) => ({
    faculty,
    count
  }));
};

// Get total staff count
export const getTotalStaffCount = (staffList) => {
  return staffList.length;
};
