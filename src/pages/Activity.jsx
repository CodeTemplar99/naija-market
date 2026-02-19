import React from 'react'
import { ACTIVITIES } from '../data/markets'
import { Activity as ActivityIcon, ArrowUpRight, ArrowDownRight, Circle } from 'lucide-react'

const Activity = () => {
  return (
    <div className="act-page animate-slide-up">
      <div className="act-header">
        <ActivityIcon size={24} />
        <div>
          <h1>Live Activity</h1>
          <p className="act-sub">Real-time trades happening across NaijaPredict</p>
        </div>
        <div className="act-live-indicator">
          <span className="live-dot"></span>
          <span>Live Feed</span>
        </div>
      </div>

      <div className="act-feed">
        {ACTIVITIES.map((act, i) => (
          <div key={act.id} className="act-item glass" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className={`act-icon-wrap ${act.type}`}>
              {act.type === 'buy' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            </div>
            <div className="act-body">
              <div className="act-top-row">
                <span className="act-user">{act.user}</span>
                <span className={`act-action ${act.type}`}>{act.action}</span>
              </div>
              <p className="act-market">{act.market}</p>
            </div>
            <div className="act-right">
              <span className="act-amount">{act.amount}</span>
              <span className="act-time">{act.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="act-summary">
        <div className="as-card glass">
          <span className="as-val">₦4.2M</span>
          <span className="as-label">Volume (1h)</span>
        </div>
        <div className="as-card glass">
          <span className="as-val">348</span>
          <span className="as-label">Trades (1h)</span>
        </div>
        <div className="as-card glass">
          <span className="as-val">1,245</span>
          <span className="as-label">Active Users</span>
        </div>
      </div>

      <style>{`
        .act-page { max-width: 900px; margin: 0 auto; padding-bottom: 4rem; }

        .act-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .act-header h1 { font-size: 2rem; }
        .act-sub { color: var(--text-muted); font-size: 0.9rem; }
        .act-live-indicator {
          display: flex; align-items: center; gap: 0.5rem; margin-left: auto;
          background: rgba(0,200,83,0.06); border: 1px solid rgba(0,200,83,0.12);
          padding: 0.35rem 1rem; border-radius: 100px;
          font-size: 0.8rem; font-weight: 700; color: var(--accent-yes);
        }

        .act-feed { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 3rem; }

        .act-item {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.25rem 1.5rem; border-radius: 16px;
          animation: slideUp 0.4s ease-out forwards;
          opacity: 0;
        }

        .act-icon-wrap {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .act-icon-wrap.buy { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .act-icon-wrap.sell { background: rgba(255,61,0,0.1); color: var(--accent-no); }

        .act-body { flex: 1; min-width: 0; }
        .act-top-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
        .act-user { font-weight: 700; font-size: 0.9rem; }
        .act-action { font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 6px; text-transform: uppercase; }
        .act-action.buy { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .act-action.sell { background: rgba(255,61,0,0.1); color: var(--accent-no); }
        .act-market { font-size: 0.85rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .act-right { text-align: right; flex-shrink: 0; }
        .act-amount { display: block; font-weight: 800; font-size: 0.95rem; }
        .act-time { font-size: 0.7rem; color: var(--text-muted); }

        .act-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .as-card { padding: 1.5rem; border-radius: var(--radius-lg); text-align: center; }
        .as-val { display: block; font-size: 1.5rem; font-weight: 800; font-family: var(--font-display); margin-bottom: 0.25rem; }
        .as-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }

        @media (max-width: 768px) {
          .act-summary { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

export default Activity
