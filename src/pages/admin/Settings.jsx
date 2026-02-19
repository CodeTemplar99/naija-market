import React, { useState } from 'react'

const AdminSettings = () => {
  const [config, setConfig] = useState({
    depositFee: 1.5,
    maxWithdraw: 5000000,
    maintenance: false,
    newMarketMode: 'approval',
    adminEmail: 'admin@naijapredict.com',
    supportPhone: '+234 800 000 0000',
    kycProvider: 'SmileID'
  })

  const handleChange = (e) => setConfig({ ...config, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  return (
    <div className="admin-settings">
      <div className="as-grid">
        <div className="as-card glass">
          <h3>Platform Fees & Limits</h3>
          <div className="as-form">
            <div className="form-group">
              <label>Deposit Fee (%)</label>
              <input type="number" step="0.1" name="depositFee" value={config.depositFee} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label>Max Withdrawal (₦)</label>
              <input type="number" name="maxWithdraw" value={config.maxWithdraw} onChange={handleChange} className="input" />
            </div>
          </div>
        </div>

        <div className="as-card glass">
          <h3>System Control</h3>
          <div className="as-form">
            <div className="form-tog">
              <label>Maintenance Mode</label>
              <label className="switch">
                <input type="checkbox" name="maintenance" checked={config.maintenance} onChange={handleChange} />
                <span className="slider"></span>
              </label>
              <span className="muted-text">Disables trading and logins.</span>
            </div>
            <div className="form-group">
              <label>New Market Mode</label>
              <select name="newMarketMode" value={config.newMarketMode} onChange={handleChange} className="select input">
                <option value="open">Open (Anyone can create)</option>
                <option value="approval">Validation Required</option>
                <option value="admin">Admin Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="as-card glass">
          <h3>Contact & Info</h3>
          <div className="as-form">
            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" name="adminEmail" value={config.adminEmail} onChange={handleChange} className="input" />
            </div>
            <div className="form-group">
              <label>Support Phone</label>
              <input type="text" name="supportPhone" value={config.supportPhone} onChange={handleChange} className="input" />
            </div>
          </div>
        </div>
      </div>

      <div className="as-actions">
        <button className="btn btn-primary btn-lg">Save Configuration</button>
      </div>

      <style>{`
        .admin-settings { max-width: 800px; }
        .as-grid { display: grid; gap: 1.5rem; margin-bottom: 2rem; }
        .as-card { padding: 1.5rem; border-radius: 12px; }
        .as-card h3 { font-size: 1rem; margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem; color: #fff; }
        
        .as-form { display: grid; gap: 1.25rem; }
        .form-group label { display: block; font-size: 0.75rem; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 0.5rem; }
        
        .form-tog { display: flex; align-items: center; gap: 1rem; }
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .4s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--primary); }
        input:checked + .slider:before { transform: translateX(20px); }
        
        .muted-text { font-size: 0.8rem; color: #666; font-style: italic; }
        .as-actions { display: flex; justify-content: flex-end; }
      `}</style>
    </div>
  )
}

export default AdminSettings
