import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Navbar from './Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import LuxuryBackground from './pages/LuxuryBackground';
import AtmosphericOverlay from './pages/AtmosphericOverlay';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#020205] text-slate-100 relative">
          {/* Global Luxury Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <LuxuryBackground />
            <AtmosphericOverlay />
          </div>
          
          <div className="relative z-10">
            <Navbar />
            <main className="pt-24 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/skills" element={<Home />} />
              <Route path="/projects" element={<Home />} />
              <Route path="/contact" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Toaster position="bottom-right" toastOptions={{
            style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' }
          }} />
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
