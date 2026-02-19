import React from 'react'
import { Activity, Users, DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="stat-card glass">
    <div className="stat-top">
      <span className="stat-title">{title}</span>
      <div className="stat-icon" style={{ background: `${color}15`, color }}>
        <Icon size={18} />
      </div>
    </div>
    <div className="stat-val">{value}</div>
    <div className="stat-change">
      <span className={`sc-trend ${trend === 'up' ? 'green' : 'red'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </span>
      <span className="sc-period">vs last week</span>
    </div>
  </div>
)

const AdminDashboard = () => {
  return (
    <div className="admin-dash">
      <div className="dash-grid">
        <StatCard title="Total Volume" value="₦485.2M" change="+12.5%" trend="up" icon={Activity} color="#00C853" />
        <StatCard title="Active Users" value="68,432" change="+8.2%" trend="up" icon={Users} color="#4096FF" />
        <StatCard title="Platform Fees" value="₦14.5M" change="+4.1%" trend="up" icon={DollarSign} color="#FFD600" />
        <StatCard title="Open Markets" value="214" change="-2.4%" trend="down" icon={TrendingUp} color="#FF3D00" />
      </div>

      <div className="dash-charts">
        <div className="chart-lg glass">
          <div className="ch-header">
            <h3>Revenue Overview</h3>
            <select className="select input-sm"><option>This Week</option><option>This Month</option></select>
          </div>
          <div className="chart-placeholder">
            <svg viewBox="0 0 800 200" className="chart-svg">
              {/* Mock chart data */}
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00C853" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,150 Q100,100 200,130 T400,80 T600,110 T800,40" fill="none" stroke="#00C853" strokeWidth="3" />
              <path d="M0,150 Q100,100 200,130 T400,80 T600,110 T800,40 V200 H0 Z" fill="url(#g1)" />
            </svg>
            <div className="ch-labels">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>
        
        <div className="chart-sm glass">
          <h3>Recent Activity</h3>
          <div className="act-list">
            {[
              { type: 'user', msg: 'New user registered: @TradingGod', time: '2m' },
              { type: 'trade', msg: 'Large trade: ₦500k on APC Primary', time: '5m' },
              { type: 'alert', msg: 'Fluidity alert: BTC > $100k market', time: '12m' },
              { type: 'market', msg: 'New market created: "Lagos Traffic"', time: '1h' },
            ].map((a, i) => (
              <div key={i} className="act-item">
                <div className={`act-dot ${a.type}`}></div>
                <div className="act-content">
                  <p>{a.msg}</p>
                  <span>{a.time} ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dash-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { padding: 1.5rem; border-radius: 16px; background: rgba(20,20,20,0.4); border: 1px solid rgba(255,255,255,0.05); }
        .stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
        .stat-title { color: #888; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }
        .stat-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .stat-val { font-size: 1.8rem; font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .stat-change { display: flex; align-items: center; gap: 0.6rem; font-size: 0.8rem; }
        .sc-trend { display: flex; align-items: center; gap: 0.2rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 4px; }
        .sc-trend.green { color: var(--accent-yes); background: rgba(0,200,83,0.1); }
        .sc-trend.red { color: var(--accent-no); background: rgba(255,61,0,0.1); }
        .sc-period { color: #666; }

        .dash-charts { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
        .chart-lg { padding: 1.5rem; border-radius: 16px; background: rgba(20,20,20,0.4); border: 1px solid rgba(255,255,255,0.05); min-height: 300px; display: flex; flex-direction: column; }
        .chart-sm { padding: 1.5rem; border-radius: 16px; background: rgba(20,20,20,0.4); border: 1px solid rgba(255,255,255,0.05); }
        
        .ch-header { display: flex; justify-content: space-between; margin-bottom: 1.5rem; }
        .input-sm { padding: 0.3rem 0.6rem; font-size: 0.8rem; width: auto; }
        
        .chart-placeholder { flex: 1; position: relative; display: flex; flex-direction: column; }
        .chart-svg { width: 100%; height: 100%; max-height: 220px; overflow: visible; }
        .ch-labels { display: flex; justify-content: space-between; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); margin-top: auto; color: #666; font-size: 0.75rem; font-weight: 600; }

        .act-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
        .act-item { display: flex; gap: 0.85rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .act-item:last-child { border-bottom: none; }
        .act-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 0.4rem; flex-shrink: 0; }
        .act-dot.user { background: #4096FF; }
        .act-dot.trade { background: #00C853; }
        .act-dot.alert { background: #FFD600; }
        .act-dot.market { background: #AB47BC; }
        .act-content p { font-size: 0.85rem; color: #ddd; line-height: 1.4; margin-bottom: 0.2rem; }
        .act-content span { font-size: 0.7rem; color: #666; display: block; }

        @media (max-width: 1200px) {
          .dash-grid { grid-template-columns: 1fr 1fr; }
          .dash-charts { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
