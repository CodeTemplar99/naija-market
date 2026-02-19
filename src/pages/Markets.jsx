import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import MarketCard from '../components/MarketCard'
import { MARKETS, CATEGORIES } from '../data/markets'
import { Flame, Clock, TrendingUp, Zap } from 'lucide-react'

const Markets = () => {
  const { category } = useParams()
  const [activeTab, setActiveTab] = useState(category || 'Breaking')

  // Special tabs for the top
  const allTabs = CATEGORIES

  // Tab icons
  const tabIcon = (tab) => {
    if (tab === 'Breaking') return <Flame size={14} />
    if (tab === 'New') return <Clock size={14} />
    return null
  }

  // Filter markets based on tab
  const filteredMarkets = (() => {
    if (activeTab === 'Breaking') return MARKETS.filter(m => m.isFeatured || m.isLive)
    if (activeTab === 'New') return [...MARKETS].reverse().slice(0, 8)
    if (activeTab === 'More') return MARKETS
    if (activeTab === 'Mentions') return MARKETS.filter(m => m.category === 'Mentions')
    if (activeTab === 'Climate & Science') return MARKETS.filter(m => m.category === 'Climate & Science')
    return MARKETS.filter(m => m.category.toLowerCase() === activeTab.toLowerCase())
  })()

  // If navigated via sidebar category route, override tab
  React.useEffect(() => {
    if (category)
    {
      const cat = category.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())
      const match = allTabs.find(t => t.toLowerCase() === cat.toLowerCase())
      if (match) setActiveTab(match)
      else
      {
        // Try partial match
        const partial = allTabs.find(t => t.toLowerCase().startsWith(category.toLowerCase()))
        if (partial) setActiveTab(partial)
      }
    }
  }, [category])

  // Trending sidebar data
  const trending = MARKETS
    .filter(m => m.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 5)

  return (
    <div className="markets-page">
      {/* Hero banner */}
      <div className="hero-banner animate-slide-up">
        <div className="hero-left">
          <div className="hero-pill">
            <Zap size={14} />
            <span>Nigeria's Prediction Market</span>
          </div>
          <h1 className="hero-title">Predict.<br /><span className="grad-text">Trade. Win.</span></h1>
          <p className="hero-desc">Trade on the outcomes of real-world events in Nigeria and beyond. Politics, sports, crypto — if it can happen, you can trade on it.</p>
        </div>
        <div className="hero-stats">
          <div className="hs-item">
            <span className="hs-val">₦485M+</span>
            <span className="hs-label">Total Volume</span>
          </div>
          <div className="hs-item">
            <span className="hs-val">68K+</span>
            <span className="hs-label">Active Traders</span>
          </div>
          <div className="hs-item">
            <span className="hs-val">{MARKETS.length}</span>
            <span className="hs-label">Live Markets</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-bar glass animate-slide-up">
        <div className="tabs-scroll">
          {allTabs.map(tab => (
            <button
              key={tab}
              className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tabIcon(tab)}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="markets-layout">
        <div className="markets-main">
          {filteredMarkets.length === 0 ? (
            <div className="empty-state glass">
              <p>No markets found for "{activeTab}". Check back soon or explore other categories.</p>
            </div>
          ) : (
            <div className="markets-grid stagger">
              {filteredMarkets.map(m => (
                <MarketCard key={m.id} market={m} />
              ))}
            </div>
          )}
        </div>

        {/* Trending sidebar */}
        <aside className="trending-sidebar animate-slide-up">
          <div className="ts-card glass">
            <div className="ts-header">
              <TrendingUp size={16} />
              <h3>Trending Today</h3>
            </div>
            <div className="ts-list">
              {trending.map((m, i) => (
                <a href={`/market/${m.id}`} key={m.id} className="ts-item">
                  <span className="ts-rank">{i + 1}</span>
                  <img src={m.image} alt="" className="ts-img" />
                  <div className="ts-info">
                    <p className="ts-q">{m.question}</p>
                    <span className="ts-change up">+{m.change24h}%</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="ts-card glass">
            <div className="ts-header">
              <Flame size={16} color="var(--accent-yellow)" />
              <h3>Live Now</h3>
            </div>
            <div className="ts-list">
              {MARKETS.filter(m => m.isLive).slice(0, 4).map(m => (
                <a href={`/market/${m.id}`} key={m.id} className="ts-item">
                  <span className="live-dot"></span>
                  <div className="ts-info">
                    <p className="ts-q">{m.question}</p>
                    <span className="ts-vol">₦{m.volume} vol</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .markets-page { max-width: 1400px; margin: 0 auto; }

        /* Hero */
        .hero-banner {
          display: flex; justify-content: space-between; align-items: center;
          padding: 2.5rem 0; margin-bottom: 1.5rem; gap: 3rem;
        }
        .hero-left { max-width: 550px; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(0,135,81,0.08); border: 1px solid rgba(0,135,81,0.15);
          padding: 0.35rem 1rem; border-radius: 100px;
          font-size: 0.75rem; font-weight: 700; color: var(--primary-light);
          margin-bottom: 1.5rem;
        }
        .hero-title { font-size: 3.5rem; line-height: 1.05; margin-bottom: 1.25rem; letter-spacing: -0.03em; }
        .hero-desc { color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; max-width: 480px; }
        .hero-stats {
          display: flex; gap: 2.5rem;
          background: var(--surface); border: 1px solid var(--border);
          padding: 2rem 2.5rem; border-radius: var(--radius-xl);
        }
        .hs-item { display: flex; flex-direction: column; gap: 0.25rem; text-align: center; }
        .hs-val { font-size: 1.75rem; font-weight: 800; font-family: var(--font-display); }
        .hs-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }

        /* Tabs */
        .tabs-bar {
          border-radius: 16px; padding: 0.5rem;
          margin-bottom: 2rem; position: sticky; top: 4.5rem; z-index: 50;
        }
        .tab-pill {
          background: none; border: none; color: var(--text-muted);
          padding: 0.5rem 1rem; border-radius: 10px;
          font-weight: 700; font-size: 0.85rem; cursor: pointer;
          display: flex; align-items: center; gap: 0.45rem;
          transition: all 0.15s; white-space: nowrap; flex-shrink: 0;
        }
        .tab-pill:hover { color: var(--text); background: rgba(255,255,255,0.03); }
        .tab-pill.active { background: var(--primary); color: white; }

        /* Layout */
        .markets-layout { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; }
        @media (max-width: 1200px) { .markets-layout { grid-template-columns: 1fr; } .trending-sidebar { display: none; } }

        .markets-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 1.25rem; margin-bottom: 4rem;
        }

        .empty-state { padding: 3rem 2rem; border-radius: var(--radius-xl); text-align: center; color: var(--text-muted); }

        /* Trending sidebar */
        .trending-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        .ts-card { padding: 1.25rem; border-radius: var(--radius-lg); }
        .ts-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.25rem; }
        .ts-header h3 { font-size: 0.95rem; }
        .ts-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .ts-item {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 0.5rem; border-radius: 10px; transition: background 0.15s;
        }
        .ts-item:hover { background: rgba(255,255,255,0.03); }
        .ts-rank { font-weight: 800; font-size: 0.75rem; color: var(--text-muted); min-width: 18px; }
        .ts-img { width: 32px; height: 32px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
        .ts-info { flex: 1; min-width: 0; }
        .ts-q {
          font-size: 0.8rem; font-weight: 600; line-height: 1.3;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .ts-change { font-size: 0.7rem; font-weight: 700; }
        .ts-change.up { color: var(--accent-yes); }
        .ts-vol { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }

        @media (max-width: 768px) {
          .hero-banner { flex-direction: column; text-align: center; }
          .hero-title { font-size: 2.5rem; }
          .hero-stats { gap: 1.5rem; padding: 1.5rem; }
        }
      `}</style>
    </div>
  )
}

export default Markets
