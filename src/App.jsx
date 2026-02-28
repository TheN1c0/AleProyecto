import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <Router>
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
