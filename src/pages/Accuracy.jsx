import React from 'react'
import { MARKETS } from '../data/markets'
import { Target, TrendingUp, Award, BarChart3, PieChart, CheckCircle, XCircle } from 'lucide-react'

const Accuracy = () => {
  const categoryAccuracy = [
    { name: 'Politics', accuracy: 78, total: 45, correct: 35 },
    { name: 'Crypto', accuracy: 62, total: 38, correct: 24 },
    { name: 'Sports', accuracy: 85, total: 30, correct: 26 },
    { name: 'Finance', accuracy: 71, total: 25, correct: 18 },
    { name: 'Culture', accuracy: 68, total: 20, correct: 14 },
    { name: 'Tech', accuracy: 74, total: 15, correct: 11 },
  ]

  const recentPredictions = [
    { market: 'Will the CBN raise the interest rate...?', prediction: 'Yes', result: 'Correct', confidence: 82 },
    { market: 'Will Nigeria qualify for 2026 WC?', prediction: 'Yes', result: 'Pending', confidence: 75 },
    { market: 'Will Burna Boy win a Grammy?', prediction: 'No', result: 'Correct', confidence: 90 },
    { market: 'Will Naira trade below ₦1,200/$?', prediction: 'No', result: 'Correct', confidence: 65 },
    { market: 'Will Bitcoin exceed $150,000?', prediction: 'Yes', result: 'Pending', confidence: 58 },
  ]

  return (
    <div className="acc-page animate-slide-up">
      <div className="acc-header">
        <Target size={28} color="var(--primary-light)" />
        <div>
          <h1>Prediction Accuracy</h1>
          <p className="acc-sub">Track how well your predictions perform across all markets.</p>
        </div>
      </div>

      {/* Overall stats */}
      <div className="acc-stats">
        <div className="acc-stat glass">
          <div className="acc-ring">
            <svg viewBox="0 0 100 100" className="ring-svg">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--accent-yes)" strokeWidth="8" strokeDasharray="264" strokeDashoffset="79" strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <span className="ring-val">70%</span>
          </div>
          <span className="acc-stat-label">Overall Accuracy</span>
        </div>
        <div className="acc-stat glass">
          <span className="acc-stat-big">128</span>
          <span className="acc-stat-label">Total Predictions</span>
        </div>
        <div className="acc-stat glass">
          <span className="acc-stat-big green">90</span>
          <span className="acc-stat-label">Correct</span>
        </div>
        <div className="acc-stat glass">
          <span className="acc-stat-big red">38</span>
          <span className="acc-stat-label">Incorrect</span>
        </div>
      </div>

      {/* By category */}
      <div className="acc-section glass">
        <h2><BarChart3 size={18} /> Accuracy by Category</h2>
        <div className="acc-bars">
          {categoryAccuracy.map(c => (
            <div key={c.name} className="acc-bar-item">
              <div className="acc-bar-header">
                <span className="acc-bar-name">{c.name}</span>
                <span className="acc-bar-pct">{c.accuracy}%</span>
              </div>
              <div className="acc-bar-track">
                <div className="acc-bar-fill" style={{ width: `${c.accuracy}%`, background: c.accuracy >= 75 ? 'var(--accent-yes)' : c.accuracy >= 60 ? 'var(--accent-yellow)' : 'var(--accent-no)' }}></div>
              </div>
              <span className="acc-bar-detail">{c.correct}/{c.total} correct</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div className="acc-section glass">
        <h2><TrendingUp size={18} /> Recent Predictions</h2>
        <div className="acc-pred-list">
          {recentPredictions.map((p, i) => (
            <div key={i} className="acc-pred-item">
              <div className="acc-pred-info">
                <p className="acc-pred-q">{p.market}</p>
                <span className={`acc-pred-pick ${p.prediction.toLowerCase()}`}>Picked {p.prediction}</span>
              </div>
              <div className="acc-pred-right">
                <span className={`acc-pred-result ${p.result.toLowerCase()}`}>
                  {p.result === 'Correct' ? <CheckCircle size={14} /> : p.result === 'Pending' ? <PieChart size={14} /> : <XCircle size={14} />}
                  {p.result}
                </span>
                <span className="acc-pred-conf">{p.confidence}% confidence</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .acc-page { max-width: 900px; margin: 0 auto; }
        .acc-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; }
        .acc-header h1 { font-size: 2rem; }
        .acc-sub { color: var(--text-muted); }

        .acc-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .acc-stat { padding: 1.5rem; border-radius: var(--radius-lg); text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .acc-stat-big { font-size: 2rem; font-weight: 800; font-family: var(--font-display); }
        .acc-stat-label { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }

        .acc-ring { position: relative; width: 90px; height: 90px; }
        .ring-svg { width: 100%; height: 100%; }
        .ring-val { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; font-family: var(--font-display); }

        .acc-section { padding: 2rem; border-radius: var(--radius-xl); margin-bottom: 1.5rem; }
        .acc-section h2 { display: flex; align-items: center; gap: 0.6rem; font-size: 1.1rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }

        .acc-bars { display: flex; flex-direction: column; gap: 1.25rem; }
        .acc-bar-item {}
        .acc-bar-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
        .acc-bar-name { font-weight: 700; font-size: 0.9rem; }
        .acc-bar-pct { font-weight: 800; font-size: 0.9rem; }
        .acc-bar-track { height: 8px; background: var(--surface-light); border-radius: 100px; overflow: hidden; }
        .acc-bar-fill { height: 100%; border-radius: 100px; transition: width 1s; }
        .acc-bar-detail { font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem; display: block; }

        .acc-pred-list { display: flex; flex-direction: column; }
        .acc-pred-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border); gap: 1rem; }
        .acc-pred-item:last-child { border-bottom: none; }
        .acc-pred-q { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.2rem; }
        .acc-pred-pick { font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 6px; }
        .acc-pred-pick.yes { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .acc-pred-pick.no { background: rgba(255,61,0,0.1); color: var(--accent-no); }
        .acc-pred-right { text-align: right; flex-shrink: 0; }
        .acc-pred-result { display: flex; align-items: center; gap: 0.3rem; font-weight: 700; font-size: 0.85rem; }
        .acc-pred-result.correct { color: var(--accent-yes); }
        .acc-pred-result.pending { color: var(--accent-yellow); }
        .acc-pred-result.incorrect { color: var(--accent-no); }
        .acc-pred-conf { display: block; font-size: 0.7rem; color: var(--text-muted); }

        @media (max-width: 768px) { .acc-stats { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </div>
  )
}

export default Accuracy
