import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, UserCheck, UserX, MoreHorizontal, Shield, Mail, Phone, Calendar, Trash2, CheckCircle } from 'lucide-react'

const MOCK_USERS = [
  { id: 1, name: "OlaTrader", email: "ola@example.com", phone: "+234 812 345 6789", balance: "₦2,450,000", kyc: "verified", joined: "Jan 12, 2026", status: "active" },
  { id: 2, name: "AbujaWhale", email: "whale@abuja.ng", phone: "+234 803 111 2222", balance: "₦18,200,500", kyc: "pending", joined: "Feb 03, 2026", status: "active" },
  { id: 3, name: "LagosGains", email: "lagos@trading.com", phone: "+234 705 555 1234", balance: "₦540,000", kyc: "unverified", joined: "Feb 15, 2026", status: "active" },
  { id: 4, name: "ScamAlert", email: "sus@fake.com", phone: "+234 909 000 0000", balance: "₦0", kyc: "rejected", joined: "Feb 18, 2026", status: "banned" },
  { id: 5, name: "NairaHunter", email: "hunter@naira.com", phone: "+234 818 777 8888", balance: "₦980,000", kyc: "verified", joined: "Jan 28, 2026", status: "active" },
]

const AdminUsers = () => {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('users')
  const [reports, setReports] = useState([
    { id: 101, user: 'ScamAlert', text: 'This market is a scam! DM me for guaranteed wins.', reason: 'Spam / Scam', date: '2 hrs ago' },
    { id: 102, user: 'TrollAccount', text: 'You are all idiotsssss for buying Yes.', reason: 'Harassment', date: '5 hrs ago' },
  ])

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u))
  }

  const approveKYC = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, kyc: 'verified' } : u))
  }
  
  const dismissReport = (id) => setReports(reports.filter(r => r.id !== id))

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="admin-users">
      <div className="au-toolbar">
         <div className="au-tabs">
            <button className={`af-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>All Users</button>
            <button className={`af-tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>Moderation <span className="badge badge-red">{reports.length}</span></button>
         </div>
         {activeTab === 'users' && (
            <div className="search-box glass">
              <Search size={16} className="si" />
              <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
         )}
      </div>

      {activeTab === 'users' ? (
        <div className="au-grid glass">
          <table className="au-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Balance</th>
                <th>KYC Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className={u.status === 'banned' ? 'row-banned' : ''}>
                  <td>
                    <div className="u-profile">
                      <div className="u-avatar">{u.name[0]}</div>
                      <div className="u-info">
                        <span className="u-name">{u.name}</span>
                        <span className={`u-status ${u.status}`}>{u.status}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="u-contact">
                      <span><Mail size={12} /> {u.email}</span>
                      <span><Phone size={12} /> {u.phone}</span>
                    </div>
                  </td>
                  <td className="fw">{u.balance}</td>
                  <td>
                    <span className={`badge badge-kyc ${u.kyc}`}>{u.kyc}</span>
                  </td>
                  <td className="muted"><Calendar size={12} style={{ marginRight: 6 }} />{u.joined}</td>
                  <td>
                    <div className="u-actions">
                      {u.kyc === 'pending' && (
                        <button className="btn-icon success" title="Approve KYC" onClick={() => approveKYC(u.id)}><UserCheck size={16} /></button>
                      )}
                      <button className={`btn-icon ${u.status === 'active' ? 'danger' : 'warning'}`} title={u.status === 'active' ? 'Ban User' : 'Unban User'} onClick={() => toggleStatus(u.id)}>
                        {u.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                      </button>
                      <button className="btn-icon" title="View Details"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="au-grid glass">
          <table className="au-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Comment</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td className="fw">{r.user}</td>
                  <td style={{ maxWidth: 300, fontSize: '0.85rem' }} className="muted">{r.text}</td>
                  <td><span className="badge badge-red">{r.reason}</span></td>
                  <td className="muted">{r.date}</td>
                  <td>
                    <div className="u-actions">
                      <button className="btn-icon danger" title="Delete Comment" onClick={() => dismissReport(r.id)}><Trash2 size={16} /></button>
                      <button className="btn-icon" title="Dismiss" onClick={() => dismissReport(r.id)}><CheckCircle size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No pending reports</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .au-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .au-stats { display: flex; gap: 1.5rem; color: #888; font-size: 0.9rem; }
        .au-stat strong { color: #fff; margin-left: 0.4rem; }
        
        .au-tabs { display: flex; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.25rem; border-radius: 8px; }
        .af-tab { padding: 0.4rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: #888; border: none; background: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
        .af-tab.active { background: var(--surface-light); color: #fff; }

        .au-grid { border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
        .au-table { width: 100%; border-collapse: collapse; text-align: left; }
        .au-table th { padding: 1rem 1.5rem; color: #666; font-size: 0.75rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 700; }
        .au-table td { padding: 1rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ddd; vertical-align: middle; font-size: 0.9rem; }
        .au-table tr:last-child td { border-bottom: none; }
        .au-table tr:hover { background: rgba(255,255,255,0.02); }
        .row-banned { opacity: 0.5; background: rgba(255,0,0,0.05); }

        .u-profile { display: flex; gap: 0.85rem; align-items: center; }
        .u-avatar { width: 36px; height: 36px; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; border: 1px solid rgba(255,255,255,0.1); }
        .u-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .u-name { font-weight: 700; color: #fff; }
        .u-status { font-size: 0.65rem; text-transform: uppercase; font-weight: 700; opacity: 0.8; }
        .u-status.active { color: var(--accent-yes); }
        .u-status.banned { color: var(--accent-no); }

        .u-contact { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.8rem; color: #888; }
        .u-contact span { display: flex; align-items: center; gap: 0.4rem; }

        .badge-kyc { padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; }
        .badge-kyc.verified { background: rgba(0,200,83,0.15); color: var(--accent-yes); }
        .badge-kyc.pending { background: rgba(255,214,0,0.15); color: var(--accent-yellow); }
        .badge-kyc.unverified { background: rgba(255,255,255,0.05); color: #666; }
        .badge-kyc.rejected { background: rgba(255,61,0,0.15); color: var(--accent-no); }

        .u-actions { display: flex; gap: 0.5rem; }
        .btn-icon.success:hover { background: rgba(0,200,83,0.15); color: var(--accent-yes); border-color: var(--accent-yes); }
        .btn-icon.danger:hover { background: rgba(255,61,0,0.15); color: var(--accent-no); border-color: var(--accent-no); }
        .btn-icon.warning:hover { background: rgba(255,214,0,0.15); color: var(--accent-yellow); border-color: var(--accent-yellow); }
      `}</style>
    </div>
  )
}

export default AdminUsers
