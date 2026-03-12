// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signup(email, password, username);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '').replace(/\(.*\)/, '') || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          🎸 GuitarCoach
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
            {mode === 'login' ? 'Welcome back' : 'Start your journey'}
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: 13 }}>
            {mode === 'login' ? 'Pick up where you left off' : 'Create a free account to track your progress'}
          </p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="text"
                placeholder="Your guitarist name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 8 }} disabled={loading}>
            {loading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </div>

        <div className="divider" />
        <p style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center' }}>
          Connect your Firebase project to enable authentication &amp; data persistence.
        </p>
      </div>
    </div>
  );
}
