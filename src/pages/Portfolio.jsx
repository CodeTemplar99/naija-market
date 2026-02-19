import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MARKETS } from '../data/markets'
import { PieChart, ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, History, ExternalLink } from 'lucide-react'

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('positions')

  const positions = [
    { marketId: 1, outcome: 'Yes', buyPrice: 55, shares: 909, currentPrice: 65 },
    { marketId: 2, outcome: 'No', buyPrice: 25, shares: 400, currentPrice: 18 },
    { marketId: 7, outcome: 'Yes', buyPrice: 50, shares: 600, currentPrice: 58 },
    { marketId: 9, outcome: 'Yes', buyPrice: 60, shares: 333, currentPrice: 72 },
  ]

  const history = [
    { market: "Will Ethereum flip Bitcoin...?", outcome: "No", result: "Won", amount: "₦85,000", pnl: "+₦42,500", date: "Jan 15, 2026" },
    { market: "Will crude oil exceed $100/barrel...?", outcome: "Yes", result: "Lost", amount: "₦30,000", pnl: "-₦30,000", date: "Dec 28, 2025" },
    { market: "Will Burna Boy win a Grammy...?", outcome: "No", result: "Won", amount: "₦50,000", pnl: "+₦28,000", date: "Feb 11, 2026" },
  ]

  const enriched = positions.map(p => {
    const m = MARKETS.find(mk => mk.id === p.marketId)
    const value = p.shares * p.currentPrice
    const cost = p.shares * p.buyPrice
    const pnl = value - cost
    const pnlPct = ((pnl / cost) * 100).toFixed(1)
    return { ...p, market: m, value, cost, pnl, pnlPct }
  })

  const totalValue = enriched.reduce((a, b) => a + b.value, 0)
  const totalPnl = enriched.reduce((a, b) => a + b.pnl, 0)
  const totalPnlPct = ((totalPnl / enriched.reduce((a, b) => a + b.cost, 0)) * 100).toFixed(1)

  return (
    <div className="port-page animate-slide-up">
      <h1 className="port-title">Portfolio</h1>

      {/* Stat cards */}
      <div className="port-stats">
        <div className="ps-card glass">
          <div className="ps-icon-wrap"><Wallet size={18} /></div>
          <div className="ps-info">
            <span className="ps-label">Portfolio Value</span>
            <span className="ps-val">₦{totalValue.toLocaleString()}</span>
            <span className={`ps-change ${totalPnl >= 0 ? 'up' : 'down'}`}>
              {totalPnl >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {totalPnl >= 0 ? '+' : ''}₦{totalPnl.toLocaleString()} ({totalPnlPct}%)
            </span>
          </div>
        </div>
        <div className="ps-card glass">
          <div className="ps-icon-wrap blue"><PieChart size={18} /></div>
          <div className="ps-info">
            <span className="ps-label">Active Positions</span>
            <span className="ps-val">{positions.length}</span>
          </div>
        </div>
        <div className="ps-card glass">
          <div className="ps-icon-wrap green"><TrendingUp size={18} /></div>
          <div className="ps-info">
            <span className="ps-label">Win Rate</span>
            <span className="ps-val">67%</span>
          </div>
        </div>
        <div className="ps-card glass">
          <div className="ps-icon-wrap yellow"><History size={18} /></div>
          <div className="ps-info">
            <span className="ps-label">Total Trades</span>
            <span className="ps-val">23</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="port-tabs">
        <button className={`pt-btn ${activeTab === 'positions' ? 'active' : ''}`} onClick={() => setActiveTab('positions')}>Open Positions</button>
        <button className={`pt-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Trade History</button>
      </div>

      {/* Positions table */}
      {activeTab === 'positions' && (
        <div className="port-table glass">
          <div className="pt-header">
            <span className="pt-c wide">Market</span>
            <span className="pt-c">Outcome</span>
            <span className="pt-c">Avg Price</span>
            <span className="pt-c">Current</span>
            <span className="pt-c">Value</span>
            <span className="pt-c">P&L</span>
            <span className="pt-c"></span>
          </div>
          {enriched.map((p, i) => (
            <Link to={`/market/${p.marketId}`} key={i} className="pt-row">
              <span className="pt-c wide">
                <img src={p.market?.image} alt="" className="pt-img" />
                <span className="pt-market-name">{p.market?.question}</span>
              </span>
              <span className="pt-c">
                <span className={`outcome-pill ${p.outcome.toLowerCase()}`}>{p.outcome}</span>
              </span>
              <span className="pt-c">₦{p.buyPrice}</span>
              <span className="pt-c">₦{p.currentPrice}</span>
              <span className="pt-c fw">₦{p.value.toLocaleString()}</span>
              <span className={`pt-c fw ${p.pnl >= 0 ? 'green' : 'red'}`}>
                {p.pnl >= 0 ? '+' : ''}₦{p.pnl.toLocaleString()} ({p.pnlPct}%)
              </span>
              <span className="pt-c"><ExternalLink size={14} /></span>
            </Link>
          ))}
        </div>
      )}

      {/* History table */}
      {activeTab === 'history' && (
        <div className="port-table glass">
          <div className="pt-header">
            <span className="pt-c wide">Market</span>
            <span className="pt-c">Outcome</span>
            <span className="pt-c">Result</span>
            <span className="pt-c">Amount</span>
            <span className="pt-c">P&L</span>
            <span className="pt-c">Date</span>
          </div>
          {history.map((h, i) => (
            <div key={i} className="pt-row">
              <span className="pt-c wide pt-market-name">{h.market}</span>
              <span className="pt-c"><span className={`outcome-pill ${h.outcome.toLowerCase()}`}>{h.outcome}</span></span>
              <span className={`pt-c fw ${h.result === 'Won' ? 'green' : 'red'}`}>{h.result}</span>
              <span className="pt-c">{h.amount}</span>
              <span className={`pt-c fw ${h.pnl.startsWith('+') ? 'green' : 'red'}`}>{h.pnl}</span>
              <span className="pt-c muted">{h.date}</span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .port-page { max-width: 1200px; margin: 0 auto; }
        .port-title { font-size: 2rem; margin-bottom: 2rem; }

        .port-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2.5rem; }
        .ps-card { padding: 1.5rem; border-radius: var(--radius-lg); display: flex; align-items: center; gap: 1rem; }
        .ps-icon-wrap { width: 40px; height: 40px; border-radius: 12px; background: rgba(0,135,81,0.1); display: flex; align-items: center; justify-content: center; color: var(--primary-light); flex-shrink: 0; }
        .ps-icon-wrap.blue { background: rgba(64,150,255,0.1); color: #4096ff; }
        .ps-icon-wrap.green { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .ps-icon-wrap.yellow { background: rgba(255,214,0,0.1); color: var(--accent-yellow); }
        .ps-info { display: flex; flex-direction: column; gap: 0.15rem; }
        .ps-label { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
        .ps-val { font-size: 1.5rem; font-weight: 800; font-family: var(--font-display); }
        .ps-change { display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 700; }
        .ps-change.up { color: var(--accent-yes); }
        .ps-change.down { color: var(--accent-no); }

        .port-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .pt-btn { background: none; border: 1px solid var(--border); color: var(--text-muted); padding: 0.5rem 1.25rem; border-radius: 10px; font-weight: 700; font-size: 0.85rem; cursor: pointer; font-family: var(--font-main); }
        .pt-btn.active { background: var(--primary); border-color: var(--primary); color: white; }

        .port-table { border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 3rem; }
        .pt-header { display: grid; grid-template-columns: 2.5fr 0.8fr 0.8fr 0.8fr 1fr 1.2fr 0.4fr; padding: 1rem 1.5rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border); font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .pt-row { display: grid; grid-template-columns: 2.5fr 0.8fr 0.8fr 0.8fr 1fr 1.2fr 0.4fr; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); align-items: center; font-size: 0.9rem; font-weight: 600; transition: background 0.15s; cursor: pointer; color: var(--text); }
        .pt-row:hover { background: rgba(255,255,255,0.02); }
        .pt-row:last-child { border-bottom: none; }
        .pt-c { display: flex; align-items: center; gap: 0.5rem; min-width: 0; }
        .pt-c.wide { overflow: hidden; }
        .pt-img { width: 32px; height: 32px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
        .pt-market-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .outcome-pill { font-size: 0.7rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 100px; text-transform: uppercase; }
        .outcome-pill.yes { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .outcome-pill.no { background: rgba(255,61,0,0.1); color: var(--accent-no); }
        .fw { font-weight: 800; }
        .green { color: var(--accent-yes); }
        .red { color: var(--accent-no); }
        .muted { color: var(--text-muted); }

        @media (max-width: 768px) {
          .pt-header, .pt-row { grid-template-columns: 2fr 1fr 1fr; }
          .pt-header span:nth-child(3), .pt-header span:nth-child(4), .pt-header span:nth-child(7),
          .pt-row span:nth-child(3), .pt-row span:nth-child(4), .pt-row span:nth-child(7) { display: none; }
        }
      `}</style>
    </div>
  )
}

export default Portfolio
