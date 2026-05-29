import { useMemo } from 'react'

// Reiner CSS-Spektrum-Analyzer: jede Bar ist ein <div> mit eigener
// Animationsdauer/-höhe. Kein SVG, kein Canvas – läuft auf der GPU
// und respektiert prefers-reduced-motion (siehe global.css).
export default function Spectrum({ bars = 48 }) {
  const cfg = useMemo(
    () =>
      Array.from({ length: bars }, (_, i) => {
        // weiche "Frequenzkurve": Mitten lauter als die Ränder
        const center = 1 - Math.abs(i - bars / 2) / (bars / 2)
        const peak = 28 + center * 55 + Math.random() * 22
        return {
          '--peak-h': `${Math.min(peak, 100)}%`,
          '--dur': `${(0.5 + Math.random() * 0.9).toFixed(2)}s`,
          '--delay': `${(Math.random() * -1.2).toFixed(2)}s`,
        }
      }),
    [bars],
  )

  return (
    <div className="spectrum" aria-hidden="true">
      {cfg.map((style, i) => (
        <span key={i} className="spectrum__bar" style={style} />
      ))}
    </div>
  )
}
