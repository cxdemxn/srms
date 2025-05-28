/**
 * Data Service for Staff Records Management System
 * Handles all data operations using localStorage
 */

const STAFF_DATA_KEY = 'srms_staff_data';
const NEXT_ID_KEY = 'srms_next_id';

/**
 * Initialize the data storage with default values if empty
 */
export const initializeDataStore = () => {
  // Check if staff data exists in localStorage
  if (!localStorage.getItem(STAFF_DATA_KEY)) {
    // Set initial sample data with at least 20 dummy entries
    const initialData = [
      { 
        id: 1, 
        firstName: 'Bradley', 
        lastName: 'Lawler', 
        role: 'Professor', 
        phone: '(318) 744-0291', 
        email: 'bradleyl@outlook.com', 
        faculty: 'Science', 
        department: 'Physics', 
        type: 'Full time', 
        dateAdded: '2024-03-01' 
      },
      { 
        id: 2, 
        firstName: 'Alex', 
        lastName: 'Ducksworth', 
        role: 'Lecturer', 
        phone: '(818) 473-9359', 
        email: 'alexd123@gmail.com', 
        faculty: 'Engineering/Technology', 
        department: 'Computer Engineering', 
        type: 'Full time', 
        dateAdded: '2024-03-10' 
      },
      { 
        id: 3, 
        firstName: 'James', 
        lastName: 'Hall', 
        role: 'Dean', 
        phone: '(501) 338-2573', 
        email: 'david23@gmail.com', 
        faculty: 'Arts/Humanities', 
        department: 'English Language', 
        type: 'Full time', 
        dateAdded: '2024-03-15' 
      },
      { 
        id: 4, 
        firstName: 'Stephanie', 
        lastName: 'Nicol', 
        role: 'Deputy Vice Chancellor', 
        phone: '(602) 209-9604', 
        email: 'k_patricia@gmail.com', 
        faculty: '', 
        department: '', 
        type: 'Part time', 
        dateAdded: '2024-03-18' 
      },
      { 
        id: 5, 
        firstName: 'Stephanie', 
        lastName: 'Sharkey', 
        role: 'Registrar', 
        phone: '(323) 690-7279', 
        email: 'paulas87@gmail.com', 
        faculty: '', 
        department: '', 
        type: 'Full time', 
        dateAdded: '2024-03-20' 
      },
      { 
        id: 6, 
        firstName: 'John', 
        lastName: 'Decker', 
        role: 'President', 
        phone: '(207) 739-9240', 
        email: 'hub33@outlook.com', 
        faculty: '', 
        department: '', 
        type: 'Full time', 
        dateAdded: '2024-03-20' 
      },
      { 
        id: 7, 
        firstName: 'Ricky', 
        lastName: 'Smith', 
        role: 'Bursar', 
        phone: '(818) 313-7673', 
        email: 'Daniel@aol.com', 
        faculty: '', 
        department: '', 
        type: 'Full time', 
        dateAdded: '2024-03-01' 
      },
      { 
        id: 8, 
        firstName: 'Daniel', 
        lastName: 'Hamilton', 
        role: 'Head of Department', 
        phone: '(702) 813-8989', 
        email: 'eddie.jake@gmail.com', 
        faculty: 'Science', 
        department: 'Computer Science', 
        type: 'Part time', 
        dateAdded: '2024-03-19' 
      },
      { 
        id: 9, 
        firstName: 'Paula', 
        lastName: 'Mora', 
        role: 'Director of Studies', 
        phone: '(504) 696-9373', 
        email: 'patriciad83@outlook.com', 
        faculty: '', 
        department: '', 
        type: 'Full time', 
        dateAdded: '2024-03-20' 
      },
      { 
        id: 10, 
        firstName: 'Judith', 
        lastName: 'Miller', 
        role: 'Health Center Staff', 
        phone: '(707) 939-9707', 
        email: 'j.miller@aol.com', 
        faculty: '', 
        department: '', 
        type: 'Full time', 
        dateAdded: '2024-03-22' 
      },
      { 
        id: 11, 
        firstName: 'Michael', 
        lastName: 'Johnson', 
        role: 'Professor', 
        phone: '(415) 555-7890', 
        email: 'mjohnson@university.edu', 
        faculty: 'Science', 
        department: 'Chemistry', 
        type: 'Full time', 
        dateAdded: '2024-02-15' 
      },
      { 
        id: 12, 
        firstName: 'Sarah', 
        lastName: 'Williams', 
        role: 'Lecturer', 
        phone: '(212) 555-4321', 
        email: 'swilliams@university.edu', 
        faculty: 'Arts/Humanities', 
        department: 'History', 
        type: 'Part time', 
        dateAdded: '2024-02-20' 
      },
      { 
        id: 13, 
        firstName: 'Robert', 
        lastName: 'Brown', 
        role: 'Professor', 
        phone: '(312) 555-6789', 
        email: 'rbrown@university.edu', 
        faculty: 'Engineering/Technology', 
        department: 'Electrical Engineering', 
        type: 'Full time', 
        dateAdded: '2024-01-10' 
      },
      { 
        id: 14, 
        firstName: 'Jennifer', 
        lastName: 'Davis', 
        role: 'Head of Department', 
        phone: '(713) 555-9012', 
        email: 'jdavis@university.edu', 
        faculty: 'Business/Economics', 
        department: 'Finance', 
        type: 'Full time', 
        dateAdded: '2024-01-15' 
      },
      { 
        id: 15, 
        firstName: 'David', 
        lastName: 'Wilson', 
        role: 'Lecturer', 
        phone: '(305) 555-3456', 
        email: 'dwilson@university.edu', 
        faculty: 'Science', 
        department: 'Biology', 
        type: 'Part time', 
        dateAdded: '2024-03-05' 
      },
      { 
        id: 16, 
        firstName: 'Lisa', 
        lastName: 'Anderson', 
        role: 'Professor', 
        phone: '(404) 555-7890', 
        email: 'landerson@university.edu', 
        faculty: 'Medicine/Health', 
        department: 'Nursing', 
        type: 'Full time', 
        dateAdded: '2024-02-28' 
      },
      { 
        id: 17, 
        firstName: 'Thomas', 
        lastName: 'Martinez', 
        role: 'IT Staff', 
        phone: '(617) 555-2345', 
        email: 'tmartinez@university.edu', 
        faculty: '', 
        department: '', 
        type: 'Full time', 
        dateAdded: '2024-01-20' 
      },
      { 
        id: 18, 
        firstName: 'Emily', 
        lastName: 'Thompson', 
        role: 'Librarian', 
        phone: '(206) 555-6789', 
        email: 'ethompson@university.edu', 
        faculty: '', 
        department: '', 
        type: 'Full time', 
        dateAdded: '2024-02-10' 
      },
      { 
        id: 19, 
        firstName: 'Christopher', 
        lastName: 'Garcia', 
        role: 'Professor', 
        phone: '(619) 555-1234', 
        email: 'cgarcia@university.edu', 
        faculty: 'Law', 
        department: 'Criminal Law', 
        type: 'Full time', 
        dateAdded: '2024-03-12' 
      },
      { 
        id: 20, 
        firstName: 'Amanda', 
        lastName: 'Rodriguez', 
        role: 'Lecturer', 
        phone: '(214) 555-5678', 
        email: 'arodriguez@university.edu', 
        faculty: 'Education', 
        department: 'Elementary Education', 
        type: 'Part time', 
        dateAdded: '2024-02-05' 
      },
      { 
        id: 21, 
        firstName: 'Kevin', 
        lastName: 'Lee', 
        role: 'Professor', 
        phone: '(408) 555-9012', 
        email: 'klee@university.edu', 
        faculty: 'Engineering/Technology', 
        department: 'Software Engineering', 
        type: 'Full time', 
        dateAdded: '2024-01-25' 
      },
      { 
        id: 22, 
        firstName: 'Michelle', 
        lastName: 'Clark', 
        role: 'Counselor', 
        phone: '(303) 555-3456', 
        email: 'mclark@university.edu', 
        faculty: '', 
        department: '', 
        type: 'Full time', 
        dateAdded: '2024-03-08' 
      },
      { 
        id: 23, 
        firstName: 'Brian', 
        lastName: 'Lewis', 
        role: 'Professor', 
        phone: '(512) 555-7890', 
        email: 'blewis@university.edu', 
        faculty: 'Arts/Humanities', 
        department: 'Philosophy', 
        type: 'Full time', 
        dateAdded: '2024-02-18' 
      },
      { 
        id: 24, 
        firstName: 'Jessica', 
        lastName: 'Walker', 
        role: 'Administrative Staff', 
        phone: '(702) 555-2345', 
        email: 'jwalker@university.edu', 
        faculty: '', 
        department: '', 
        type: 'Part time', 
        dateAdded: '2024-01-30' 
      },
      { 
        id: 25, 
        firstName: 'Matthew', 
        lastName: 'Hall', 
        role: 'Professor', 
        phone: '(847) 555-6789', 
        email: 'mhall@university.edu', 
        faculty: 'Business/Economics', 
        department: 'Marketing', 
        type: 'Full time', 
        dateAdded: '2024-03-15' 
      }
    ];
    
    localStorage.setItem(STAFF_DATA_KEY, JSON.stringify(initialData));
    localStorage.setItem(NEXT_ID_KEY, '26'); // Next ID after the initial data
  }
};

