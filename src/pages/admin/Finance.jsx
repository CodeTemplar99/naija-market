import React, { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Check, X, Clock, HelpCircle } from 'lucide-react'

const MOCK_TRX = [
  { id: 'T98212', type: 'deposit', user: 'OlaTrader', amount: '₦50,000', method: 'Paystack', status: 'pending', date: '2 mins ago' },
  { id: 'T98213', type: 'withdraw', user: 'AbujaWhale', amount: '₦250,000', method: 'Zenith Bank', status: 'pending', date: '15 mins ago' },
  { id: 'T98199', type: 'deposit', user: 'LagosGains', amount: '₦100,000', method: 'Bank Transfer', status: 'completed', date: '1 hour ago' },
  { id: 'T98150', type: 'withdraw', user: 'NairaHunter', amount: '₦50,000', method: 'GTBank', status: 'rejected', date: '3 hours ago' },
  { id: 'T98112', type: 'deposit', user: 'CryptoNaija', amount: '₦500,000', method: 'Flutterwave', status: 'completed', date: '5 hours ago' },
]

const AdminFinance = () => {
  const [trxs, setTrxs] = useState(MOCK_TRX)
  const [filter, setFilter] = useState('all') // all, pending, completed

  const updateStatus = (id, status) => {
    setTrxs(trxs.map(t => t.id === id ? { ...t, status } : t))
  }

  const filtered = trxs.filter(t => filter === 'all' || t.status === filter)

  return (
    <div className="admin-finance">
      <div className="af-toolbar">
        <div className="af-tabs">
          <button className={`af-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Transactions</button>
          <button className={`af-tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending Requests</button>
          <button className={`af-tab ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>History</button>
        </div>
        <div className="af-stats">
          <span>Pending: <strong>₦300,000</strong></span>
        </div>
      </div>

      <div className="af-grid glass">
        <table className="af-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>User</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="mono">#{t.id}</td>
                <td>
                  <span className={`type-badge ${t.type}`}>
                    {t.type === 'deposit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                    {t.type}
                  </span>
                </td>
                <td className="fw">{t.user}</td>
                <td className="fw">{t.amount}</td>
                <td className="muted">{t.method}</td>
                <td className="muted">{t.date}</td>
                <td>
                  <span className={`status-badge ${t.status}`}>
                    {t.status === 'pending' && <Clock size={12} />}
                    {t.status === 'completed' && <Check size={12} />}
                    {t.status}
                  </span>
                </td>
                <td>
                  {t.status === 'pending' && (
                    <div className="af-actions">
                      <button className="btn-icon success" title="Approve" onClick={() => updateStatus(t.id, 'completed')}><Check size={16} /></button>
                      <button className="btn-icon danger" title="Reject" onClick={() => updateStatus(t.id, 'rejected')}><X size={16} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .af-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .af-tabs { display: flex; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.25rem; border-radius: 8px; }
        .af-tab { padding: 0.4rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: #888; border: none; background: none; cursor: pointer; transition: all 0.2s; }
        .af-tab.active { background: var(--surface-light); color: #fff; }

        .af-grid { border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
        .af-table { width: 100%; border-collapse: collapse; text-align: left; }
        .af-table th { padding: 1rem 1.5rem; color: #666; font-size: 0.75rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 700; }
        .af-table td { padding: 1rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ddd; vertical-align: middle; font-size: 0.9rem; }
        .af-table tr:hover { background: rgba(255,255,255,0.02); }

        .mono { font-family: monospace; color: #888; letter-spacing: 0.05em; }
        .type-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 0.2rem 0.5rem; border-radius: 4px; }
        .type-badge.deposit { color: var(--accent-yes); background: rgba(0,200,83,0.1); }
        .type-badge.withdraw { color: var(--accent-no); background: rgba(255,61,0,0.1); }

        .status-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 0.2rem 0.5rem; border-radius: 100px; }
        .status-badge.pending { color: var(--accent-yellow); background: rgba(255,214,0,0.1); }
        .status-badge.completed { color: var(--accent-yes); background: rgba(0,200,83,0.1); }
        .status-badge.rejected { color: #666; background: rgba(255,255,255,0.1); }

        .af-actions { display: flex; gap: 0.5rem; }
      `}</style>
    </div>
  )
}

export default AdminFinance
