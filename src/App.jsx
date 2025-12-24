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
      <audio autoplay muted loop>
        <source src="./assets/Can't Help Falling In Love (Instrumental) Wedding March.mp3" type="audio/mpeg" />
      </audio>
      <div className="hero invite-root opening-bg">
        <div>
          <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
        </div>
        <p className="date playfair-display">Walimatul Urus</p>
        <h1 className="names great-vibes-regular">Nabil <br /> &amp; <br /> Elisa</h1>
        <div>
          <p className="date playfair-display">The Gabion Garden Hall</p>
          <p className="date playfair-display">15.02.2026</p>
        </div>
        <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
      </div>

      <div className="hero invite-root">
        <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
        <p className="date playfair-display">Dengan lafaz Bismillah</p>
        <h1 className="parents great-vibes-regular">Bokhari Bin Hassan<br /> &amp; <br />Hanorliza Binti Hassan Basri</h1>
        <p className="date playfair-display">menjemput</p>
        <p className="date playfair-display">Dato' | Datin | Tuan | Puan | Encik | Cik</p>
        <p className="date playfair-display">hadir ke majlis perkahwinan anak kami</p>
        <br />
        <h1 className="children great-vibes-regular">Nabil Hakim<br /> &amp; <br /> Elisa Jasmin</h1>
        <p className="subtitle playfair-display">Tarikh</p>
        <p className="date playfair-display">Ahad 15.02.2026</p>
        <p className="subtitle playfair-display">Masa</p>
        <p className="date playfair-display">11:30AM - 4:00PM</p>
        <p className="subtitle playfair-display">Tempat</p>
        <p className="date playfair-display">The Gabion Garden Hall</p>
        <p className="subtitle playfair-display">Kod Pakaian</p>
        <p className="date playfair-display">Formal & Berkasut</p>
        <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
        <button className="rsvp" onClick={() => setShowRsvp(true)}>
          RSVP
        </button>
        <p className='subtitle note'>- Sila isi RSVP sebelum 20/01/26 -</p>
      </div>

      <section className="details">
        <div className="card">
          <h2>Pengiraan Detik</h2>
          {/* Target: 15 February 2026 (local time). Modify as needed. */}
          <Countdown targetDate={new Date(2026, 1, 15, 0, 0, 0)} />
        </div>
        <div className="card">
          <p className="doa playfair-display">Ya Allah Ya Rahman Ya Rahim <br /> kau berkatilah masjlis perkahwinan ini. <br />Limpahkanlah baraqah dan rahmatMu kepada kedua mempelai ini. Kurniakanlah mereka kelak zuriat yang soleh dan solehah. kekalkanlah jodoh mereka hingga ke jannah.</p>
          <br />
          <h2>Ucapan</h2>
          <Messages messages={messages} onSend={sendMessage} />
        </div>
      </section>

      {showRsvp && <Rsvp onClose={() => setShowRsvp(false)} /> }
    </div>
  )
}

export default App
