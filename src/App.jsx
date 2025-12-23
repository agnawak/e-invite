import { useState, useEffect } from 'react'
import bismillah from './assets/png/bismillah.png'
import crownOpen from './assets/png/crown down.png'
import crownClose from './assets/png/crown up.png'
import Countdown from './components/Countdown.jsx'
import Rsvp from './components/Rsvp.jsx'
import Bubbles from './components/Bubbles.jsx'
import Messages from './components/Messages.jsx'

function App() {
  const [showRsvp, setShowRsvp] = useState(false)
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('messages') || '[]')
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  function sendMessage({ text, name }) {
    const msg = { id: Date.now(), text, name: name || 'Guest', createdAt: new Date().toISOString() }
    setMessages((s) => [...s, msg])
  }

  return (
    <div>
      <Bubbles count={18} />
      <div className='bg-fixed'></div>
      <div className="hero invite-root">
        <div>
        <img src={bismillah} alt="Bismillah" className='bismillah' /><br />
        <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
        </div>
        <h1 className="names great-vibes-regular">Nabil <br /> &amp; <br /> Elisa</h1>
        <p className="date playfair-display">The Gabion Garden Hall</p>
        <p className="date playfair-display">15.02.2026</p>
        <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
      </div>

      <div className="hero invite-root">
        <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
        <p className="date playfair-display">With Joy and Gratitude to Almighty God</p>
        <h1 className="parents great-vibes-regular">Bokhari Bin Hassan<br /> &amp; <br />Hanorliza Binti Hassan Basri</h1>
        <p className="date playfair-display">cordially invite</p>
        <p className="date playfair-display">Dato' | Datin | Mr. | Mrs. | Ms.</p>
        <p className="date playfair-display">to the wedding reception of our son</p>
        <br />
        <h1 className="children great-vibes-regular">Nabil Hakim<br /> &amp; <br /> Elisa Jasmin</h1>
        <p className="subtitle playfair-display">Date</p>
        <p className="date playfair-display">Sunday 15.02.2026</p>
        <p className="subtitle playfair-display">Time</p>
        <p className="date playfair-display">3:00PM - 5:00PM</p>
        <p className="subtitle playfair-display">Venue</p>
        <p className="date playfair-display">The Gabion Garden Hall</p>
        <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
        <br />
        <button className="rsvp" onClick={() => setShowRsvp(true)}>
          RSVP
        </button>
      </div>

      <section className="details">
        <div className="card">
          <h2>Countdown</h2>
          {/* Target: 15 February 2026 (local time). Modify as needed. */}
          <Countdown targetDate={new Date(2026, 1, 15, 0, 0, 0)} />
        </div>
        <div className="card">
          <h2>Message To The<br />Newlyweds</h2>
          <Messages messages={messages} onSend={sendMessage} />
        </div>
      </section>

      {showRsvp && <Rsvp onClose={() => setShowRsvp(false)} /> }
    </div>
  )
}

export default App
