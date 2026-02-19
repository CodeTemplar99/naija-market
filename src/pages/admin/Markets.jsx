import React, { useState, useMemo } from 'react'
import { MARKETS, CATEGORIES } from '../../data/markets'
import { Plus, Search, Filter, MoreHorizontal, CheckCircle, XCircle, AlertCircle, Trash2, Edit3, BarChart2, TrendingUp, TrendingDown, DollarSign, Clock, LayoutGrid, List } from 'lucide-react'

const AdminMarkets = () => {
  const [markets, setMarkets] = useState(MARKETS)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all') // all, live, pending, ended, resolved
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [viewMode, setViewMode] = useState('table') // table, grid
  const [currentPage, setCurrentPage] = useState(1)
  const marketsPerPage = 8

  // Form State
  const [form, setForm] = useState({
    question: '', category: 'Politics', type: 'binary',
    endDate: '', image: '', description: '', rules: '',
    options: [{ name: '', color: '#00C853' }, { name: '', color: '#FF3D00' }]
  })

  // Generate enriched markets (mocking dynamic data like PM)
  const enrichedMarkets = useMemo(() => {
    return markets.map(m => ({
      ...m,
      liquidity: Math.floor(Math.random() * 50000) + 10000,
      traders: Math.floor(Math.random() * 2000) + 50,
      creationDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      status: m.isLive ? 'Live' : (Math.random() > 0.5 ? 'Pending Resolution' : 'Resolved'),
      chance: m.type === 'binary' ? Math.floor(Math.random() * 100) : null
    }))
  }, [markets])

  const handleSave = () => {
    const newMarket = {
      id: markets.length + 1, ...form,
      volume: '0', isLive: true, comments: 0,
      yesPrice: 50, noPrice: 50, change24h: 0,
      endTimestamp: new Date(form.endDate).getTime()
    }
    setMarkets([newMarket, ...markets])
    setShowModal(false)
  }

  const filtered = enrichedMarkets.filter(m => {
    const matchesSearch = m.question.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || m.category === category

    let matchesStatus = true
    if (filter === 'live') matchesStatus = m.status === 'Live'
    if (filter === 'pending') matchesStatus = m.status === 'Pending Resolution'
    if (filter === 'resolved') matchesStatus = m.status === 'Resolved'
    if (filter === 'ended') matchesStatus = m.status !== 'Live'

    return matchesSearch && matchesCategory && matchesStatus
  })

  const indexOfLastMarket = currentPage * marketsPerPage
  const indexOfFirstMarket = indexOfLastMarket - marketsPerPage
  const currentMarkets = filtered.slice(indexOfFirstMarket, indexOfLastMarket)
  const totalPages = Math.ceil(filtered.length / marketsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Status colors
  const getStatusNode = (status) => {
    if (status === 'Live') return <span className="status-badge live"><span className="dot"></span>Live</span>
    if (status === 'Pending Resolution') return <span className="status-badge pending"><Clock size={12} /> Pending</span>
    return <span className="status-badge resolved"><CheckCircle size={12} /> Resolved</span>
  }

  return (
    <div className="admin-markets animate-slide-up">
      <div className="am-header">
        <div>
          <h1 className="am-title">Market Operations</h1>
          <p className="am-subtitle">Deploy, monitor, and resolve prediction markets.</p>
        </div>
        <button className="btn-solid-glow" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Deploy Market
        </button>
      </div>

      <div className="am-layout">
        {/* Sidebar Filters */}
        <div className="am-sidebar glass">
          <div className="sb-section">
            <div className="search-box glass-input">
              <Search size={16} />
              <input type="text" placeholder="Search markets..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1) }} />
            </div>
          </div>

          <div className="sb-section">
            <h3>Lifecycle</h3>
            <div className="sb-links">
              <button className={`sb-link ${filter === 'all' ? 'active' : ''}`} onClick={() => { setFilter('all'); setCurrentPage(1) }}>All Markets</button>
              <button className={`sb-link ${filter === 'live' ? 'active' : ''}`} onClick={() => { setFilter('live'); setCurrentPage(1) }}>Live & Active</button>
              <button className={`sb-link ${filter === 'pending' ? 'active' : ''}`} onClick={() => { setFilter('pending'); setCurrentPage(1) }}>Pending Resolution</button>
              <button className={`sb-link ${filter === 'resolved' ? 'active' : ''}`} onClick={() => { setFilter('resolved'); setCurrentPage(1) }}>Resolved</button>
            </div>
          </div>

          <div className="sb-section">
            <h3>Categories</h3>
            <div className="sb-links tags">
              <button className={`cat-tag ${category === 'All' ? 'active' : ''}`} onClick={() => { setCategory('All'); setCurrentPage(1) }}>All</button>
              {CATEGORIES.map(c => (
                <button key={c} className={`cat-tag ${category === c ? 'active' : ''}`} onClick={() => { setCategory(c); setCurrentPage(1) }}>{c}</button>
              ))}
            </div>
          </div>

          <div className="sb-section mt-auto">
            <div className="market-stat-box">
              <DollarSign size={16} color="#00C853" />
              <div>
                <span className="msb-label">Total Locked TVL</span>
                <span className="msb-val">₦2.4B</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="am-main">
          <div className="am-toolbar">
            <div className="amt-left">
              <span className="amt-count">{filtered.length} Markets Found</span>
            </div>
            <div className="amt-right">
              <div className="view-tog glass">
                <button className={`vt-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><List size={16} /></button>
                <button className={`vt-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><LayoutGrid size={16} /></button>
              </div>
            </div>
          </div>

          {viewMode === 'table' ? (
            <div className="table-responsive glass">
              <table className="am-table">
                <thead>
                  <tr>
                    <th>Market Information</th>
                    <th>Status & Lifecycle</th>
                    <th>Financials</th>
                    <th>Current Odds</th>
                    <th style={{ textAlign: 'right' }}>Management</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMarkets.map(m => (
                    <tr key={m.id}>
                      <td className="td-main">
                        <img src={m.image || 'https://via.placeholder.com/40'} alt="" className="td-img" />
                        <div className="td-info">
                          <span className="td-q">{m.question}</span>
                          <span className="td-sub">
                            <span className="cat-badge">{m.category}</span>
                            <span className="td-type">{m.type === 'binary' ? 'Yes/No' : 'Multiple Choice'}</span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="td-lifecycle">
                          {getStatusNode(m.status)}
                          <span className="td-date">Ends: {m.endDate || 'TBD'}</span>
                        </div>
                      </td>
                      <td>
                        <div className="td-fin">
                          <span className="td-vol">Vol: ₦{m.volume}</span>
                          <span className="td-liq">Liq: ₦{m.liquidity.toLocaleString()}</span>
                        </div>
                      </td>
                      <td>
                        {m.type === 'binary' ? (
                          <div className="odds-bar-wrap text-xs">
                            <div className="odds-label"><span>{m.chance}% YES</span><span>{100 - m.chance}% NO</span></div>
                            <div className="odds-bar"><div className="odds-fill" style={{ width: `${m.chance}%` }}></div></div>
                          </div>
                        ) : (
                          <span className="multi-pill">Multiple Options</span>
                        )}
                      </td>
                      <td>
                        <div className="td-actions justify-end">
                          <button className="btn-icon" title="Edit Parameters"><Edit3 size={16} /></button>
                          {m.status !== 'Resolved' && (
                            <button className="btn-icon success" title="Resolve Market"><CheckCircle size={16} /></button>
                          )}
                          <button className="btn-icon danger" title="Emergency Pause"><AlertCircle size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentMarkets.length === 0 && (
                    <tr><td colSpan="5" className="empty-state">No markets matched your criteria</td></tr>
                  )}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="pagination">
                  <span className="page-info">Showing {indexOfFirstMarket + 1}-{Math.min(indexOfLastMarket, filtered.length)} of {filtered.length}</span>
                  <div className="page-controls">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button key={i} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => paginate(i + 1)}>{i + 1}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="am-grid-view">
              {currentMarkets.map(m => (
                <div key={m.id} className="grid-market-card glass">
                  <div className="gmc-top">
                    {getStatusNode(m.status)}
                    <span className="cat-badge">{m.category}</span>
                  </div>
                  <div className="gmc-body">
                    <img src={m.image || 'https://via.placeholder.com/60'} alt="" className="gmc-img" />
                    <h4 className="gmc-q">{m.question}</h4>
                  </div>
                  {m.type === 'binary' && (
                    <div className="odds-bar-wrap mb-1">
                      <div className="odds-label"><span>{m.chance}% YES</span><span>{100 - m.chance}% NO</span></div>
                      <div className="odds-bar"><div className="odds-fill" style={{ width: `${m.chance}%` }}></div></div>
                    </div>
                  )}
                  <div className="gmc-stats border-t">
                    <div className="gmc-stat"><span className="g-lbl">Vol</span><span className="g-val">₦{m.volume}</span></div>
                    <div className="gmc-stat"><span className="g-lbl">Liq</span><span className="g-val">₦{m.liquidity.toLocaleString()}</span></div>
                  </div>
                  <div className="gmc-actions border-t">
                    <button className="btn-icon small"><Edit3 size={14} /></button>
                    <button className="btn-icon small success"><CheckCircle size={14} /></button>
                    <button className="btn-solid-glow small">Manage</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Creation Modal */}
      {showModal && (
        <div className="modal-overlay glass-heavy" onClick={() => setShowModal(false)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <div className="mc-header">
              <h2>Deploy New Market</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><XCircle size={20} /></button>
            </div>

            <div className="mc-body form-body">
              <div className="form-group">
                <label>Resolution Question</label>
                <input type="text" className="input-large bg-input" placeholder="e.g. Will Bitcoin cross $100k by March?" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} />
              </div>

              <div className="form-row col-3">
                <div className="form-group">
                  <label>Market Category</label>
                  <select className="select bg-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Market Type</label>
                  <div className="type-tog bg-input">
                    <button className={`tt ${form.type === 'binary' ? 'active' : ''}`} onClick={() => setForm({ ...form, type: 'binary' })}>Binary (Yes/No)</button>
                    <button className={`tt ${form.type === 'multi' ? 'active' : ''}`} onClick={() => setForm({ ...form, type: 'multi' })}>Multiple Choice</button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Resolution Date</label>
                  <input type="date" className="input bg-input" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
                </div>
              </div>

              <div className="form-group border-t pt-1">
                <label>Resolution Rules (CRITICAL)</label>
                <textarea className="input area bg-input" rows="4" placeholder="Define exactly how and when this market resolves. What is the source of truth?" value={form.rules} onChange={e => setForm({ ...form, rules: e.target.value })}></textarea>
              </div>

              <div className="form-group border-t pt-1">
                <label>Initial Liquidity & Seed Phrase</label>
                <div className="form-row">
                  <div className="glass-input small-icon w-full"><DollarSign size={14} /><input type="number" placeholder="Initial AMM Liquidity (₦)" className="bg-transparent" /></div>
                  <input type="text" className="input bg-input w-full" placeholder="Image URL for market icon" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                </div>
              </div>

              <div className="modal-actions border-t pt-1 mt-1">
                <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel Deployment</button>
                <button className="btn-solid-glow" onClick={handleSave}>Confirm & Deploy Market</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-markets { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1400px; margin: 0 auto; height: calc(100vh - 120px); }
        .am-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-shrink: 0; }
        .am-title { font-size: 2.2rem; font-weight: 800; letter-spacing: -0.05em; font-family: var(--font-display); background: linear-gradient(135deg, #fff, #999); -webkit-background-clip: text; color: transparent; margin-bottom: 0.2rem; }
        .am-subtitle { color: var(--text-muted); font-size: 1rem; }
        
        .btn-solid-glow { background: var(--primary); color: white; padding: 0.8rem 1.5rem; border-radius: 10px; font-weight: 800; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; box-shadow: 0 0 20px rgba(0, 200, 83, 0.3); transition: all 0.2s; }
        .btn-solid-glow:hover { transform: translateY(-2px); box-shadow: 0 4px 25px rgba(0, 200, 83, 0.5); }
        .btn-solid-glow.small { padding: 0.4rem 0.8rem; font-size: 0.8rem; box-shadow: none; }

        .am-layout { display: flex; gap: 1.5rem; flex: 1; min-height: 0; }
        
        .am-sidebar { width: 280px; flex-shrink: 0; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.08); padding: 1.5rem; display: flex; flex-direction: column; gap: 2rem; overflow-y: auto; background: rgba(0,0,0,0.3); }
        .sb-section h3 { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #666; margin-bottom: 1rem; letter-spacing: 0.05em; }
        
        .glass-input { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); }
        .glass-input input { background: none; border: none; color: white; font-size: 0.9rem; outline: none; width: 100%; box-shadow: none; }
        .bg-transparent { background: transparent; border: none; color: white; outline: none; width: 100%; }

        .sb-links { display: flex; flex-direction: column; gap: 0.4rem; }
        .sb-link { background: none; border: none; text-align: left; padding: 0.6rem 0.8rem; border-radius: 8px; color: #aaa; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .sb-link:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .sb-link.active { background: rgba(255,255,255,0.1); color: #fff; box-shadow: inset 2px 0 0 var(--primary); }

        .tags { flex-direction: row; flex-wrap: wrap; gap: 0.4rem; }
        .cat-tag { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 0.3rem 0.75rem; border-radius: 100px; color: #888; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .cat-tag:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .cat-tag.active { background: var(--surface-light); color: #fff; border-color: rgba(255,255,255,0.2); }

        .mt-auto { margin-top: auto; }
        .market-stat-box { display: flex; align-items: center; gap: 1rem; background: rgba(0,200,83,0.05); border: 1px solid rgba(0,200,83,0.1); padding: 1rem; border-radius: 12px; }
        .msb-label { font-size: 0.7rem; color: #888; font-weight: 800; text-transform: uppercase; display: block; }
        .msb-val { font-size: 1.25rem; color: var(--accent-yes); font-weight: 900; font-family: var(--font-display); }

        .am-main { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; }
        
        .am-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-shrink: 0; }
        .amt-count { font-size: 0.9rem; font-weight: 800; color: #888; }
        .view-tog { display: flex; background: rgba(255,255,255,0.05); padding: 0.2rem; border-radius: 8px; }
        .vt-btn { background: none; border: none; color: #666; padding: 0.4rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .vt-btn:hover { color: #fff; }
        .vt-btn.active { background: rgba(255,255,255,0.1); color: #fff; }

        .table-responsive { flex: 1; overflow-y: auto; border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; background: rgba(20,20,20,0.5); }
        .am-table { width: 100%; border-collapse: collapse; text-align: left; }
        .am-table th { position: sticky; top: 0; background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); padding: 1rem 1.5rem; color: #666; font-size: 0.7rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 800; z-index: 10; letter-spacing: 0.05em; }
        .am-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: top; }
        .am-table tr:hover td { background: rgba(255,255,255,0.02); }
        
        .td-main { display: flex; gap: 1.25rem; align-items: flex-start; max-width: 400px; }
        .td-img { width: 44px; height: 44px; border-radius: 10px; object-fit: cover; background: #222; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; }
        .td-info { display: flex; flex-direction: column; gap: 0.4rem; }
        .td-q { font-weight: 700; color: #fff; font-size: 1rem; line-height: 1.3; }
        .td-sub { display: flex; align-items: center; gap: 0.5rem; }
        .cat-badge { font-size: 0.65rem; font-weight: 800; background: rgba(255,255,255,0.1); padding: 0.15rem 0.5rem; border-radius: 4px; text-transform: uppercase; color: #ccc; }
        .td-type { font-size: 0.75rem; color: #888; font-weight: 600; }

        .td-lifecycle { display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-start; }
        .status-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .status-badge.live { background: rgba(0,200,83,0.1); color: var(--accent-yes); border: 1px solid rgba(0,200,83,0.2); }
        .status-badge.pending { background: rgba(255,152,0,0.1); color: #ff9800; border: 1px solid rgba(255,152,0,0.2); }
        .status-badge.resolved { background: rgba(255,255,255,0.05); color: #888; border: 1px solid rgba(255,255,255,0.1); }
        .td-date { font-size: 0.75rem; color: #666; font-weight: 600; }

        .td-fin { display: flex; flex-direction: column; gap: 0.2rem; }
        .td-vol { font-weight: 800; font-family: monospace; font-size: 0.95rem; color: #fff; }
        .td-liq { font-size: 0.75rem; color: #888; font-family: monospace; }
        
        .odds-bar-wrap { width: 140px; display: flex; flex-direction: column; gap: 0.3rem; }
        .odds-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800; }
        .odds-label span:first-child { color: var(--accent-yes); }
        .odds-label span:last-child { color: var(--accent-no); }
        .odds-bar { width: 100%; height: 6px; background: rgba(229,57,53,0.2); border-radius: 10px; overflow: hidden; }
        .odds-fill { height: 100%; background: var(--accent-yes); }
        .multi-pill { font-size: 0.75rem; color: #4096FF; font-weight: 700; background: rgba(64,150,255,0.1); padding: 0.2rem 0.6rem; border-radius: 4px; }
        
        .td-actions { display: flex; gap: 0.5rem; }
        .justify-end { justify-content: flex-end; }
        .btn-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); color: #aaa; cursor: pointer; transition: all 0.2s; }
        .btn-icon:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateY(-2px); }
        .btn-icon.success:hover { background: var(--accent-yes); color: #fff; border-color: var(--accent-yes); }
        .btn-icon.danger:hover { background: var(--accent-no); color: #fff; border-color: var(--accent-no); }

        .empty-state { text-align: center; padding: 4rem; color: #888; font-weight: 600; }

        .pagination { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); margin-top: auto; }
        .page-info { color: #888; font-size: 0.8rem; font-weight: 600; }
        .page-controls { display: flex; gap: 0.25rem; }
        .page-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #ddd; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; }
        .page-btn.active { background: var(--primary); color: white; border-color: var(--primary); }

        /* Grid View */
        .am-grid-view { flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; align-content: flex-start; }
        .grid-market-card { padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 1rem; background: rgba(20,20,20,0.6); transition: transform 0.2s; }
        .grid-market-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.2); }
        .gmc-top { display: flex; justify-content: space-between; align-items: center; }
        .gmc-body { display: flex; flex-direction: column; gap: 0.75rem; }
        .gmc-img { width: 100%; height: 120px; border-radius: 8px; object-fit: cover; background: #222; }
        .gmc-q { font-size: 1.1rem; font-weight: 800; margin: 0; line-height: 1.3; }
        .mb-1 { margin-bottom: 0.5rem; width: 100%; }
        
        .gmc-stats { display: flex; justify-content: space-between; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
        .gmc-stat { display: flex; flex-direction: column; gap: 0.2rem; }
        .g-lbl { font-size: 0.7rem; font-weight: 800; color: #888; text-transform: uppercase; }
        .g-val { font-size: 0.9rem; font-weight: 800; font-family: monospace; }
        
        .gmc-actions { display: flex; justify-content: flex-end; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }

        /* Modal specific */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .modal-content.large { width: 90%; max-width: 800px; background: var(--bg); border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow: hidden; animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        
        .mc-header { padding: 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); }
        .mc-body { padding: 2rem; overflow-y: auto; max-height: calc(100vh - 200px); }
        
        .form-body { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-row { display: grid; gap: 1rem; }
        .form-row.col-3 { grid-template-columns: repeat(3, 1fr); }
        .form-group label { display: block; font-size: 0.8rem; font-weight: 800; color: #aaa; text-transform: uppercase; margin-bottom: 0.6rem; letter-spacing: 0.05em; }
        
        .input-large { font-size: 1.25rem !important; font-weight: 800 !important; padding: 1rem 1.25rem !important; }
        .bg-input { background: rgba(255,255,255,0.02) !important; border: 1px solid rgba(255,255,255,0.08) !important; color: white; border-radius: 10px; width: 100%; box-sizing: border-box; }
        .bg-input:focus { border-color: var(--primary) !important; background: rgba(0,200,83,0.05) !important; outline: none; }
        
        .type-tog { display: flex; padding: 0.2rem; }
        .tt { flex: 1; padding: 0.6rem; text-align: center; border-radius: 6px; font-size: 0.85rem; font-weight: 700; color: #666; border: none; background: none; cursor: pointer; transition: all 0.2s; }
        .tt.active { background: var(--surface-light); color: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }

        .border-t { border-top: 1px solid rgba(255,255,255,0.08); }
        .pt-1 { padding-top: 1.5rem; }
        .mt-1 { margin-top: 1rem; }
        
        .w-full { width: 100%; }
        
        @media (max-width: 1024px) {
           .am-layout { flex-direction: column; height: auto; display: block; }
           .am-sidebar { width: 100%; max-height: 250px; }
           .form-row.col-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

export default AdminMarkets
