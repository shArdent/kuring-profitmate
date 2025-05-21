import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
// Main Application Pages
import Dashboard from './pages/Dashboard';
import HPP from './pages/HPP'
import HPPN from './pages/HPPN';
import LabaRugi from './pages/LabaRugi';
import Transactions from './pages/Transactions';
import TransactionDetail from './pages/TransactionDetail';
import Settings from './pages/Settings';

function App() {
  // Simple authentication check (you would use a more robust solution with context)
  const isAuthenticated = () => {
    return localStorage.getItem('auth_token') !== null;
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Route - tanpa ProtectedRoute */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/labarugi" element={<LabaRugi />} />
        <Route path="/hpp" element={<HPP />} />      
        <Route path="/hppn" element={<HPPN />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactiondetail/:id" element={<TransactionDetail />} />
        
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;