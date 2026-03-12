// src/services/userService.js
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';

export const createUserProfile = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  const defaults = {
    username: data.username || data.email?.split('@')[0] || 'Guitarist',
    email: data.email || '',
    skillLevel: 'Beginner',
    knownChords: [],
    practiceHistory: [],
    totalPracticeTime: 0,
    practiceStreak: 0,
    lastPracticeDate: null,
    songsCompleted: [],
    createdAt: new Date().toISOString(),
  };
  await setDoc(userRef, defaults, { merge: true });
  return defaults;
};

export const getUserProfile = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

export const updateUserProfile = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, data);
};

export const markChordLearned = async (uid, chord) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    knownChords: arrayUnion(chord)
  });
};

export const logPracticeSession = async (uid, session) => {
  const userRef = doc(db, 'users', uid);
  const sessionData = {
    ...session,
    date: new Date().toISOString(),
  };
  const snap = await getDoc(userRef);
  const user = snap.data();

  // Update streak
  const today = new Date().toDateString();
  const lastDate = user.lastPracticeDate ? new Date(user.lastPracticeDate).toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streak = user.practiceStreak || 0;
  if (lastDate !== today) {
    streak = lastDate === yesterday ? streak + 1 : 1;
  }

  await updateDoc(userRef, {
    practiceHistory: arrayUnion(sessionData),
    totalPracticeTime: (user.totalPracticeTime || 0) + (session.duration || 0),
    practiceStreak: streak,
    lastPracticeDate: new Date().toISOString(),
  });
};

export const markSongCompleted = async (uid, songId) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    songsCompleted: arrayUnion(songId)
  });
};
