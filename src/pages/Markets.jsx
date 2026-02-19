import React, { useState } from 'react'
import MarketCard from '../components/MarketCard'
import { Search, Filter, TrendingUp, Clock, Award } from 'lucide-react'

const Markets = () => {
  const [activeTab, setActiveTab] = useState('Trending')

  const markets = [
    {
      id: 1,
      question: "Will the CBN increase the interest rate in the next MPF meeting?",
      category: "Economy",
      volume: "42.5M",
      liquidity: "12k",
      yesPrice: 65,
      noPrice: 35,
      image: "https://images.unsplash.com/photo-1621213327685-612668e1a107?auto=format&fit=crop&w=500&q=80",
      endDate: "Mar 15, 2026"
    },
    {
      id: 2,
      question: "Will Nigeria win the 2026 World Cup Qualifiers next match?",
      category: "Sports",
      volume: "110M",
      liquidity: "45k",
      yesPrice: 82,
      noPrice: 18,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=500&q=80",
      endDate: "Jun 20, 2026"
    },
    {
      id: 3,
      question: "Will Wizkid announce a new tour before the end of Q2?",
      category: "Entertainment",
      volume: "28M",
      liquidity: "8.5k",
      yesPrice: 45,
      noPrice: 55,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
      endDate: "Jun 30, 2026"
    },
    {
      id: 4,
      question: "Will the Naira exchange rate fall below ₦1,200/$1 by December?",
      category: "Economy",
      volume: "85M",
      liquidity: "22k",
      yesPrice: 20,
      noPrice: 80,
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=500&q=80",
      endDate: "Dec 31, 2026"
    },
    {
      id: 5,
      question: "Will Burna Boy win another Grammy in 2026?",
      category: "Entertainment",
      volume: "65M",
      liquidity: "15k",
      yesPrice: 35,
      noPrice: 65,
      image: "https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&w=500&q=80",
      endDate: "Feb 10, 2026"
    },
    {
      id: 6,
      question: "Will a new major oil refinery start operations in Port Harcourt this year?",
      category: "Politics",
      volume: "15M",
      liquidity: "4k",
      yesPrice: 12,
      noPrice: 88,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80",
      endDate: "Dec 15, 2026"
    }
  ]

  const tabs = ['Trending', 'Politics', 'Crypto', 'Sports', 'Entertainment', 'New']

  return (
    <div className="markets-page">
      <header className="markets-header">
        <h1 className="page-title">Nigerian <span className="grad-text">Events & Predictions</span></h1>
        <p className="page-subtitle">Trade on the outcome of Nigerian politics, sports, and economy.</p>
      </header>

      <div className="discovery-filters glass">
        <div className="tabs-list">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Trending' && <TrendingUp size={16} />}
              {tab === 'New' && <Clock size={16} />}
              {tab}
            </button>
          ))}
        </div>
        <div className="filter-actions">
          <button className="btn btn-ghost">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      <div className="markets-grid">
        {markets.map(market => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>

      <style>{`
        .markets-page { max-width: 1400px; margin: 0 auto; }

        .markets-header { margin-bottom: 2.5rem; text-align: center; padding: 2rem 0; }

        .page-title { font-size: 3rem; margin-bottom: 0.75rem; letter-spacing: -0.03em; }

        .page-subtitle { color: var(--text-muted); font-size: 1.1rem; }

        .discovery-filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          border-radius: 100px;
          margin-bottom: 3rem;
          position: sticky;
          top: 5rem;
          z-index: 50;
        }

        .tabs-list { display: flex; gap: 0.5rem; }

        .tab-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          padding: 0.6rem 1.25rem;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 0.2s;
        }

        .tab-btn:hover { color: var(--text); background: rgba(255, 255, 255, 0.03); }

        .tab-btn.active {
          background: var(--primary);
          color: white;
        }

        .markets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 768px) {
          .discovery-filters { overflow-x: auto; border-radius: 16px; }
          .tabs-list { flex-shrink: 0; }
          .filter-actions { display: none; }
        }
      `}</style>
    </div>
  )
}

export default Markets
