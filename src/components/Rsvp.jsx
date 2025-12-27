import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Rsvp({ onClose }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [attendance, setAttending] = useState('Ya')
  const [pax, setPax] = useState(1)
  const [text, setText] = useState('')

  async function submitRsvp(e) {
    e.preventDefault()

    // basic validation
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!pax || Number(pax) < 1) {
      setError('Please enter number of attendees')
      return
    }

    setError('')

    try {
      const payload = { name: name.trim() || 'Tetamu', pax: Number(pax), attendance }
      const { data, error } = await supabase.from('Nabil_RSVP').insert(payload).select().single()

      if (error) {
        console.error('Insert failed:', error)
        setError('Failed to send RSVP — try again')
        return
      }

      setSent(true)
      // clear inputs
      setName('')
      setPax(1)
      setAttending('Ya')

      // close modal after short delay and notify parent
      window.setTimeout(() => {
        setSent(false)
        if (onClose) onClose()
      }, 1000)
    } catch (err) {
      console.error(err)
      setError('Failed to send RSVP — try again')
    }
  }

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

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) { setSent(false); if (onClose) onClose() } }}>
          <div className="modal-content">
            <button className="close" onClick={() => { setSent(false); if (onClose) onClose(); }}>Tutup</button>
            <h3>RSVP</h3>
            {!sent ? (
              <form onSubmit={submitRsvp} className="rsvp-form">
                <label>
                  Nama
                  <input value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                  Akan Hadir?
                  <select value={attendance} onChange={(e) => setAttending(e.target.value)}>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </label>
                <label>
                  Jumlah Kehadiran
                  <input value={pax} type='number' onChange={(e) => setPax(parseInt(e.target.value, 10))} required />
                </label>
                <div className="actions">
                  <button type="submit" className="btn-primary">Hantar RSVP</button>
                </div>
              </form>
            ) : (
              <div className="thanks">
                <p>Terima kasih, RSVP anda diterima.</p>
              </div>
            )}
          </div>
        </div>
  )
}