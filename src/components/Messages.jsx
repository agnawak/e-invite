import { useState, useRef, useEffect } from 'react'

export default function Messages({ messages = [], onSend }) {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  function submit(e) {
    e.preventDefault()
    if (!text.trim()) {
      setError('Please enter a message')
      return
    }
    setError('')
    onSend({ text: text.trim(), name: name.trim() || 'Guest' })
    setText('')
    setName('')
  }

  return (
    <div className="messages-card">
      <div ref={listRef} className="messages-list">
        {messages.length === 0 ? (
          <p className="small">No messages yet — be the first to leave one!</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="message-item">
              <div className="message-text">{m.text}</div>
              <div className="message-meta small">{m.name} • {new Date(m.createdAt).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={submit} className="message-form">
        <input aria-label="Your name" className="message-name" placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea aria-label="Message" maxLength={500} className="message-textarea" placeholder="Write your message…" value={text} onChange={(e) => setText(e.target.value)} rows={3} />
        {error && <div className="small error" role="alert">{error}</div>}
        <button type="submit" className="btn-primary">Send Message</button>
      </form>
    </div>
  )
}
