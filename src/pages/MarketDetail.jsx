import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Info, TrendingUp, Users, ShieldCheck, Share2 } from 'lucide-react'

const MarketDetail = () => {
  const { id } = useParams()
  const [selectedOutcome, setSelectedOutcome] = useState('Yes')
  const [amount, setAmount] = useState('1000')

  // Mock data for the specific market
  const market = {
    id: 1,
    question: "Will the CBN increase the interest rate in the next MPF meeting?",
    category: "Economy",
    description: "This market resolves to 'Yes' if the Central Bank of Nigeria (CBN) announces an increase in the Monetary Policy Rate (MPR) during the next Monetary Policy Committee (MPC) meeting scheduled for March 2026. Otherwise, it resolves to 'No'.",
    volume: "42.5M",
    liquidity: "12k",
    yesPrice: 65,
    noPrice: 35,
    image: "https://images.unsplash.com/photo-1621213327685-612668e1a107?auto=format&fit=crop&w=1200&q=80",
    endDate: "Mar 15, 2026",
    rules: [
      "Resolves based on official CBN press release.",
      "Meeting must occur before the end of Q1 2026.",
      "Any delay beyond Mar 31 results in a void market."
    ]
  }

  const potentialWin = (parseFloat(amount) / (selectedOutcome === 'Yes' ? market.yesPrice : market.noPrice) * 100).toFixed(2)

  return (
    <div className="detail-page animate-slide-up">
      <div className="breadcrumb">
        <Link to="/" className="back-link"><ChevronLeft size={18} /> Back to Markets</Link>
      </div>

      <div className="detail-grid">
        <div className="main-col">
          <div className="market-header-box glass">
            <div className="market-intro">
              <div className="market-img-wrap">
                <img src={market.image} alt="" />
              </div>
              <div className="market-titles">
                <div className="market-tags">
                  <span className="badge badge-green">{market.category}</span>
                  <span className="date-tag">Ends {market.endDate}</span>
                </div>
                <h1 className="detail-question">{market.question}</h1>
              </div>
            </div>

            <div className="header-stats">
              <div className="h-stat">
                <span className="h-val">₦{market.volume}</span>
                <span className="h-label">Volume</span>
              </div>
              <div className="h-stat">
                <span className="h-val">{market.liquidity}</span>
                <span className="h-label">Participants</span>
              </div>
              <div className="h-stat">
                <span className="h-val">98%</span>
                <span className="h-label">Credibility</span>
              </div>
              <button className="share-btn"><Share2 size={18} /></button>
            </div>
          </div>

          <div className="chart-placeholder glass">
            <div className="chart-header">
              <h3>Price History (₦)</h3>
              <div className="chart-tabs">
                <button className="c-tab active">1D</button>
                <button className="c-tab">1W</button>
                <button className="c-tab">1M</button>
                <button className="c-tab">All</button>
              </div>
            </div>
            <div className="simulated-chart">
              <div className="line"></div>
              <div className="points-overlay"></div>
              <div className="current-price-line" style={{ top: '35%' }}></div>
            </div>
          </div>

          <div className="market-info glass">
            <h3>About this Market</h3>
            <p>{market.description}</p>

            <div className="info-section">
              <h4>Resolutions Rules</h4>
              <ul className="rules-list">
                {market.rules.map((rule, i) => (
                  <li key={i}><ShieldCheck size={16} color="var(--primary-light)" /> {rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="trade-sidebar">
          <div className="trade-card glass">
            <div className="trade-tabs">
              <button
                className={`trade-tab yes ${selectedOutcome === 'Yes' ? 'active' : ''}`}
                onClick={() => setSelectedOutcome('Yes')}
              >
                Yes ₦{market.yesPrice}
              </button>
              <button
                className={`trade-tab no ${selectedOutcome === 'No' ? 'active' : ''}`}
                onClick={() => setSelectedOutcome('No')}
              >
                No ₦{market.noPrice}
              </button>
            </div>

            <div className="trade-body">
              <div className="input-group">
                <label>Amount to Trade (₦)</label>
                <div className="price-input-wrap">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <span className="currency-suffix">₦</span>
                </div>
                <div className="quick-amounts">
                  <button onClick={() => setAmount('5000')}>+5k</button>
                  <button onClick={() => setAmount('10000')}>+10k</button>
                  <button onClick={() => setAmount('50000')}>+50k</button>
                </div>
              </div>

              <div className="trade-summary">
                <div className="s-row">
                  <span>Avg Price</span>
                  <span>₦{selectedOutcome === 'Yes' ? market.yesPrice : market.noPrice}</span>
                </div>
                <div className="s-row">
                  <span>Shares</span>
                  <span>{(parseFloat(amount) / (selectedOutcome === 'Yes' ? market.yesPrice : market.noPrice)).toFixed(2)}</span>
                </div>
                <div className="s-row highlighted">
                  <span>Potential Return</span>
                  <span className="win-val">₦{potentialWin} (+{(potentialWin / amount * 100 - 100).toFixed(0)}%)</span>
                </div>
              </div>

              <button className={`btn w-full ${selectedOutcome === 'Yes' ? 'btn-primary' : 'btn-no-prime'}`}>
                Trade {selectedOutcome}
              </button>

              <p className="leverage-info"><Info size={12} /> Trades are settled instantly upon market resolution.</p>
            </div>
          </div>

          <div className="order-book glass">
            <h3>Order Book</h3>
            <div className="book-grid">
              <div className="book-side">
                <p className="side-label green">Available Yes</p>
                <div className="book-row"><span>₦65.1</span><span>2.4M</span></div>
                <div className="book-row"><span>₦65.5</span><span>800k</span></div>
                <div className="book-row"><span>₦66.0</span><span>1.5M</span></div>
              </div>
              <div className="book-side">
                <p className="side-label red">Available No</p>
                <div className="book-row"><span>₦34.9</span><span>1.2M</span></div>
                <div className="book-row"><span>₦34.5</span><span>500k</span></div>
                <div className="book-row"><span>₦34.0</span><span>3.1M</span></div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .detail-page { max-width: 1300px; margin: 0 auto; padding-bottom: 5rem; }
        
        .breadcrumb { margin-bottom: 2rem; }
        
        .back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-weight: 700;
          font-size: 0.9rem;
        }
        
        .back-link:hover { color: var(--primary-light); }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .detail-grid { grid-template-columns: 1fr; }
        }

        .market-header-box { padding: 2.5rem; border-radius: 24px; margin-bottom: 2rem; }

        .market-intro { display: flex; gap: 2rem; align-items: flex-start; margin-bottom: 2.5rem; }

        .market-img-wrap {
          width: 120px;
          height: 120px;
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--border);
        }

        .market-img-wrap img { width: 100%; height: 100%; object-fit: cover; }

        .market-titles { flex: 1; }

        .market-tags { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; }

        .date-tag { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }

        .detail-question { font-size: 2.25rem; line-height: 1.2; letter-spacing: -0.02em; }

        .header-stats {
          display: flex;
          gap: 3rem;
          border-top: 1px solid var(--border);
          padding-top: 2rem;
          align-items: center;
        }

        .h-stat { display: flex; flex-direction: column; gap: 0.25rem; }
        .h-val { font-size: 1.25rem; font-weight: 700; color: var(--text); }
        .h-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; }

        .share-btn {
          margin-left: auto;
          background: var(--surface-light);
          border: 1px solid var(--border);
          color: var(--text);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* Chart */
        .chart-placeholder { padding: 2rem; border-radius: 24px; margin-bottom: 2rem; }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .chart-tabs { display: flex; gap: 0.5rem; background: var(--bg); padding: 0.3rem; border-radius: 10px; }
        .c-tab {
          background: none; border: none; color: var(--text-muted);
          padding: 0.4rem 1rem; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer;
        }
        .c-tab.active { background: var(--surface-light); color: var(--text); }

        .simulated-chart {
          height: 300px;
          width: 100%;
          position: relative;
          background: linear-gradient(to top, rgba(0,135,81,0.05) 0%, transparent 100%);
          border-bottom: 2px solid var(--border);
        }

        .line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: var(--primary-light);
          top: 65%;
          box-shadow: 0 0 20px rgba(0,168,107,0.5);
        }

        /* Betting interface */
        .trade-sidebar { display: flex; flex-direction: column; gap: 2rem; }
        .trade-card { border-radius: 24px; overflow: hidden; position: sticky; top: 100px; }
        .trade-tabs { display: grid; grid-template-columns: 1fr 1fr; }
        .trade-tab {
           padding: 1.25rem; border: none; font-weight: 800; font-size: 1rem; cursor: pointer; transition: all 0.2s;
           background: var(--surface-light); color: var(--text-muted);
        }
        .trade-tab.yes.active { background: var(--accent-yes); color: white; }
        .trade-tab.no.active { background: var(--accent-no); color: white; }

        .trade-body { padding: 2rem; }

        .input-group label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.75rem; text-transform: uppercase; }

        .price-input-wrap {
          display: flex; align-items: center; background: var(--bg); border: 1px solid var(--border);
          border-radius: 12px; padding: 0 1rem; margin-bottom: 1rem;
        }

        .price-input-wrap input {
          background: none; border: none; color: var(--text); padding: 1rem 0; width: 100%;
          font-size: 1.5rem; font-weight: 800; outline: none;
        }

        .currency-suffix { font-weight: 800; color: var(--text-muted); font-size: 1.25rem; }

        .quick-amounts { display: flex; gap: 0.5rem; margin-bottom: 2rem; }
        .quick-amounts button {
          flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--text);
          padding: 0.5rem; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer;
        }

        .trade-summary { margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .s-row { display: flex; justify-content: space-between; color: var(--text-muted); font-weight: 600; font-size: 0.9rem; }
        .s-row.highlighted { color: var(--text); border-top: 1px solid var(--border); padding-top: 1rem; }
        .win-val { color: var(--accent-yes); font-weight: 800; }

        .btn-no-prime { background: var(--accent-no); color: white; }
        .w-full { width: 100%; }

        .leverage-info { margin-top: 1.25rem; font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; text-align: center; justify-content: center; }

        /* Market Info */
        .market-info { padding: 2.5rem; border-radius: 24px; }
        .market-info h3 { margin-bottom: 1.5rem; }
        .market-info p { line-height: 1.8; color: var(--text-muted); margin-bottom: 2.5rem; }
        .rules-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .rules-list li { display: flex; align-items: center; gap: 1rem; color: var(--text-muted); font-size: 0.95rem; }

        /* Order Book */
        .order-book { padding: 1.5rem; border-radius: 20px; }
        .order-book h3 { font-size: 1rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
        .book-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .side-label { font-size: 0.7rem; font-weight: 800; margin-bottom: 0.75rem; text-transform: uppercase; }
        .side-label.green { color: var(--accent-yes); }
        .side-label.red { color: var(--accent-no); }
        .book-row { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-muted); }
      `}</style>
    </div>
  )
}

export default MarketDetail
