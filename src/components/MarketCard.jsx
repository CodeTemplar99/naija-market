import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Users } from 'lucide-react'

const MarketCard = ({ market }) => {
  const { id, question, volume, liquidity, yesPrice, noPrice, image, category, endDate } = market

  return (
    <div className="market-card glass animate-slide-up">
      <Link to={`/market/${id}`} className="card-link">
        <div className="card-header">
          <div className="category-tag">{category}</div>
          <img src={image} alt="" className="market-img" />
        </div>

        <div className="card-body">
          <h3 className="market-question">{question}</h3>

          <div className="market-meta">
            <div className="meta-item">
              <TrendingUp size={14} />
              <span>₦{volume} Vol.</span>
            </div>
            <div className="meta-item">
              <Users size={14} />
              <span>{liquidity} Liked</span>
            </div>
          </div>

          <div className="betting-options">
            <div className="outcome-btn yes">
              <span className="label">Yes</span>
              <span className="price">{yesPrice}₦</span>
            </div>
            <div className="outcome-btn no">
              <span className="label">No</span>
              <span className="price">{noPrice}₦</span>
            </div>
          </div>
        </div>
      </Link>

      <style>{`
        .market-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .market-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
        }

        .card-link { display: block; height: 100%; }

        .card-header {
          position: relative;
          height: 140px;
          overflow: hidden;
        }

        .market-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .market-card:hover .market-img { transform: scale(1.05); }

        .category-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-body { padding: 1.25rem; }

        .market-question {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          height: 3.2em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: var(--text);
        }

        .market-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .betting-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .outcome-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.6rem;
          border-radius: 10px;
          transition: all 0.2s;
          cursor: pointer;
        }

        .outcome-btn.yes {
          background: rgba(0, 200, 83, 0.08);
          border: 1px solid rgba(0, 200, 83, 0.1);
        }

        .outcome-btn.yes:hover { background: rgba(0, 200, 83, 0.15); }

        .outcome-btn.no {
          background: rgba(255, 61, 0, 0.08);
          border: 1px solid rgba(255, 61, 0, 0.1);
        }

        .outcome-btn.no:hover { background: rgba(255, 61, 0, 0.15); }

        .outcome-btn .label {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }

        .outcome-btn.yes .label { color: var(--accent-yes); }
        .outcome-btn.no .label { color: var(--accent-no); }

        .outcome-btn .price {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text);
        }
      `}</style>
    </div>
  )
}

export default MarketCard