/**
 * Get all staff records
 * @returns {Array} Array of staff records
 */
export const getAllStaff = () => {
  const staffData = localStorage.getItem(STAFF_DATA_KEY);
  return staffData ? JSON.parse(staffData) : [];
};

/**
 * Get a single staff record by ID
 * @param {number} id - Staff ID
 * @returns {Object|null} Staff record or null if not found
 */
export const getStaffById = (id) => {
  const staffData = getAllStaff();
  return staffData.find(staff => staff.id === parseInt(id)) || null;
};

/**
 * Add a new staff record
 * @param {Object} staffData - Staff data object
 * @returns {Object} Newly created staff record with ID
 */
export const addStaff = (staffData) => {
  const currentStaff = getAllStaff();
  
  // Get the next ID
  let nextId = parseInt(localStorage.getItem(NEXT_ID_KEY) || '1');
  
  // Create new staff record with ID and current date
  const newStaff = {
    ...staffData,
    id: nextId,
    dateAdded: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
  };
  
  // Add to the array
  const updatedStaff = [...currentStaff, newStaff];
  
  // Save to localStorage
  localStorage.setItem(STAFF_DATA_KEY, JSON.stringify(updatedStaff));
  localStorage.setItem(NEXT_ID_KEY, (nextId + 1).toString());
  
  return newStaff;
};

