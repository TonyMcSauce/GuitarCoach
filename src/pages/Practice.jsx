// src/pages/Practice.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CHORDS } from '../data/chords';
import { useAuth } from '../services/AuthContext';
import { logPracticeSession } from '../services/userService';
import Toast from '../components/Toast';

function Metronome({ bpm, setBpm, active }) {
  const [beat, setBeat] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setBeat(b => !b);
      }, (60 / bpm) * 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [active, bpm]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: 'var(--bg-2)', borderRadius: 12 }}>
      <div style={{
        width: 12, height: 12, borderRadius: '50%',
        background: active && beat ? 'var(--accent)' : 'var(--bg-3)',
        boxShadow: active && beat ? '0 0 12px var(--accent-glow)' : 'none',
        transition: 'all 0.05s',
        flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <input
          type="range"
          min={40} max={200} value={bpm}
          onChange={e => setBpm(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)', marginTop: 2, fontFamily: 'var(--font-display)' }}>
          <span>Slow</span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>{bpm} BPM</span><span>Fast</span>
        </div>
      </div>
    </div>
  );
}

export default function Practice() {
  const { currentUser, refreshProfile } = useAuth();
  const [phase, setPhase] = useState('setup'); // setup | playing | summary
  const [selectedChords, setSelectedChords] = useState([]);
  const [interval, setIntervalSec] = useState(4);
  const [bpm, setBpm] = useState(80);
  const [currentChordIdx, setCurrentChordIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [switchCount, setSwitchCount] = useState(0);
  const [toast, setToast] = useState('');
  const timerRef = useRef(null);
  const switchRef = useRef(null);
  const startTimeRef = useRef(null);

  const toggleChord = (id) => {
    setSelectedChords(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const startSession = () => {
    if (selectedChords.length < 2) return;
    setPhase('playing');
    setCurrentChordIdx(0);
    setElapsed(0);
    setSwitchCount(0);
    startTimeRef.current = Date.now();

    // Clock
    timerRef.current = setInterval(() => {
      setElapsed(Math.round((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    // Chord switcher
    switchRef.current = setInterval(() => {
      setCurrentChordIdx(i => (i + 1) % selectedChords.length);
      setSwitchCount(c => c + 1);
    }, interval * 1000);
  };

  const endSession = useCallback(async () => {
    clearInterval(timerRef.current);
    clearInterval(switchRef.current);
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    setPhase('summary');
    setElapsed(duration);

    if (currentUser) {
      await logPracticeSession(currentUser.uid, {
        chords: selectedChords,
        duration,
        switchCount,
      });
      await refreshProfile();
    }
  }, [currentUser, selectedChords, switchCount, refreshProfile]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearInterval(switchRef.current);
  }, []);

  const fmt = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const currentChord = CHORDS.find(c => c.id === selectedChords[currentChordIdx]);

  if (phase === 'setup') {
    return (
      <div>
        <h1 className="page-title">Practice Mode</h1>
        <p className="page-subtitle">Select 2–4 chords to practice switching between them.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {/* Chord selector */}
          <div className="card">
            <h2 className="section-title">Select Chords (2–4)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {CHORDS.map(chord => (
                <button
                  key={chord.id}
                  className={`btn ${selectedChords.includes(chord.id) ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => toggleChord(chord.id)}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontStyle: 'italic', padding: '8px 18px' }}
                >
                  {chord.id}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: 'var(--text-3)' }}>
              {selectedChords.length === 0 ? 'Choose at least 2 chords' :
               selectedChords.length === 1 ? 'Choose 1 more chord' :
               `Ready: ${selectedChords.join(' → ')}`}
            </div>
          </div>

          {/* Settings */}
          <div className="card">
            <h2 className="section-title">Settings</h2>

            <div className="form-group">
              <label className="form-label">Chord Switch Interval: {interval}s</label>
              <input
                type="range" min={2} max={16} value={interval}
                onChange={e => setIntervalSec(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                <span>Fast (2s)</span><span>Slow (16s)</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Metronome</label>
              <Metronome bpm={bpm} setBpm={setBpm} active={false} />
            </div>

            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={startSession}
              disabled={selectedChords.length < 2}
              style={{ marginTop: 8 }}
            >
              ▶ Start Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'playing') {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 className="page-title" style={{ margin: 0 }}>Practicing</h1>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--gold)' }}>
              {fmt(elapsed)}
            </div>
            <button className="btn btn-ghost" onClick={endSession}>End Session</button>
          </div>
        </div>

        {/* Chord display */}
        <div className="card" style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 8, fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
            Play this chord
          </div>
          <div className="chord-prompt" key={currentChordIdx}>
            {selectedChords[currentChordIdx]}
          </div>
          {currentChord && (
            <div style={{ color: 'var(--text-2)', fontSize: 13 }}>{currentChord.name}</div>
          )}
          <div style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 8 }}>
            Changes in {interval}s
          </div>
        </div>

        {/* Queue */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {selectedChords.map((id, i) => (
              <div key={id} style={{
                padding: '8px 20px',
                borderRadius: 10,
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                fontStyle: 'italic',
                background: i === currentChordIdx ? 'var(--accent-dim)' : 'var(--bg-2)',
                color: i === currentChordIdx ? 'var(--accent)' : 'var(--text-3)',
                border: `1px solid ${i === currentChordIdx ? 'var(--border-accent)' : 'var(--border)'}`,
                transition: 'all 0.2s',
              }}>
                {id}
              </div>
            ))}
          </div>
        </div>

        {/* Metronome */}
        <div className="card">
          <div className="section-title">Metronome</div>
          <Metronome bpm={bpm} setBpm={setBpm} active={true} />
        </div>
      </div>
    );
  }

  if (phase === 'summary') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎸</div>
        <h1 className="page-title">Session Complete!</h1>
        <p className="page-subtitle">Great work. Every session builds muscle memory.</p>

        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <div className="stat-value" style={{ color: 'var(--gold)' }}>{fmt(elapsed)}</div>
              <div className="stat-label">Time</div>
            </div>
            <div>
              <div className="stat-value" style={{ color: 'var(--accent)' }}>{switchCount}</div>
              <div className="stat-label">Switches</div>
            </div>
            <div>
              <div className="stat-value" style={{ color: 'var(--green)' }}>{selectedChords.length}</div>
              <div className="stat-label">Chords</div>
            </div>
          </div>
          <div className="divider" />
          <div style={{ color: 'var(--text-2)', fontSize: 13 }}>
            Practiced: <strong style={{ color: 'var(--text-1)' }}>{selectedChords.join(', ')}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => setPhase('setup')}>
            Practice Again
          </button>
        </div>
      </div>
    );
  }
}
