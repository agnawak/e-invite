import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from "react-router-dom";

export default function RsvpAdmin({ onBack }) {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [nameFilter, setNameFilter] = useState('')
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

  const filteredRsvps = nameFilter && nameFilter.trim()
    ? rsvps.filter((r) => (r.name || '').toLowerCase().includes(nameFilter.trim().toLowerCase()))
    : rsvps

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
      {/* <div className="hero invite-root aturcara-bg nogap" style={{position:'fixed'}}></div> */}
      {/* <div className="card"> */}
        <div style={{alignItems:'center'}}>
          <h2 className='playfair-display'>Rumusan Kehadiran (RSVP)</h2>
          <div>
            <button className="btn-primary" onClick={() => navigate('/')}>Halaman Utama</button>
          </div>
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p className="small error">{error}</p>
        ) : (
          <>
          <div style={{display:'flex', justifyContent:'space-around', marginTop:16}}>
            <div className='status-cards'>
              <p><strong>{rsvps.length}</strong></p>
              <p style={{fontSize:'.8rem'}} className='playfair-display'>Isian RSVP</p>
            </div>
            <div className='status-cards'>
              <p><strong>{totalPax}</strong></p>
              <p style={{fontSize:'.8rem'}} className='playfair-display'>Jumlah Kehadiran</p>
            </div>
            {/* <p><strong>Kehadiran Total:</strong> {totalPax}</p>
            <p><strong>Attending:</strong> {counts.yes || 0} • <strong>Not attending:</strong> {counts.no || 0}</p> */}
          </div>
            <div style={{marginTop:40}}>
            <button className="btn-primary" onClick={load}>Kemaskini</button>
            <button className="btn-primary" style={{marginLeft:8}} onClick={exportCsv}>Eksport CSV</button>

            <div style={{display:'flex', alignItems:'center', gap:8, marginTop:12}}>
              <input
                type="text"
                placeholder="Cari nama..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                style={{padding:'6px 8px', borderRadius:4, border:'1px solid rgba(0,0,0,0.12)', width:150, backgroundColor:'#f8f8f8'}}
              />
              <button
                className="btn-primary"
                onClick={() => setNameFilter('')}
                style={{padding:'6px 10px'}}
              >Padam</button>
              <div style={{marginLeft:12, fontSize:'.6rem'}}>
                <strong>{filteredRsvps.length}</strong> / {rsvps.length} Dijumpai
              </div>
            </div>

              <table style={{width:'80vw', borderCollapse:'collapse', marginTop:20}} className='card'>
                <thead>
                  <tr>
                    <th style={{textAlign:'center', borderBottom:'1px solid rgba(0,0,0,0.08)', padding:'8px'}} className='playfair-display'>Nama</th>
                    <th style={{textAlign:'center', borderBottom:'1px solid rgba(0,0,0,0.08)', padding:'8px'}} className='playfair-display'>Kehadiran</th>
                    <th style={{textAlign:'center', borderBottom:'1px solid rgba(0,0,0,0.08)', padding:'8px'}} className='playfair-display'>BilanganTetamu</th>
                    {/* <th style={{textAlign:'left', borderBottom:'1px solid rgba(0,0,0,0.08)', padding:'8px'}}>Submitted</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.map((r) => (
                    <tr key={r.id}>
                      <td style={{padding:'8px 8px 12px 8px'}} className='playfair-display'>{r.name}</td>
                      <td style={{padding:'8px 8px 12px 8px'}} className='playfair-display'>{r.attendance}</td>
                      <td style={{padding:'8px 8px 12px 8px'}} className='playfair-display'>{r.pax}</td>
                      {/* <td style={{padding:'8px 8px 12px 8px'}}>{new Date(r.created_at).toLocaleString()}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
    </div>
  )
}
