import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Users, BarChart3, MessageSquare, TrendingUp, TrendingDown, Timer } from 'lucide-react'
import { getTimeRemaining } from '../data/markets'

const MarketCard = ({ market }) => {
  const isMulti = market.type === 'multi'
  const topOption = isMulti ? market.options.reduce((a, b) => a.price > b.price ? a : b) : null

  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(market.endTimestamp))

  useEffect(() => {
    if (!timeLeft.countdown) return
    const id = setInterval(() => {
      setTimeLeft(getTimeRemaining(market.endTimestamp))
    }, 1000)
    return () => clearInterval(id)
  }, [timeLeft.countdown, market.endTimestamp])

  const change = market.change24h
  const changeColor = change > 0 ? 'var(--accent-yes)' : change < 0 ? 'var(--accent-no)' : 'var(--text-muted)'

  return (
    <Link to={`/market/${market.id}`} className="mc-card glass">
      {/* Top meta */}
      <div className="mc-top">
        <div className="mc-meta-left">
          <span className="badge badge-green">{market.category}</span>
          {market.isLive && <span className="mc-live"><span className="live-dot"></span> Live</span>}
          {isMulti && <span className="badge badge-blue">Multi</span>}
        </div>
        <span className={`mc-end ${timeLeft.urgent ? 'urgent' : ''}`}>
          {timeLeft.countdown ? <Timer size={11} /> : <Clock size={11} />}
          {timeLeft.urgent ? '' : 'Ends '}{timeLeft.label}
        </span>
      </div>

      {/* Question */}
      <div className="mc-body">
        <img src={market.image} alt="" className="mc-img" />
        <h3 className="mc-question">{market.question}</h3>
      </div>

      {/* Binary: poll bar */}
      {!isMulti && (
        <div className="mc-poll">
          <div className="mc-poll-labels">
            <span className="mc-yes">Yes {market.yesPrice}%</span>
            <span className="mc-no">No {market.noPrice}%</span>
          </div>
          <div className="poll-bar-track"><div className="poll-bar-fill yes" style={{ width: `${market.yesPrice}%` }}></div></div>
        </div>
      )}

      {/* Multi: option list */}
      {isMulti && (
        <div className="mc-options">
          {market.options.slice(0, 3).map((opt, i) => (
            <div key={i} className="mc-opt">
              <span className="mc-opt-dot" style={{ background: opt.color }}></span>
              <span className="mc-opt-name">{opt.name}</span>
              <span className="mc-opt-price" style={{ color: opt.color }}>{opt.price}%</span>
            </div>
          ))}
          {market.options.length > 3 && (
            <span className="mc-opt-more">+{market.options.length - 3} more</span>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="mc-stats">
        <span className="mc-stat"><BarChart3 size={12} /> ₦{market.volume}</span>
        <span className="mc-stat"><Users size={12} /> {market.traders?.toLocaleString()}</span>
        <span className="mc-stat"><MessageSquare size={12} /> {market.comments}</span>
        {change !== undefined && change !== null && (
          <span className="mc-stat mc-change" style={{ color: changeColor }}>
            {change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>

      {/* Action row */}
      {!isMulti ? (
        <div className="mc-actions">
          <button className="btn btn-yes btn-sm mc-btn" onClick={e => e.preventDefault()}>Buy Yes ₦{market.yesPrice}</button>
          <button className="btn btn-no btn-sm mc-btn" onClick={e => e.preventDefault()}>Buy No ₦{market.noPrice}</button>
        </div>
      ) : (
        <div className="mc-actions">
          <button className="btn btn-primary btn-sm mc-btn mc-btn-full" onClick={e => e.preventDefault()}>Trade Options</button>
        </div>
      )}

      <style>{`
        .mc-card { display: flex; flex-direction: column; padding: 1.25rem; border-radius: var(--radius-xl); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .mc-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
        .mc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; }
        .mc-meta-left { display: flex; align-items: center; gap: 0.4rem; }
        .mc-live { display: flex; align-items: center; gap: 0.3rem; font-size: 0.6rem; font-weight: 700; color: var(--accent-yes); text-transform: uppercase; }
        .mc-end { display: flex; align-items: center; gap: 0.3rem; font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }
        .mc-end.urgent { color: var(--accent-no); font-weight: 800; animation: livePulse 2s infinite; }

        .mc-body { display: flex; gap: 0.85rem; margin-bottom: 1rem; }
        .mc-img { width: 48px; height: 48px; border-radius: 12px; object-fit: cover; flex-shrink: 0; border: 1px solid var(--border); }
        .mc-question { font-size: 0.95rem; font-weight: 700; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .mc-poll { margin-bottom: 1rem; }
        .mc-poll-labels { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
        .mc-yes { font-size: 0.75rem; font-weight: 800; color: var(--accent-yes); }
        .mc-no { font-size: 0.75rem; font-weight: 800; color: var(--accent-no); }

        .mc-options { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem; }
        .mc-opt { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; font-weight: 600; }
        .mc-opt-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .mc-opt-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text-muted); }
        .mc-opt-price { font-weight: 800; font-size: 0.85rem; }
        .mc-opt-more { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }

        .mc-stats { display: flex; gap: 0.85rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .mc-stat { display: flex; align-items: center; gap: 0.3rem; font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }
        .mc-change { margin-left: auto; }

        .mc-actions { display: flex; gap: 0.5rem; }
        .mc-btn { flex: 1; justify-content: center; font-size: 0.75rem; padding: 0.45rem; }
        .mc-btn-full { flex: 1; }
      `}</style>
    </Link>
  )
}

export default MarketCard
