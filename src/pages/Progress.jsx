// src/pages/Progress.jsx
import React from 'react';
import { useAuth } from '../services/AuthContext';
import { CHORDS, SONGS } from '../data/chords';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontSize: 13 }}>{p.value} {p.name}</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Progress() {
  const { userProfile } = useAuth();

  const knownChords = userProfile?.knownChords || [];
  const practiceHistory = userProfile?.practiceHistory || [];
  const totalSec = userProfile?.totalPracticeTime || 0;
  const streak = userProfile?.practiceStreak || 0;
  const songsCompleted = userProfile?.songsCompleted || [];

  // Build chart data: last 7 days practice
  const dayData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString('en', { weekday: 'short' });
    const sessions = practiceHistory.filter(s => {
      const sd = new Date(s.date);
      return sd.toDateString() === d.toDateString();
    });
    const minutes = sessions.reduce((a, s) => a + Math.round((s.duration || 0) / 60), 0);
    return { day: label, minutes };
  });

  // Chord breakdown for chart
  const chordChartData = CHORDS.map(c => ({
    chord: c.id,
    status: knownChords.includes(c.id) ? 1 : 0,
  }));

  const totalMin = Math.round(totalSec / 60);
  const totalHours = (totalMin / 60).toFixed(1);

  return (
    <div>
      <h1 className="page-title">Your Progress</h1>
      <p className="page-subtitle">Track your growth as a guitarist.</p>

      {/* Main stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Day Streak', value: streak, unit: 'days', color: 'var(--gold)', emoji: '🔥' },
          { label: 'Chords Learned', value: `${knownChords.length}/${CHORDS.length}`, unit: '', color: 'var(--accent)', emoji: '🎸' },
          { label: 'Songs Completed', value: `${songsCompleted.length}/${SONGS.length}`, unit: '', color: 'var(--green)', emoji: '🎵' },
          { label: 'Total Practice', value: totalHours, unit: 'hrs', color: 'var(--text-1)', emoji: '⏱' },
          { label: 'Sessions', value: practiceHistory.length, unit: '', color: 'var(--text-1)', emoji: '📅' },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.emoji}</div>
            <div className="stat-value" style={{ color: s.color, fontSize: 28 }}>
              {s.value}<span style={{ fontSize: 14, color: 'var(--text-3)' }}>{s.unit}</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 24 }}>
        {/* Practice chart */}
        <div className="card">
          <h2 className="section-title">Practice Minutes (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dayData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-3)', fontSize: 11, fontFamily: 'var(--font-display)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(162,120,255,0.05)' }} />
              <Bar dataKey="minutes" name="min" fill="var(--accent)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          {practiceHistory.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 13, marginTop: 8 }}>
              Complete a practice session to see your chart.
            </div>
          )}
        </div>

        {/* Chord mastery */}
        <div className="card">
          <h2 className="section-title">Chord Mastery</h2>
          <div style={{ marginBottom: 16 }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(knownChords.length / CHORDS.length) * 100}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              <span>{knownChords.length} Learned</span>
              <span>{CHORDS.length - knownChords.length} Remaining</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CHORDS.map(c => (
              <div key={c.id} style={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                background: knownChords.includes(c.id) ? 'var(--green-dim)' : 'var(--bg-2)',
                border: `1px solid ${knownChords.includes(c.id) ? 'var(--green)' : 'var(--border)'}`,
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 16,
                color: knownChords.includes(c.id) ? 'var(--green)' : 'var(--text-3)',
                position: 'relative',
              }}>
                {c.id}
                {knownChords.includes(c.id) && (
                  <div style={{ position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderRadius: '50%', background: 'var(--green)', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 700 }}>
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent sessions list */}
      <div className="card">
        <h2 className="section-title">Practice History</h2>
        {practiceHistory.length === 0 ? (
          <div style={{ color: 'var(--text-3)', fontSize: 13 }}>
            No sessions yet. Head to Practice Mode to get started!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[...practiceHistory].reverse().slice(0, 10).map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-2)', borderRadius: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 2 }}>
                    Practice Session
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                    {s.chords?.join(' · ') || 'Unknown chords'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                      {Math.round((s.duration || 0) / 60)} min
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
                      {s.switchCount || 0} switches
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 70, textAlign: 'right' }}>
                    {new Date(s.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
