import React from 'react'
import { PieChart, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const Portfolio = () => {
  const holdings = [
    {
      id: 1,
      market: "Will the CBN increase the interest rate...?",
      outcome: "Yes",
      price: 55,
      currentPrice: 65,
      shares: 1000,
      value: 65000,
      pnl: 10000,
      pnlPercent: 18.2
    },
    {
      id: 2,
      market: "Will Nigeria win the 2026 World Cup Qualifiers...?",
      outcome: "No",
      price: 25,
      currentPrice: 18,
      shares: 500,
      value: 9000,
      pnl: 3500,
      pnlPercent: 14.0
    }
  ]

  return (
    <div className="portfolio-page animate-slide-up">
      <header className="page-header">
        <h1>My <span className="grad-text">Portfolio</span></h1>
        <p>Manage your active trades and track your performance.</p>
      </header>

      <div className="stats-row">
        <div className="stat-card glass">
          <span className="s-label">Total Value</span>
          <span className="s-val">₦321,200.00</span>
          <span className="s-change green"><ArrowUpRight size={14} /> +4.2%</span>
        </div>
        <div className="stat-card glass">
          <span className="s-label">Active Markets</span>
          <span className="s-val">4</span>
        </div>
        <div className="stat-card glass">
          <span className="s-label">Win Rate</span>
          <span className="s-val">68%</span>
        </div>
      </div>

      <div className="holdings-section">
        <div className="section-title">
          <PieChart size={20} />
          <h2>Current Holdings</h2>
        </div>

        <div className="holdings-table glass">
          <div className="table-header">
            <span>Market</span>
            <span>Outcome</span>
            <span>Avg Price</span>
            <span>Current</span>
            <span>Value</span>
            <span>P&L</span>
          </div>
          {holdings.map(pos => (
            <div key={pos.id} className="table-row">
              <span className="pos-market">{pos.market}</span>
              <span className={`pos-outcome ${pos.outcome.toLowerCase()}`}>{pos.outcome}</span>
              <span>₦{pos.price}</span>
              <span>₦{pos.currentPrice}</span>
              <span className="pos-value">₦{pos.value.toLocaleString()}</span>
              <span className={`pos-pnl ${pos.pnl >= 0 ? 'green' : 'red'}`}>
                {pos.pnl >= 0 ? '+' : ''}₦{pos.pnl.toLocaleString()}
                ({pos.pnlPercent}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-page { max-width: 1200px; margin: 0 auto; }
        .page-header { margin-bottom: 3rem; }
        .page-header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .page-header p { color: var(--text-muted); }

        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
        .stat-card { padding: 2rem; border-radius: 24px; display: flex; flex-direction: column; gap: 0.5rem; }
        .s-label { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .s-val { font-size: 2rem; font-weight: 800; }
        .s-change { font-size: 0.9rem; font-weight: 700; display: flex; align-items: center; gap: 0.4rem; }
        .s-change.green { color: var(--accent-yes); }

        .holdings-section { margin-bottom: 4rem; }
        .section-title { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .section-title h2 { font-size: 1.25rem; }

        .holdings-table { border-radius: 24px; overflow: hidden; }
        .table-header { padding: 1.25rem 2rem; background: rgba(255, 255, 255, 0.03); border-bottom: 1px solid var(--border); display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .table-row { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr; align-items: center; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .table-row:hover { background: rgba(255, 255, 255, 0.02); }
        .table-row:last-child { border-bottom: none; }

        .pos-market { color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 1rem; }
        .pos-outcome { font-weight: 800; font-size: 0.75rem; padding: 0.25rem 0.75rem; border-radius: 100px; width: fit-content; }
        .pos-outcome.yes { background: rgba(0, 200, 83, 0.1); color: var(--accent-yes); }
        .pos-outcome.no { background: rgba(255, 61, 0, 0.1); color: var(--accent-no); }
        
        .pos-value { color: var(--text); font-weight: 800; }
        .green { color: var(--accent-yes); }
        .red { color: var(--accent-no); }
      `}</style>
    </div>
  )
}

export default Portfolio
