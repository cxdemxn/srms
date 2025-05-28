import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'

// Components
import Sidebar from './components/Sidebar'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StaffList from './pages/StaffList'
import StaffForm from './pages/StaffForm'
import AdminProfile from './pages/AdminProfile'

// Utilities
import { isAuthenticated, initAuth, logout } from './utils/auth'
import { initializeDataStore } from './utils/dataService'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();
  const location = useLocation();
  
  if (!auth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

function App() {
  const [authChecked, setAuthChecked] = useState(false);

  // Initialize authentication system and data store on app load
  useEffect(() => {
    initAuth();
    initializeDataStore();
    setAuthChecked(true);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (!authChecked) {
    // Show loading state while checking auth
    return <div className="loading-app">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <div className="app-container">
                <Sidebar onLogout={handleLogout} />
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/staff" element={<StaffList />} />
                  <Route path="/staff/add" element={<StaffForm />} />
                  <Route path="/staff/edit/:id" element={<StaffForm />} />
                  <Route path="/admin" element={<AdminProfile />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
