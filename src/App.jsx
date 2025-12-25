import { useState, useEffect, useRef } from 'react'
import bismillah from './assets/png/bismillah.png'
import crownOpen from './assets/png/crown down.png'
import crownClose from './assets/png/crown up.png'
import Countdown from './components/Countdown.jsx'
import Rsvp from './components/Rsvp.jsx'
import Bubbles from './components/Bubbles.jsx'
import Messages from './components/Messages.jsx'
import song from "./assets/Can't Help Falling In Love (Instrumental) Wedding March.mp3"

export default function App() {
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

  const audioRef = useRef(null)
  const [audioMuted, setAudioMuted] = useState(true)
  const [showSplash, setShowSplash] = useState(true)
  const [splashFading, setSplashFading] = useState(false)
  const [mainVisible, setMainVisible] = useState(false)
  const locationRef = useRef(null)
  const [ref, visible] = useInView();

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    // Try to play; if autoplay is blocked the promise will reject
    const p = a.play()
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        // Autoplay blocked — remain muted until user interacts
      })
    }
    return () => {
      try {
        a.pause()
        a.currentTime = 0
      } catch (e) {}
    }
  }, [])

  function toggleAudio() {
    const a = audioRef.current
    if (!a) return
    if (a.muted) {
      a.muted = false
      a.play().catch(() => {})
      setAudioMuted(false)
    } else {
      a.muted = true
      setAudioMuted(true)
    }
  }

  function enterSite() {
    // Unmute and play audio, then hide splash
    const a = audioRef.current
    if (a) {
      a.muted = false
      a.play().catch(() => {})
      setAudioMuted(false)
    }
    // start splash fade-out, then show main after fade completes
    setSplashFading(true)
    window.setTimeout(() => {
      setShowSplash(false)
      setMainVisible(true)
    }, 360)
  }

  function useInView() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return [ref, visible];
  }


  return (
    <div>
      {showSplash && (
        <div className="splash" role="dialog" aria-modal="true">
          <div className="hero invite-root opening-bg">
            <div >
              <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
              <p className="date playfair-display">Walimatul Urus</p>
              <h1 className="names great-vibes-regular">Nabil <br /> &amp; <br /> Elisa</h1>
              <button className="enter-btn" onClick={enterSite} aria-label="Enter site and enable music">BUKA</button>
              <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
            </div>
          </div>
        </div>
      )}
      <main className={`site-main ${mainVisible ? 'visible' : ''}`}>
        <Bubbles count={18} />

        <div className="hero invite-root opening-bg">
          <div>
            <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
            <p className="date playfair-display">Walimatul Urus</p>
            <h1 className="names great-vibes-regular">Nabil <br /> &amp; <br /> Elisa</h1>
            <div>
              <p ref={locationRef} className="date playfair-display">The Gabion Garden Hall</p>
              <p className="date playfair-display">15.02.2026</p>
            </div>
            <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
          </div>
        </div>

        <div ref={ref} className={`fade ${visible ? "show" : ""}`}>
          <div className="hero invite-root">
            <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
            <p className="date playfair-display">Dengan lafaz Bismillah</p>
            <h1 className="parents great-vibes-regular">Bokhari Bin Hassan<br /> &amp; <br />Hanorliza Binti Hassan Basri</h1>
            <p className="date playfair-display">menjemput</p>
            <p className="date playfair-display">Dato' | Datin | Tuan | Puan | Encik | Cik</p>
            <p className="date playfair-display">hadir ke majlis perkahwinan anak kami</p>
            <h1 className="children great-vibes-regular">Nabil Hakim<br /> &amp; <br /> Elisa Jasmin</h1>
            <p className="date playfair-display">Ahad 15.02.2026</p>
            <p className="subtitle playfair-display">Masa</p>
            <p className="date playfair-display">11:30AM - 4:00PM</p>
            <p className="subtitle playfair-display">Tempat</p>
            <p className="date playfair-display">The Gabion Garden Hall</p>
            <p className="subtitle playfair-display">Kod Pakaian</p>
            <p className="date playfair-display">Formal & Berkasut</p>
            <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
            <button className="rsvp" onClick={() => setShowRsvp(true)}>RSVP</button>
            <p className='subtitle note'>- Sila isi RSVP sebelum 20/01/26 -</p>
          </div>
        </div>

        <section className="details">
          <div className="card">
            <h2>Pengiraan Detik</h2>
            {/* Target: 15 February 2026 (local time). Modify as needed. */}
            <Countdown targetDate={new Date(2026, 1, 15, 0, 0, 0)} />
          </div>
          <div className="card last">
            <p className="doa playfair-display">Ya Allah Ya Rahman Ya Rahim <br /> kau berkatilah masjlis perkahwinan ini. <br />Limpahkanlah baraqah dan rahmatMu kepada kedua mempelai ini. Kurniakanlah mereka kelak zuriat yang soleh dan solehah. kekalkanlah jodoh mereka hingga ke jannah.</p>
            <br />
            <h2>Ucapan</h2>
            <Messages messages={messages} onSend={sendMessage} />
          </div>
        </section>

        {showRsvp && <Rsvp onClose={() => setShowRsvp(false)} /> }

        {/* Bottom navigation */}
        <nav className="bottom-nav" aria-label="Main navigation">
          <button className="nav-btn" onClick={() => {
            if (locationRef.current) locationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}>
            View location
          </button>
          <button className="nav-btn" onClick={() => toggleAudio()} aria-pressed={!audioMuted}>
            {audioMuted ? 'Start music' : 'Stop music'}
          </button>
          <button className="nav-btn" onClick={() => setShowRsvp(true)}>
            RSVP
          </button>
          <button className="nav-btn" onClick={() => {
            const name = window.prompt('Your name (optional)')
            const text = window.prompt('Type your message')
            if (text) sendMessage({ text, name })
          }}>
            Send message
          </button>
        </nav>

        <audio
          ref={audioRef}
          autoPlay
          muted
          loop
          preload="auto"
          aria-hidden="true"
          className='audi'
        >
          <source src={song} type="audio/mpeg" />
        </audio>
      </main>
    </div>
  )
}
