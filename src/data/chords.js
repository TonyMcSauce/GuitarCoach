// src/data/chords.js
export const CHORDS = [
  {
    id: 'C',
    name: 'C Major',
    type: 'major',
    difficulty: 'beginner',
    fingers: [
      { string: 2, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 3, finger: 3 },
    ],
    openStrings: [1, 3],
    mutedStrings: [6],
    tips: 'Curl your fingers and press just behind the frets. Keep your thumb behind the neck.',
    diagram: [
      [0, 'x', 3, 2, 0, 1], // strings 6-1
    ],
    svgData: {
      frets: ['x', 3, 2, 0, 1, 0],
      startFret: 0,
      fingers: [
        { str: 2, fret: 1, finger: 1 },
        { str: 3, fret: 2, finger: 2 },
        { str: 4, fret: 3, finger: 3 },
      ]
    }
  },
  {
    id: 'D',
    name: 'D Major',
    type: 'major',
    difficulty: 'beginner',
    fingers: [
      { string: 1, fret: 2, finger: 1 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 2 },
    ],
    openStrings: [4],
    mutedStrings: [5, 6],
    tips: 'This chord can feel cramped at first. Keep your wrist relaxed and fingers arched.',
    svgData: {
      frets: ['x', 'x', 0, 2, 3, 2],
      startFret: 0,
      fingers: [
        { str: 1, fret: 2, finger: 1 },
        { str: 3, fret: 2, finger: 2 },
        { str: 2, fret: 3, finger: 3 },
      ]
    }
  },
  {
    id: 'E',
    name: 'E Major',
    type: 'major',
    difficulty: 'beginner',
    fingers: [
      { string: 3, fret: 1, finger: 1 },
      { string: 5, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
    openStrings: [1, 2, 6],
    mutedStrings: [],
    tips: 'All 6 strings ring out. This is one of the easiest and most powerful chords.',
    svgData: {
      frets: [0, 2, 2, 1, 0, 0],
      startFret: 0,
      fingers: [
        { str: 4, fret: 1, finger: 1 },
        { str: 3, fret: 2, finger: 3 },
        { str: 2, fret: 2, finger: 2 },
      ]
    }
  },
  {
    id: 'G',
    name: 'G Major',
    type: 'major',
    difficulty: 'beginner',
    fingers: [
      { string: 6, fret: 3, finger: 2 },
      { string: 5, fret: 2, finger: 1 },
      { string: 1, fret: 3, finger: 3 },
    ],
    openStrings: [2, 3, 4],
    mutedStrings: [],
    tips: 'Stretch your fingers wide. The G chord has a big, full sound.',
    svgData: {
      frets: [3, 2, 0, 0, 0, 3],
      startFret: 0,
      fingers: [
        { str: 2, fret: 2, finger: 1 },
        { str: 6, fret: 3, finger: 2 },
        { str: 1, fret: 3, finger: 4 },
      ]
    }
  },
  {
    id: 'A',
    name: 'A Major',
    type: 'major',
    difficulty: 'beginner',
    fingers: [
      { string: 4, fret: 2, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 2, fret: 2, finger: 3 },
    ],
    openStrings: [1, 5],
    mutedStrings: [6],
    tips: 'Three fingers on the 2nd fret. Try to keep them all from touching other strings.',
    svgData: {
      frets: ['x', 0, 2, 2, 2, 0],
      startFret: 0,
      fingers: [
        { str: 4, fret: 2, finger: 1 },
        { str: 3, fret: 2, finger: 2 },
        { str: 2, fret: 2, finger: 3 },
      ]
    }
  },
  {
    id: 'Am',
    name: 'A Minor',
    type: 'minor',
    difficulty: 'beginner',
    fingers: [
      { string: 4, fret: 2, finger: 2 },
      { string: 3, fret: 2, finger: 3 },
      { string: 2, fret: 1, finger: 1 },
    ],
    openStrings: [1, 5],
    mutedStrings: [6],
    tips: 'Very similar to E major — just moved over one string. Learn both and switch between them!',
    svgData: {
      frets: ['x', 0, 2, 2, 1, 0],
      startFret: 0,
      fingers: [
        { str: 3, fret: 1, finger: 1 },
        { str: 4, fret: 2, finger: 2 },
        { str: 3, fret: 2, finger: 3 },
      ]
    }
  },
  {
    id: 'Em',
    name: 'E Minor',
    type: 'minor',
    difficulty: 'beginner',
    fingers: [
      { string: 5, fret: 2, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
    ],
    openStrings: [1, 2, 3, 6],
    mutedStrings: [],
    tips: 'The easiest chord on guitar. Only 2 fingers. Play all 6 strings.',
    svgData: {
      frets: [0, 2, 2, 0, 0, 0],
      startFret: 0,
      fingers: [
        { str: 3, fret: 2, finger: 1 },
        { str: 2, fret: 2, finger: 2 },
      ]
    }
  },
  {
    id: 'Dm',
    name: 'D Minor',
    type: 'minor',
    difficulty: 'beginner',
    fingers: [
      { string: 1, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 2, fret: 3, finger: 3 },
    ],
    openStrings: [4],
    mutedStrings: [5, 6],
    tips: 'Similar shape to D major but sadder sounding. The 1st finger goes on the 1st fret.',
    svgData: {
      frets: ['x', 'x', 0, 2, 3, 1],
      startFret: 0,
      fingers: [
        { str: 2, fret: 1, finger: 1 },
        { str: 3, fret: 2, finger: 2 },
        { str: 1, fret: 3, finger: 3 },
      ]
    }
  },
];

// src/data/songs.js
export const SONGS = [
  {
    id: 1,
    title: "Knockin' on Heaven's Door",
    artist: "Bob Dylan",
    difficulty: "Beginner",
    chords: ["G", "D", "Am"],
    capo: null,
    bpm: 72,
    progression: [
      { section: "Verse", chords: ["G", "D", "Am", "Am"] },
      { section: "Chorus", chords: ["G", "D", "G", "G"] },
    ],
    description: "Classic 3-chord song with a slow, easy tempo."
  },
  {
    id: 2,
    title: "Horse With No Name",
    artist: "America",
    difficulty: "Beginner",
    chords: ["Em", "D"],
    capo: null,
    bpm: 80,
    progression: [
      { section: "Verse", chords: ["Em", "D", "Em", "D"] },
    ],
    description: "Only 2 chords! Perfect for total beginners."
  },
  {
    id: 3,
    title: "Wonderwall",
    artist: "Oasis",
    difficulty: "Beginner",
    chords: ["Em", "G", "D", "A"],
    capo: 2,
    bpm: 87,
    progression: [
      { section: "Verse", chords: ["Em", "G", "D", "A"] },
      { section: "Chorus", chords: ["G", "D", "Em", "G"] },
    ],
    description: "One of the most iconic beginner songs ever written."
  },
  {
    id: 4,
    title: "Brown Eyed Girl",
    artist: "Van Morrison",
    difficulty: "Beginner",
    chords: ["G", "C", "D", "Em"],
    capo: null,
    bpm: 148,
    progression: [
      { section: "Verse", chords: ["G", "C", "G", "D"] },
      { section: "Chorus", chords: ["G", "C", "G", "D"] },
    ],
    description: "A timeless feel-good song with classic chord changes."
  },
  {
    id: 5,
    title: "House of the Rising Sun",
    artist: "The Animals",
    difficulty: "Beginner",
    chords: ["Am", "C", "D", "Em"],
    capo: null,
    bpm: 96,
    progression: [
      { section: "Verse", chords: ["Am", "C", "D", "D", "Am", "Am", "E", "E"] },
    ],
    description: "Minor chord progression with a haunting feel."
  },
  {
    id: 6,
    title: "Stand By Me",
    artist: "Ben E. King",
    difficulty: "Beginner",
    chords: ["G", "Em", "C", "D"],
    capo: null,
    bpm: 120,
    progression: [
      { section: "Verse", chords: ["G", "G", "Em", "Em", "C", "D", "G", "G"] },
    ],
    description: "Classic 4-chord pop progression."
  },
  {
    id: 7,
    title: "Let Her Go",
    artist: "Passenger",
    difficulty: "Beginner",
    chords: ["G", "D", "Em", "C"],
    capo: null,
    bpm: 100,
    progression: [
      { section: "Verse", chords: ["G", "D", "Em", "C"] },
    ],
    description: "Modern acoustic classic with a beautiful finger-picking pattern."
  },
  {
    id: 8,
    title: "Take Me Home, Country Roads",
    artist: "John Denver",
    difficulty: "Beginner",
    chords: ["G", "Em", "D", "C"],
    capo: null,
    bpm: 120,
    progression: [
      { section: "Verse", chords: ["G", "G", "Em", "D", "D", "C", "G", "G"] },
      { section: "Chorus", chords: ["G", "D", "Em", "C", "G", "D", "G"] },
    ],
    description: "Beloved folk anthem everyone knows."
  },
  {
    id: 9,
    title: "Leaving on a Jet Plane",
    artist: "John Denver",
    difficulty: "Beginner",
    chords: ["G", "C", "D"],
    capo: null,
    bpm: 76,
    progression: [
      { section: "Verse", chords: ["G", "C", "G", "C", "G", "D"] },
    ],
    description: "3 chords, slow tempo, and a beloved melody."
  },
  {
    id: 10,
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    difficulty: "Beginner",
    chords: ["Em", "G", "A", "C"],
    capo: null,
    bpm: 63,
    progression: [
      { section: "Intro", chords: ["Em", "G", "Em", "G"] },
      { section: "Verse", chords: ["C", "D", "Am", "G"] },
    ],
    description: "Iconic song with a legendary intro riff."
  },
  {
    id: 11,
    title: "Love Yourself",
    artist: "Justin Bieber",
    difficulty: "Beginner",
    chords: ["C", "G", "Am", "Em", "D"],
    capo: null,
    bpm: 96,
    progression: [
      { section: "Verse", chords: ["C", "G", "Am", "Em"] },
      { section: "Chorus", chords: ["G", "D", "C", "G"] },
    ],
    description: "Modern pop with clean chord progressions."
  },
  {
    id: 12,
    title: "Zombie",
    artist: "The Cranberries",
    difficulty: "Beginner",
    chords: ["Am", "C", "G", "Em"],
    capo: null,
    bpm: 95,
    progression: [
      { section: "Verse/Chorus", chords: ["Am", "C", "G", "Em"] },
    ],
    description: "Powerful song with a simple repeating 4-chord loop."
  },
  {
    id: 13,
    title: "Hallelujah",
    artist: "Leonard Cohen",
    difficulty: "Beginner",
    chords: ["C", "Am", "G", "Em"],
    capo: null,
    bpm: 68,
    progression: [
      { section: "Verse", chords: ["C", "Am", "C", "Am"] },
      { section: "Chorus", chords: ["G", "Em", "G", "C"] },
    ],
    description: "One of the most beautiful songs ever written."
  },
  {
    id: 14,
    title: "Fast Car",
    artist: "Tracy Chapman",
    difficulty: "Beginner",
    chords: ["C", "G", "Am", "Em"],
    capo: null,
    bpm: 112,
    progression: [
      { section: "Verse", chords: ["C", "G", "Am", "Em"] },
    ],
    description: "Timeless acoustic classic with a steady rhythm."
  },
  {
    id: 15,
    title: "Counting Stars",
    artist: "OneRepublic",
    difficulty: "Beginner",
    chords: ["Am", "C", "G", "Em"],
    capo: null,
    bpm: 122,
    progression: [
      { section: "Verse", chords: ["Am", "C", "G", "Em"] },
      { section: "Chorus", chords: ["Am", "C", "G", "Em"] },
    ],
    description: "Hugely popular song with a catchy 4-chord loop."
  },
];

export const STRUMMING_PATTERNS = [
  {
    id: 'downstrokes',
    name: 'Downstrokes Only',
    difficulty: 'Beginner',
    description: 'The most fundamental strumming pattern. All strokes go down.',
    beats: ['D', 'D', 'D', 'D'],
    bpm: 60,
    timeSignature: '4/4',
  },
  {
    id: 'down-up',
    name: 'Down-Up Pattern',
    difficulty: 'Beginner',
    description: 'The bread-and-butter of rhythm guitar. Down on beats, up on the "and"s.',
    beats: ['D', 'U', 'D', 'U', 'D', 'U', 'D', 'U'],
    bpm: 70,
    timeSignature: '4/4',
  },
  {
    id: 'pop-rhythm',
    name: 'Pop Rhythm',
    difficulty: 'Intermediate',
    description: 'A syncopated pattern used in countless pop and rock songs.',
    beats: ['D', 'D', 'U', 'U', 'D', 'U'],
    bpm: 80,
    timeSignature: '4/4',
  },
];
