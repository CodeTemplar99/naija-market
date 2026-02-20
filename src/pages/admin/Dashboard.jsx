import React from 'react'
import { Activity, Users, DollarSign, ArrowUpRight, ArrowDownRight, Zap, Globe, Clock, Shield, BarChart2, TrendingUp, Target, UserPlus, Flame } from 'lucide-react'

// Sub-component for individual top stats
const StatCard = ({ title, value, change, trend, icon: Icon, color, sparkline }) => (
  <div className="stat-card glass glow-fx" style={{ "--gc": color }}>
    <div className="stat-top">
      <div className="stat-title-wrap">
        <div className="stat-icon" style={{ background: `${color}15`, color }}>
          <Icon size={16} />
        </div>
        <span className="stat-title">{title}</span>
      </div>
    </div>
    <div className="stat-val">{value}</div>
    <div className="stat-bottom">
      <div className="stat-change">
        <span className={`sc-trend ${trend === 'up' ? 'green' : 'red'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>
      {sparkline && (
        <svg viewBox="0 0 100 30" className="sparkline">
          <path d={sparkline} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  </div>
)

const AdminDashboard = () => {
  return (
    <div className="admin-dash animate-slide-up">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Command Center</h1>
          <p className="dash-subtitle">Real-time platform overview and predictive models.</p>
        </div>
        <div className="dash-actions">
          <span className="live-indicator"><span className="dot"></span> Live Data</span>
          <select className="glass-select"><option>Past 24 Hours</option><option>Past 7 Days</option></select>
        </div>
      </div>

      <div className="dash-grid-top">
        <StatCard title="Trading Volume" value="₦485.2M" change="+12.5%" trend="up" icon={Activity} color="#00C853" sparkline="M0,25 Q20,10 40,20 T80,15 T100,5" />
        <StatCard title="Total Liquidity" value="₦1.2B" change="+2.1%" trend="up" icon={DollarSign} color="#4096FF" sparkline="M0,20 Q20,25 40,15 T80,10 T100,5" />
        <StatCard title="Votes Per Minute (VPM)" value="1,240" change="+45%" trend="up" icon={Zap} color="#FFD600" sparkline="M0,30 Q20,15 40,20 T80,10 T100,5" />
        <StatCard title="New Signups Today" value="842" change="-2.4%" trend="down" icon={UserPlus} color="#e040fb" sparkline="M0,5 Q20,25 40,20 T80,15 T100,25" />
      </div>

      <div className="dash-grid-main">
        {/* Main Chart Area */}
        <div className="dash-chart glass flex-col justify-between">
          <div className="ch-header">
            <h3>Volume vs Liquidity</h3>
            <div className="ch-legend">
              <span><div className="l-dot green"></div> Volume</span>
              <span><div className="l-dot blue"></div> Liquidity</span>
            </div>
          </div>
          <div className="chart-placeholder">
            <svg viewBox="0 0 800 250" className="chart-svg">
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00C853" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="liqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4096FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4096FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,200 Q100,150 200,180 T400,120 T600,140 T800,80" fill="none" stroke="#4096FF" strokeWidth="3" />
              <path d="M0,200 Q100,150 200,180 T400,120 T600,140 T800,80 V250 H0 Z" fill="url(#liqGrad)" />

              <path d="M0,220 Q100,190 200,210 T400,160 T600,180 T800,120" fill="none" stroke="#00C853" strokeWidth="3" />
              <path d="M0,220 Q100,190 200,210 T400,160 T600,180 T800,120 V250 H0 Z" fill="url(#volGrad)" />
              <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="0" y1="180" x2="800" y2="180" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,5" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,5" />
            </svg>
            <div className="ch-labels">
              <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>24:00</span>
            </div>
          </div>
        </div>

        {/* Right Side Info Panels */}
        <div className="dash-side">
          <div className="ds-box glass">
            <h3><Flame size={16} className="inline-icon text-orange" /> Best Performing Markets</h3>
            <div className="tm-list">
              {[
                { name: 'Will Bitcoin hit $100k in Feb?', vol: '₦142.5M', change: '+12%' },
                { name: 'Osimhen to score next match?', vol: '₦89.2M', change: '+5%' },
                { name: 'Naira to Dollar exchange rate', vol: '₦64.1M', change: '+22%' },
              ].map((m, i) => (
                <div key={i} className="tm-item">
                  <span className="tm-name">{m.name}</span>
                  <div className="tm-stats">
                    <span className="tm-vol">{m.vol}</span>
                    <span className="tm-change green">{m.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-box glass">
            <h3><Shield size={16} className="inline-icon text-yellow" /> Users to Watch (Anomalies)</h3>
            <div className="ph-list">
              <div className="ph-item user-watch">
                <div className="phi-avatar bg-red">O</div>
                <div className="phi-info">
                  <span className="phi-label">@OlaTrader</span>
                  <span className="phi-val">Unusual Win Rate (95%)</span>
                </div>
                <button className="btn-solid-glow small bg-red">Flag</button>
              </div>
              <div className="ph-item user-watch">
                <div className="phi-avatar bg-blue">W</div>
                <div className="phi-info">
                  <span className="phi-label">@WhaleKing</span>
                  <span className="phi-val">Massive Deposits (+₦50M)</span>
                </div>
                <button className="btn-solid-glow small bg-blue">Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Section */}
      <div className="forecast-section glass mt-6">
        <div className="fc-header">
          <div className="fc-title-group">
            <h3><Target size={20} className="inline-icon text-cyan" /> Predictive AI Forecasts</h3>
            <p>Expected platform metrics for the end of this month based on current velocity.</p>
          </div>
          <span className="ai-badge">AI Confidence: 92%</span>
        </div>

        <div className="fc-grid">
          <div className="fc-card">
            <h4>Projected TVL</h4>
            <div className="fc-val text-blue">₦1.8B</div>
            <div className="fc-bar"><div className="fc-fill bg-blue" style={{ width: '75%' }}></div></div>
            <span className="fc-eta">Target: ₦2.0B by EOM</span>
          </div>

          <div className="fc-card">
            <h4>Expected MTD Revenue</h4>
            <div className="fc-val text-green">₦62.5M</div>
            <div className="fc-bar"><div className="fc-fill bg-green" style={{ width: '90%' }}></div></div>
            <span className="fc-eta">Shattering previous record!</span>
          </div>

          <div className="fc-card">
            <h4>Estimated Active Users</h4>
            <div className="fc-val text-purple">18,500</div>
            <div className="fc-bar"><div className="fc-fill bg-purple" style={{ width: '60%' }}></div></div>
            <span className="fc-eta">Steady organic growth</span>
          </div>

          <div className="fc-card">
            <h4>Resolution Workload</h4>
            <div className="fc-val text-yellow">45 Mkts/Day</div>
            <div className="fc-bar"><div className="fc-fill bg-yellow" style={{ width: '85%' }}></div></div>
            <span className="fc-eta">Warning: Operational strain ahead</span>
          </div>
        </div>
      </div>

      <style>{`
        .admin-dash { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1400px; margin: 0 auto; padding-bottom: 2rem; }
        
        .dash-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; }
        .dash-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.05em; font-family: var(--font-display); background: linear-gradient(135deg, #fff, #999); -webkit-background-clip: text; color: transparent; margin-bottom: 0.2rem; }
        .dash-subtitle { color: var(--text-muted); font-size: 1rem; }
        .dash-actions { display: flex; align-items: center; gap: 1rem; }
        
        .live-indicator { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; background: rgba(0,200,83,0.1); color: var(--accent-yes); border-radius: 8px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; border: 1px solid rgba(0,200,83,0.2); }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } 100% { opacity: 1; transform: scale(1); } }
        
        .glass-select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.85rem; font-weight: 700; outline: none; appearance: none; cursor: pointer; }

        .dash-grid-top { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
        .stat-card { padding: 1.25rem 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 0.75rem; background: rgba(20,20,20,0.6); }
        .glow-fx { transition: all 0.3s ease; }
        .glow-fx:hover { box-shadow: inset 0 0 40px rgba(255,255,255,0.03), 0 0 20px var(--gc); border-color: var(--gc); transform: translateY(-3px); }
        
        .stat-top { display: flex; justify-content: space-between; align-items: center; }
        .stat-title-wrap { display: flex; align-items: center; gap: 0.75rem; }
        .stat-title { color: #aaa; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .stat-val { font-size: 2.2rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.03em; font-family: var(--font-display); }
        
        .stat-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
        .stat-change { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; }
        .sc-trend { display: flex; align-items: center; gap: 0.2rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px; }
        .sc-trend.green { color: var(--accent-yes); background: rgba(0,200,83,0.15); }
        .sc-trend.red { color: var(--accent-no); background: rgba(229,57,53,0.15); }
        .sparkline { width: 65px; height: 25px; overflow: visible; }

        .dash-grid-main { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .dash-chart { padding: 1.5rem; border-radius: var(--radius-lg); background: rgba(20,20,20,0.6); border: 1px solid rgba(255,255,255,0.08); min-height: 380px; }
        .flex-col { display: flex; flex-direction: column; }
        .justify-between { justify-content: space-between; }
        
        .ch-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .ch-header h3 { font-size: 1.1rem; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 0.05em; color: #fff;}
        .ch-legend { display: flex; gap: 1rem; font-size: 0.8rem; font-weight: 800; color: #888; text-transform: uppercase; }
        .ch-legend span { display: flex; align-items: center; gap: 0.4rem; }
        .l-dot { width: 10px; height: 10px; border-radius: 4px; }
        .l-dot.green { background: #00C853; }
        .l-dot.blue { background: #4096FF; }

        .chart-placeholder { flex: 1; position: relative; display: flex; flex-direction: column; }
        .chart-svg { width: 100%; height: 100%; max-height: 250px; overflow: visible; }
        .ch-labels { display: flex; justify-content: space-between; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); margin-top: auto; color: #666; font-size: 0.75rem; font-weight: 700; font-family: monospace; }
        
        .dash-side { display: flex; flex-direction: column; gap: 1.5rem; }
        .ds-box { padding: 1.5rem; border-radius: var(--radius-lg); background: rgba(20,20,20,0.6); border: 1px solid rgba(255,255,255,0.08); flex: 1; display: flex; flex-direction: column; }
        .ds-box h3 { font-size: 0.95rem; font-weight: 800; text-transform: uppercase; color: #ccc; margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
        
        .inline-icon { display: inline-block; vertical-align: middle; }
        .text-orange { color: #FF9800; }
        .text-yellow { color: #FFD600; }
        .text-cyan { color: #00E5FF; }

        .tm-list { display: flex; flex-direction: column; gap: 1.1rem; }
        .tm-item { display: flex; justify-content: space-between; align-items: center; }
        .tm-name { font-size: 0.9rem; font-weight: 700; color: #ddd; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .tm-stats { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; }
        .tm-vol { font-size: 0.95rem; font-weight: 900; font-family: monospace; color: #fff; }
        .tm-change { font-size: 0.75rem; font-weight: 800; }
        .tm-change.green { color: var(--accent-yes); background: rgba(0,200,83,0.1); padding: 0.1rem 0.4rem; border-radius: 4px; }
        
        .ph-list { display: flex; flex-direction: column; gap: 1rem; }
        .ph-item { display: flex; align-items: center; gap: 0.8rem; background: rgba(255,255,255,0.02); padding: 0.8rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.03); }
        .phi-avatar { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; }
        .bg-red { background: rgba(229,57,53, 0.2); border: 1px solid rgba(229,57,53, 0.3); color: #ff5252; }
        .bg-blue { background: rgba(64,150,255, 0.2); border: 1px solid rgba(64,150,255, 0.3); color: #4096FF; }
        
        .phi-info { display: flex; flex-direction: column; gap: 0.1rem; flex: 1; }
        .phi-label { font-size: 0.85rem; font-weight: 800; color: #fff; }
        .phi-val { font-size: 0.75rem; font-weight: 600; color: #aaa; }
        
        .btn-solid-glow.small { background: transparent; padding: 0.3rem 0.6rem; font-size: 0.7rem; border-radius: 6px; box-shadow: none; cursor: pointer; text-transform: uppercase; font-weight: 800; transition: all 0.2s; }
        .btn-solid-glow.small.bg-red:hover { background: #ff5252; color: #000; }
        .btn-solid-glow.small.bg-blue:hover { background: #4096FF; color: #000; }

        .mt-6 { margin-top: 2rem; }
        .forecast-section { padding: 1.5rem; border-radius: var(--radius-xl); background: rgba(20,20,20,0.6); border: 1px solid rgba(0,229,255,0.15); box-shadow: 0 10px 40px rgba(0,229,255,0.05); }
        .fc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; }
        .fc-title-group h3 { font-size: 1.3rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .fc-title-group p { font-size: 0.9rem; color: #888; font-weight: 500; }
        .ai-badge { background: rgba(0,229,255,0.1); color: #00E5FF; padding: 0.4rem 0.8rem; border-radius: 100px; font-size: 0.8rem; font-weight: 800; border: 1px solid rgba(0,229,255,0.2); }

        .fc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .fc-card { display: flex; flex-direction: column; gap: 0.6rem; }
        .fc-card h4 { font-size: 0.8rem; font-weight: 800; color: #aaa; text-transform: uppercase; letter-spacing: 0.05em; }
        .fc-val { font-size: 2.2rem; font-weight: 900; line-height: 1; font-family: var(--font-display); }
        
        .text-blue { color: #4096FF; }
        .bg-blue { background: #4096FF; }
        .text-green { color: #00C853; }
        .bg-green { background: #00C853; }
        .text-purple { color: #e040fb; }
        .bg-purple { background: #e040fb; }
        .text-yellow { color: #FFD600; }
        .bg-yellow { background: #FFD600; }
        
        .fc-bar { width: 100%; height: 6px; border-radius: 10px; background: rgba(255,255,255,0.05); overflow: hidden; margin-top: 0.5rem; }
        .fc-fill { height: 100%; border-radius: 10px; box-shadow: 0 0 10px currentColor; }
        .fc-eta { font-size: 0.75rem; color: #888; font-weight: 600; margin-top: 0.2rem; }

        @media (max-width: 1024px) {
          .dash-grid-main { grid-template-columns: 1fr; }
          .fc-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .dash-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .fc-grid { grid-template-columns: 1fr; }
          .fc-header { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
