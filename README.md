# Brickfactory
Live sound engineering platform
🎸 BandStage Pro Regensburg - HANDOVER for Claude Code
Projekt-Status: Phase 2 - Backend-Integration & Feature-Expansion
Gültig ab: Dezember 2025
Owner: Tom (BandStage Pro)
Entwicklungs-Umgebung: React.js + Framer Motion

📋 PROJEKT-ÜBERSICHT
Was ist BandStage Pro?
BandStage Pro Regensburg ist eine digitale Plattform zur Buchung von:

🎯 Individuelles Band-Coaching (4 Level: Rookie, Intermediate, Advanced, Masterclass)
🎙️ Full-Service Live-Production (Sound Engineering, Stage Management, Monitoring)

Zielgruppe: Ambitionierte Bands in Regensburg (18-45 Jahre), die ihren Live-Sound professionalisieren wollen.
Kernwert: "Learn & Apply" - Bands lernen im Coaching, buchen dann direkt Services vom gleichen Team.
Aktuelle Phase

✅ Frontend fertig: Vollständig funktionierende React-App mit Booking-System
⏳ Phase 2 Ziel: Backend-Integration + erweiterte Features
📅 Timeline: 4 Wochen bis Live (Dezember 2025)


🏗️ ARCHITEKTUR & TECHNOLOGIE-STACK
Frontend (Aktuelle Codebase)
Framework:        React.js
Animation:        Framer Motion
Icons:            Lucide React
Styling:          Tailwind CSS (inline + dark mode)
State Management: useState / useContext (einfach gehalten)
Responsiveness:   Mobile-First Design
Backend (zu implementieren)
Datenbank:        Supabase (PostgreSQL) ODER Firebase
Payment:          Stripe API
Calendar:         Google Calendar API
Email:            SendGrid oder Mailgun
Authentication:   Supabase Auth oder Firebase Auth
Admin-Panel:      React-Admin oder Custom Dashboard
Hosting:          Vercel oder Netlify (Frontend)
Dateistruktur (Geplant)
/bandstage-pro-regensburg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── LevelFinder.jsx (Quiz)
│   │   ├── CoachingCards.jsx
│   │   ├── BookingForm.jsx (Multi-Step)
│   │   ├── Testimonials.jsx (NEU)
│   │   ├── FAQ.jsx (NEU)
│   │   ├── Services.jsx (NEU)
│   │   ├── Footer.jsx
│   │   └── Admin/ (NEU)
│   │       ├── Dashboard.jsx
│   │       ├── BookingsList.jsx
│   │       ├── CalendarManager.jsx
│   │       └── AnalyticsPanel.jsx
│   ├── hooks/
│   │   ├── useBooking.js (NEU)
│   │   ├── usePayment.js (NEU)
│   │   └── useAuth.js (NEU)
│   ├── services/ (NEU)
│   │   ├── api.js (Backend-Calls)
│   │   ├── supabase.js (DB-Connection)
│   │   ├── stripe.js (Payment)
│   │   ├── sendgrid.js (Email)
│   │   └── google-calendar.js (Calendar)
│   ├── utils/
│   │   ├── constants.js (COACHING_LEVELS, QUIZ_QUESTIONS)
│   │   └── helpers.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── pages/ (NEU)
│   │   ├── HomePage.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── BookingConfirmation.jsx
│   └── App.jsx (Root-Component)
├── public/
│   ├── index.html
│   └── favicon.ico
├── .env.example
├── .env.local (Git-ignoriert, lokal nur)
├── package.json
├── tailwind.config.js
├── .gitignore
├── README.md
└── DEVELOPMENT.md

💻 AKTUELLE CODEBASE (Basis für Phase 2)
Kern-Component: BandStageApp.jsx
jsx// Hauptkomponente - verwaltet alle States & Views
// Views: 'home', 'quiz', 'booking', 'success'
// Enthalten: Hero, LevelFinder, CoachingCards, BookingForm, SuccessPage
// Verwendet: Framer Motion für Animationen
Daten-Struktur (constants.js)
javascriptconst COACHING_LEVELS = [
  {
    id: 'rookie',
    name: 'Rookie',
    price: 199,
    duration: '4h',
    color: '#00D9FF',
    features: ['PA-Basics', 'Mikrofonierung', 'Simple Soundcheck'],
    desc: 'Perfekt für junge Bands vor dem ersten Gig.'
  },
  // ... 3 weitere Level (Intermediate, Advanced, Masterclass)
];

const QUIZ_QUESTIONS = [
  {
    q: "Wie viele Live-Gigs habt ihr bereits gespielt?",
    options: [
      { t: "Noch keinen", score: 1 },
      // ...
    ]
  },
  // ... 2 weitere Fragen
];
Styling (Tailwind + Inline)

