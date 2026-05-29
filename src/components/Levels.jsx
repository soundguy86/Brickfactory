import { motion } from 'framer-motion'
import { COACHING_LEVELS } from '../data/content'

// Fader-Stellung skaliert grob mit dem Anspruch des Levels.
const FADER = { rookie: 28, intermediate: 52, advanced: 76, masterclass: 96 }

export default function Levels() {
  return (
    <section className="section" id="coaching">
      <div className="wrap">
        <div className="shead">
          <h2 className="shead__title h-display">
            Vier Kanäle. <em>Ein</em> Pult für euch.
          </h2>
          <p className="shead__note">
            // Jedes Level ist ein Channel-Strip. Wir fahren genau den Gain,
            den eure Band gerade braucht.
          </p>
        </div>

        <div className="levels">
          {COACHING_LEVELS.map((lv, i) => (
            <motion.article
              key={lv.id}
              className={`level${lv.featured ? ' level--featured' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="level__top">
                <span className="level__ch">CH {lv.ch}</span>
                <span className="level__tag">{lv.tag}</span>
              </div>

              <h3 className="level__name">{lv.name}</h3>
              <p className="level__desc">{lv.desc}</p>

              <div className="level__fader" aria-hidden="true">
                <div className="level__faderbar">
                  <span className="level__faderfill" style={{ width: `${FADER[lv.id]}%` }} />
                  <span className="level__faderknob" style={{ left: `${FADER[lv.id]}%` }} />
                </div>
              </div>

              <ul className="level__feat">
                {lv.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div className="level__foot">
                <div className="level__price">
                  {lv.price}€<small>/ Coaching</small>
                </div>
                <div className="level__dur">⏱ {lv.duration}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
