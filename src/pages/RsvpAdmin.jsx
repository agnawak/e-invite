import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from "react-router-dom";

export default function RsvpAdmin({ onBack }) {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function load() {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('Nabil_RSVP')
      .select('id, name, pax, attendance, created_at')
      .order('created_at', { ascending: true })

    if (error) {
      setError(error.message || 'Failed to load RSVPs')
      setRsvps([])
    } else {
      setRsvps(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const totalPax = rsvps
    .filter((r) => String(r.attendance).toLowerCase() === 'yes')
    .reduce((s, r) => s + (Number(r.pax) || 0), 0)

  const counts = rsvps.reduce((acc, r) => {
    const key = String(r.attendance).toLowerCase() === 'yes' ? 'yes' : 'no'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  function exportCsv() {
    const headers = ['id', 'name', 'attendance', 'pax', 'created_at']
    const rows = rsvps.map((r) => [r.id, r.name, r.attendance, r.pax, r.created_at])
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g,'""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rsvps.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page admin-page">
      {/* <div className="card"> */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2>RSVPs</h2>
          <div>
            <button className="btn-secondary" onClick={() => navigate('/')}>Back</button>
            <button className="btn-primary" style={{marginLeft:8}} onClick={load}>Refresh</button>
            <button className="btn-secondary" style={{marginLeft:8}} onClick={exportCsv}>Export CSV</button>
          </div>
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p className="small error">{error}</p>
        ) : (
          <div>
            <p><strong>Total RSVPs:</strong> {rsvps.length}</p>
            <p><strong>Total Pax (confirmed attending):</strong> {totalPax}</p>
            <p><strong>Attending:</strong> {counts.yes || 0} • <strong>Not attending:</strong> {counts.no || 0}</p>

            <div style={{marginTop:12}}>
              <table style={{width:'100%', borderCollapse:'collapse'}}>
                <thead>
                  <tr>
                    <th style={{textAlign:'left', borderBottom:'1px solid rgba(0,0,0,0.08)', padding:'8px'}}>Name</th>
                    <th style={{textAlign:'left', borderBottom:'1px solid rgba(0,0,0,0.08)', padding:'8px'}}>Attendance</th>
                    <th style={{textAlign:'left', borderBottom:'1px solid rgba(0,0,0,0.08)', padding:'8px'}}>Pax</th>
                    <th style={{textAlign:'left', borderBottom:'1px solid rgba(0,0,0,0.08)', padding:'8px'}}>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r) => (
                    <tr key={r.id}>
                      <td style={{padding:'8px 8px 12px 8px'}}>{r.name}</td>
                      <td style={{padding:'8px 8px 12px 8px'}}>{r.attendance}</td>
                      <td style={{padding:'8px 8px 12px 8px'}}>{r.pax}</td>
                      <td style={{padding:'8px 8px 12px 8px'}}>{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      {/* </div> */}
    </div>
  )
}
