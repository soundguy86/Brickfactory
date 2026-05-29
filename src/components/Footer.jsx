import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="footer" id="kontakt">
      <div className="wrap">
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta__title h-display">
            Bereit für den <em>Soundcheck?</em>
          </h2>
          <p className="cta__sub">
            Erzählt uns von eurer Band und eurem nächsten Gig — wir melden uns
            mit einer ehrlichen Einschätzung zurück.
          </p>
          <div className="cta__row">
            <a href="mailto:tom@bandstage-pro.de" className="btn btn--solid">
              tom@bandstage-pro.de
            </a>
            <a href="#coaching" className="btn btn--volt">
              Level finden →
            </a>
          </div>
        </motion.div>

        <div className="footer__grid" style={{ marginTop: '4rem' }}>
          <div className="footer__brand">
            <span className="brand__mark">
              Band<b style={{ color: 'var(--sodium)' }}>Stage</b> Pro
            </span>
            <p className="footer__tag">
              Live Sound Engineering &amp; Band Coaching. Gemacht in Regensburg,
              gebaut für die Bühne.
            </p>
          </div>

          <div className="footer__col">
            <h4>Angebot</h4>
            <a href="#coaching">Coaching-Level</a>
            <a href="#services">Live-Service</a>
            <a href="#ablauf">Ablauf</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer__col">
            <h4>Kontakt</h4>
            <a href="mailto:tom@bandstage-pro.de">tom@bandstage-pro.de</a>
            <a href="tel:+4994100000000">+49 941 000000</a>
            <a href="#top">Regensburg, DE</a>
          </div>
        </div>

        <div className="footer__bar">
          <span>© {new Date().getFullYear()} BandStage Pro Regensburg</span>
          <span>Impressum · Datenschutz · v2.0 MVP</span>
        </div>
      </div>
    </footer>
  )
}
