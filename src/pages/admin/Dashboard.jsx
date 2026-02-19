import React from 'react'
import { Activity, Users, DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Zap, Globe, Clock, Shield, BarChart2 } from 'lucide-react'

const StatCard = ({ title, value, change, trend, icon: Icon, color, sparkline }) => (
  <div className="stat-card glass">
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
        <span className="sc-period">vs yesterday</span>
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
          <p className="dash-subtitle">Real-time platform overview and core metrics.</p>
        </div>
        <div className="dash-actions">
          <span className="live-indicator"><span className="dot"></span> Live Data</span>
          <select className="glass-select"><option>Past 24 Hours</option><option>Past 7 Days</option></select>
        </div>
      </div>

      <div className="dash-grid-top">
        <StatCard title="Trading Volume" value="₦485.2M" change="+12.5%" trend="up" icon={Activity} color="#00C853" sparkline="M0,25 Q20,10 40,20 T80,15 T100,5" />
        <StatCard title="Total Liquidity" value="₦1.2B" change="+2.1%" trend="up" icon={DollarSign} color="#4096FF" sparkline="M0,20 Q20,25 40,15 T80,10 T100,5" />
        <StatCard title="Protocol Revenue" value="₦14.5M" change="-4.1%" trend="down" icon={BarChart2} color="#FFD600" sparkline="M0,5 Q20,15 40,10 T80,25 T100,20" />
        <StatCard title="Active Traders" value="12,432" change="+8.2%" trend="up" icon={Users} color="#e040fb" sparkline="M0,30 Q20,10 40,15 T80,5 T100,0" />
      </div>

      <div className="dash-grid-main">
        <div className="dash-chart glass">
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

        <div className="dash-side">
          <div className="ds-box glass">
            <h3>Top Active Markets</h3>
            <div className="tm-list">
              {[
                { name: 'Will Bitcoin hit $100k in Feb?', vol: '₦142.5M', change: '+12%' },
                { name: 'Osimhen to score next match?', vol: '₦89.2M', change: '+5%' },
                { name: 'Naira to Dollar exchange rate', vol: '₦64.1M', change: '-2%' },
                { name: 'Grammy Album of the Year', vol: '₦40.0M', change: '+18%' },
              ].map((m, i) => (
                <div key={i} className="tm-item">
                  <span className="tm-name">{m.name}</span>
                  <div className="tm-stats">
                    <span className="tm-vol">{m.vol}</span>
                    <span className={`tm-change ${m.change.startsWith('+') ? 'green' : 'red'}`}>{m.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-box glass">
            <h3>Platform Health</h3>
            <div className="ph-list">
              <div className="ph-item">
                <div className="phi-icon blue"><Globe size={14} /></div>
                <div className="phi-info">
                  <span className="phi-label">API Latency</span>
                  <span className="phi-val">42ms</span>
                </div>
                <span className="phi-status green">Good</span>
              </div>
              <div className="ph-item">
                <div className="phi-icon yellow"><Zap size={14} /></div>
                <div className="phi-info">
                  <span className="phi-label">Match Engine</span>
                  <span className="phi-val">2.1k TPS</span>
                </div>
                <span className="phi-status green">Optimal</span>
              </div>
              <div className="ph-item">
                <div className="phi-icon purple"><Shield size={14} /></div>
                <div className="phi-info">
                  <span className="phi-label">Pending KYC</span>
                  <span className="phi-val">45 Requests</span>
                </div>
                <span className="phi-status orange">Action Req</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-footer glass">
        <div className="df-header">
          <h3>Live Activity Stream</h3>
          <button className="btn-ghost btn-sm">View All</button>
        </div>
        <div className="df-grid">
          {[
            { type: 'trade', msg: 'Large trade: ₦2.5M on "Bitcoin $100k" - YES', time: 'Just now' },
            { type: 'user', msg: 'New large deposit detected: ₦10M by @WhaleKing', time: '2 mins ago' },
            { type: 'market', msg: 'Market Resolution Pending: "Lagos Traffic"', time: '5 mins ago' },
            { type: 'alert', msg: 'High volatility in "Naira to Dollar" market', time: '12 mins ago' },
          ].map((a, i) => (
            <div key={i} className="act-item">
              <div className={`act-dot ${a.type}`}></div>
              <div className="act-content">
                <p>{a.msg}</p>
                <span className="mono">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .admin-dash { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1400px; margin: 0 auto; }
        
        .dash-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; }
        .dash-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.05em; font-family: var(--font-display); background: linear-gradient(135deg, #fff, #888); -webkit-background-clip: text; color: transparent; margin-bottom: 0.2rem; }
        .dash-subtitle { color: var(--text-muted); font-size: 1rem; }
        .dash-actions { display: flex; align-items: center; gap: 1rem; }
        .live-indicator { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; background: rgba(0,200,83,0.1); color: var(--accent-yes); border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; border: 1px solid rgba(0,200,83,0.2); }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } 100% { opacity: 1; transform: scale(1); } }
        
        .glass-select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.85rem; font-weight: 600; outline: none; appearance: none; cursor: pointer; }
        .glass-select option { background: var(--bg); color: white; }

        .dash-grid-top { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
        .stat-card { padding: 1.25rem 1.5rem; border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 0.75rem; background: rgba(20,20,20,0.4); box-shadow: inset 0 0 20px rgba(0,0,0,0.5); }
        .stat-top { display: flex; justify-content: space-between; align-items: center; }
        .stat-title-wrap { display: flex; align-items: center; gap: 0.75rem; }
        .stat-title { color: #aaa; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .stat-val { font-size: 2.2rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.03em; font-family: var(--font-display); }
        .stat-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
        .stat-change { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; }
        .sc-trend { display: flex; align-items: center; gap: 0.2rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px; }
        .sc-trend.green { color: var(--accent-yes); background: rgba(0,200,83,0.15); }
        .sc-trend.red { color: var(--accent-no); background: rgba(229,57,53,0.15); }
        .sc-period { color: #666; font-weight: 600; }
        .sparkline { width: 60px; height: 25px; overflow: visible; }

        .dash-grid-main { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; }
        .dash-chart { padding: 1.5rem; border-radius: var(--radius-lg); background: rgba(20,20,20,0.4); border: 1px solid rgba(255,255,255,0.05); min-height: 380px; display: flex; flex-direction: column; }
        
        .ch-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .ch-header h3 { font-size: 1.1rem; font-weight: 800; margin: 0; }
        .ch-legend { display: flex; gap: 1rem; font-size: 0.8rem; font-weight: 700; color: #888; text-transform: uppercase; }
        .ch-legend span { display: flex; align-items: center; gap: 0.4rem; }
        .l-dot { width: 10px; height: 10px; border-radius: 4px; }
        .l-dot.green { background: #00C853; }
        .l-dot.blue { background: #4096FF; }

        .chart-placeholder { flex: 1; position: relative; display: flex; flex-direction: column; }
        .chart-svg { width: 100%; height: 100%; max-height: 250px; overflow: visible; }
        .ch-labels { display: flex; justify-content: space-between; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); margin-top: auto; color: #666; font-size: 0.75rem; font-weight: 700; font-family: monospace; }
        
        .dash-side { display: flex; flex-direction: column; gap: 1rem; }
        .ds-box { padding: 1.5rem; border-radius: var(--radius-lg); background: rgba(20,20,20,0.4); border: 1px solid rgba(255,255,255,0.05); flex: 1; }
        .ds-box h3 { font-size: 0.9rem; font-weight: 800; text-transform: uppercase; color: #888; margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem; }

        .tm-list { display: flex; flex-direction: column; gap: 1rem; }
        .tm-item { display: flex; justify-content: space-between; align-items: center; }
        .tm-name { font-size: 0.9rem; font-weight: 600; color: #ddd; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .tm-stats { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; }
        .tm-vol { font-size: 0.9rem; font-weight: 800; font-family: monospace; }
        .tm-change { font-size: 0.75rem; font-weight: 700; }
        .tm-change.green { color: var(--accent-yes); }
        .tm-change.red { color: var(--accent-no); }

        .ph-list { display: flex; flex-direction: column; gap: 1rem; }
        .ph-item { display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.02); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.03); }
        .phi-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); }
        .phi-icon.blue { color: #4096FF; background: rgba(64,150,255,0.15); }
        .phi-icon.yellow { color: var(--accent-yellow); background: rgba(255,214,0,0.15); }
        .phi-icon.purple { color: #e040fb; background: rgba(224,64,251,0.15); }
        .phi-info { display: flex; flex-direction: column; gap: 0.1rem; flex: 1; }
        .phi-label { font-size: 0.7rem; font-weight: 700; color: #888; text-transform: uppercase; }
        .phi-val { font-size: 0.9rem; font-weight: 800; font-family: monospace; color: #fff; }
        .phi-status { font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase; }
        .phi-status.green { background: rgba(0,200,83,0.1); color: var(--accent-yes); border: 1px solid rgba(0,200,83,0.2); }
        .phi-status.orange { background: rgba(255,152,0,0.1); color: #ff9800; border: 1px solid rgba(255,152,0,0.2); }

        .dash-footer { padding: 1.5rem; border-radius: var(--radius-lg); background: rgba(20,20,20,0.4); border: 1px solid rgba(255,255,255,0.05); }
        .df-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .df-header h3 { font-size: 1rem; font-weight: 800; text-transform: uppercase; color: #888; margin: 0; }
        .df-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
        
        .act-item { display: flex; gap: 0.85rem; align-items: flex-start; }
        .act-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 0.4rem; flex-shrink: 0; }
        .act-dot.user { background: #4096FF; box-shadow: 0 0 10px #4096FF; }
        .act-dot.trade { background: #00C853; box-shadow: 0 0 10px #00C853; }
        .act-dot.alert { background: #FFD600; box-shadow: 0 0 10px #FFD600; }
        .act-dot.market { background: #AB47BC; box-shadow: 0 0 10px #AB47BC; }
        
        .act-content p { font-size: 0.85rem; color: #ddd; line-height: 1.4; margin-bottom: 0.3rem; font-weight: 600; }
        .act-content span { font-size: 0.7rem; color: #666; display: block; }
        .mono { font-family: monospace; }
        
        .btn-ghost { background: none; border: none; color: var(--primary); font-weight: 700; cursor: pointer; }
        .btn-ghost:hover { text-decoration: underline; }

        @media (max-width: 1024px) {
          .dash-grid-main { grid-template-columns: 1fr; }
          .dash-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
