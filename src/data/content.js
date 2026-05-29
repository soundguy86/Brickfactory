// Zentrale Inhaltsdaten für die BandStage-Pro-Landingpage.
// Bewusst getrennt vom UI, damit später ein CMS / Supabase andocken kann.

export const COACHING_LEVELS = [
  {
    id: 'rookie',
    ch: '01',
    name: 'Rookie',
    price: 199,
    duration: '4 Std.',
    tag: 'Erster Gig',
    features: ['PA-Basics & Signalweg', 'Mikrofonierung', 'Simpler Soundcheck'],
    desc: 'Für junge Bands kurz vor dem ersten Auftritt.',
  },
  {
    id: 'intermediate',
    ch: '02',
    name: 'Intermediate',
    price: 349,
    duration: '6 Std.',
    tag: 'Routine',
    features: ['Gain-Staging', 'Monitoring-Grundlagen', 'Feedback bekämpfen'],
    desc: 'Für Bands mit ein paar Gigs auf dem Buckel.',
  },
  {
    id: 'advanced',
    ch: '03',
    name: 'Advanced',
    price: 549,
    duration: '8 Std.',
    tag: 'Tour-Niveau',
    features: ['In-Ear-Monitoring', 'FOH-Mixing', 'Bühnen-Setup & Patch'],
    desc: 'Für ambitionierte Bands, die sauber klingen wollen.',
  },
  {
    id: 'masterclass',
    ch: '04',
    name: 'Masterclass',
    price: 899,
    duration: '2 Tage',
    tag: 'Profi',
    features: ['Komplette Live-Produktion', 'Multitrack-Recording', 'Tour-Readiness'],
    desc: 'Das volle Programm. Bühne wie auf großer Tour.',
    featured: true,
  },
]

export const SERVICES = [
  {
    id: 'starter',
    name: 'Starter',
    price: 350,
    line: 'FOH-Engineer + Basis-Equipment',
    detail: 'Ein:e Tontechniker:in am Pult, sauberer Sound für Club-Gigs.',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 650,
    line: 'FOH + Monitor-Engineer + Stage-Manager',
    detail: 'Volles Team für Festivals und größere Bühnen.',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1200,
    line: 'Full Production + Multi-Track-Recording',
    detail: 'Komplette Produktion inkl. Mitschnitt für Release & Reels.',
  },
]

export const STEPS = [
  {
    n: '01',
    title: 'Level finden',
    body: 'Kurzer Check, ehrliche Einschätzung. Wo steht ihr beim Live-Sound wirklich?',
  },
  {
    n: '02',
    title: 'Coaching',
    body: 'Hands-on am echten Equipment. Kein Theorie-Seminar, sondern Bühne.',
  },
  {
    n: '03',
    title: 'Apply',
    body: 'Beim nächsten Gig holt ihr euch dasselbe Team als Live-Crew dazu.',
  },
]

export const FAQS = [
  {
    q: 'Wie unterscheiden sich die Coaching-Levels?',
    a: 'Von PA-Grundlagen (Rookie) bis zur kompletten Live-Produktion (Masterclass). Wir starten dort, wo ihr steht – nicht beim Lehrbuch-Kapitel 1.',
  },
  {
    q: 'Was ist im Coaching enthalten?',
    a: 'Equipment, Raum, ein:e erfahrene:r Live-Engineer und ein Setup, das eurem echten Gig entspricht. Ihr fasst alles selbst an.',
  },
  {
    q: 'Kann ich nach dem Coaching Services buchen?',
    a: 'Genau das ist der Plan. Coaching-Alumni bekommen die erste Live-Buchung mit 20 % Rabatt – das gleiche Team kennt euren Sound dann schon.',
  },
  {
    q: 'Kann ich einen Termin verschieben?',
    a: 'Bis 72 Std. vorher kostenlos. Danach finden wir trotzdem eine faire Lösung – wir sind Musiker:innen, kein Inkassobüro.',
  },
  {
    q: 'Welches Equipment bringe ich mit?',
    a: 'Eure Instrumente und das, womit ihr live spielt. PA, Pult, Mikros und Stative stehen bereit.',
  },
]

export const NAV = [
  { href: '#coaching', label: 'Coaching' },
  { href: '#services', label: 'Live-Service' },
  { href: '#ablauf', label: 'Ablauf' },
  { href: '#faq', label: 'FAQ' },
]

export const MARQUEE = [
  'Live Sound Engineering',
  'Band Coaching',
  'FOH Mixing',
  'In-Ear Monitoring',
  'Stage Management',
  'Multitrack Recording',
  'Regensburg',
]
