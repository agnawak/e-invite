import { useState, useEffect } from 'react'

export default function Rsvp({ onClose }) {
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const [attending, setAttending] = useState('yes')

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setSent(false)
        if (onClose) onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function submitRsvp(e) {
    e.preventDefault()
    setSent(true)
    // In production, replace with real endpoint or mailto link.
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) { setSent(false); if (onClose) onClose() } }}>
          <div className="modal-content">
            <button className="close" onClick={() => { setSent(false); if (onClose) onClose(); }}>Close</button>
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
  )
}