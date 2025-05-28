// Default admin password
const DEFAULT_PASSWORD = 'admin123';

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('srms_authenticated') === 'true';
};

// Initialize authentication system
export const initAuth = () => {
  // Check if this is the first time loading the app
  if (localStorage.getItem('srms_initialized') !== 'true') {
    // Set default password
    localStorage.setItem('srms_password', DEFAULT_PASSWORD);
    localStorage.setItem('srms_initialized', 'true');
    localStorage.setItem('srms_authenticated', 'false');
  }
};

// Login function
export const login = (password) => {
  const storedPassword = localStorage.getItem('srms_password');
  
  if (password === storedPassword) {
    localStorage.setItem('srms_authenticated', 'true');
    return true;
  }
  
  return false;
};

// Logout function
export const logout = () => {
  localStorage.setItem('srms_authenticated', 'false');
};

// Change password function
export const changePassword = (currentPassword, newPassword) => {
  const storedPassword = localStorage.getItem('srms_password');
  
  if (currentPassword === storedPassword) {
    localStorage.setItem('srms_password', newPassword);
    return true;
  }
  
  return false;
};
