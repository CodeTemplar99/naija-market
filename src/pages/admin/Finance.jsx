import React, { useState, useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight, Check, X, Clock, HelpCircle, Search, Filter, RefreshCw, Download, FileText, BarChart2, DollarSign } from 'lucide-react'

// Mock 30 transactions for pagination
const MOCK_TRX = Array.from({ length: 30 }).map((_, i) => {
  const isDeposit = Math.random() > 0.4
  const statusRnd = Math.random()
  let status = 'completed'
  if (statusRnd < 0.2) status = 'pending'
  else if (statusRnd < 0.3) status = 'rejected'
  
  return {
    id: `TRX-${98212 - i}`,
    type: isDeposit ? 'deposit' : 'withdraw',
    user: ['OlaTrader', 'AbujaWhale', 'LagosGains', 'NairaHunter', 'CryptoNaija'][Math.floor(Math.random() * 5)],
    amount: Math.floor(Math.random() * 500000) + 10000,
    method: isDeposit ? ['Paystack', 'Flutterwave', 'Bank Transfer'][Math.floor(Math.random() * 3)] : ['Zenith Bank', 'GTBank', 'Access Bank'][Math.floor(Math.random() * 3)],
    status,
    date: new Date(Date.now() - Math.random() * 100000000).toLocaleString(),
    fee: Math.floor(Math.random() * 500)
  }
})

// Ensure some pending ones at the top for interaction
MOCK_TRX[0] = { ...MOCK_TRX[0], status: 'pending', id: 'TRX-99001' }
MOCK_TRX[1] = { ...MOCK_TRX[1], status: 'pending', id: 'TRX-99002' }

