import { motion } from 'framer-motion'
import { STEPS } from '../data/content'

export default function Process() {
  return (
    <section className="section" id="ablauf">
      <div className="wrap">
        <div className="shead">
          <span className="kicker">Learn &amp; Apply</span>
          <p className="shead__note">
            // Kein Workshop, nach dem ihr allein dasteht. Das Coaching ist
            der Soundcheck für die Zusammenarbeit auf der Bühne.
          </p>
        </div>

        <div className="process">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              className="step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="step__n">{s.n}</div>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
