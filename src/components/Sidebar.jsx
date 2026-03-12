// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  tuner: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="12" x2="15" y2="9"/>
    </svg>
  ),
  chords: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <line x1="8" y1="3" x2="8" y2="21"/>
      <line x1="14" y1="3" x2="14" y2="21"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
      <line x1="2" y1="15" x2="22" y2="15"/>
    </svg>
  ),
  practice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  ),
  strum: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),
  songs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
};

export default function Sidebar() {
  const { logout, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: 'dashboard', exact: true },
    { to: '/tuner', label: 'Tuner', icon: 'tuner' },
    { to: '/chords', label: 'Chord Library', icon: 'chords' },
    { to: '/practice', label: 'Practice Mode', icon: 'practice' },
    { to: '/strumming', label: 'Strumming', icon: 'strum' },
    { to: '/songs', label: 'Songs', icon: 'songs' },
    { to: '/progress', label: 'Progress', icon: 'progress' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="url(#ggrad)" strokeWidth="2" fill="none"/>
          <defs>
            <linearGradient id="ggrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a278ff"/>
              <stop offset="100%" stopColor="#f0c060"/>
            </linearGradient>
          </defs>
        </svg>
        <span>GuitarCoach</span>
      </div>

      <div className="sidebar-section">Learn</div>

      {navLinks.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.exact}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          {icons[link.icon]}
          {link.label}
        </NavLink>
      ))}

      <div className="sidebar-bottom">
        <div style={{ padding: '8px 12px', marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 2 }}>Signed in as</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text-1)' }}>
            {userProfile?.username || 'Guitarist'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 2 }}>
            {userProfile?.skillLevel || 'Beginner'}
          </div>
        </div>
        <button className="nav-item btn-ghost" onClick={handleLogout} style={{ width: '100%' }}>
          {icons.logout}
          Log Out
        </button>
      </div>
    </nav>
  );
}
