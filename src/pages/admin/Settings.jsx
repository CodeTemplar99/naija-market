import React, { useState } from 'react'
import { Save, ShieldAlert, Key, Zap, Globe, FileText, Database, Shield, Sliders, Wallet } from 'lucide-react'

const AdminSettings = () => {
  const [config, setConfig] = useState({
    siteName: 'NaijaMarket Pro',
    adminEmail: 'admin@naijapredict.com',
    supportPhone: '+234 800 000 0000',
    depositFee: 1.5,
    withdrawFee: 2.0,
    maxWithdrawUnverified: 50000,
    maxWithdrawVerified: 5000000,
    maintenance: false,
    newMarketMode: 'approval',
    kycProvider: 'SmileID',
    oracleSource: 'Uma',
    tradeFeePercentage: 0.5,
  })

  const [activeMenu, setActiveMenu] = useState('general')

  const handleChange = (e) => setConfig({ ...config, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const handleSave = () => {
    alert('Configuration Saved Successfully')
  }

  return (
    <div className="admin-settings animate-slide-up">
      <div className="as-header">
        <div>
          <h1 className="as-title">Platform Configuration</h1>
          <p className="as-subtitle">Manage global variables, constraints, and system parameters.</p>
        </div>
        <button className="btn-solid-glow" onClick={handleSave}><Save size={16} /> Save Changes</button>
      </div>

      <div className="as-layout">
        {/* Settings Navigation */}
        <div className="as-nav glass">
          <button className={`as-nav-btn ${activeMenu === 'general' ? 'active' : ''}`} onClick={() => setActiveMenu('general')}>
            <Globe size={16} /> General Info
          </button>
          <button className={`as-nav-btn ${activeMenu === 'financials' ? 'active' : ''}`} onClick={() => setActiveMenu('financials')}>
            <Wallet size={16} /> Financial & Fees
          </button>
          <button className={`as-nav-btn ${activeMenu === 'markets' ? 'active' : ''}`} onClick={() => setActiveMenu('markets')}>
            <Sliders size={16} /> Market Parameters
          </button>
          <button className={`as-nav-btn ${activeMenu === 'security' ? 'active' : ''}`} onClick={() => setActiveMenu('security')}>
            <Shield size={16} /> Security & KYC
          </button>
          <button className={`as-nav-btn ${activeMenu === 'apis' ? 'active' : ''}`} onClick={() => setActiveMenu('apis')}>
            <Key size={16} /> External APIs
          </button>
          <button className={`as-nav-btn ${activeMenu === 'system' ? 'active' : ''}`} onClick={() => setActiveMenu('system')}>
            <Database size={16} /> System Control
          </button>
        </div>

        {/* Settings Content Areas */}
        <div className="as-content">
          {activeMenu === 'general' && (
            <div className="as-section glass">
              <div className="as-sec-header">
                <h2>General Information</h2>
                <p>Basic platform details visible to users and metadata.</p>
              </div>
              <div className="as-form">
                <div className="form-group col-span-2">
                  <label>Platform Name</label>
                  <input type="text" name="siteName" value={config.siteName} onChange={handleChange} className="input config-input" />
                </div>
                <div className="form-group">
                  <label>Admin Contact Email</label>
                  <input type="email" name="adminEmail" value={config.adminEmail} onChange={handleChange} className="input config-input" />
                </div>
                <div className="form-group">
                  <label>Support Phone Number</label>
                  <input type="text" name="supportPhone" value={config.supportPhone} onChange={handleChange} className="input config-input" />
                </div>
                <div className="form-group col-span-2">
                  <label>Maintenance Message</label>
                  <textarea className="input config-input area" rows="2" placeholder="Message shown when maintenance is ON...">We are currently upgrading our systems to serve you better. We will be back shortly.</textarea>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'financials' && (
            <div className="as-section glass">
              <div className="as-sec-header">
                <h2>Financial Constraints & Protocol Fees</h2>
                <p>Governs how money moves in and out of the platform.</p>
              </div>
              <div className="as-form grid-3">
                <div className="form-group">
                  <label>Deposit Fee (%)</label>
                  <input type="number" step="0.1" name="depositFee" value={config.depositFee} onChange={handleChange} className="input config-input" />
                </div>
                <div className="form-group">
                  <label>Withdrawal Fee (%)</label>
                  <input type="number" step="0.1" name="withdrawFee" value={config.withdrawFee} onChange={handleChange} className="input config-input" />
                </div>
                <div className="form-group">
                  <label>Trade Execution Fee (%)</label>
                  <input type="number" step="0.1" name="tradeFeePercentage" value={config.tradeFeePercentage} onChange={handleChange} className="input config-input" />
                  <span className="help-text">Applied on successful trades</span>
                </div>
              </div>

              <h3 className="sub-heading mt-4">Withdrawal Limits</h3>
              <div className="as-form grid-2">
                <div className="form-group">
                  <label>Unverified Users Max (₦)</label>
                  <input type="number" name="maxWithdrawUnverified" value={config.maxWithdrawUnverified} onChange={handleChange} className="input config-input" />
                </div>
                <div className="form-group">
                  <label>KYC Verified Users Max (₦)</label>
                  <input type="number" name="maxWithdrawVerified" value={config.maxWithdrawVerified} onChange={handleChange} className="input config-input" />
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'system' && (
            <div className="as-section glass warning-zone">
              <div className="as-sec-header">
                <h2><ShieldAlert color="#ff5252" size={20} style={{ display: 'inline', verticalAlign: 'bottom', marginRight: 8 }} /> Danger Zone & System Control</h2>
                <p>Core operational toggles. Changes here can halt platform functions immediately.</p>
              </div>
              <div className="system-toggles">
                <div className="st-row">
                  <div className="st-info">
                    <h4>Global Maintenance Mode</h4>
                    <p>Immediately blocks all logins, trading, and API access.</p>
                  </div>
                  <label className="switch critical">
                    <input type="checkbox" name="maintenance" checked={config.maintenance} onChange={handleChange} />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="st-row">
                  <div className="st-info">
                    <h4>Pause Market Resolution</h4>
                    <p>Stops automated market payouts. Useful during oracle disputes.</p>
                  </div>
                  <label className="switch warning">
                    <input type="checkbox" defaultChecked={false} />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="st-row">
                  <div className="st-info">
                    <h4>Halt New Registrations</h4>
                    <p>Prevents new users from signing up until disabled.</p>
                  </div>
                  <label className="switch warning">
                    <input type="checkbox" defaultChecked={false} />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'markets' && (
            <div className="as-section glass">
              <div className="as-sec-header">
                <h2>Market & Oracle Parameters</h2>
                <p>Governs market creation and resolution flows.</p>
              </div>
              <div className="as-form">
                <div className="form-group">
                  <label>New Market Creation Access</label>
                  <select name="newMarketMode" value={config.newMarketMode} onChange={handleChange} className="select config-input">
                    <option value="open">Open - Anyone can create</option>
                    <option value="approval">Restricted - Requires Admin Approval</option>
                    <option value="admin">Closed - Admin Only</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Primary Oracle Source</label>
                  <select name="oracleSource" value={config.oracleSource} onChange={handleChange} className="select config-input">
                    <option value="Uma">UMA Protocol Optimistic Oracle</option>
                    <option value="Chainlink">Chainlink AnyAPI</option>
                    <option value="Manual">Manual Resolution Only</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'security' && (
            <div className="as-section glass">
              <div className="as-sec-header">
                <h2>Identity & Security</h2>
                <p>Manage user verification constraints.</p>
              </div>
              <div className="as-form">
                <div className="form-group">
                  <label>Primary KYC Provider</label>
                  <select name="kycProvider" value={config.kycProvider} onChange={handleChange} className="select config-input">
                    <option value="SmileID">Smile Identity (Africa)</option>
                    <option value="Onfido">Onfido Global</option>
                    <option value="Manual">Manual Document Uploads</option>
                  </select>
                </div>

                <div className="st-row mt-4 style-none">
                  <div className="st-info">
                    <h4>Require 2FA for Withdrawals</h4>
                    <p>Forces users to set up Google Authenticator before moving funds.</p>
                  </div>
                  <label className="switch normal">
                    <input type="checkbox" defaultChecked={true} />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'apis' && (
            <div className="as-section glass">
              <div className="as-sec-header">
                <h2>External Integrations</h2>
                <p>API Keys and connection strings. Keep these secure.</p>
              </div>
              <div className="as-form">
                <div className="form-group col-span-2">
                  <label>Paystack Secret Key</label>
                  <div className="mask-input">
                    <input type="password" value="sk_live_1234567890abcdefghijklmnopqrstuvwxyz" readOnly className="input config-input" />
                    <button className="btn-ghost">Reveal</button>
                  </div>
                </div>
                <div className="form-group col-span-2">
                  <label>Ethereum RPC Node (Alchemy / Infura)</label>
                  <input type="url" value="https://eth-mainnet.alchemyapi.io/v2/your-api-key" className="input config-input" />
                </div>
                <div className="form-group col-span-2">
                  <label>SendGrid API Key (Emails)</label>
                  <div className="mask-input">
                    <input type="password" value="SG.secret_key_here.123" readOnly className="input config-input" />
                    <button className="btn-ghost">Reveal</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-settings { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1200px; margin: 0 auto; height: calc(100vh - 120px); }
        .as-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1rem; flex-shrink: 0; }
        .as-title { font-size: 2.2rem; font-weight: 800; letter-spacing: -0.05em; font-family: var(--font-display); background: linear-gradient(135deg, #fff, #999); -webkit-background-clip: text; color: transparent; margin-bottom: 0.2rem; }
        .as-subtitle { color: var(--text-muted); font-size: 1rem; }
        
        .btn-solid-glow { background: var(--primary); color: white; padding: 0.8rem 2rem; border-radius: 10px; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; box-shadow: 0 0 20px rgba(0, 200, 83, 0.3); transition: all 0.2s; }
        .btn-solid-glow:hover { transform: translateY(-2px); box-shadow: 0 4px 25px rgba(0, 200, 83, 0.5); }

        .as-layout { display: flex; gap: 2rem; flex: 1; min-height: 0; align-items: flex-start; }
        
        .as-nav { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 0.5rem; padding: 1.5rem; border-radius: var(--radius-lg); background: rgba(20,20,20,0.6); border: 1px solid rgba(255,255,255,0.08); }
        .as-nav-btn { display: flex; align-items: center; gap: 0.8rem; background: transparent; border: none; text-align: left; padding: 1rem 1.25rem; border-radius: 10px; color: #888; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .as-nav-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .as-nav-btn.active { background: rgba(255,255,255,0.1); color: #fff; box-shadow: inset 3px 0 0 var(--primary); }

        .as-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding-right: 0.5rem; padding-bottom: 2rem; }
        .as-section { padding: 2rem; border-radius: var(--radius-xl); background: rgba(20,20,20,0.5); border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; gap: 1.5rem; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .as-section.warning-zone { border-color: rgba(229,57,53,0.3); background: rgba(229,57,53,0.02); }

        .as-sec-header h2 { font-size: 1.4rem; font-weight: 800; margin-bottom: 0.4rem; color: #fff; }
        .as-sec-header p { color: #888; font-size: 0.9rem; }
        
        .sub-heading { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 2rem; font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; color: #fff; }

        .as-form { display: grid; gap: 1.5rem; }
        .as-form.grid-2 { grid-template-columns: 1fr 1fr; }
        .as-form.grid-3 { grid-template-columns: 1fr 1fr 1fr; }
        .col-span-2 { grid-column: span 2; }

        .form-group label { display: block; font-size: 0.8rem; font-weight: 800; color: #aaa; text-transform: uppercase; margin-bottom: 0.6rem; letter-spacing: 0.05em; }
        .help-text { display: block; margin-top: 0.4rem; font-size: 0.75rem; color: #666; font-weight: 600; }
        
        .config-input { background: rgba(255,255,255,0.03) !important; border: 1px solid rgba(255,255,255,0.08) !important; font-size: 1rem !important; padding: 1rem !important; border-radius: 10px !important; color: white !important; width: 100%; box-sizing: border-box; transition: all 0.2s; }
        .config-input:focus { border-color: var(--primary) !important; background: rgba(0,200,83,0.05) !important; box-shadow: 0 0 0 4px rgba(0,200,83,0.1) !important; outline: none; }
        .area { resize: vertical; min-height: 80px; font-family: inherit; }

        .mask-input { display: flex; gap: 0.5rem; }
        .mask-input input { flex: 1; font-family: monospace; letter-spacing: 0.1em; color: #888 !important; }

        .btn-ghost { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 0 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { background: rgba(255,255,255,0.1); }

        .system-toggles { display: flex; flex-direction: column; gap: 1.5rem; }
        .st-row { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); }
        .st-row.style-none { background: transparent; border: none; padding: 0; }
        .st-info h4 { font-size: 1.05rem; font-weight: 800; color: #fff; margin-bottom: 0.3rem; }
        .st-info p { font-size: 0.85rem; color: #888; margin: 0; }

        .switch { position: relative; display: inline-block; width: 50px; height: 28px; flex-shrink: 0; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 34px; box-shadow: inset 0 2px 5px rgba(0,0,0,0.3); }
        .slider:before { position: absolute; content: ""; height: 22px; width: 22px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
        
        .switch.critical input:checked + .slider { background-color: #ff5252; box-shadow: 0 0 10px rgba(255,82,82,0.5); }
        .switch.warning input:checked + .slider { background-color: #ff9800; box-shadow: 0 0 10px rgba(255,152,0,0.5); }
        .switch.normal input:checked + .slider { background-color: var(--primary); box-shadow: 0 0 10px rgba(0,200,83,0.5); }
        
        input:checked + .slider:before { transform: translateX(22px); }

        .mt-4 { margin-top: 1.5rem; }

        @media (max-width: 1024px) {
           .as-layout { flex-direction: column; }
           .as-nav { width: 100%; flex-direction: row; flex-wrap: wrap; padding: 1rem; }
           .as-nav-btn { flex: 1; min-width: 150px; text-align: center; justify-content: center; }
           .as-form.grid-3, .as-form.grid-2 { grid-template-columns: 1fr; }
           .col-span-2 { grid-column: auto; }
        }
      `}</style>
    </div>
  )
}

export default AdminSettings
