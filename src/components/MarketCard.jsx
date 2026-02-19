import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, Users, MessageSquare, Clock } from 'lucide-react'

const MarketCard = ({ market }) => {
  const {
    id, question, volume, traders, yesPrice, noPrice,
    image, category, endDate, isLive, change24h, comments
  } = market

  const isUp = change24h >= 0

  return (
    <Link to={`/market/${id}`} className="mc-card glass">
      {/* Top row: image + meta */}
      <div className="mc-top">
        <img src={image} alt="" className="mc-img" />
        <div className="mc-meta-col">
          <div className="mc-tags">
            <span className="mc-cat">{category}</span>
            {isLive && (
              <span className="mc-live">
                <span className="live-dot"></span> Live
              </span>
            )}
          </div>
          <p className="mc-end"><Clock size={12} /> Ends {endDate}</p>
        </div>
      </div>

      {/* Question */}
      <h3 className="mc-question">{question}</h3>

      {/* Polling bar */}
      <div className="mc-poll">
        <div className="poll-labels">
          <span className="poll-yes">Yes {yesPrice}%</span>
          <span className="poll-no">No {noPrice}%</span>
        </div>
        <div className="poll-bar-track">
          <div className="poll-bar-fill yes" style={{ width: `${yesPrice}%` }}></div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mc-stats">
        <div className="mc-stat">
          <TrendingUp size={13} />
          <span>₦{volume}</span>
        </div>
        <div className="mc-stat">
          <Users size={13} />
          <span>{traders?.toLocaleString()}</span>
        </div>
        <div className="mc-stat">
          <MessageSquare size={13} />
          <span>{comments}</span>
        </div>
        <div className={`mc-change ${isUp ? 'up' : 'down'}`}>
          {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{isUp ? '+' : ''}{change24h}%</span>
        </div>
      </div>

      {/* Buy buttons */}
      <div className="mc-actions">
        <button className="mc-buy yes" onClick={e => e.preventDefault()}>
          Buy Yes <span className="mc-price">₦{yesPrice}</span>
        </button>
        <button className="mc-buy no" onClick={e => e.preventDefault()}>
          Buy No <span className="mc-price">₦{noPrice}</span>
        </button>
      </div>

      <style>{`
        .mc-card {
          display: flex; flex-direction: column; gap: 0.9rem;
          padding: 1.25rem; border-radius: var(--radius-lg);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer; position: relative;
        }
        .mc-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }

        .mc-top { display: flex; gap: 0.85rem; align-items: center; }
        .mc-img {
          width: 52px; height: 52px; border-radius: 14px;
          object-fit: cover; border: 1px solid var(--border); flex-shrink: 0;
        }
        .mc-meta-col { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
        .mc-tags { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
        .mc-cat {
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase;
          color: var(--primary-light); background: rgba(0,135,81,0.08);
          padding: 0.15rem 0.5rem; border-radius: 6px; letter-spacing: 0.04em;
        }
        .mc-live {
          display: flex; align-items: center; gap: 0.3rem;
          font-size: 0.6rem; font-weight: 700; color: var(--accent-yes);
          text-transform: uppercase;
        }
        .mc-end { font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.35rem; }

        .mc-question {
          font-size: 1rem; line-height: 1.4; font-weight: 700;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
          color: var(--text); min-height: 2.8em;
        }

        /* Polling bar */
        .mc-poll { display: flex; flex-direction: column; gap: 0.35rem; }
        .poll-labels { display: flex; justify-content: space-between; }
        .poll-yes { font-size: 0.75rem; font-weight: 800; color: var(--accent-yes); }
        .poll-no { font-size: 0.75rem; font-weight: 800; color: var(--accent-no); }

        /* Stats */
        .mc-stats {
          display: flex; gap: 0.75rem; flex-wrap: wrap;
          padding-top: 0.5rem; border-top: 1px solid var(--border);
        }
        .mc-stat {
          display: flex; align-items: center; gap: 0.3rem;
          font-size: 0.7rem; color: var(--text-muted); font-weight: 600;
        }
        .mc-change {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 0.7rem; font-weight: 700; margin-left: auto;
        }
        .mc-change.up { color: var(--accent-yes); }
        .mc-change.down { color: var(--accent-no); }

        /* Actions */
        .mc-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .mc-buy {
          display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          padding: 0.55rem; border-radius: 10px; border: none;
          font-weight: 700; font-size: 0.8rem; cursor: pointer;
          transition: all 0.2s; font-family: var(--font-main);
        }
        .mc-buy.yes {
          background: rgba(0,200,83,0.08); color: var(--accent-yes);
          border: 1px solid rgba(0,200,83,0.12);
        }
        .mc-buy.yes:hover { background: rgba(0,200,83,0.18); }
        .mc-buy.no {
          background: rgba(255,61,0,0.08); color: var(--accent-no);
          border: 1px solid rgba(255,61,0,0.12);
        }
        .mc-buy.no:hover { background: rgba(255,61,0,0.18); }
        .mc-price { font-weight: 800; }
      `}</style>
    </Link>
  )
}

export default MarketCard
