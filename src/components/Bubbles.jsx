import { useMemo } from 'react'

export default function Bubbles({ count = 14 }) {
  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const size = Math.round(Math.random() * 15 + 12)
      const left = Math.round(Math.random() * 100)
      // negative delay spreads bubbles across the timeline
      const delay = -(Math.random() * 30)
      // longer duration for slow fall (seconds)
      const duration = Math.random() * 40 + 18
      // horizontal drift (px), can be negative to go left or positive to go right
      const drift = Math.round(Math.random() * 300 - 150) // -150px..150px
      // start slightly above the viewport to avoid popping in
      const startTop = - (Math.round(Math.random() * 30) + 5) + '%'
      const rot = Math.round(Math.random() * 20 - 10) + 'deg'
      // horizontal scale factor for width wobble (0.8 = narrower, 1.25 = wider)
      const sx = (Math.random() * 0.5 + 0.8).toFixed(2)

      return {
        style: {
          left: `${left}%`,
          top: startTop,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          // custom properties used by CSS keyframes
          '--drift': `${drift}px`,
          '--rot': rot,
          '--sx': sx
        }
      }
    })
  }, [count])

  return (
    <div className="bubbles" aria-hidden="true">
      {bubbles.map((b, i) => (
        <span key={i} className="bubble" style={b.style} />
      ))}
    </div>
  )
}
