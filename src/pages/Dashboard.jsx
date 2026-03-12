// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { CHORDS, SONGS } from '../data/chords';

export default function Dashboard() {
  const { userProfile } = useAuth();

  const knownChords = userProfile?.knownChords || [];
  const practiceHistory = userProfile?.practiceHistory || [];
  const totalMin = Math.round((userProfile?.totalPracticeTime || 0) / 60);
  const streak = userProfile?.practiceStreak || 0;
  const songsCompleted = userProfile?.songsCompleted || [];

  const progressPct = Math.round((knownChords.length / CHORDS.length) * 100);

  // Recommended songs: songs where user knows all chords
  const recommended = SONGS.filter(s =>
    s.chords.every(c => knownChords.includes(c))
  ).slice(0, 3);

  const recentSessions = [...practiceHistory].reverse().slice(0, 3);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title">
              Hey, {userProfile?.username || 'Guitarist'} 👋
            </h1>
            <p className="page-subtitle" style={{ margin: 0 }}>
              {streak > 0 ? `🔥 ${streak} day streak — keep it going!` : `Start your first practice session today.`}
            </p>
          </div>
          <Link to="/practice" className="btn btn-primary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5,3 19,12 5,21"/></svg>
            Practice Now
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { value: streak, label: 'Day Streak', color: 'var(--gold)', emoji: '🔥' },
          { value: knownChords.length, label: 'Chords Learned', color: 'var(--accent)', emoji: '🎸' },
          { value: songsCompleted.length, label: 'Songs Done', color: 'var(--green)', emoji: '🎵' },
          { value: totalMin, label: 'Minutes Practiced', color: 'var(--text-1)', emoji: '⏱' },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.emoji}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chord progress */}
      <div className="card mb-32">
        <div className="flex justify-between items-center mb-16">
          <h2 className="section-title" style={{ margin: 0 }}>Chord Progress</h2>
          <Link to="/chords" className="btn btn-ghost btn-sm">View All →</Link>
        </div>
        <div className="flex items-center gap-12 mb-16">
          <div className="progress-bar" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)', minWidth: 36 }}>
            {progressPct}%
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CHORDS.map(chord => (
            <div key={chord.id} style={{
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: 13,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              background: knownChords.includes(chord.id) ? 'var(--green-dim)' : 'var(--bg-2)',
              color: knownChords.includes(chord.id) ? 'var(--green)' : 'var(--text-3)',
              border: `1px solid ${knownChords.includes(chord.id) ? 'var(--green)' : 'var(--border)'}`,
              transition: 'all 0.2s',
            }}>
              {chord.id} {knownChords.includes(chord.id) && '✓'}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {/* Recommended songs */}
        <div className="card">
          <div className="flex justify-between items-center mb-16">
            <h2 className="section-title" style={{ margin: 0 }}>Songs You Can Play</h2>
            <Link to="/songs" className="btn btn-ghost btn-sm">All Songs →</Link>
          </div>
          {recommended.length === 0 ? (
            <div style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.8 }}>
              Learn a few chords to unlock song recommendations!<br/>
              <Link to="/chords" style={{ color: 'var(--accent)' }}>Start with the chord library →</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recommended.map(song => (
                <Link to="/songs" key={song.id} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'var(--bg-2)',
                    border: '1px solid var(--border)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 4 }}>{song.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{song.artist} · {song.chords.join(', ')}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="card">
          <h2 className="section-title">Recent Sessions</h2>
          {recentSessions.length === 0 ? (
            <div style={{ color: 'var(--text-3)', fontSize: 13 }}>
              No practice sessions yet. <Link to="/practice" style={{ color: 'var(--accent)' }}>Start one now →</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentSessions.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 10 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13 }}>
                      Practice Session
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
                      {s.chords?.join(', ') || 'Chords'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      {Math.round((s.duration || 0) / 60)}m
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
                      {new Date(s.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: 24 }} className="card">
        <h2 className="section-title">Quick Start</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link to="/tuner" className="btn btn-secondary">🎵 Tune Your Guitar</Link>
          <Link to="/chords" className="btn btn-secondary">📖 Browse Chords</Link>
          <Link to="/strumming" className="btn btn-secondary">🤘 Strumming Lessons</Link>
          <Link to="/songs" className="btn btn-secondary">🎶 Song Library</Link>
        </div>
      </div>
    </div>
  );
}
