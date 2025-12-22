import { useState } from 'react'
import bismillah from './assets/png/bismillah.png'
import crownOpen from './assets/png/crown down.png'
import crownClose from './assets/png/crown up.png'
import './App.css'

function App() {
  const [showRsvp, setShowRsvp] = useState(false)
  const [name, setName] = useState('')
  const [attending, setAttending] = useState('yes')
  const [sent, setSent] = useState(false)

  function submitRsvp(e) {
    e.preventDefault()
    setSent(true)
    // In production, replace with real endpoint or mailto link.
  }

  return (
    <div className="invite-root">
      <header className="hero">
        <img src={bismillah} alt="Bismillah" className='bismillah' /><br />
        <img src={crownOpen} alt="crownOpen" className='bismillah crownOpen' />
        <h1 className="names">Elisa &amp; Partner</h1>
        <p className="subtitle">Request the pleasure of your company</p>
        <p className="date">Saturday, June 20, 2026 · 3:00 PM</p>
        <button className="rsvp" onClick={() => setShowRsvp(true)}>
          RSVP
        </button>
      </header>

      <section className="details">
        <div className="card">
          <h2>Reception</h2>
          <p>The Gabion Garden Hall</p>
        </div>
        <div className="card">
          <h2>Dress Code</h2>
          <p>Smart casual</p>
        </div>
      </section>

      <footer className="footer">
        <p>Location, directions, and accommodation details available on request.</p>
        <p className="small">Change details in <code>src/App.jsx</code></p>
      </footer>

      {showRsvp && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <button className="close" onClick={() => { setShowRsvp(false); setSent(false); }}>Close</button>
            <h3>RSVP</h3>
            {!sent ? (
              <form onSubmit={submitRsvp} className="rsvp-form">
                <label>
                  Your name
                  <input value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                  Will you attend?
                  <select value={attending} onChange={(e) => setAttending(e.target.value)}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <div className="actions">
                  <button type="submit" className="btn-primary">Send RSVP</button>
                </div>
              </form>
            ) : (
              <div className="thanks">
                <p>Thanks, {name || 'guest'} — your RSVP is recorded.</p>
                <p className="small">Customize the RSVP handling in <code>src/App.jsx</code>.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
