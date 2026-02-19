import React, { useState } from 'react'
import { MARKETS, CATEGORIES } from '../../data/markets'
import { Plus, Search, Filter, MoreHorizontal, CheckCircle, XCircle, AlertCircle, Trash2, Edit3, BarChart2 } from 'lucide-react'

const AdminMarkets = () => {
  const [markets, setMarkets] = useState(MARKETS)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Form State
  const [form, setForm] = useState({
    question: '', category: 'Politics', type: 'binary',
    endDate: '', image: '', description: '', rules: '',
    options: [{ name: '', color: '#00C853' }, { name: '', color: '#FF3D00' }]
  })

  const handleSave = () => {
    const newMarket = {
      id: markets.length + 1,
      ...form,
      volume: '0', liquidity: '₦100k', traders: 0,
      isLive: true, comments: 0,
      yesPrice: 50, noPrice: 50, change24h: 0,
      endTimestamp: new Date(form.endDate).getTime()
    }
    setMarkets([newMarket, ...markets])
    setShowModal(false)
  }

  const addOption = () => setForm({ ...form, options: [...form.options, { name: '', color: '#888888' }] })
  const updateOption = (i, field, val) => {
    const newOpts = [...form.options]
    newOpts[i][field] = val
    setForm({ ...form, options: newOpts })
  }

  const filtered = markets.filter(m => 
    (filter === 'all' || (filter === 'live' && m.isLive) || (filter === 'ended' && !m.isLive)) &&
    m.question.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="admin-markets">
      <div className="am-toolbar">
        <div className="search-box glass">
          <Search size={16} className="si" />
          <input type="text" placeholder="Search markets..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        
        <div className="am-filters">
          <button className={`am-filter ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`am-filter ${filter === 'live' ? 'active' : ''}`} onClick={() => setFilter('live')}>Live</button>
          <button className={`am-filter ${filter === 'ended' ? 'active' : ''}`} onClick={() => setFilter('ended')}>Ended</button>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={18} /> Create Market</button>
      </div>

      <div className="am-grid glass">
        <table className="am-table">
          <thead>
            <tr>
              <th>Market</th>
              <th>Type</th>
              <th>Volume</th>
              <th>Status</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td className="td-main">
                  <img src={m.image} alt="" className="td-img" />
                  <div className="td-info">
                    <span className="td-q">{m.question}</span>
                    <span className="td-cat">{m.category}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${m.type === 'binary' ? 'badge-green' : 'badge-blue'}`}>
                    {m.type === 'binary' ? 'Yes/No' : 'Multi'}
                  </span>
                </td>
                <td className="fw">₦{m.volume}</td>
                <td>
                  {m.isLive 
                    ? <span className="status-pill live"><span className="dot"></span> Live</span>
                    : <span className="status-pill ended">Ended</span>
                  }
                </td>
                <td className="muted">{m.endDate}</td>
                <td>
                  <div className="td-actions">
                    <button className="btn-icon" title="Edit"><Edit3 size={16} /></button>
                    <button className="btn-icon warning" title="Resolve"><CheckCircle size={16} /></button>
                    <button className="btn-icon danger" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card admin-modal">
            <div className="modal-header">
              <h2>Create New Market</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><XCircle size={20} /></button>
            </div>
            
            <div className="modal-body form-body">
              <div className="form-group">
                <label>Question</label>
                <input type="text" className="input" placeholder="e.g. Will Bitcoin hit $100k?" 
                  value={form.question} onChange={e => setForm({...form, question: e.target.value})} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select className="select input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Market Type</label>
                  <div className="type-tog">
                    <button className={`tt ${form.type === 'binary' ? 'active' : ''}`} onClick={() => setForm({...form, type: 'binary'})}>Binary</button>
                    <button className={`tt ${form.type === 'multi' ? 'active' : ''}`} onClick={() => setForm({...form, type: 'multi'})}>Multi</button>
                  </div>
                </div>
              </div>

              {form.type === 'multi' && (
                <div className="form-group">
                  <label>Options</label>
                  <div className="opts-list">
                    {form.options.map((opt, i) => (
                      <div key={i} className="opt-row">
                        <input type="color" className="opt-color" value={opt.color} onChange={e => updateOption(i, 'color', e.target.value)} />
                        <input type="text" className="input opt-input" placeholder={`Option ${i+1}`} value={opt.name} onChange={e => updateOption(i, 'name', e.target.value)} />
                        {i > 1 && <button className="btn-icon danger" onClick={() => {
                          const newOpts = form.options.filter((_, idx) => idx !== i)
                          setForm({...form, options: newOpts})
                        }}><XCircle size={16} /></button>}
                      </div>
                    ))}
                    <button className="btn btn-ghost btn-sm w-full" onClick={addOption}><Plus size={14} /> Add Option</button>
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" className="input" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input type="text" className="input" placeholder="https://..." value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea className="input area" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
              </div>

              <div className="form-group">
                <label>Resolution Rules</label>
                <textarea className="input area" rows="2" placeholder="One rule per line" value={form.rules} onChange={e => setForm({...form, rules: e.target.value})}></textarea>
              </div>

              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Publish Market</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .am-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; gap: 1rem; }
        .am-filters { display: flex; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.25rem; border-radius: 8px; }
        .am-filter { padding: 0.4rem 1rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: #888; border: none; background: none; cursor: pointer; transition: all 0.2s; }
        .am-filter.active { background: var(--surface-light); color: #fff; }
        .am-filter:hover { color: #fff; }

        .am-grid { border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
        .am-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left; }
        .am-table th { padding: 1rem 1.5rem; color: #666; font-size: 0.75rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 700; }
        .am-table td { padding: 1rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ddd; vertical-align: middle; }
        .am-table tr:last-child td { border-bottom: none; }
        .am-table tr:hover { background: rgba(255,255,255,0.02); }

        .td-main { display: flex; gap: 1rem; align-items: center; }
        .td-img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; background: #222; }
        .td-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .td-q { max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600; color: #fff; }
        .td-cat { font-size: 0.75rem; color: #666; }

        .status-pill { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status-pill.live { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .status-pill.ended { background: rgba(255,255,255,0.05); color: #666; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

        .td-actions { display: flex; gap: 0.5rem; }
        .btn-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #888; cursor: pointer; transition: all 0.2s; }
        .btn-icon:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .btn-icon.warning:hover { background: rgba(255,214,0,0.1); color: var(--accent-yellow); border-color: var(--accent-yellow); }
        .btn-icon.danger:hover { background: rgba(255,61,0,0.1); color: var(--accent-no); border-color: var(--accent-no); }

        /* Modal specific */
        .admin-modal { max-width: 600px; }
        .form-body { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group label { display: block; font-size: 0.75rem; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 0.5rem; }
        .type-tog { display: flex; background: rgba(255,255,255,0.05); padding: 0.2rem; border-radius: 8px; }
        .tt { flex: 1; padding: 0.5rem; text-align: center; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: #666; border: none; background: none; cursor: pointer; }
        .tt.active { background: var(--surface-light); color: #fff; }

        .opts-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .opt-row { display: flex; gap: 0.5rem; align-items: center; }
        .opt-color { width: 36px; height: 36px; border: none; background: none; cursor: pointer; }
        .opt-input { flex: 1; }
        .area { resize: vertical; min-height: 80px; }
        
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem; }
      `}</style>
    </div>
  )
}

export default AdminMarkets
