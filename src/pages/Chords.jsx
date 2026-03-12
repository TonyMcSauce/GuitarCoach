// src/pages/Chords.jsx
import React, { useState } from 'react';
import { CHORDS } from '../data/chords';
import { useAuth } from '../services/AuthContext';
import { markChordLearned } from '../services/userService';
import ChordDiagram from '../components/ChordDiagram';
import Toast from '../components/Toast';

function ChordCard({ chord, learned, onSelect }) {
  return (
    <div
      className={`chord-card${learned ? ' learned' : ''}`}
      onClick={() => onSelect(chord)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div className="chord-name">{chord.id}</div>
        {learned && (
          <span className="badge badge-green">✓ Learned</span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 }}>
        {chord.name}
      </div>
      <div className="chord-svg-wrap">
        <ChordDiagram chord={chord} size={0.85} />
      </div>
    </div>
  );
}

function ChordModal({ chord, learned, onLearn, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-accent)',
        borderRadius: 24, padding: 32, maxWidth: 480, width: '100%',
        boxShadow: 'var(--shadow-accent)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontStyle: 'italic', fontWeight: 300, letterSpacing: -2, lineHeight: 1 }}>
              {chord.id}
            </div>
            <div style={{ color: 'var(--text-2)', fontSize: 13, marginTop: 4 }}>{chord.name}</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕ Close</button>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div className="chord-svg-wrap" style={{ flex: '0 0 auto' }}>
            <ChordDiagram chord={chord} size={1.1} />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-3)', marginBottom: 12 }}>
              Finger Placement
            </h3>
            {chord.fingers?.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, fontSize: 13 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {f.finger}
                </div>
                <span style={{ color: 'var(--text-2)' }}>
                  String {f.string}, Fret {f.fret}
                </span>
              </div>
            ))}

            <div style={{ marginTop: 16, padding: '12px', background: 'var(--bg-2)', borderRadius: 10, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
              💡 {chord.tips}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          {!learned ? (
            <button className="btn btn-success btn-full" onClick={onLearn}>
              ✓ Mark as Learned
            </button>
          ) : (
            <div className="badge badge-green" style={{ padding: '10px 20px', flex: 1, justifyContent: 'center', borderRadius: 10, fontSize: 14 }}>
              ✓ You know this chord!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Chords() {
  const { currentUser, userProfile, refreshProfile } = useAuth();
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');
  const [filter, setFilter] = useState('all');

  const knownChords = userProfile?.knownChords || [];

  const filtered = CHORDS.filter(c =>
    filter === 'all' ? true :
    filter === 'major' ? c.type === 'major' :
    filter === 'minor' ? c.type === 'minor' :
    filter === 'learned' ? knownChords.includes(c.id) : true
  );

  const handleLearn = async () => {
    if (!selected || !currentUser) return;
    await markChordLearned(currentUser.uid, selected.id);
    await refreshProfile();
    setToast(`🎸 ${selected.name} marked as learned!`);
    setSelected(null);
  };

  return (
    <div>
      <h1 className="page-title">Chord Library</h1>
      <p className="page-subtitle">Learn open chords for beginners. Click any chord to see fingering details.</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {['all', 'major', 'minor', 'learned'].map(f => (
          <button
            key={f}
            className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'} btn-sm`}
            onClick={() => setFilter(f)}
            style={{ textTransform: 'capitalize' }}
          >
            {f === 'all' ? `All (${CHORDS.length})` :
             f === 'major' ? `Major (${CHORDS.filter(c => c.type === 'major').length})` :
             f === 'minor' ? `Minor (${CHORDS.filter(c => c.type === 'minor').length})` :
             `Learned (${knownChords.length})`}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {filtered.map(chord => (
          <ChordCard
            key={chord.id}
            chord={chord}
            learned={knownChords.includes(chord.id)}
            onSelect={setSelected}
          />
        ))}
      </div>

      {selected && (
        <ChordModal
          chord={selected}
          learned={knownChords.includes(selected.id)}
          onLearn={handleLearn}
          onClose={() => setSelected(null)}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  );
}
