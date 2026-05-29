import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FAQS } from '../data/content'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="shead">
          <h2 className="shead__title h-display">Kurz gefragt.</h2>
          <p className="shead__note">// Was Bands vor dem ersten Coaching wissen wollen.</p>
        </div>

        <div className="faq">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div className="faq__item" key={item.q} data-open={isOpen}>
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.q}
                  <span className="faq__sign" aria-hidden="true">+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="faq__a-inner">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