const AdminFinance = () => {
  const [trxs, setTrxs] = useState(MOCK_TRX)
  const [filter, setFilter] = useState('all') // all, pending, completed, rejected
  const [typeFilter, setTypeFilter] = useState('all') // all, deposit, withdraw
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const updateStatus = (id, status) => {
    setTrxs(trxs.map(t => t.id === id ? { ...t, status } : t))
  }

  const filtered = useMemo(() => {
    return trxs.filter(t => {
      const matchSearch = t.user.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filter === 'all' || t.status === filter
      const matchType = typeFilter === 'all' || t.type === typeFilter
      return matchSearch && matchStatus && matchType
    })
  }, [trxs, search, filter, typeFilter])

  // Pagination
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentItems = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Stats
  const totalVol = trxs.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.amount, 0)
  const totalFees = trxs.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.fee, 0)
  const pendingCount = trxs.filter(t => t.status === 'pending').length

  const getStatusNode = (status) => {
    switch (status) {
      case 'pending': return <span className="status-badge pending"><Clock size={12} /> Pending</span>
      case 'completed': return <span className="status-badge completed"><Check size={12} /> Completed</span>
      case 'rejected': return <span className="status-badge rejected"><X size={12} /> Rejected</span>
      default: return null
    }
  }

  return (
    <div className="admin-finance animate-slide-up">
      <div className="af-header">
        <div>
           <h1 className="af-title">Treasury & Finance</h1>
           <p className="af-subtitle">Manage deposits, withdrawals, and protocol revenue.</p>
        </div>
        <div className="af-actions">
           <button className="btn-solid default"><Download size={16}/> Export CSV</button>
           <button className="btn-solid-glow"><FileText size={16}/> Generate Report</button>
        </div>
      </div>

      <div className="af-stats-grid">
         <div className="afs-card glass highlight-blue">
            <div className="afs-icon"><ArrowDownLeft size={20}/></div>
            <div className="afs-info">
               <span className="afs-label">Total Deposits (24h)</span>
               <span className="afs-val">₦{(totalVol * 0.6).toLocaleString()}</span>
               <span className="afs-trend up">+15.2%</span>
            </div>
         </div>
         <div className="afs-card glass highlight-red">
            <div className="afs-icon"><ArrowUpRight size={20}/></div>
            <div className="afs-info">
               <span className="afs-label">Total Withdrawals (24h)</span>
               <span className="afs-val">₦{(totalVol * 0.4).toLocaleString()}</span>
               <span className="afs-trend down">-4.1%</span>
            </div>
         </div>
         <div className="afs-card glass highlight-green">
            <div className="afs-icon"><DollarSign size={20}/></div>
            <div className="afs-info">
               <span className="afs-label">Protocol Fees Captured</span>
               <span className="afs-val">₦{(totalFees * 15).toLocaleString()}</span>
               <span className="afs-trend up">+8.5%</span>
            </div>
         </div>
         <div className="afs-card glass highlight-yellow">
            <div className="afs-icon alert"><Clock size={20}/></div>
            <div className="afs-info">
               <span className="afs-label">Pending Verifications</span>
               <span className="afs-val">{pendingCount}</span>
               <span className="afs-trend neutral">Needs Review</span>
            </div>
         </div>
      </div>

      <div className="af-content glass">
        <div className="af-toolbar">
          <div className="af-tabs">
            <button className={`at-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => {setFilter('all'); setCurrentPage(1)}}>Overview</button>
            <button className={`at-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => {setFilter('pending'); setCurrentPage(1)}}>
               Action Required <span className="at-badge">{pendingCount > 0 ? pendingCount : ''}</span>
            </button>
            <button className={`at-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => {setFilter('completed'); setCurrentPage(1)}}>Settled</button>
            <button className={`at-btn ${filter === 'rejected' ? 'active' : ''}`} onClick={() => {setFilter('rejected'); setCurrentPage(1)}}>Failed/Rejected</button>
          </div>
          
          <div className="af-filters">
            <div className="search-box glass-input">
              <Search size={16} />
              <input type="text" placeholder="Search Trx ID or User..." value={search} onChange={e => {setSearch(e.target.value); setCurrentPage(1)}} />
            </div>
            <select className="glass-select" value={typeFilter} onChange={e => {setTypeFilter(e.target.value); setCurrentPage(1)}}>
              <option value="all">All Types</option>
              <option value="deposit">Deposits Only</option>
              <option value="withdraw">Withdrawals Only</option>
            </select>
            <button className="btn-icon" title="Refresh"><RefreshCw size={16}/></button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="af-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Type & Method</th>
                <th>User Details</th>
                <th>Amount & Fee</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(t => (
                <tr key={t.id} className={t.status === 'rejected' ? 'row-muted' : ''}>
                  <td className="mono fw">{t.id}</td>
                  <td>
                    <div className="td-type-method">
                       <span className={`type-badge ${t.type}`}>
                         {t.type === 'deposit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                         {t.type}
                       </span>
                       <span className="td-method">{t.method}</span>
                    </div>
                  </td>
                  <td className="fw">{t.user}</td>
                  <td>
                    <div className="td-fin">
                      <span className="td-amount">₦{t.amount.toLocaleString()}</span>
                      <span className="td-fee">Fee: ₦{t.fee}</span>
                    </div>
                  </td>
                  <td className="muted text-sm">{t.date}</td>
                  <td>{getStatusNode(t.status)}</td>
                  <td>
                    <div className="af-actions justify-end">
                      {t.status === 'pending' ? (
                        <>
                          <button className="btn-solid success small" title="Approve Transaction" onClick={() => updateStatus(t.id, 'completed')}><Check size={14}/> Approve</button>
                          <button className="btn-icon danger" title="Reject" onClick={() => updateStatus(t.id, 'rejected')}><X size={16} /></button>
                        </>
                      ) : (
                        <button className="btn-icon" title="View Receipt"><FileText size={16}/></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {currentItems.length === 0 && (
                <tr><td colSpan="7" className="empty-state">No transactions found matching criteria.</td></tr>
              )}
            </tbody>
          </table>
          
          {totalPages > 1 && (
            <div className="pagination">
              <span className="page-info">Showing {indexOfFirst + 1}-{Math.min(indexOfLast, filtered.length)} of {filtered.length} transactions</span>
              <div className="page-controls">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => paginate(i + 1)}>{i + 1}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-finance { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1400px; margin: 0 auto; height: calc(100vh - 120px); }
        .af-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-shrink: 0; }
        .af-title { font-size: 2.2rem; font-weight: 800; letter-spacing: -0.05em; font-family: var(--font-display); background: linear-gradient(135deg, #fff, #999); -webkit-background-clip: text; color: transparent; margin-bottom: 0.2rem; }
        .af-subtitle { color: var(--text-muted); font-size: 1rem; }
        
        .af-actions { display: flex; gap: 0.75rem; }
        .btn-solid { padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; border: none; display: flex; align-items: center; gap: 0.4rem; }
        .btn-solid.default { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); }
        .btn-solid.default:hover { background: rgba(255,255,255,0.15); }
        .btn-solid.success { background: rgba(0,200,83,0.15); color: var(--accent-yes); border: 1px solid rgba(0,200,83,0.3); }
        .btn-solid.success:hover { background: var(--accent-yes); color: white; }
        .btn-solid.small { padding: 0.4rem 0.8rem; font-size: 0.75rem; }
        
        .btn-solid-glow { background: var(--primary); color: white; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; box-shadow: 0 0 15px rgba(0, 200, 83, 0.2); transition: all 0.2s; }
        .btn-solid-glow:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0, 200, 83, 0.4); }

        .af-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; flex-shrink: 0; }
        .afs-card { padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: flex-start; gap: 1.25rem; background: rgba(20,20,20,0.4); position: relative; overflow: hidden; }
        .afs-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; }
        .afs-card.highlight-blue::before { background: #4096FF; }
        .afs-card.highlight-red::before { background: var(--accent-no); }
        .afs-card.highlight-green::before { background: var(--accent-yes); }
        .afs-card.highlight-yellow::before { background: var(--accent-yellow); }
        
        .afs-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: #fff; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.1); }
        .afs-icon.alert { color: var(--accent-yellow); background: rgba(255,214,0,0.1); border-color: rgba(255,214,0,0.2); animation: pulse 2s infinite; }
        
        .afs-info { display: flex; flex-direction: column; gap: 0.25rem; }
        .afs-label { font-size: 0.75rem; font-weight: 800; color: #888; text-transform: uppercase; letter-spacing: 0.05em; }
        .afs-val { font-size: 1.6rem; font-weight: 900; color: #fff; font-family: var(--font-display); line-height: 1; margin: 0.2rem 0; }
        .afs-trend { font-size: 0.75rem; font-weight: 700; padding: 0.1rem 0.4rem; border-radius: 4px; display: inline-block; width: fit-content; }
        .afs-trend.up { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .afs-trend.down { background: rgba(229,57,53,0.1); color: var(--accent-no); }
        .afs-trend.neutral { background: rgba(255,255,255,0.1); color: #ccc; }

        .af-content { border-radius: var(--radius-xl); overflow: hidden; border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; flex: 1; background: rgba(20,20,20,0.5); }
        
        .af-toolbar { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); flex-wrap: wrap; gap: 1rem; flex-shrink: 0; }
        .af-tabs { display: flex; gap: 0.5rem; background: rgba(0,0,0,0.3); padding: 0.35rem; border-radius: 12px; }
        .at-btn { background: none; border: none; padding: 0.6rem 1.25rem; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); border-radius: 8px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
        .at-btn:hover { color: #fff; }
        .at-btn.active { background: var(--surface-light); color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .at-badge { background: var(--accent-no); color: white; padding: 0.1rem 0.4rem; border-radius: 10px; font-size: 0.7rem; }

        .af-filters { display: flex; gap: 1rem; align-items: center; }
        .glass-input { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.6rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); }
        .glass-input input { background: none; border: none; color: white; font-size: 0.9rem; outline: none; width: 220px; }
        .glass-input input::placeholder { color: #888; }
        .glass-select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 10px; padding: 0.6rem 1rem; font-size: 0.9rem; outline: none; appearance: none; cursor: pointer; font-weight: 600; }
        .glass-select option { background: var(--bg); color: white; }

        .btn-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: #aaa; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.2s; }
        .btn-icon:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateY(-2px); }
        .btn-icon.danger:hover { background: var(--accent-no); color: #fff; border-color: var(--accent-no); }

        .table-responsive { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
        .af-table { width: 100%; border-collapse: collapse; text-align: left; }
        .af-table th { position: sticky; top: 0; background: rgba(10,10,10,0.95); backdrop-filter: blur(10px); padding: 1rem 1.5rem; color: #666; font-size: 0.7rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 800; z-index: 10; letter-spacing: 0.05em; }
        .af-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; transition: background 0.2s; }
        .af-table tr:hover td { background: rgba(255,255,255,0.02); }
        
        .row-muted { opacity: 0.6; filter: grayscale(80%); }

        .mono { font-family: monospace; letter-spacing: 0.05em; font-size: 0.95rem; }
        .fw { font-weight: 700; color: #fff; }
        .muted { color: #888; }
        .text-sm { font-size: 0.8rem; }

        .td-type-method { display: flex; flex-direction: column; gap: 0.3rem; align-items: flex-start; }
        .type-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; padding: 0.2rem 0.5rem; border-radius: 6px; }
        .type-badge.deposit { color: var(--accent-yes); background: rgba(0,200,83,0.15); border: 1px solid rgba(0,200,83,0.3); }
        .type-badge.withdraw { color: var(--accent-no); background: rgba(229,57,53,0.15); border: 1px solid rgba(229,57,53,0.3); }
        .td-method { font-size: 0.75rem; color: #888; font-weight: 600; }

        .td-fin { display: flex; flex-direction: column; gap: 0.2rem; }
        .td-amount { font-weight: 800; font-family: monospace; font-size: 1rem; color: #fff; }
        .td-fee { font-size: 0.75rem; color: #aaa; font-weight: 600; }

        .status-badge { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 100px; }
        .status-badge.pending { color: var(--accent-yellow); background: rgba(255,214,0,0.15); border: 1px solid rgba(255,214,0,0.3); }
        .status-badge.completed { color: var(--accent-yes); background: rgba(0,200,83,0.15); border: 1px solid rgba(0,200,83,0.3); }
        .status-badge.rejected { color: #888; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }

        .af-actions { display: flex; gap: 0.5rem; }
        .justify-end { justify-content: flex-end; }
        
        .empty-state { text-align: center; padding: 4rem; color: #888; font-weight: 600; }

        .pagination { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); margin-top: auto; }
        .page-info { color: #888; font-size: 0.8rem; font-weight: 600; }
        .page-controls { display: flex; gap: 0.25rem; }
        .page-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #ddd; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700; transition: all 0.2s; }
        .page-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
        .page-btn:hover:not(.active) { background: rgba(255,255,255,0.1); }

        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }

        @media (max-width: 1024px) {
           .af-toolbar { flex-direction: column; align-items: stretch; }
           .af-filters { flex-direction: column; align-items: stretch; }
           .glass-input input { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default AdminFinance