Dark Mode: bg-[#0F0F1E] (Dunkelblau/Schwarz)
Primary Color: #FF6B35 (Orange)
Accent Color: #00D9FF (Cyan)
Success Color: #4ADE80 (Grün)


🎯 PHASE 2 - AUFGABEN FÜR CLAUDE CODE
TASK 1: Backend-Setup & Datenbank (Woche 1)
1.1 Supabase Project erstellen
- Neues Supabase-Projekt ("bandstage-pro-regensburg")
- PostgreSQL Datenbank
- Tables erstellen:
  • bookings (id, band_name, email, phone, level, date, status)
  • users (id, email, auth_id, role)
  • coaching_sessions (id, booking_id, coach, notes)
  • payments (id, booking_id, amount, stripe_id, status)
  • testimonials (id, band_name, text, rating, image_url)
1.2 Environment-Setup
.env.local braucht:
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_ANON_KEY
- REACT_APP_STRIPE_PUBLIC_KEY
- REACT_APP_SENDGRID_API_KEY
- REACT_APP_GOOGLE_CALENDAR_API_KEY
1.3 React Libraries hinzufügen
bashnpm install @supabase/supabase-js
npm install @stripe/react-stripe-js @stripe/js
npm install react-router-dom
npm install zustand (State Management, optional)

TASK 2: Payment-Integration - Stripe (Woche 1)
2.1 Stripe Setup
- Stripe Account erstellen
- Public Key & Secret Key in .env
- Stripe Checkout Session erstellen
- Webhook für Payment Success/Failure
2.2 Payment-Component (BookingForm Schritt 4 erweitern)
jsx// services/stripe.js
- createCheckoutSession(bookingData)
- handlePaymentSuccess(sessionId)
- handlePaymentError(error)
2.3 Integration in BookingForm
Ablauf:
1. User füllt Band-Infos aus
2. Klick auf "JETZT BUCHEN"
3. Stripe Checkout Modal öffnet
4. Nach Zahlung: DB-Eintrag, Email-Bestätigung

TASK 3: Email-Bestätigungen (Woche 1)
3.1 SendGrid Integration
- SendGrid Account erstellen
- API Key in .env
- Email Templates erstellen (HTML)
3.2 Email-Triggers
javascript// services/sendgrid.js
- sendBookingConfirmation(emailData)
- sendCoachingReminder(7 days before)
- sendFollowUp(after coaching)
- sendAdminNotification(new booking)

Daten:
- Band-Name
- Coaching-Level
- Datum & Uhrzeit
- Preis
- Link zu Coaching-Details

TASK 4: Admin-Dashboard (Woche 2)
4.1 Admin Authentication
- Nur autorisierte Nutzer (Tom + Michael)
- Login mit Email/Password
- Role-Based Access Control (admin vs coach)
4.2 Dashboard Pages
/admin/dashboard
├── Overview (Stats: Total Bookings, Revenue, Conversion Rate)
├── Bookings List (Alle Bookings, Filter nach Status, Level, Datum)
├── Calendar (Google Calendar Integration, Termine verwalten)
├── Analytics (Charts: Monthly Revenue, Level Distribution, Conversion Rate)
├── Coaching Sessions (Notes, Follow-ups, Feedback)
└── Settings (Preise ändern, Verfügbarkeiten, Email Templates)
4.3 Key Features
javascript// Booking Management
- View all bookings
- Mark as "Confirmed", "Completed", "Cancelled"
- Send reminders (7 days before)
- Add coaching notes
- Generate invoice

// Calendar Management
- Sync with Google Calendar
- Block/Unblock time slots
- Set coach availability
- View coaching duration

// Analytics
- Monthly revenue
- Conversion rate (Coaching → Service)
- Level distribution
- Customer feedback ratings

TASK 5: Feature Expansion - Testimonials & FAQ (Woche 2)
5.1 Testimonials Component
jsx<Testimonials />
- Grid von 4-6 Band-Testimonials
- Mit Foto, Name, Zitat, Rating (⭐⭐⭐⭐⭐)
- Carousel/Slider auf Mobile
- CMS-Integration (Admin kann neue hinzufügen)

Daten aus DB:
- Band-Name
- Text (max 200 chars)
- Rating (1-5 Sterne)
- Image URL
- Coaching-Level (welches sie gemacht haben)
5.2 FAQ-Accordion
jsx<FAQ />
FAQs:
1. "Wie unterscheiden sich die Coaching-Levels?"
2. "Kann ich das Coaching verschieben?"
3. "Was ist im Coaching alles enthalten?"
4. "Kann ich nach dem Coaching Services buchen?"
5. "Gibt es Rabatte für Gruppen?"
6. "Wie verläuft ein typisches Coaching ab?"
7. "Welches Equipment bringe ich mit?"
8. "Kann ich online Coaching nehmen?" (später)

Funktion:
- Click-to-expand Accordion
- Mit Icons
- Smooth Animationen
5.3 Services-Integration
jsx<Services /> (auf Homepage)
- 3 Service-Pakete zeigen:
  • Starter: 350€ (FOH-Engineer + Basic Equipment)
  • Professional: 650€ (FOH + Monitor Engineer + Stage Manager)
  • Premium: 1.200€ (Full Production + Multi-Track Recording)
  
- Alumni-Rabatt Badge: "Erste Buchung -20% für Coaching-Alumni!"
- Link: "JETZT SERVICE BUCHEN"
- Diese Services sind später buchbar (Phase 3)

TASK 6: Responsive & Polish (Woche 3)
6.1 Mobile Optimization
- Alle Forms auf Mobile testen
- Touch-Target Größe (min 44x44px)
- Keyboard Navigation
- Scroll-Behavior
6.2 Accessibility (A11y)
- ARIA Labels
- Color Contrast (WCAG AA)
- Keyboard Navigation (Tab, Enter, Escape)
- Screen Reader optimiert
6.3 Performance
- Lighthouse Score > 90
- Image Optimization
- Code Splitting
- Bundle Size < 500KB (JS)

TASK 7: Deployment & Live (Woche 3-4)
7.1 Vercel Setup
- GitHub Repo erstellen
- Vercel Project verbinden
- Automatic Deployments bei Push zu Main
- Environment Variables auf Vercel setzen
- Custom Domain: booking.bandstagebands.de (oder ähnlich)
7.2 Testing Before Live
- Manual Testing (alle Flows)
- Payment Test (Stripe Test Mode)
- Email Test (SendGrid Sandbox)
- Admin Dashboard Test
- Mobile & Browser Compatibility
7.3 Monitoring & Analytics
- Google Analytics Integration (Tracking)
- Sentry (Error Logging)
- Uptime Monitoring (Pingdom/UptimeRobot)

🚀 NEXT STEPS FÜR CLAUDE CODE
Sofort machen (Priority 1):

✅ Codebase in Git-Repository mit proper .gitignore
✅ Supabase Projekt einrichten + Tables erstellen
✅ Stripe Account + Keys in .env
✅ SendGrid Account + Email Templates
✅ Payment-Integration (Stripe Checkout)
✅ Email-Service (Booking Confirmation)

Dann machen (Priority 2):

✅ Admin Dashboard (Bookings, Calendar, Analytics)
✅ Testimonials Component
✅ FAQ Component
✅ Services Teaser

Zum Abschluss (Priority 3):

✅ Testing & Bugfixes
✅ Deployment auf Vercel
✅ Domain + SSL
✅ Monitoring & Analytics


📊 CURRENT CODE - VOLLSTÄNDIG
App.jsx (Main Component)
[Siehe Datei: src/App.jsx in diesem Repository]
Wichtige Features:

Hero mit TypeWriter-Effekt
Level-Finder Quiz (3 Fragen → Empfehlung)
4 Coaching-Cards mit Hover-Animationen
4-Schritt Booking-Flow
Success-Page
Footer mit Kontakt


📞 KONTAKT & FRAGEN
Projekt Owner: Tom (BandStage Pro Regensburg)
Technische Fragen: Claude Code (AI Assistant)
Zeitrahmen: 4 Wochen bis Live

🎯 SUCCESS CRITERIA
✅ Projekt ist LIVE und erreichbar
✅ Bands können Coaching buchen & bezahlen
✅ Admin-Dashboard funktioniert
✅ Email-Bestätigungen kommen an
✅ Alle Features sind responsive & schnell
✅ Lighthouse Score > 90
✅ 0 Critical Bugs

🚀 WIE STARTET MAN CLAUDE CODE?
Start-Befehl:
"Übernimm dieses Projekt nach diesem README.md Dokument.
Beginne mit TASK 1: Backend Setup & Supabase.
Arbeite Schritt für Schritt alle Tasks ab.
Frage mich nur, wenn du spezifische Business-Anforderungen brauchst.
Nutze Best Practices und schreib Production-Ready Code."
Was Claude Code dann macht:

Erstellt Git-Repo (falls nicht schon existiert)
Installiert alle NPM-Packages
Erzeugt alle neuen Files
Integriert Supabase/Stripe/SendGrid
Testet die Features
Commitet zu Git
Gibt dir Status-Updates


Ready to build! Let's GO! 🚀🎸
Projekt: BandStage Pro Regensburg
Version: 2.0 - Phase 2 Backend-Integration
Status: Ready for Claude Code
