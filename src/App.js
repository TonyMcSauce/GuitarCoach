// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthContext';
import Sidebar from './components/Sidebar';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Tuner from './pages/Tuner';
import Chords from './pages/Chords';
import Practice from './pages/Practice';
import Strumming from './pages/Strumming';
import Songs from './pages/Songs';
import Progress from './pages/Progress';
import './index.css';

function ProtectedLayout() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tuner" element={<Tuner />} />
          <Route path="/chords" element={<Chords />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/strumming" element={<Strumming />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
