import React, { useState, useMemo } from 'react'
import { Search, UserCheck, UserX, MoreHorizontal, Shield, Mail, Phone, Calendar, Trash2, CheckCircle, Users as UsersIcon, Activity, FileText, Wallet, AlertTriangle, Eye, ChevronRight, ChevronLeft, X, Lock, Unlock, MessageSquare, DollarSign, UserPlus } from 'lucide-react'

const MOCK_USERS = Array.from({ length: 45 }).map((_, i) => ({
  id: i + 1,
  name: `User${Math.floor(Math.random() * 10000)}`,
  email: `user${i}@example.com`,
  phone: `+234 80${Math.floor(Math.random() * 90000000)}`,
  balance: Math.floor(Math.random() * 10000000),
  kyc: ['verified', 'pending', 'unverified', 'rejected'][Math.floor(Math.random() * 4)],
  joined: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  status: Math.random() > 0.9 ? 'banned' : 'active',
  risk: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
  lastActive: ['10 mins ago', '2 hours ago', '1 day ago', 'Just now'][Math.floor(Math.random() * 4)],
  trades: Math.floor(Math.random() * 500)
}))

// Enforce some new users for the "New Users" tab (joined within last 24h mockup)
MOCK_USERS[0].joined = new Date().toLocaleDateString()
MOCK_USERS[1].joined = new Date().toLocaleDateString()

