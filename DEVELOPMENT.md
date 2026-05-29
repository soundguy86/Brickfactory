# BandStage Pro — Development

MVP-Landingpage für **BandStage Pro Regensburg** (Live Sound Engineering & Band Coaching).

## Stack

| Bereich    | Wahl                                  |
| ---------- | ------------------------------------- |
| Build      | Vite                                  |
| UI         | React 18                              |
| Animation  | Framer Motion (Scroll-Reveals, Karten)|
| Styling    | Handgeschriebenes CSS + Custom Props  |
| Fonts      | Anton · Space Grotesk · Space Mono    |

Bewusst **kein** Tailwind und **keine** SVG-Illustrationen — das Design lebt
von einem eigenen „Technical-Rider"-Look (Channel-Strips, Fader, VU/Spektrum).

## Loslegen

```bash
npm install
npm run dev      # Dev-Server (HMR)
npm run build    # Production-Build -> dist/
npm run preview  # gebauten Build lokal testen
```

## Struktur

```
src/
├── main.jsx              # Entry
├── App.jsx              # Komposition der Sektionen
├── data/content.js     # Alle Inhalte (Levels, Services, FAQ ...) – CMS-ready
├── styles/global.css   # Design-System (Farben, Typo, alle Komponenten)
└── components/
    ├── Nav.jsx
    ├── Hero.jsx        # Headline + Stats + Spektrum
    ├── Spectrum.jsx    # CSS-Spektrum-Analyzer (Div-Bars, GPU)
    ├── Marquee.jsx     # LED-Laufschrift
    ├── Levels.jsx      # 4 Coaching-Level als Channel-Strips
    ├── Process.jsx     # Learn & Apply (3 Schritte)
    ├── Services.jsx    # 3 Live-Pakete (helle Sektion)
    ├── Faq.jsx         # Accordion
    └── Footer.jsx      # Final-CTA + Footer
```

## Design-Tokens

In `src/styles/global.css` unter `:root`. Farben:
`--ink` (warmes Schwarz), `--bone` (Creme-Text), `--sodium` (Tungsten-Orange),
`--peak` (VU-Rot), `--volt` (Lime-Akzent).

## Barrierefreiheit

- Alle Animationen respektieren `prefers-reduced-motion`.
- Spektrum/Marquee sind `aria-hidden` (rein dekorativ).
- FAQ-Accordion mit `aria-expanded`.

## Nächste Schritte (siehe README, Phase 2)

Supabase-Anbindung, Stripe-Checkout, Multi-Step-Booking-Form, Admin-Dashboard.
`data/content.js` ist so gebaut, dass es später aus der DB gespeist werden kann.