/**
 * Update an existing staff record
 * @param {number} id - Staff ID to update
 * @param {Object} staffData - Updated staff data
 * @returns {Object|null} Updated staff record or null if not found
 */
export const updateStaff = (id, staffData) => {
  const currentStaff = getAllStaff();
  const staffIndex = currentStaff.findIndex(staff => staff.id === parseInt(id));
  
  if (staffIndex === -1) {
    return null; // Staff not found
  }
  
  // Update the staff record, preserving the ID and dateAdded
  const updatedStaff = {
    ...staffData,
    id: parseInt(id),
    dateAdded: currentStaff[staffIndex].dateAdded
  };
  
  // Replace the old record with the updated one
  currentStaff[staffIndex] = updatedStaff;
  
  // Save to localStorage
  localStorage.setItem(STAFF_DATA_KEY, JSON.stringify(currentStaff));
  
  return updatedStaff;
};

/**
 * Delete a staff record
 * @param {number} id - Staff ID to delete
 * @returns {boolean} True if deleted, false if not found
 */
export const deleteStaff = (id) => {
  const currentStaff = getAllStaff();
  const initialLength = currentStaff.length;
  
  const filteredStaff = currentStaff.filter(staff => staff.id !== parseInt(id));
  
  if (filteredStaff.length === initialLength) {
    return false; // No record was deleted
  }
  
  // Save to localStorage
  localStorage.setItem(STAFF_DATA_KEY, JSON.stringify(filteredStaff));
  
  return true;
};
