import { motion } from 'framer-motion'
import Spectrum from './Spectrum'

const line = {
  hidden: { y: '105%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.55 + i * 0.1 } }),
}

const STATS = [
  { num: '12', suffix: 'J.', label: 'auf Regensburgs Bühnen' },
  { num: '300', suffix: '+', label: 'gemischte Gigs' },
  { num: '4', suffix: '', label: 'Coaching-Level' },
]

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero__grid">
        <div>
          <motion.span
            className="hero__status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="hero__dot" /> Soundcheck läuft · Slots Q1 frei
          </motion.span>

          <h1 className="hero__title h-display">
            <span className="ln">
              <motion.span variants={line} initial="hidden" animate="show" custom={0} style={{ display: 'inline-block' }}>
                Erst
              </motion.span>
            </span>
            <span className="ln">
              <motion.span variants={line} initial="hidden" animate="show" custom={1} style={{ display: 'inline-block' }}>
                <em>lernen.</em>
              </motion.span>
            </span>
            <span className="ln">
              <motion.span variants={line} initial="hidden" animate="show" custom={2} style={{ display: 'inline-block' }} className="stroke">
                Dann
              </motion.span>
            </span>
            <span className="ln">
              <motion.span variants={line} initial="hidden" animate="show" custom={3} style={{ display: 'inline-block' }}>
                abliefern.
              </motion.span>
            </span>
          </h1>

          <motion.p className="hero__lead" variants={fade} initial="hidden" animate="show" custom={0}>
            Live-Sound-Coaching und Full-Service-Produktion aus einer Hand.
            Ihr lernt euren Sound im Coaching kennen — und <b>holt euch beim Gig
            dasselbe Team ans Pult</b>.
          </motion.p>

          <motion.div className="hero__cta" variants={fade} initial="hidden" animate="show" custom={1}>
            <a href="#coaching" className="btn btn--solid">
              Coaching starten →
            </a>
            <a href="#services" className="btn btn--ghost">
              Live-Service ansehen
            </a>
          </motion.div>

          <motion.div className="hero__meta" variants={fade} initial="hidden" animate="show" custom={2}>
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat__num">
                  {s.num}
                  <span>{s.suffix}</span>
                </div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="wrap">
        <Spectrum bars={56} />
      </div>
    </header>
  )
}
