// src/pages/Songs.jsx
import React, { useState } from 'react';
import { SONGS } from '../data/chords';
import { useAuth } from '../services/AuthContext';
import { markSongCompleted } from '../services/userService';
import Toast from '../components/Toast';

function SongCard({ song, known, completed, onSelect }) {
  const canPlay = song.chords.every(c => known.includes(c));
  return (
    <div
      className="card"
      style={{ cursor: 'pointer', borderColor: completed ? 'var(--green)' : canPlay ? 'var(--border-accent)' : undefined }}
      onClick={() => onSelect(song)}
      onMouseEnter={e => e.currentTarget.style.borderColor = completed ? 'var(--green)' : 'var(--border-accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = completed ? 'var(--green)' : 'var(--border)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 2 }}>{song.title}</div>
          <div style={{ color: 'var(--text-3)', fontSize: 12 }}>{song.artist}</div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {completed && <span className="badge badge-green">✓ Done</span>}
          {canPlay && !completed && <span className="badge badge-accent">Ready</span>}
          {song.capo && <span className="badge badge-gold">Capo {song.capo}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {song.chords.map(c => (
          <span key={c} style={{
            padding: '2px 10px',
            borderRadius: 6,
            fontSize: 12,
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            background: known.includes(c) ? 'var(--green-dim)' : 'var(--bg-2)',
            color: known.includes(c) ? 'var(--green)' : 'var(--text-3)',
            border: `1px solid ${known.includes(c) ? 'var(--green)' : 'var(--border)'}`,
          }}>
            {c}
          </span>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{song.description}</div>
      <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-3)' }}>
        {song.bpm} BPM · {song.chords.length} chords
        {!canPlay && (
          <span style={{ color: 'var(--red)', marginLeft: 8 }}>
            Missing: {song.chords.filter(c => !known.includes(c)).join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}

function SongModal({ song, known, completed, onComplete, onClose }) {
  const canPlay = song.chords.every(c => known.includes(c));

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-accent)',
        borderRadius: 24, padding: 32, maxWidth: 560, width: '100%',
        maxHeight: '80vh', overflow: 'auto',
        boxShadow: 'var(--shadow-accent)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{song.title}</h2>
            <div style={{ color: 'var(--text-2)' }}>{song.artist}</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        {/* Info row */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>🎸 {song.bpm} BPM</div>
          {song.capo && <div style={{ fontSize: 13, color: 'var(--gold)' }}>🎵 Capo {song.capo}</div>}
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>⭐ {song.difficulty}</div>
        </div>

        {/* Required chords */}
        <div style={{ marginBottom: 20 }}>
          <div className="form-label">Required Chords</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {song.chords.map(c => (
              <span key={c} style={{
                padding: '6px 14px', borderRadius: 8,
                fontFamily: 'var(--font-serif)', fontSize: 20, fontStyle: 'italic',
                background: known.includes(c) ? 'var(--green-dim)' : 'var(--red-dim)',
                color: known.includes(c) ? 'var(--green)' : 'var(--red)',
                border: `1px solid ${known.includes(c) ? 'var(--green)' : 'var(--red)'}`,
              }}>
                {c} {known.includes(c) ? '✓' : '✗'}
              </span>
            ))}
          </div>
        </div>

        {/* Progression */}
        <div style={{ marginBottom: 24 }}>
          <div className="form-label">Chord Progression</div>
          {song.progression.map((section, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                {section.section}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {section.chords.map((c, j) => (
                  <div key={j} style={{
                    padding: '8px 16px',
                    background: 'var(--bg-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontStyle: 'italic',
                    color: 'var(--text-1)',
                  }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!canPlay && (
          <div className="error-msg" style={{ marginBottom: 16 }}>
            Learn {song.chords.filter(c => !known.includes(c)).join(', ')} to play this song.
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          {canPlay && !completed && (
            <button className="btn btn-success" onClick={onComplete}>✓ Mark as Completed</button>
          )}
          {completed && <span className="badge badge-green" style={{ padding: '10px 20px', fontSize: 14 }}>✓ Completed!</span>}
        </div>
      </div>
    </div>
  );
}

export default function Songs() {
  const { currentUser, userProfile, refreshProfile } = useAuth();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const known = userProfile?.knownChords || [];
  const songsCompleted = userProfile?.songsCompleted || [];

  const filtered = SONGS.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filter === 'ready') return s.chords.every(c => known.includes(c));
    if (filter === 'completed') return songsCompleted.includes(s.id);
    return true;
  });

  const handleComplete = async () => {
    if (!selected || !currentUser) return;
    await markSongCompleted(currentUser.uid, selected.id);
    await refreshProfile();
    setToast(`🎵 "${selected.title}" marked as completed!`);
    setSelected(null);
  };

  const readyCount = SONGS.filter(s => s.chords.every(c => known.includes(c))).length;

  return (
    <div>
      <h1 className="page-title">Song Library</h1>
      <p className="page-subtitle">{readyCount} songs you can play right now based on your chords.</p>

      {/* Search + filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          className="form-input"
          placeholder="Search songs or artists..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { k: 'all', label: `All (${SONGS.length})` },
            { k: 'ready', label: `Ready (${readyCount})` },
            { k: 'completed', label: `Done (${songsCompleted.length})` },
          ].map(f => (
            <button key={f.k} className={`btn btn-sm ${filter === f.k ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter(f.k)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card-grid">
        {filtered.map(song => (
          <SongCard
            key={song.id}
            song={song}
            known={known}
            completed={songsCompleted.includes(song.id)}
            onSelect={setSelected}
          />
        ))}
        {filtered.length === 0 && (
          <div style={{ color: 'var(--text-3)', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>
            No songs found. Try a different filter.
          </div>
        )}
      </div>

      {selected && (
        <SongModal
          song={selected}
          known={known}
          completed={songsCompleted.includes(selected.id)}
          onComplete={handleComplete}
          onClose={() => setSelected(null)}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  );
}
