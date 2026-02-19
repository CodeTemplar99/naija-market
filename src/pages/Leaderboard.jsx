import React, { useState } from 'react'
import { LEADERBOARD } from '../data/markets'
import { Trophy, Medal, Crown, ArrowUpRight, TrendingUp } from 'lucide-react'

const Leaderboard = () => {
  const [period, setPeriod] = useState('all')

  const podium = LEADERBOARD.slice(0, 3)
  const rest = LEADERBOARD.slice(3)

  const podiumIcons = [
    <Crown size={20} color="#FFD700" />,
    <Medal size={20} color="#C0C0C0" />,
    <Medal size={20} color="#CD7F32" />
  ]

  return (
    <div className="lb-page animate-slide-up">
      <div className="lb-top-section">
        <div className="lb-header">
          <Trophy size={28} color="var(--accent-yellow)" />
          <div>
            <h1>Leaderboard</h1>
            <p className="lb-sub">Top traders ranked by total profit</p>
          </div>
        </div>
        <div className="lb-period">
          {['week', 'month', 'all'].map(p => (
            <button key={p} className={`pd-btn ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>
              {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="podium">
        {[1, 0, 2].map(idx => {
          const user = podium[idx]
          return (
            <div key={idx} className={`podium-card glass rank-${idx + 1}`}>
              <div className="podium-icon">{podiumIcons[idx]}</div>
              <div className="podium-avatar">{user.avatar}</div>
              <h3 className="podium-name">{user.name}</h3>
              <span className="podium-profit">₦{user.profit.toLocaleString()}</span>
              <div className="podium-stats">
                <span>{user.trades} trades</span>
                <span className="podium-wr">{user.winRate}% win</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="lb-table glass">
        <div className="lbt-header">
          <span className="lbt-c rank-col">#</span>
          <span className="lbt-c wide">Trader</span>
          <span className="lbt-c">Profit</span>
          <span className="lbt-c">Trades</span>
          <span className="lbt-c">Win Rate</span>
          <span className="lbt-c">Volume</span>
        </div>
        {rest.map(user => (
          <div key={user.rank} className="lbt-row">
            <span className="lbt-c rank-col">{user.rank}</span>
            <span className="lbt-c wide">
              <div className="lbt-avatar">{user.avatar}</div>
              <span className="lbt-name">{user.name}</span>
            </span>
            <span className="lbt-c lbt-profit">
              <ArrowUpRight size={14} /> ₦{user.profit.toLocaleString()}
            </span>
            <span className="lbt-c">{user.trades}</span>
            <span className="lbt-c">
              <div className="wr-bar">
                <div className="wr-fill" style={{ width: `${user.winRate}%` }}></div>
              </div>
              <span className="wr-txt">{user.winRate}%</span>
            </span>
            <span className="lbt-c muted">{user.volume}</span>
          </div>
        ))}
      </div>

      <style>{`
        .lb-page { max-width: 1100px; margin: 0 auto; padding-bottom: 4rem; }

        .lb-top-section { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
        .lb-header { display: flex; align-items: center; gap: 1rem; }
        .lb-header h1 { font-size: 2rem; }
        .lb-sub { color: var(--text-muted); font-size: 0.9rem; }
        .lb-period { display: flex; gap: 0.4rem; }
        .pd-btn { background: none; border: 1px solid var(--border); color: var(--text-muted); padding: 0.4rem 1rem; border-radius: 10px; font-weight: 700; font-size: 0.8rem; cursor: pointer; font-family: var(--font-main); }
        .pd-btn.active { background: var(--primary); border-color: var(--primary); color: white; }

        /* Podium */
        .podium { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; margin-bottom: 2.5rem; }
        .podium-card {
          display: flex; flex-direction: column; align-items: center;
          padding: 2rem 1.5rem; border-radius: var(--radius-xl);
          text-align: center; position: relative; transition: transform 0.2s;
        }
        .podium-card:hover { transform: translateY(-4px); }
        .podium-card.rank-1 { transform: translateY(-10px); order: 2; }
        .podium-card.rank-2 { order: 1; }
        .podium-card.rank-3 { order: 3; }
        .podium-icon { margin-bottom: 0.75rem; }
        .podium-avatar {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--surface-light); border: 2px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 1rem; margin-bottom: 0.75rem;
        }
        .rank-1 .podium-avatar { border-color: #FFD700; box-shadow: 0 0 20px rgba(255,215,0,0.2); }
        .podium-name { font-size: 1.1rem; margin-bottom: 0.4rem; }
        .podium-profit { font-size: 1.25rem; font-weight: 800; color: var(--accent-yes); margin-bottom: 0.5rem; }
        .podium-stats { display: flex; gap: 0.75rem; font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .podium-wr { color: var(--primary-light); }

        /* Table */
        .lb-table { border-radius: var(--radius-xl); overflow: hidden; }
        .lbt-header { display: grid; grid-template-columns: 50px 2fr 1.2fr 0.8fr 1.2fr 0.8fr; padding: 1rem 1.5rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border); font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .lbt-row { display: grid; grid-template-columns: 50px 2fr 1.2fr 0.8fr 1.2fr 0.8fr; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border); align-items: center; font-size: 0.9rem; font-weight: 600; }
        .lbt-row:last-child { border-bottom: none; }
        .lbt-c { display: flex; align-items: center; gap: 0.5rem; }
        .lbt-c.wide { gap: 0.75rem; }
        .rank-col { font-weight: 800; color: var(--text-muted); }
        .lbt-avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--surface-light); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; border: 1px solid var(--border); flex-shrink: 0; }
        .lbt-name { font-weight: 700; }
        .lbt-profit { color: var(--accent-yes); font-weight: 800; }
        .wr-bar { width: 50px; height: 4px; background: var(--surface-light); border-radius: 10px; overflow: hidden; }
        .wr-fill { height: 100%; background: var(--primary-light); border-radius: 10px; }
        .wr-txt { font-size: 0.8rem; font-weight: 700; }
        .muted { color: var(--text-muted); }

        @media (max-width: 768px) {
          .podium { grid-template-columns: 1fr; }
          .podium-card.rank-1 { transform: none; order: 1; }
          .podium-card.rank-2 { order: 2; }
          .podium-card.rank-3 { order: 3; }
          .lbt-header, .lbt-row { grid-template-columns: 40px 2fr 1.2fr; }
          .lbt-header span:nth-child(n+4), .lbt-row span:nth-child(n+4) { display: none; }
        }
      `}</style>
    </div>
  )
}

export default Leaderboard
