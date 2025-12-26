import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";

import bismillah from './assets/png/bismillah.png'
import crownOpen from './assets/png/crown down.png'
import crownClose from './assets/png/crown up.png'

import location from './assets/icons/location.svg'
import message from './assets/icons/message.svg'
import musicOff from './assets/icons/music_off.svg'
import musicOn from './assets/icons/music_on.svg'
import attandence from './assets/icons/rsvp.svg'

import song from "./assets/Can't Help Falling In Love (Instrumental) Wedding March.mp3"

import Countdown from './components/Countdown.jsx'
import Rsvp from './components/Rsvp.jsx'
import Bubbles from './components/Bubbles.jsx'
import Messages from './components/Messages.jsx'

export default function App() {
  const [showRsvp, setShowRsvp] = useState(false)
  const navigate = useNavigate()
  // Messages are now stored in Supabase and fetched inside the `Messages` component.
  // Message persistence moved to Supabase; localStorage no longer used.
  // Sending of messages is handled in the `Messages` component (inserts into Supabase).

  const audioRef = useRef(null)
  const [audioMuted, setAudioMuted] = useState(true)
  const [showSplash, setShowSplash] = useState(true)
  const [splashFading, setSplashFading] = useState(false)
  const [mainVisible, setMainVisible] = useState(false)
  const [rsvpPage, setRsvpPage] = useState(false)
  const locationRef = useRef(null)
  const [ref1, visible1] = useInView();
  const [ref2, visible2] = useInView();
  const [ref3, visible3] = useInView();
  const [ref4, visible4] = useInView();

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
    }, 2000)
  }

  function useInView() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // observer.unobserve(entry.target);
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
        <div className="splash">
          <div className="hero invite-root opening-bg splashcontent">
            <div className={`splashfade ${splashFading ? 'fade-out' : ''}`}>
              <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
              <p className="date playfair-display">Walimatul Urus</p>
              <h1 className="names great-vibes-regular">Nabil <br /> &amp; <br /> Elisa</h1>
              <button className="enter-btn" onClick={enterSite} aria-label="Enter site and enable music">BUKA</button>
              {rsvpPage && <button className="btn-primary" onClick={() => navigate('/rsvp')}>Halaman Utama</button>}
              <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
            </div>
          </div>
        </div>
      )}
        <Bubbles count={18} />
        <div className="hero invite-root opening-bg">
          <div className={`site-main ${mainVisible ? 'visible' : ''}`}>
            <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
            <p className="date playfair-display">Walimatul Urus</p>
            <h1 className="names great-vibes-regular">Nabil <br /> &amp; <br /> Elisa</h1>
            <div>
              <p className="date playfair-display">The Gabion Garden Hall</p>
              <p className="date playfair-display">15.02.2026</p>
            </div>
            <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
          </div>
        </div>

        <div ref={ref1} className={`fade ${visible1 ? "show" : ""}`}>
          <div className="hero invite-root">
            <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
            <p className="date playfair-display">Dengan lafaz Bismillah</p>
            <h1 className="parents great-vibes-regular">Bokhari Bin Hassan<br /> &amp; <br />Hanorliza Binti Hassan Basri</h1>
            <p className="date playfair-display">menjemput</p>
            <p className="date playfair-display">Dato' | Datin | Tuan | Puan | Encik | Cik</p>
            <p className="date playfair-display">hadir ke majlis perkahwinan anak kami</p>
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
            <button className="rsvp" onClick={() => setShowRsvp(true)}>RSVP</button>
            <p className='subtitle note'>- Sila isi RSVP sebelum 20/01/26 -</p>
          </div>
        </div>

        <div ref={ref2} className={`fade ${visible2 ? "show" : ""}`}>
          <div className="hero invite-root aturcara-bg nogap">
            <img src={bismillah} alt="" className='bismillah' />
            <h1 className="parents great-vibes-regular atur">Atur Cara Majlis</h1>
            <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
            <p className="subtitle playfair-display">Kehadiran Tetamu</p>
            <p className="date playfair-display">11:30 Pagi</p>
            <p className="subtitle playfair-display">Ketibaan Pengantin</p>
            <p className="date playfair-display">12:45 Tengah Hari</p>
            <p className="subtitle playfair-display">Majlis Berakhir</p>
            <p className="date playfair-display">4:00 Petang</p>
            <img src={crownClose} alt="crownClose" className='bismillah crownOpen' />
          </div>
        </div>

        <section className="details">
          <div ref={ref3} className={`fade ${visible3 ? "show" : ""}`}>
            <div className="card">
              <h2>Pengiraan Detik</h2>
              {/* Target: 15 February 2026 (local time). Modify as needed. */}
              <Countdown targetDate={new Date(2026, 1, 15, 0, 0, 0)} />
            </div>
          </div>
          <div ref={ref4} className={`fade ${visible4 ? "show" : ""}`}>
            <div className="last" ref={locationRef}>
              <p className="doa playfair-display">Ya Allah Ya Rahman Ya Rahim, <br /> kau berkatilah majlis perkahwinan ini. <br />Limpahkanlah baraqah dan rahmatMu kepada kedua mempelai ini. Kurniakanlah mereka kelak zuriat yang soleh dan solehah. Kekalkanlah jodoh mereka hingga ke jannah.</p>
              <br />
              <h2>Ucapan</h2>
              <Messages />
            </div>
          </div>
        </section>

        {showRsvp && <Rsvp onClose={() => setShowRsvp(false)} /> }

        {/* Bottom navigation */}
        <nav className="bottom-nav" aria-label="Main navigation">
          <button className="nav-btn" onClick={() => window.open("https://share.google/bhZGxmEoPLZ8xG6JJ", "_blank")}>
            <img style={{color:"white"}} src={location} alt="" />
          </button>
          <button className="nav-btn" onClick={() => toggleAudio()} aria-pressed={!audioMuted}>
            {audioMuted ? <img src={musicOff} alt="" /> : <img src={musicOn} alt="" />}
          </button>
          <button className="nav-btn" onClick={() => setShowRsvp(true)}>
            <img src={attandence} alt="" />
          </button>
          <button className="nav-btn" onClick={() => {
            if (locationRef.current) locationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}>
            <img src={message} alt=""  />
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
    </div>
  )
}
