import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { User, Settings, Shield, Bell, Wallet, LogOut, Camera, Sun, Moon, ExternalLink, Copy, Award, TrendingUp, Target } from 'lucide-react'

const Profile = () => {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [notifSettings, setNotifSettings] = useState({ trades: true, markets: true, promo: false, email: true })
  const [twoFA, setTwoFA] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
  ]

  return (
    <div className="prof-page animate-slide-up">
      <h1 className="prof-title">Account</h1>

      <div className="prof-layout">
        {/* Sidebar tabs */}
        <div className="prof-tabs glass">
          {tabs.map(t => (
            <button key={t.id} className={`prof-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
          <div className="prof-tab-divider"></div>
          <button className="prof-tab danger"><LogOut size={16} /> Log Out</button>
        </div>

        {/* Content */}
        <div className="prof-content">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="prof-section glass animate-slide-up">
              <h2>Profile Information</h2>
              <div className="prof-avatar-section">
                <div className="prof-avatar-big">OO</div>
                <button className="btn btn-ghost btn-sm"><Camera size={14} /> Change Photo</button>
              </div>
              <div className="prof-form">
                <div className="form-group">
                  <label>Display Name</label>
                  <input type="text" className="input" defaultValue="Olawale Ogunbiyi" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="input" defaultValue="olawale@gmail.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" className="input" defaultValue="+234 812 345 6789" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea className="input" rows={3} defaultValue="Prediction trader from Lagos. Politics & crypto markets." />
                </div>
                <div className="form-group">
                  <label>Referral Code</label>
                  <div className="ref-code-row">
                    <input type="text" className="input" readOnly value="OLAWALE-NP2026" />
                    <button className="btn btn-ghost btn-sm"><Copy size={14} /> Copy</button>
                  </div>
                </div>
                <button className="btn btn-primary">Save Changes</button>
              </div>

              {/* Stats */}
              <div className="prof-stats-row">
                <div className="ps-item"><Award size={18} className="green" /><div><span className="ps-v">67%</span><span className="ps-l">Win Rate</span></div></div>
                <div className="ps-item"><TrendingUp size={18} className="green" /><div><span className="ps-v">₦125,061</span><span className="ps-l">Total Profit</span></div></div>
                <div className="ps-item"><Target size={18} /><div><span className="ps-v">23</span><span className="ps-l">Total Trades</span></div></div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="prof-section glass animate-slide-up">
              <h2>General Settings</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">{theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />} Appearance</span>
                    <span className="setting-desc">Switch between dark and light mode</span>
                  </div>
                  <div className="setting-control">
                    <span className="setting-val">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                    <button className="theme-toggle" onClick={toggleTheme}><div className="theme-toggle-knob"></div></button>
                  </div>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Currency Display</span>
                    <span className="setting-desc">Choose your preferred currency</span>
                  </div>
                  <select className="select"><option>NGN (₦)</option><option>USD ($)</option></select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Language</span>
                    <span className="setting-desc">Interface language</span>
                  </div>
                  <select className="select"><option>English</option><option>Pidgin</option><option>Yoruba</option><option>Hausa</option><option>Igbo</option></select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Timezone</span>
                    <span className="setting-desc">Set your local timezone</span>
                  </div>
                  <select className="select"><option>WAT (UTC+1)</option><option>GMT (UTC+0)</option></select>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Default Trade Amount</span>
                    <span className="setting-desc">Pre-fill amount on trade forms</span>
                  </div>
                  <input type="number" className="input" style={{ width: 120 }} defaultValue="5000" />
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="prof-section glass animate-slide-up">
              <h2>Security</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Password</span>
                    <span className="setting-desc">Last changed 30 days ago</span>
                  </div>
                  <button className="btn btn-ghost btn-sm">Change Password</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Two-Factor Authentication</span>
                    <span className="setting-desc">{twoFA ? 'Enabled — Your account is secured' : 'Add an extra layer of security'}</span>
                  </div>
                  <button className={`btn btn-sm ${twoFA ? 'btn-danger' : 'btn-primary'}`} onClick={() => setTwoFA(!twoFA)}>
                    {twoFA ? 'Disable' : 'Enable'} 2FA
                  </button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">Active Sessions</span>
                    <span className="setting-desc">1 active session — Chrome on macOS</span>
                  </div>
                  <button className="btn btn-ghost btn-sm">Manage</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-name">KYC Verification</span>
                    <span className="setting-desc badge badge-green" style={{ marginTop: 4 }}>Verified</span>
                  </div>
                  <button className="btn btn-ghost btn-sm"><ExternalLink size={14} /> View</button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="prof-section glass animate-slide-up">
              <h2>Notification Preferences</h2>
              <div className="settings-list">
                {[
                  { key: 'trades', name: 'Trade Confirmations', desc: 'Get notified when trades are executed' },
                  { key: 'markets', name: 'Market Updates', desc: 'Price changes and new markets' },
                  { key: 'promo', name: 'Promotions', desc: 'Special offers and bonuses' },
                  { key: 'email', name: 'Email Notifications', desc: 'Receive notifications via email' },
                ].map(n => (
                  <div key={n.key} className="setting-item">
                    <div className="setting-info">
                      <span className="setting-name">{n.name}</span>
                      <span className="setting-desc">{n.desc}</span>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={notifSettings[n.key]} onChange={() => setNotifSettings(prev => ({ ...prev, [n.key]: !prev[n.key] }))} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WALLET TAB */}
          {activeTab === 'wallet' && (
            <div className="prof-section glass animate-slide-up">
              <h2>Wallet</h2>
              <div className="wallet-balance-card">
                <span className="wbc-label">Available Balance</span>
                <span className="wbc-val">₦245,600.00</span>
                <div className="wbc-actions">
                  <Link to="/deposit" className="btn btn-primary">Deposit Funds</Link>
                  <Link to="/withdraw" className="btn btn-ghost">Withdraw</Link>
                </div>
              </div>
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Recent Transactions</h3>
              <div className="tx-list">
                {[
                  { type: 'Deposit', amount: '+₦50,000', method: 'Paystack', date: 'Feb 18, 2026', status: 'Completed' },
                  { type: 'Withdrawal', amount: '-₦20,000', method: 'Bank Transfer', date: 'Feb 15, 2026', status: 'Completed' },
                  { type: 'Trade Win', amount: '+₦12,500', method: 'Market #1', date: 'Feb 14, 2026', status: 'Settled' },
                  { type: 'Deposit', amount: '+₦100,000', method: 'Flutterwave', date: 'Feb 10, 2026', status: 'Completed' },
                ].map((tx, i) => (
                  <div key={i} className="tx-item">
                    <div className="tx-info">
                      <span className="tx-type">{tx.type}</span>
                      <span className="tx-method">{tx.method} · {tx.date}</span>
                    </div>
                    <div className="tx-right">
                      <span className={`tx-amount ${tx.amount.startsWith('+') ? 'green' : 'red'}`}>{tx.amount}</span>
                      <span className="tx-status">{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .prof-page { max-width: 1100px; margin: 0 auto; }
        .prof-title { font-size: 2rem; margin-bottom: 2rem; }
        .prof-layout { display: grid; grid-template-columns: 220px 1fr; gap: 1.5rem; }
        @media (max-width: 768px) { .prof-layout { grid-template-columns: 1fr; } }

        .prof-tabs { padding: 0.75rem; border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 0.25rem; position: sticky; top: 5rem; align-self: start; }
        .prof-tab { display: flex; align-items: center; gap: 0.6rem; padding: 0.65rem 0.85rem; border-radius: 10px; background: none; border: none; color: var(--text-muted); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.15s; font-family: var(--font-main); text-align: left; }
        .prof-tab:hover { background: var(--surface-light); color: var(--text); }
        .prof-tab.active { background: rgba(0,135,81,0.1); color: var(--primary-light); }
        .prof-tab.danger { color: var(--accent-no); }
        .prof-tab-divider { height: 1px; background: var(--border); margin: 0.5rem 0; }

        .prof-section { padding: 2rem; border-radius: var(--radius-xl); }
        .prof-section h2 { font-size: 1.25rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }

        .prof-avatar-section { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        .prof-avatar-big { width: 72px; height: 72px; border-radius: 50%; background: var(--surface-light); border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; }

        .prof-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-group label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
        .form-group textarea { resize: vertical; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .ref-code-row { display: flex; gap: 0.5rem; }

        .prof-stats-row { display: flex; gap: 2rem; margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--border); flex-wrap: wrap; }
        .ps-item { display: flex; align-items: center; gap: 0.75rem; }
        .ps-v { display: block; font-weight: 800; font-size: 1.1rem; }
        .ps-l { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }

        /* Settings */
        .settings-list { display: flex; flex-direction: column; }
        .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 0; border-bottom: 1px solid var(--border); gap: 1rem; }
        .setting-item:last-child { border-bottom: none; }
        .setting-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .setting-name { font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; }
        .setting-desc { font-size: 0.8rem; color: var(--text-muted); }
        .setting-control { display: flex; align-items: center; gap: 0.75rem; }
        .setting-val { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }

        /* Toggle switch */
        .toggle-switch { position: relative; display: inline-block; width: 40px; height: 22px; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .toggle-slider { position: absolute; cursor: pointer; inset: 0; background: var(--surface-light); border: 1px solid var(--border); border-radius: 100px; transition: 0.3s; }
        .toggle-slider::before { content: ''; position: absolute; height: 16px; width: 16px; left: 2px; bottom: 2px; background: var(--text-muted); border-radius: 50%; transition: 0.3s; }
        .toggle-switch input:checked + .toggle-slider { background: rgba(0,135,81,0.2); border-color: var(--primary); }
        .toggle-switch input:checked + .toggle-slider::before { transform: translateX(18px); background: var(--primary); }

        /* Wallet */
        .wallet-balance-card { background: linear-gradient(135deg, rgba(0,135,81,0.1), rgba(0,168,107,0.05)); border: 1px solid rgba(0,135,81,0.15); padding: 2rem; border-radius: var(--radius-lg); text-align: center; }
        .wbc-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
        .wbc-val { display: block; font-size: 2.5rem; font-weight: 800; font-family: var(--font-display); margin: 0.5rem 0 1.5rem; }
        .wbc-actions { display: flex; gap: 0.75rem; justify-content: center; }

        .tx-list { display: flex; flex-direction: column; }
        .tx-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border); }
        .tx-item:last-child { border-bottom: none; }
        .tx-info { display: flex; flex-direction: column; gap: 0.15rem; }
        .tx-type { font-weight: 700; font-size: 0.9rem; }
        .tx-method { font-size: 0.75rem; color: var(--text-muted); }
        .tx-right { text-align: right; }
        .tx-amount { display: block; font-weight: 800; font-size: 0.95rem; }
        .tx-status { font-size: 0.7rem; color: var(--text-muted); }
      `}</style>
    </div>
  )
}

export default Profile
