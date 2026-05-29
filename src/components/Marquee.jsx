import { MARQUEE } from '../data/content'

export default function Marquee() {
  // Inhalt verdoppelt -> nahtlose Endlosschleife (translateX -50%).
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((t, i) => (
          <span key={i} className="marquee__item">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
