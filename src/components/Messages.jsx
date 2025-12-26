import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [sent, setSent] = useState(false)
  const listRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    let mounted = true
    let channel = null

    async function load() {
      // Reads id, name, wish, created_at from the `messages` table
      const { data, error } = await supabase
        .from('Nabil_Messages')
        .select('id, name, wish, created_at')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Failed to load messages:', error)
        return
      }

      if (!mounted) return
      setMessages(data.map((m) => ({ id: m.id, name: m.name, text: m.wish, createdAt: m.created_at })))
    }

    load()

    // Optional: set up realtime subscription for new messages (requires Realtime enabled)
    // Uncomment and adjust table/schema name if you want realtime updates
    // channel = supabase
    //   .channel('public:messages')
    //   .on(
    //     'postgres_changes',
    //     { event: 'INSERT', schema: 'public', table: 'Nabil_Messages' },
    //     (payload) => {
    //       const n = payload.new
    //       setMessages((prev) => [...prev, { id: n.id, name: n.name, text: n.wish, createdAt: n.created_at }])
    //     }
    //   )
    //   .subscribe()

    function cleanup() {
      mounted = false
      if (channel && typeof channel.unsubscribe === 'function') {
        try { channel.unsubscribe() } catch (e) {}
      }
    }

    return cleanup
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (!text.trim()) {
      setError('Please enter a message')
      return
    }
    setError('')

    const payload = { name: name.trim() || 'Guest', wish: text.trim() }
    const { data, error } = await supabase.from('Nabil_Messages').insert(payload).select().single()

    if (error) {
      console.error('Insert failed:', error)
      setError('Failed to send message — try again')
      return
    }

    // Append the new message to local state for immediate feedback
    setMessages((s) => [...s, { id: data.id, name: data.name, text: data.wish, createdAt: data.created_at }])
    setText('')
    setName('')
    setSent(true)

    // scroll to bottom
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight

    // automatically close the form after a short delay
    window.setTimeout(() => {
      setShowForm(false)
      setSent(false)
    }, 1200)
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setSent(false)
        setShowForm(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="messages-card">
      <div ref={listRef} className="messages-list">
        {messages.length === 0 ? (
          <p className="small">Belum ada ucapan diterima.</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="message-item">
              <div className="message-text">"{m.text}"</div>
              <div className="message-meta small">{m.name}</div>
            </div>
          ))
        )}
      </div>

      <div className="message-actions">
        <button className="btn-primary" onClick={() => setShowForm(true)}>Tinggalkan Ucapan</button>
      </div>

      {showForm && (
        <div className="modal" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) { setSent(false); setShowForm(false) } }}>
          <div className="modal-content">
            <button className="close" onClick={() => { setSent(false); setShowForm(false); }}>Close</button>
            <h3>Leave a message</h3>
            {!sent ? (
              <form onSubmit={submit} ref={formRef} className="rsvp-form">
                <label>
                  Your name
                  <input value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                  Your message
                  <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} />
                </label>
                {error && <div className="small error" role="alert">{error}</div>}
                <div className="actions">
                  <button type="submit" className="btn-primary">Tinggalkan Ucapan</button>
                </div>
              </form>
            ) : (
              <div className="thanks">
                <p>Ucapan anda diterima!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