const AdminUsers = () => {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('directory') // directory, new, kyc, moderation
  const [filterKyc, setFilterKyc] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  const [reports, setReports] = useState([
    { id: 101, user: 'ScamAlert', reporter: 'OlaTrader', text: 'This market is a scam! DM me for guaranteed wins.', reason: 'Spam / Scam', date: '2 hrs ago', severity: 'high' },
    { id: 102, user: 'LagosGains', reporter: 'System', text: 'Suspicious login attempts from multiple IPs.', reason: 'Security alert', date: '5 hrs ago', severity: 'medium' },
  ])

  const toggleStatus = (id) => setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u))
  const approveKYC = (id) => setUsers(users.map(u => u.id === id ? { ...u, kyc: 'verified', risk: 'Low' } : u))
  const dismissReport = (id) => setReports(reports.filter(r => r.id !== id))

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
      const matchesKyc = filterKyc === 'all' || u.kyc === filterKyc
      const isNewUser = u.joined === new Date().toLocaleDateString() // Mock criteria for new users
      
      let matchesTab = true
      if (activeTab === 'new') matchesTab = isNewUser
      if (activeTab === 'kyc') matchesTab = u.kyc === 'pending'
      
      return matchesSearch && matchesKyc && matchesTab
    })
  }, [users, search, filterKyc, activeTab])

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filtered.length / usersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Stats
  const totalUsers = users.length + 14200 
  const totalBalance = users.reduce((acc, user) => acc + user.balance, 0)
  const pendingKYC = users.filter(u => u.kyc === 'pending').length

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return 'var(--accent-yes)'
      case 'Medium': return 'var(--accent-yellow)'
      case 'High': return '#ff9800'
      case 'Critical': return 'var(--accent-no)'
      default: return '#888'
    }
  }

  return (
    <div className="admin-page animate-slide-up">
      <div className="adm-header">
        <div>
          <h1 className="adm-title">User Management</h1>
          <p className="adm-subtitle">Monitor, verify, and moderate your platform's user base.</p>
        </div>
      </div>

      <div className="adm-stats">
        <div className="as-card glass">
          <div className="as-icon blue"><UsersIcon size={20} /></div>
          <div className="as-info">
            <span className="as-label">Total Registered Users</span>
            <span className="as-val">{totalUsers.toLocaleString()}</span>
            <span className="as-change up">+124 this week</span>
          </div>
        </div>
        <div className="as-card glass">
          <div className="as-icon green"><Activity size={20} /></div>
          <div className="as-info">
            <span className="as-label">Active Today</span>
            <span className="as-val">3,892</span>
            <span className="as-change up">+12% vs yesterday</span>
          </div>
        </div>
        <div className="as-card glass">
          <div className="as-icon yellow"><FileText size={20} /></div>
          <div className="as-info">
            <span className="as-label">Pending KYC</span>
            <span className="as-val">{pendingKYC}</span>
            <span className="as-change alert">Requires attention</span>
          </div>
        </div>
        <div className="as-card glass">
          <div className="as-icon purple"><Wallet size={20} /></div>
          <div className="as-info">
            <span className="as-label">Total User Balances</span>
            <span className="as-val">₦{(totalBalance).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="adm-content glass">
        <div className="adm-toolbar">
          <div className="adm-tabs">
            <button className={`at-btn ${activeTab === 'directory' ? 'active' : ''}`} onClick={() => {setActiveTab('directory'); setCurrentPage(1)}}>Directory</button>
            <button className={`at-btn ${activeTab === 'new' ? 'active' : ''}`} onClick={() => {setActiveTab('new'); setCurrentPage(1)}}>
              <UserPlus size={14} /> New Users
            </button>
            <button className={`at-btn ${activeTab === 'kyc' ? 'active' : ''}`} onClick={() => {setActiveTab('kyc'); setCurrentPage(1)}}>KYC Pipeline</button>
            <button className={`at-btn ${activeTab === 'moderation' ? 'active' : ''}`} onClick={() => {setActiveTab('moderation'); setCurrentPage(1)}}>
              Moderation <span className="at-badge">{reports.length > 0 ? reports.length : ''}</span>
            </button>
          </div>
          
          {activeTab !== 'moderation' && (
            <div className="adm-filters">
              <div className="search-box glass-input">
                <Search size={16} />
                <input type="text" placeholder="Search by name or email..." value={search} onChange={e => {setSearch(e.target.value); setCurrentPage(1);}} />
              </div>
              <select className="glass-select" value={filterKyc} onChange={e => {setFilterKyc(e.target.value); setCurrentPage(1);}}>
                <option value="all">All KYC Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="unverified">Unverified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>

        {activeTab !== 'moderation' && (
          <div className="table-responsive">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Contact Info</th>
                  <th>Financials</th>
                  <th>Status & Risk</th>
                  <th>Activity</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map(u => (
                  <tr key={u.id} className={u.status === 'banned' ? 'row-muted' : ''}>
                    <td>
                      <div className="u-profile">
                        <div className="u-avatar">
                          {u.name.substring(0,2).toUpperCase()}
                          {u.status === 'active' && <div className="u-online-dot"></div>}
                        </div>
                        <div className="u-info">
                          <span className="u-name">{u.name}</span>
                          <span className="u-joined">Joined: {u.joined}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="u-contact">
                        <span className="u-email"><Mail size={12} /> {u.email}</span>
                        <span className="u-phone"><Phone size={12} /> {u.phone}</span>
                      </div>
                    </td>
                    <td>
                      <div className="u-fin">
                        <span className="u-bal">₦{u.balance.toLocaleString()}</span>
                        <span className="u-trades">{u.trades} Total Trades</span>
                      </div>
                    </td>
                    <td>
                      <div className="u-badges">
                        <span className={`badge badge-kyc ${u.kyc}`}>
                          {u.kyc === 'verified' ? <Shield size={12}/> : null} {u.kyc}
                        </span>
                        <span className="u-risk" style={{ color: getRiskColor(u.risk) }}>
                          Risk: {u.risk}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="u-activity">
                        <span className="u-last-seen">{u.lastActive}</span>
                        <span className={`u-status-text ${u.status}`}>{u.status}</span>
                      </div>
                    </td>
                    <td>
                      <div className="u-actions justify-end">
                        <button className="btn-icon" title="View Profile" onClick={() => setSelectedUser(u)}><Eye size={16} /></button>
                        {u.kyc === 'pending' && (
                          <button className="btn-icon success" title="Approve KYC" onClick={() => approveKYC(u.id)}><UserCheck size={16} /></button>
                        )}
                        <button className={`btn-icon ${u.status === 'active' ? 'danger' : 'warning'}`} title={u.status === 'active' ? 'Ban User' : 'Unban User'} onClick={() => toggleStatus(u.id)}>
                          {u.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filtered.length === 0 ? (
              <div className="empty-state">
                <Search size={48} className="empty-icon" />
                <h3>No users found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="pagination">
                <span className="page-info">Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filtered.length)} of {filtered.length}</span>
                <div className="page-controls">
                  <button className="page-btn" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}><ChevronLeft size={16} /></button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => paginate(i + 1)}>{i + 1}</button>
                  ))}
                  <button className="page-btn" disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}><ChevronRight size={16} /></button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'moderation' && (
          <div className="table-responsive">
            <table className="adm-table lines">
              <thead>
                <tr>
                  <th>Reported User</th>
                  <th>Flagged Content / Reason</th>
                  <th>Reporter</th>
                  <th>Timestamp</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div className="u-profile">
                        <div className="u-avatar xs">{r.user[0]}</div>
                        <span className="u-name">{r.user}</span>
                      </div>
                    </td>
                    <td>
                      <div className="report-content">
                        <span className={`badge badge-severity ${r.severity}`}>{r.reason}</span>
                        <p className="report-text">{r.text}</p>
                      </div>
                    </td>
                    <td className="muted">{r.reporter}</td>
                    <td className="muted"><Calendar size={12} style={{marginRight:4}}/>{r.date}</td>
                    <td>
                      <div className="u-actions justify-end">
                        <button className="btn-solid danger small" onClick={() => { dismissReport(r.id); alert('Action taken against user') }}>Take Action</button>
                        <button className="btn-solid secondary small" onClick={() => dismissReport(r.id)}>Dismiss</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {reports.length === 0 && (
                   <div className="empty-state">
                     <CheckCircle size={48} className="empty-icon green" />
                     <h3>All Caught Up!</h3>
                     <p>There are no pending moderation reports.</p>
                   </div>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Slide-over... (same as previous, kept for continuity) */}
      {selectedUser && (
        <div className="modal-overlay glass-heavy" onClick={() => setSelectedUser(null)}>
          <div className="modal-content right-slide" onClick={e => e.stopPropagation()}>
            <div className="mc-header">
              <h2>User Profile</h2>
              <button className="btn-icon" onClick={() => setSelectedUser(null)}><X size={20}/></button>
            </div>
            
            <div className="mc-body">
              <div className="up-hero">
                <div className="up-avatar-large">
                  {selectedUser.name.substring(0,2).toUpperCase()}
                </div>
                <div className="up-hero-info">
                  <h3>{selectedUser.name}</h3>
                  <span className={`badge badge-kyc ${selectedUser.kyc}`}>{selectedUser.kyc}</span>
                </div>
                <div className="up-hero-actions">
                  <button className="btn-icon" title="Send Message"><MessageSquare size={16}/></button>
                  <button className="btn-icon danger" title="Suspend"><Lock size={16}/></button>
                </div>
              </div>

              <div className="up-section">
                <h4>Contact Details</h4>
                <div className="up-grid">
                  <div className="up-box">
                    <span className="up-label">Email</span>
                    <span className="up-val">{selectedUser.email}</span>
                  </div>
                  <div className="up-box">
                    <span className="up-label">Phone</span>
                    <span className="up-val">{selectedUser.phone}</span>
                  </div>
                  <div className="up-box">
                    <span className="up-label">Joined</span>
                    <span className="up-val">{selectedUser.joined}</span>
                  </div>
                </div>
              </div>

              <div className="up-section">
                <h4>Financial Overview</h4>
                <div className="up-grid col-2">
                  <div className="up-box highlight">
                    <div className="ub-icon"><Wallet size={16}/></div>
                    <div>
                      <span className="up-label">Available Balance</span>
                      <span className="up-val large">₦{selectedUser.balance.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="up-box highlight">
                    <div className="ub-icon blue"><Activity size={16}/></div>
                    <div>
                      <span className="up-label">Total Trades</span>
                      <span className="up-val large">{selectedUser.trades}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="up-section">
                <h4>Administration Actions</h4>
                <div className="up-actions-list">
                   <button className="btn-block secondary"><DollarSign size={16}/> Adjust Balance</button>
                   <button className="btn-block warning"><AlertTriangle size={16}/> Send Warning</button>
                   <button className="btn-block danger"><Lock size={16}/> Ban Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-page { max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
        .adm-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .adm-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.05em; font-family: var(--font-display); background: linear-gradient(135deg, #fff, #888); -webkit-background-clip: text; color: transparent; margin-bottom: 0.5rem; }
        .adm-subtitle { color: var(--text-muted); font-size: 1.1rem; }

        .adm-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .as-card { padding: 1.5rem; border-radius: var(--radius-lg); display: flex; align-items: center; gap: 1.25rem; border: 1px solid rgba(255,255,255,0.08); transition: transform 0.2s; }
        .as-card:hover { transform: translateY(-3px); }
        .as-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
        .as-icon.blue { background: rgba(64,150,255,0.15); color: #4096ff; }
        .as-icon.green { background: rgba(0,200,83,0.15); color: var(--accent-yes); }
        .as-icon.yellow { background: rgba(255,214,0,0.15); color: var(--accent-yellow); }
        .as-icon.purple { background: rgba(156,39,176,0.15); color: #e040fb; }
        .as-info { display: flex; flex-direction: column; gap: 0.2rem; overflow: hidden; }
        .as-label { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
        .as-val { font-size: 1.8rem; font-weight: 900; font-family: var(--font-display); color: #fff; line-height: 1.1; }
        .as-change { font-size: 0.8rem; font-weight: 700; display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; margin-top: 0.25rem; align-self: flex-start; }
        .as-change.up { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .as-change.down { background: rgba(229,57,53,0.1); color: var(--accent-no); }
        .as-change.alert { background: rgba(255,152,0,0.1); color: #ff9800; }

        .adm-content { border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.08); overflow: hidden; display: flex; flex-direction: column; }
        
        .adm-toolbar { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); flex-wrap: wrap; gap: 1rem; }
        .adm-tabs { display: flex; gap: 0.5rem; background: rgba(0,0,0,0.3); padding: 0.35rem; border-radius: 12px; }
        .at-btn { background: none; border: none; padding: 0.6rem 1.25rem; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); border-radius: 8px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
        .at-btn:hover { color: #fff; }
        .at-btn.active { background: var(--surface-light); color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .at-badge { background: var(--accent-no); color: white; padding: 0.1rem 0.4rem; border-radius: 10px; font-size: 0.7rem; }

        .adm-filters { display: flex; gap: 1rem; }
        .glass-input { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.6rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); }
        .glass-input input { background: none; border: none; color: white; font-size: 0.9rem; outline: none; width: 200px; }
        .glass-input input::placeholder { color: #888; }
        .glass-select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 10px; padding: 0.6rem 1rem; font-size: 0.9rem; outline: none; appearance: none; cursor: pointer; }
        .glass-select option { background: var(--bg); color: white; }

        .table-responsive { overflow-x: auto; }
        .adm-table { width: 100%; border-collapse: collapse; text-align: left; }
        .adm-table th { padding: 1.25rem 1.5rem; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.01); white-space: nowrap; }
        .adm-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; transition: background 0.2s; }
        .adm-table tr:hover td { background: rgba(255,255,255,0.02); }
        .adm-table tr:last-child td { border-bottom: none; }
        
        .row-muted { opacity: 0.6; filter: grayscale(50%); }

        .u-profile { display: flex; align-items: center; gap: 1rem; }
        .u-avatar { width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, var(--surface-light), #333); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; position: relative; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); }
        .u-avatar.xs { width: 32px; height: 32px; font-size: 0.9rem; border-radius: 8px; }
        .u-online-dot { position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px; background: var(--accent-yes); border: 2px solid var(--bg); border-radius: 50%; }
        .u-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .u-name { font-weight: 800; color: #fff; font-size: 1rem; }
        .u-joined { font-size: 0.75rem; color: #888; }

        .u-contact { display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: #aaa; }
        .u-email, .u-phone { display: flex; align-items: center; gap: 0.5rem; }

        .u-fin { display: flex; flex-direction: column; gap: 0.2rem; }
        .u-bal { font-weight: 800; font-size: 1.05rem; }
        .u-trades { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

        .u-badges { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .badge { padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; display: inline-flex; align-items: center; gap: 0.3rem; }
        .badge-kyc.verified { background: rgba(0,200,83,0.15); color: var(--accent-yes); border: 1px solid rgba(0,200,83,0.3); }
        .badge-kyc.pending { background: rgba(255,214,0,0.15); color: var(--accent-yellow); border: 1px solid rgba(255,214,0,0.3); }
        .badge-kyc.unverified { background: rgba(255,255,255,0.05); color: #888; border: 1px solid rgba(255,255,255,0.1); }
        .badge-kyc.rejected { background: rgba(229,57,53,0.15); color: var(--accent-no); border: 1px solid rgba(229,57,53,0.3); }
        .u-risk { font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 0.3rem; }

        .u-activity { display: flex; flex-direction: column; gap: 0.2rem; }
        .u-last-seen { font-size: 0.85rem; color: #ddd; font-weight: 600; }
        .u-status-text { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .u-status-text.active { color: var(--accent-yes); }
        .u-status-text.banned { color: var(--accent-no); }

        .u-actions { display: flex; gap: 0.5rem; }
        .justify-end { justify-content: flex-end; }
        
        .btn-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: #aaa; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.2s; }
        .btn-icon:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateY(-2px); }
        .btn-icon.success:hover { background: var(--accent-yes); color: #fff; border-color: var(--accent-yes); }
        .btn-icon.danger:hover { background: var(--accent-no); color: #fff; border-color: var(--accent-no); }
        .btn-icon.warning:hover { background: var(--accent-yellow); color: #000; border-color: var(--accent-yellow); }

        .btn-solid { padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; border: none; }
        .btn-solid.small { padding: 0.4rem 0.8rem; font-size: 0.75rem; }
        .btn-solid.danger { background: rgba(229,57,53,0.15); color: var(--accent-no); border: 1px solid rgba(229,57,53,0.3); }
        .btn-solid.danger:hover { background: var(--accent-no); color: white; }
        .btn-solid.secondary { background: rgba(255,255,255,0.1); color: white; }
        .btn-solid.secondary:hover { background: rgba(255,255,255,0.2); }
        
        .btn-block { width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 0.8rem; border-radius: 10px; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem; cursor: pointer; border: 1px solid transparent; transition: all 0.2s; }
        .btn-block.secondary { background: rgba(255,255,255,0.05); color: white; border-color: rgba(255,255,255,0.1); }
        .btn-block.secondary:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
        .btn-block.warning { background: rgba(255,152,0,0.1); color: #ff9800; border-color: rgba(255,152,0,0.3); }
        .btn-block.warning:hover { background: #ff9800; color: #000; }
        .btn-block.danger { background: rgba(229,57,53,0.1); color: var(--accent-no); border-color: rgba(229,57,53,0.3); }
        .btn-block.danger:hover { background: var(--accent-no); color: white; }

        .report-content { display: flex; flex-direction: column; gap: 0.4rem; max-width: 400px; }
        .badge-severity.high { background: rgba(229,57,53,0.2); color: #ff5252; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.65rem; display: inline-block; width: fit-content; }
        .badge-severity.medium { background: rgba(255,152,0,0.2); color: #ff9800; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.65rem; display: inline-block; width: fit-content; }
        .report-text { font-size: 0.9rem; color: #ddd; line-height: 1.4; }

        .empty-state { text-align: center; padding: 4rem 2rem; color: #888; }
        .empty-icon { margin-bottom: 1rem; opacity: 0.3; }
        .empty-icon.green { color: var(--accent-yes); opacity: 0.5; }
        .empty-state h3 { color: white; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; }

        .pagination { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.1); }
        .page-info { color: #888; font-size: 0.85rem; font-weight: 600; }
        .page-controls { display: flex; gap: 0.25rem; }
        .page-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #ddd; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s; }
        .page-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); }
        .page-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* Slide-over Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 1000; display: flex; justify-content: flex-end; }
        .modal-content.right-slide { height: 100%; width: 100%; max-width: 450px; background: var(--bg); border-left: 1px solid rgba(255,255,255,0.1); box-shadow: -10px 0 30px rgba(0,0,0,0.5); display: flex; flex-direction: column; animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        
        .mc-header { padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); }
        .mc-header h2 { font-size: 1.25rem; font-weight: 800; }
        
        .mc-body { padding: 1.5rem; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 2rem; }
        
        .up-hero { display: flex; align-items: center; gap: 1.25rem; background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); }
        .up-avatar-large { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 900; box-shadow: 0 8px 20px rgba(0,200,100,0.2); border: 2px solid rgba(255,255,255,0.2); }
        .up-hero-info { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-start; }
        .up-hero-info h3 { font-size: 1.4rem; font-weight: 800; margin: 0; }
        .up-hero-actions { display: flex; gap: 0.5rem; }

        .up-section h4 { font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); font-weight: 800; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.5rem; }
        .up-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
        .up-grid.col-2 { grid-template-columns: 1fr 1fr; gap: 1rem; }
        
        .up-box { background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 0.25rem; }
        .up-box.highlight { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); position: relative; overflow: hidden; }
        .up-box.highlight::before { content: ''; position: absolute; top:0; left:0; right:0; height: 2px; background: linear-gradient(90deg, var(--primary), transparent); }
        
        .ub-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(0,200,83,0.15); color: var(--accent-yes); display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem; }
        .ub-icon.blue { background: rgba(64,150,255,0.15); color: #4096ff; }
        
        .up-label { font-size: 0.75rem; color: #888; font-weight: 700; text-transform: uppercase; }
        .up-val { font-size: 0.95rem; color: #fff; font-weight: 600; }
        .up-val.large { font-size: 1.4rem; font-weight: 800; font-family: var(--font-display); }

        @media (max-width: 1024px) {
           .adm-toolbar { flex-direction: column; align-items: stretch; }
           .adm-filters { flex-direction: column; }
           .glass-input input { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default AdminUsers
