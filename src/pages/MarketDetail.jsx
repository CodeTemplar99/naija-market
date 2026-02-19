import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MARKETS } from '../data/markets'
import { ChevronLeft, Info, TrendingUp, Users, ShieldCheck, Share2, MessageSquare, Clock, ThumbsUp, ThumbsDown, CheckCircle, X } from 'lucide-react'

const MarketDetail = () => {
  const { id } = useParams()
  const [selectedOutcome, setSelectedOutcome] = useState('Yes')
  const [amount, setAmount] = useState('5000')
  const [activeChartTab, setActiveChartTab] = useState('1W')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const market = MARKETS.find(m => m.id === parseInt(id)) || MARKETS[0]

  const price = selectedOutcome === 'Yes' ? market.yesPrice : market.noPrice
  const shares = (parseFloat(amount || 0) / price).toFixed(2)
  const potentialWin = (shares * 100).toFixed(0)
  const returnPct = price > 0 ? ((100 / price - 1) * 100).toFixed(0) : 0

  const handleTrade = () => setShowConfirm(true)
  const confirmTrade = () => { setShowConfirm(false); setShowSuccess(true); }

  const comments = [
    { user: 'OlaTrader', text: 'CBN has been hawkish lately, I think Yes is underpriced here.', time: '2h ago', likes: 24 },
    { user: 'AbujaWhale', text: 'The inflation data suggests they might hold this time. Careful with Yes.', time: '4h ago', likes: 18 },
    { user: 'NairaHunter', text: 'Volume is picking up fast. Something is happening.', time: '6h ago', likes: 12 },
  ]

  const related = MARKETS.filter(m => m.id !== market.id && m.category === market.category).slice(0, 3)

  return (
    <div className="detail-page animate-slide-up">
      <Link to="/" className="back-link"><ChevronLeft size={18} /> Back to Markets</Link>

      <div className="dt-grid">
        <div className="dt-main">
          {/* Header */}
          <div className="dt-header glass">
            <div className="dt-intro">
              <img src={market.image} alt="" className="dt-img" />
              <div className="dt-titles">
                <div className="dt-tags">
                  <span className="badge badge-green">{market.category}</span>
                  {market.isLive && <span className="dt-live"><span className="live-dot"></span> Trading Live</span>}
                  <span className="dt-end"><Clock size={12} /> Ends {market.endDate}</span>
                </div>
                <h1 className="dt-question">{market.question}</h1>
                <span className="dt-creator">Created by <strong>{market.creator}</strong></span>
              </div>
            </div>
            <div className="dt-stats-row">
              <div className="dt-s"><span className="dt-sv">₦{market.volume}</span><span className="dt-sl">Volume</span></div>
              <div className="dt-s"><span className="dt-sv">{market.traders?.toLocaleString()}</span><span className="dt-sl">Traders</span></div>
              <div className="dt-s"><span className="dt-sv">{market.liquidity}</span><span className="dt-sl">Liquidity</span></div>
              <div className="dt-s"><span className={`dt-sv ${market.change24h >= 0 ? 'green' : 'red'}`}>{market.change24h >= 0 ? '+' : ''}{market.change24h}%</span><span className="dt-sl">24h Change</span></div>
              <button className="share-btn"><Share2 size={16} /></button>
            </div>
          </div>

          {/* Outcome bar */}
          <div className="outcome-bar glass">
            <div className="ob-side yes"><span className="ob-label">Yes</span><span className="ob-pct">{market.yesPrice}%</span></div>
            <div className="poll-bar-track big"><div className="poll-bar-fill yes" style={{ width: `${market.yesPrice}%` }}></div></div>
            <div className="ob-side no"><span className="ob-label">No</span><span className="ob-pct">{market.noPrice}%</span></div>
          </div>

          {/* Chart */}
          <div className="chart-box glass">
            <div className="chart-top">
              <h3>Price History</h3>
              <div className="chart-tabs">
                {['1H', '1D', '1W', '1M', 'All'].map(t => (
                  <button key={t} className={`ct ${activeChartTab === t ? 'active' : ''}`} onClick={() => setActiveChartTab(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="chart-area">
              <svg viewBox="0 0 600 200" className="chart-svg">
                <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent-yes)" stopOpacity="0.3" /><stop offset="100%" stopColor="var(--accent-yes)" stopOpacity="0" /></linearGradient></defs>
                <path d="M0,160 C50,150 100,140 150,120 C200,100 250,110 300,80 C350,50 400,70 450,60 C500,50 550,40 600,30" fill="none" stroke="var(--accent-yes)" strokeWidth="2.5" />
                <path d="M0,160 C50,150 100,140 150,120 C200,100 250,110 300,80 C350,50 400,70 450,60 C500,50 550,40 600,30 L600,200 L0,200 Z" fill="url(#cg)" />
              </svg>
              <div className="chart-price-tag">₦{market.yesPrice}</div>
            </div>
          </div>

          {/* About */}
          <div className="about-box glass">
            <h3>About this Market</h3>
            <p className="about-desc">{market.description}</p>
            <h4>Resolution Rules</h4>
            <ul className="rules">{market.rules.map((r, i) => <li key={i}><ShieldCheck size={15} color="var(--primary-light)" />{r}</li>)}</ul>
          </div>

          {/* Comments */}
          <div className="comments-box glass">
            <div className="cm-header"><MessageSquare size={16} /><h3>Discussion ({market.comments})</h3></div>
            <div className="cm-input-wrap"><input type="text" placeholder="Add a comment..." className="input" /><button className="btn btn-primary btn-sm">Post</button></div>
            <div className="cm-list">
              {comments.map((c, i) => (
                <div key={i} className="cm-item">
                  <div className="cm-avatar">{c.user[0]}</div>
                  <div className="cm-body">
                    <div className="cm-top"><span className="cm-user">{c.user}</span><span className="cm-time">{c.time}</span></div>
                    <p className="cm-text">{c.text}</p>
                    <div className="cm-actions">
                      <button className="cm-action"><ThumbsUp size={13} />{c.likes}</button>
                      <button className="cm-action"><ThumbsDown size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div className="related-box">
              <h3>Related Markets</h3>
              <div className="related-list">
                {related.map(r => (
                  <Link to={`/market/${r.id}`} key={r.id} className="related-card glass">
                    <img src={r.image} alt="" className="rel-img" />
                    <div className="rel-info">
                      <p className="rel-q">{r.question}</p>
                      <div className="rel-prices"><span className="rel-yes">Yes {r.yesPrice}%</span><span className="rel-no">No {r.noPrice}%</span></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="dt-sidebar">
          <div className="trade-card glass">
            <div className="tc-tabs">
              <button className={`tc-tab ${selectedOutcome === 'Yes' ? 'yes active' : ''}`} onClick={() => setSelectedOutcome('Yes')}>Buy Yes</button>
              <button className={`tc-tab ${selectedOutcome === 'No' ? 'no active' : ''}`} onClick={() => setSelectedOutcome('No')}>Buy No</button>
            </div>
            <div className="tc-body">
              <div className="tc-field">
                <label>Amount (₦)</label>
                <div className="tc-input-wrap"><span className="tc-cur">₦</span><input type="number" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                <div className="tc-quick">{[1000, 5000, 10000, 50000].map(v => <button key={v} onClick={() => setAmount(String(v))}>{v >= 1000 ? `${v / 1000}k` : v}</button>)}</div>
              </div>
              <div className="tc-summary">
                <div className="tc-row"><span>Avg Price</span><span>₦{price}</span></div>
                <div className="tc-row"><span>Est. Shares</span><span>{shares}</span></div>
                <div className="tc-row highlight"><span>Potential Return</span><span className="tc-win">₦{Number(potentialWin).toLocaleString()} <small>(+{returnPct}%)</small></span></div>
              </div>
              <button className={`btn w-full ${selectedOutcome === 'Yes' ? 'btn-yes-full' : 'btn-no-full'}`} onClick={handleTrade}>Buy {selectedOutcome}</button>
              <p className="tc-disclaimer"><Info size={11} /> Settled instantly upon resolution.</p>
            </div>
          </div>

          <div className="ob-card glass">
            <h4>Order Book</h4>
            <div className="ob-grid">
              <div className="ob-col"><p className="ob-head yes-c">Bids (Yes)</p><div className="ob-r"><span>₦{market.yesPrice - 0.5}</span><span>2.4M</span></div><div className="ob-r"><span>₦{market.yesPrice - 1}</span><span>800k</span></div><div className="ob-r"><span>₦{market.yesPrice - 2}</span><span>1.5M</span></div></div>
              <div className="ob-col"><p className="ob-head no-c">Asks (No)</p><div className="ob-r"><span>₦{market.noPrice - 0.5}</span><span>1.2M</span></div><div className="ob-r"><span>₦{market.noPrice - 1}</span><span>500k</span></div><div className="ob-r"><span>₦{market.noPrice - 2}</span><span>3.1M</span></div></div>
            </div>
          </div>
        </aside>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>Confirm Trade</h2><button className="modal-close" onClick={() => setShowConfirm(false)}><X size={16} /></button></div>
            <div className="modal-body">
              <div className="conf-market">
                <img src={market.image} alt="" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
                <p style={{ fontWeight: 700, fontSize: '0.9rem', flex: 1 }}>{market.question}</p>
              </div>
              <div className="conf-summary">
                <div className="conf-row"><span>Outcome</span><span className={`fw ${selectedOutcome === 'Yes' ? 'green' : 'red'}`}>{selectedOutcome}</span></div>
                <div className="conf-row"><span>Amount</span><span className="fw">₦{parseFloat(amount).toLocaleString()}</span></div>
                <div className="conf-row"><span>Price</span><span>₦{price}</span></div>
                <div className="conf-row"><span>Est. Shares</span><span>{shares}</span></div>
                <div className="conf-row highlight"><span>Potential Return</span><span className="tc-win">₦{Number(potentialWin).toLocaleString()}</span></div>
              </div>
              <button className={`btn btn-lg w-full ${selectedOutcome === 'Yes' ? 'btn-yes-full' : 'btn-no-full'}`} onClick={confirmTrade}>Confirm Buy {selectedOutcome}</button>
              <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>By confirming, you agree to NaijaPredict's Terms of Use.</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <div className="modal-body" style={{ padding: '2.5rem 1.5rem' }}>
              <div className="success-icon"><CheckCircle size={40} /></div>
              <h2 style={{ marginBottom: '0.5rem' }}>Trade Placed!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your {selectedOutcome} position of ₦{parseFloat(amount).toLocaleString()} has been executed at ₦{price}.</p>
              <div className="conf-summary">
                <div className="conf-row"><span>Shares Received</span><span className="fw">{shares}</span></div>
                <div className="conf-row"><span>Max Payout</span><span className="fw green">₦{Number(potentialWin).toLocaleString()}</span></div>
              </div>
              <Link to="/portfolio" className="btn btn-primary w-full" style={{ marginBottom: '0.5rem' }}>View Portfolio</Link>
              <button className="btn btn-ghost w-full" onClick={() => setShowSuccess(false)}>Place Another Trade</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .detail-page { max-width: 1300px; margin: 0 auto; padding-bottom: 4rem; }
        .back-link { display: flex; align-items: center; gap: 0.4rem; color: var(--text-muted); font-weight: 700; font-size: 0.85rem; margin-bottom: 1.5rem; }
        .back-link:hover { color: var(--primary-light); }
        .dt-grid { display: grid; grid-template-columns: 1fr 360px; gap: 1.5rem; }
        @media (max-width: 1024px) { .dt-grid { grid-template-columns: 1fr; } }

        .dt-header { padding: 2rem; border-radius: var(--radius-xl); margin-bottom: 1.25rem; }
        .dt-intro { display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 2rem; }
        .dt-img { width: 100px; height: 100px; border-radius: 18px; object-fit: cover; border: 1px solid var(--border); flex-shrink: 0; }
        .dt-titles { flex: 1; min-width: 0; }
        .dt-tags { display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; }
        .dt-live { display: flex; align-items: center; gap: 0.35rem; font-size: 0.65rem; font-weight: 700; color: var(--accent-yes); text-transform: uppercase; }
        .dt-end { font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; }
        .dt-question { font-size: 1.75rem; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
        .dt-creator { font-size: 0.8rem; color: var(--text-muted); }
        .dt-creator strong { color: var(--primary-light); }
        .dt-stats-row { display: flex; gap: 2.5rem; border-top: 1px solid var(--border); padding-top: 1.5rem; align-items: center; flex-wrap: wrap; }
        .dt-s { display: flex; flex-direction: column; gap: 0.2rem; }
        .dt-sv { font-size: 1.15rem; font-weight: 800; }
        .dt-sl { font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }
        .share-btn { margin-left: auto; background: var(--surface-light); border: 1px solid var(--border); color: var(--text); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        .outcome-bar { display: flex; gap: 1rem; align-items: center; padding: 1.25rem 1.5rem; border-radius: 16px; margin-bottom: 1.25rem; }
        .ob-side { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; min-width: 50px; }
        .ob-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .ob-side.yes .ob-label, .ob-side.yes .ob-pct { color: var(--accent-yes); }
        .ob-side.no .ob-label, .ob-side.no .ob-pct { color: var(--accent-no); }
        .ob-pct { font-size: 1.25rem; font-weight: 800; }
        .poll-bar-track.big { height: 10px; flex: 1; }

        .chart-box { padding: 1.5rem; border-radius: var(--radius-xl); margin-bottom: 1.25rem; }
        .chart-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .chart-tabs { display: flex; gap: 0.25rem; background: var(--bg); padding: 0.2rem; border-radius: 8px; }
        .ct { background: none; border: none; color: var(--text-muted); padding: 0.3rem 0.75rem; border-radius: 6px; font-weight: 700; font-size: 0.75rem; cursor: pointer; font-family: var(--font-main); }
        .ct.active { background: var(--surface-light); color: var(--text); }
        .chart-area { position: relative; height: 220px; }
        .chart-svg { width: 100%; height: 100%; }
        .chart-price-tag { position: absolute; top: 10px; right: 10px; background: rgba(0,200,83,0.1); border: 1px solid rgba(0,200,83,0.2); color: var(--accent-yes); padding: 0.25rem 0.75rem; border-radius: 8px; font-weight: 800; font-size: 0.85rem; }

        .about-box { padding: 2rem; border-radius: var(--radius-xl); margin-bottom: 1.25rem; }
        .about-box h3 { margin-bottom: 1rem; }
        .about-box h4 { margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 0.95rem; }
        .about-desc { color: var(--text-muted); line-height: 1.7; }
        .rules { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .rules li { display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted); font-size: 0.9rem; }

        .comments-box { padding: 1.5rem; border-radius: var(--radius-xl); margin-bottom: 1.25rem; }
        .cm-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.25rem; }
        .cm-header h3 { font-size: 1rem; }
        .cm-input-wrap { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; }
        .cm-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .cm-item { display: flex; gap: 0.75rem; }
        .cm-avatar { width: 32px; height: 32px; background: var(--surface-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; flex-shrink: 0; border: 1px solid var(--border); }
        .cm-body { flex: 1; min-width: 0; }
        .cm-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.3rem; }
        .cm-user { font-weight: 700; font-size: 0.85rem; }
        .cm-time { font-size: 0.7rem; color: var(--text-muted); }
        .cm-text { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.5rem; }
        .cm-actions { display: flex; gap: 0.75rem; }
        .cm-action { background: none; border: none; color: var(--text-muted); font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 0.3rem; font-weight: 600; font-family: var(--font-main); }

        .related-box { margin-bottom: 2rem; }
        .related-box h3 { margin-bottom: 1.25rem; }
        .related-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
        .related-card { display: flex; gap: 0.75rem; padding: 1rem; border-radius: 16px; transition: transform 0.2s; }
        .related-card:hover { transform: translateY(-2px); }
        .rel-img { width: 48px; height: 48px; border-radius: 12px; object-fit: cover; flex-shrink: 0; }
        .rel-info { flex: 1; min-width: 0; }
        .rel-q { font-size: 0.85rem; font-weight: 600; line-height: 1.3; margin-bottom: 0.4rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .rel-prices { display: flex; gap: 0.75rem; font-size: 0.75rem; font-weight: 700; }
        .rel-yes { color: var(--accent-yes); }
        .rel-no { color: var(--accent-no); }

        .dt-sidebar { display: flex; flex-direction: column; gap: 1.25rem; }
        .trade-card { border-radius: var(--radius-xl); overflow: hidden; position: sticky; top: 5rem; }
        .tc-tabs { display: grid; grid-template-columns: 1fr 1fr; }
        .tc-tab { padding: 1rem; border: none; font-weight: 800; font-size: 0.95rem; cursor: pointer; transition: all 0.15s; background: var(--surface-light); color: var(--text-muted); font-family: var(--font-main); }
        .tc-tab.yes.active { background: var(--accent-yes); color: white; }
        .tc-tab.no.active { background: var(--accent-no); color: white; }
        .tc-body { padding: 1.5rem; }
        .tc-field label { display: block; font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem; }
        .tc-input-wrap { display: flex; align-items: center; background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 0 1rem; margin-bottom: 0.75rem; }
        .tc-input-wrap input { background: none; border: none; color: var(--text); padding: 0.85rem 0; width: 100%; font-size: 1.35rem; font-weight: 800; outline: none; font-family: var(--font-main); }
        .tc-cur { font-weight: 800; color: var(--text-muted); font-size: 1.1rem; }
        .tc-quick { display: flex; gap: 0.4rem; margin-bottom: 1.5rem; }
        .tc-quick button { flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: 0.4rem; border-radius: 8px; font-weight: 700; font-size: 0.75rem; cursor: pointer; font-family: var(--font-main); }
        .tc-summary { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem; }
        .tc-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
        .tc-row.highlight { color: var(--text); border-top: 1px solid var(--border); padding-top: 0.75rem; margin-top: 0.25rem; }
        .tc-win { color: var(--accent-yes); font-weight: 800; }
        .tc-win small { opacity: 0.7; }
        .btn-yes-full { background: var(--accent-yes); color: white; font-weight: 800; }
        .btn-yes-full:hover { background: #00E676; }
        .btn-no-full { background: var(--accent-no); color: white; font-weight: 800; }
        .btn-no-full:hover { background: #FF5722; }
        .tc-disclaimer { margin-top: 1rem; font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem; justify-content: center; }

        .ob-card { padding: 1.25rem; border-radius: var(--radius-lg); }
        .ob-card h4 { font-size: 0.9rem; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border); }
        .ob-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .ob-col { display: flex; flex-direction: column; gap: 0.4rem; }
        .ob-head { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.3rem; }
        .yes-c { color: var(--accent-yes); }
        .no-c { color: var(--accent-no); }
        .ob-r { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

        /* Modals */
        .conf-market { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border); }
        .conf-summary { margin-bottom: 1.5rem; }
        .conf-row { display: flex; justify-content: space-between; padding: 0.65rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
        .conf-row:last-child { border-bottom: none; }
        .conf-row.highlight { font-weight: 700; }
        .success-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(0,200,83,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--accent-yes); }
      `}</style>
    </div>
  )
}

export default MarketDetail
