import React, { useState } from 'react'
import { Lock, Unlock, TrendingUp, DollarSign, Activity, PieChart, BarChart } from 'lucide-react'

const AdminEarnings = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin123')
    { // Simple hardcoded password for the demo
      setIsAuthenticated(true)
      setError('')
    } else
    {
      setError('Incorrect master password.')
    }
  }

  if (!isAuthenticated)
  {
    return (
      <div className="earnings-lock animate-slide-up">
        <div className="el-card glass-heavy">
          <div className="el-icon"><Lock size={32} /></div>
          <h2>Restricted Access</h2>
          <p>Please enter the master password to view business financials.</p>

          <form className="el-form" onSubmit={handleLogin}>
            <input
              type="password"
              className="input el-input"
              placeholder="Master Password (admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <span className="el-error">{error}</span>}
            <button type="submit" className="btn-solid-glow w-full"><Unlock size={16} /> Unlock Treasury</button>
          </form>
        </div>

        <style>{`
          .earnings-lock { display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 120px); }
          .el-card { max-width: 400px; width: 100%; padding: 2.5rem; border-radius: var(--radius-xl); text-align: center; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
          .el-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(229,57,53,0.1); color: var(--accent-no); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; border: 2px solid rgba(229,57,53,0.3); }
          .el-card h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; color: #fff; }
          .el-card p { color: #888; font-size: 0.9rem; margin-bottom: 2rem; }
          .el-form { display: flex; flex-direction: column; gap: 1rem; }
          .el-input { font-size: 1.1rem !important; padding: 1rem !important; text-align: center; letter-spacing: 0.1em; background: rgba(0,0,0,0.3) !important; border-color: rgba(255,255,255,0.1) !important; color: #fff !important; }
          .el-input:focus { border-color: var(--primary) !important; }
          .el-error { color: var(--accent-no); font-size: 0.8rem; font-weight: 700; }
          
          .btn-solid-glow { background: var(--primary); color: white; padding: 1rem; border-radius: 10px; font-weight: 800; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; border: none; cursor: pointer; box-shadow: 0 0 20px rgba(0, 200, 83, 0.3); transition: all 0.2s; }
          .btn-solid-glow:hover { transform: translateY(-2px); box-shadow: 0 4px 25px rgba(0, 200, 83, 0.5); }
          .w-full { width: 100%; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="admin-page animate-slide-up">
      <div className="ep-header">
        <div>
          <h1 className="ep-title">Business Earnings</h1>
          <p className="ep-subtitle">Top-level revenue, profit margins, and platform financials.</p>
        </div>
        <button className="btn-ghost" onClick={() => setIsAuthenticated(false)}><Lock size={16} /> Lock View</button>
      </div>

      <div className="ep-grid-top">
        <div className="stat-card glass glow-green">
          <div className="stat-top">
            <span className="stat-title">Gross Revenue (MTD)</span>
            <div className="stat-icon"><DollarSign size={20} /></div>
          </div>
          <div className="stat-val">₦48.5M</div>
          <div className="stat-bottom">
            <span className="sc-trend green"><TrendingUp size={14} /> +18.2%</span>
            <span className="sc-period">vs last month</span>
          </div>
        </div>
        <div className="stat-card glass glow-blue">
          <div className="stat-top">
            <span className="stat-title">Net Profit (MTD)</span>
            <div className="stat-icon blue"><Activity size={20} /></div>
          </div>
          <div className="stat-val">₦32.1M</div>
          <div className="stat-bottom">
            <span className="sc-trend green"><TrendingUp size={14} /> +21.4%</span>
            <span className="sc-period">vs last month</span>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-top">
            <span className="stat-title">Average Revenue Per User</span>
            <div className="stat-icon purple"><PieChart size={20} /></div>
          </div>
          <div className="stat-val">₦4,250</div>
          <div className="stat-bottom">
            <span className="sc-trend green"><TrendingUp size={14} /> +3.5%</span>
            <span className="sc-period">lifetime value</span>
          </div>
        </div>
      </div>

      <div className="ep-grid-main">
        <div className="ep-chart glass">
          <div className="ch-header">
            <h3>Revenue Breakdown</h3>
            <select className="glass-select"><option>This Year</option><option>Last Year</option></select>
          </div>

          {/* Visual representation of a stacked bar or area chart */}
          <div className="ep-chart-area">
            <div className="ep-bars">
              {[40, 60, 45, 80, 50, 90, 70, 100, 85, 110, 95, 130].map((h, i) => (
                <div key={i} className="ep-bar-col">
                  <div className="ep-bar-segment fee" style={{ height: `${h * 0.7}%` }}></div>
                  <div className="ep-bar-segment withdrawal" style={{ height: `${h * 0.3}%` }}></div>
                </div>
              ))}
            </div>
            <div className="ch-labels">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>

          <div className="ch-legend-bottom">
            <span><div className="l-dot green"></div> Trade Fees</span>
            <span><div className="l-dot blue"></div> Withdrawal Fees</span>
          </div>
        </div>

        <div className="ep-side">
          <div className="ep-box glass">
            <h3>Revenue Sources</h3>
            <div className="source-list">
              <div className="source-item">
                <span className="src-label">Market Maker Fees (0.5%)</span>
                <span className="src-val">₦22.4M</span>
              </div>
              <div className="source-line"><div className="src-fill green" style={{ width: '55%' }}></div></div>

              <div className="source-item">
                <span className="src-label">Taker Execution (1.0%)</span>
                <span className="src-val">₦16.8M</span>
              </div>
              <div className="source-line"><div className="src-fill blue" style={{ width: '40%' }}></div></div>

              <div className="source-item">
                <span className="src-label">Withdrawal Fees (Flat)</span>
                <span className="src-val">₦9.3M</span>
              </div>
              <div className="source-line"><div className="src-fill purple" style={{ width: '25%' }}></div></div>
            </div>
          </div>

          <div className="ep-box glass">
            <h3>Operational Costs</h3>
            <div className="source-list">
              <div className="source-item">
                <span className="src-label">Oracle Resolutions</span>
                <span className="src-val red">-₦2.1M</span>
              </div>
              <div className="source-item">
                <span className="src-label">Payment Gateway Fees</span>
                <span className="src-val red">-₦4.5M</span>
              </div>
              <div className="source-item">
                <span className="src-label">Server Infrastructure</span>
                <span className="src-val red">-₦1.2M</span>
              </div>
              <div className="cost-total">
                <span>Total Monthly OpEx</span>
                <span className="fw">₦7.8M</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-page { max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; height: calc(100vh - 120px); overflow-y: auto; padding-bottom: 2rem; }
        
        .ep-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-shrink: 0; }
        .ep-title { font-size: 2.2rem; font-weight: 800; letter-spacing: -0.05em; font-family: var(--font-display); background: linear-gradient(135deg, #00C853, #4096FF); -webkit-background-clip: text; color: transparent; margin-bottom: 0.2rem; }
        .ep-subtitle { color: var(--text-muted); font-size: 1rem; }
        
        .btn-ghost { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #888; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
        .btn-ghost:hover { background: rgba(255,255,255,0.1); color: #fff; }

        .ep-grid-top { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        
        .stat-card { padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 0.75rem; background: rgba(20,20,20,0.4); position: relative; overflow: hidden; }
        .stat-card.glow-green { box-shadow: inset 0 0 40px rgba(0,200,83,0.05); border-color: rgba(0,200,83,0.2); }
        .stat-card.glow-blue { box-shadow: inset 0 0 40px rgba(64,150,255,0.05); border-color: rgba(64,150,255,0.2); }
        
        .stat-top { display: flex; justify-content: space-between; align-items: center; }
        .stat-title { color: #888; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .stat-icon.blue { background: rgba(64,150,255,0.1); color: #4096FF; }
        .stat-icon.purple { background: rgba(224,64,251,0.1); color: #e040fb; }
        
        .stat-val { font-size: 2.5rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.02em; font-family: var(--font-display); }
        
        .stat-bottom { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; margin-top: 0.5rem; }
        .sc-trend { display: flex; align-items: center; gap: 0.2rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px; }
        .sc-trend.green { color: var(--accent-yes); background: rgba(0,200,83,0.15); }
        .sc-period { color: #888; font-weight: 600; text-transform: uppercase; font-size: 0.7rem; }

        .ep-grid-main { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-top: 1.5rem; }
        
        .ep-chart { padding: 1.5rem; border-radius: var(--radius-lg); background: rgba(20,20,20,0.6); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; min-height: 400px; }
        .ch-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .ch-header h3 { font-size: 1.2rem; font-weight: 800; color: #fff; margin: 0; }
        
        .glass-select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 8px; padding: 0.5rem 1rem; font-size: 0.85rem; font-weight: 700; outline: none; appearance: none; cursor: pointer; }
        .glass-select option { background: var(--bg); color: white; }

        .ep-chart-area { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; position: relative; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .ep-bars { display: flex; justify-content: space-between; align-items: flex-end; height: 100%; padding: 0 1rem; }
        .ep-bar-col { width: 30px; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; transition: all 0.2s; cursor: pointer; }
        .ep-bar-col:hover { filter: brightness(1.2); }
        .ep-bar-segment { width: 100%; border-radius: 4px; }
        .ep-bar-segment.fee { background: linear-gradient(180deg, #00C853, #008751); }
        .ep-bar-segment.withdrawal { background: linear-gradient(180deg, #4096FF, #004bbb); }
        
        .ch-labels { display: flex; justify-content: space-between; margin-top: 1rem; color: #888; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 0 1rem; }
        
        .ch-legend-bottom { display: flex; gap: 1.5rem; justify-content: center; margin-top: 1.5rem; font-size: 0.8rem; font-weight: 700; color: #aaa; text-transform: uppercase; }
        .ch-legend-bottom span { display: flex; align-items: center; gap: 0.4rem; }
        .l-dot { width: 12px; height: 12px; border-radius: 4px; }
        .l-dot.green { background: #00C853; }
        .l-dot.blue { background: #4096FF; }

        .ep-side { display: flex; flex-direction: column; gap: 1.5rem; }
        .ep-box { padding: 1.5rem; border-radius: var(--radius-lg); background: rgba(20,20,20,0.6); border: 1px solid rgba(255,255,255,0.08); }
        .ep-box h3 { font-size: 1rem; font-weight: 800; text-transform: uppercase; color: #aaa; margin-bottom: 1.5rem; letter-spacing: 0.05em; }
        
        .source-list { display: flex; flex-direction: column; gap: 1rem; }
        .source-item { display: flex; justify-content: space-between; align-items: flex-end; }
        .src-label { font-size: 0.85rem; font-weight: 700; color: #ddd; }
        .src-val { font-size: 1.1rem; font-weight: 900; font-family: monospace; color: #fff; }
        .src-val.red { color: var(--accent-no); }
        
        .source-line { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; margin-top: -0.5rem; margin-bottom: 0.5rem; }
        .src-fill { height: 100%; border-radius: 10px; }
        .src-fill.green { background: #00C853; }
        .src-fill.blue { background: #4096FF; }
        .src-fill.purple { background: #e040fb; }

        .cost-total { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 0.5rem; font-size: 1.1rem; font-weight: 800; color: #fff; }
        
        @media (max-width: 1024px) {
           .ep-grid-main { grid-template-columns: 1fr; }
           .ep-bars { gap: 10px; }
           .ep-bar-col { width: 20px; }
        }
      `}</style>
    </div>
  )
}

export default AdminEarnings
