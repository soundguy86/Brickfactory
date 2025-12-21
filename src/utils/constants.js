// Coaching Levels Configuration
export const COACHING_LEVELS = [
  {
    id: 'rookie',
    name: 'Rookie',
    price: 199,
    duration: '4h',
    color: '#00D9FF',
    features: [
      'PA-Basics & Setup',
      'Mikrofonierung Basics',
      'Simple Soundcheck',
      'Basic Monitor-Setup',
      'Equipment-Übersicht'
    ],
    desc: 'Perfekt für junge Bands vor dem ersten Gig.',
    icon: '🎸'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    price: 349,
    duration: '6h',
    color: '#4ADE80',
    features: [
      'Advanced Mikrofonierung',
      'EQ & Kompression Basics',
      'Monitor-Mixing',
      'Feedback-Prevention',
      'Soundcheck-Strategie',
      'Bühnenkommunikation'
    ],
    desc: 'Für Bands mit ersten Gig-Erfahrungen.',
    icon: '🎤'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 549,
    duration: '8h',
    color: '#FF6B35',
    features: [
      'Pro Mixing-Techniken',
      'Multi-Track Recording',
      'Wireless Systems',
      'In-Ear Monitoring',
      'FOH & Monitor Engineering',
      'Live-Recording Setup',
      'Troubleshooting'
    ],
    desc: 'Für ambitionierte Bands mit regelmäßigen Gigs.',
    icon: '🎛️'
  },
  {
    id: 'masterclass',
    name: 'Masterclass',
    price: 899,
    duration: '12h',
    color: '#9333EA',
    features: [
      'Full Production Workflow',
      'Digital Mixing Consoles',
      'Advanced Monitoring',
      'Multi-Track Recording & Editing',
      'Stage & Production Management',
      'Tour-Vorbereitung',
      'Business-Aspekte',
      '1:1 Coaching Session'
    ],
    desc: 'Für professionelle Bands & Touren.',
    icon: '🚀'
  }
];

// Quiz Questions for Level Finder
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Wie viele Live-Gigs habt ihr bereits gespielt?",
    options: [
      { text: "Noch keinen", score: 1, levelHint: 'rookie' },
      { text: "1-5 Gigs", score: 2, levelHint: 'intermediate' },
      { text: "6-20 Gigs", score: 3, levelHint: 'advanced' },
      { text: "Über 20 Gigs", score: 4, levelHint: 'masterclass' }
    ]
  },
  {
    id: 2,
    question: "Wie gut kennt ihr euch mit PA-Technik aus?",
    options: [
      { text: "Gar nicht - wir brauchen Basics", score: 1, levelHint: 'rookie' },
      { text: "Grundlagen sind da, aber unsicher", score: 2, levelHint: 'intermediate' },
      { text: "Gute Kenntnisse, wollen mehr lernen", score: 3, levelHint: 'advanced' },
      { text: "Sehr gut - wollen auf Pro-Level", score: 4, levelHint: 'masterclass' }
    ]
  },
  {
    id: 3,
    question: "Was ist euer Hauptziel?",
    options: [
      { text: "Ersten Gig erfolgreich meistern", score: 1, levelHint: 'rookie' },
      { text: "Besseren Live-Sound erreichen", score: 2, levelHint: 'intermediate' },
      { text: "Professionelle Gigs & Festivals", score: 3, levelHint: 'advanced' },
      { text: "Tour-Ready werden & Recording", score: 4, levelHint: 'masterclass' }
    ]
  }
];

// Service Packages (Phase 3 - für Services-Teaser)
export const SERVICE_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    price: 350,
    features: [
      'FOH-Engineer (4h)',
      'Basic PA-Equipment',
      'Soundcheck & Show',
      'Basic Mikrofonierung'
    ],
    desc: 'Perfekt für kleinere Gigs & Club-Shows.',
    icon: '🎵'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 650,
    features: [
      'FOH-Engineer (6h)',
      'Monitor-Engineer',
      'Professional PA-Equipment',
      'Stage Manager',
      'Advanced Mikrofonierung',
      'Wireless Systems'
    ],
    desc: 'Für größere Venues & wichtige Shows.',
    icon: '🎸',
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1200,
    features: [
      'Full Production Team',
      'FOH & Monitor Engineer',
      'Stage Manager',
      'Multi-Track Recording',
      'Pro PA & Monitoring',
      'Wireless Systems',
      'Video-Dokumentation',
      'Post-Production & Mixing'
    ],
    desc: 'Full-Service für Festivals & Premium-Events.',
    icon: '🚀'
  }
];

// FAQ Data
export const FAQ_DATA = [
  {
    id: 1,
    question: "Wie unterscheiden sich die Coaching-Levels?",
    answer: "Jedes Level ist auf eure Erfahrung zugeschnitten: Rookie für Einsteiger, Intermediate für Bands mit ersten Gigs, Advanced für erfahrene Bands und Masterclass für professionelle Acts. Die Levels unterscheiden sich in Dauer, Tiefe der Themen und Praxisanteil."
  },
  {
    id: 2,
    question: "Kann ich das Coaching verschieben?",
    answer: "Ja, bis 7 Tage vor dem Termin kostenlos. Danach berechnen wir 50% der Coaching-Gebühr. Bei Absage unter 48h vor Termin verfällt die volle Gebühr."
  },
  {
    id: 3,
    question: "Was ist im Coaching alles enthalten?",
    answer: "Alle Coachings beinhalten: Theoretischer Input, praktische Übungen an echter PA, individuelles Feedback, Handouts & Checklisten, sowie Follow-up Support per E-Mail für 30 Tage nach dem Coaching."
  },
  {
    id: 4,
    question: "Kann ich nach dem Coaching Services buchen?",
    answer: "Absolut! Als Coaching-Alumni erhaltet ihr 20% Rabatt auf eure erste Service-Buchung. Ihr kennt dann schon das Team und wir kennen euren Sound - perfekte Kombination!"
  },
  {
    id: 5,
    question: "Gibt es Rabatte für Gruppen?",
    answer: "Ja! Ab 3 Bandmitgliedern ist der Preis bereits inkludiert. Wenn mehrere Bands zusammen buchen wollen (z.B. gemeinsamer Proberaum), meldet euch für ein individuelles Angebot."
  },
  {
    id: 6,
    question: "Wie verläuft ein typisches Coaching ab?",
    answer: "Start mit Theorie & Grundlagen, dann praktische Übungen an der PA mit eurer Band, Live-Soundcheck Simulation, Q&A Session und zum Abschluss individuelles Feedback mit Handouts."
  },
  {
    id: 7,
    question: "Welches Equipment bringe ich mit?",
    answer: "Nur eure Instrumente & Motivation! Wir stellen die komplette PA, Mikrofone, Kabel, Monitoring etc. Falls ihr eigenes Equipment habt (z.B. Wireless-Systeme), könnt ihr das gerne mitbringen."
  }
];

// Application Constants
export const APP_CONFIG = {
  adminEmail: 'admin@bandstage-pro.de',
  supportEmail: 'support@bandstage-pro.de',
  phone: '+49 941 12345678',
  address: 'Regensburg, Bayern',
  businessHours: 'Mo-Fr 10:00-18:00 Uhr',
  socialMedia: {
    instagram: 'https://instagram.com/bandstage.pro',
    facebook: 'https://facebook.com/bandstage.pro'
  }
};
