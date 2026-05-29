import { motion } from 'framer-motion'
import { SERVICES } from '../data/content'

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="shead">
          <h2 className="shead__title h-display">
            Wenn's ernst wird: <em>Crew</em> dazu.
          </h2>
          <p className="shead__note">
            // Drei Pakete für den echten Gig. Vom Club bis zur großen Bühne.
          </p>
        </div>

        <div className="alumni">★ Alumni-Bonus · erste Buchung −20 % für Coaching-Bands</div>

        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.id}
              className={`svc${s.featured ? ' svc--featured' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="svc__top">
                <span className="svc__name">{s.name}</span>
                {s.featured && <span className="svc__badge">Beliebt</span>}
              </div>
              <div className="svc__price">
                {s.price.toLocaleString('de-DE')}<small>€</small>
              </div>
              <p className="svc__line">{s.line}</p>
              <p className="svc__detail">{s.detail}</p>
              <div className="svc__cta">
                <a href="#kontakt">Anfragen →</a>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="svc__phase">// Live-Services sind ab Phase 3 direkt online buchbar.</p>
      </div>
    </section>
  )
}
