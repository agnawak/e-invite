import { useState, useEffect } from 'react'

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    function update() {
      const now = new Date()
      const diff = targetDate - now
      if (diff <= 0) {
        setExpired(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      const seconds = Math.floor(diff / 1000) % 60
      const minutes = Math.floor(diff / (1000 * 60)) % 60
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      setTimeLeft({ days, hours, minutes, seconds })
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (expired) {
    return <div className="countdown expired">Event day has arrived 🎉</div>
  }
    return (
      <div className="countdown" aria-live="polite">
        <div className="segment">
          <div className="value">{timeLeft.days}</div>
          <div className="label">Days</div>
        </div>
        <div className="segment">
          <div className="value">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="label">Hours</div>
        </div>
        <div className="segment">
          <div className="value">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="label">Minutes</div>
        </div>
        <div className="segment">
          <div className="value">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="label">Seconds</div>
        </div>
      </div>
    )
  }