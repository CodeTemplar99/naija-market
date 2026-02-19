import React from 'react'
import { BookOpen, Code, Zap, Globe, Server, Key, ArrowRight } from 'lucide-react'

const Docs = () => {
  const sections = [
    { icon: Zap, title: 'Getting Started', desc: 'Learn how NaijaPredict works, create your first trade, and fund your wallet.', articles: ['What is NaijaPredict?', 'Creating an Account', 'Your First Trade', 'Understanding Yes/No Markets'] },
    { icon: Globe, title: 'Markets & Trading', desc: 'Deep dive into market mechanics, order types, and resolution rules.', articles: ['How Markets Work', 'Market Resolution', 'Limit vs Market Orders', 'Fees & Commissions', 'Liquidity Pools'] },
    { icon: Key, title: 'Wallet & Payments', desc: 'Deposit, withdraw, and manage your funds securely.', articles: ['Depositing Funds', 'Withdrawals', 'Payment Methods', 'Transaction History', 'Fee Schedule'] },
    { icon: Server, title: 'API Reference', desc: 'Integrate with NaijaPredict programmatically.', articles: ['Authentication', 'Markets Endpoint', 'Orders Endpoint', 'WebSocket Feeds', 'Rate Limits'] },
    { icon: Code, title: 'Advanced', desc: 'For power users and market makers.', articles: ['Market Making', 'Arbitrage Strategies', 'API Trading Bots', 'Bulk Orders'] },
  ]

  return (
    <div className="docs-page animate-slide-up">
      <div className="docs-header">
        <BookOpen size={28} color="var(--primary-light)" />
        <div>
          <h1>Documentation</h1>
          <p>Everything you need to know about trading on NaijaPredict.</p>
        </div>
      </div>

      <div className="docs-search-wrap">
        <input type="text" className="input docs-search" placeholder="Search documentation..." />
      </div>

      <div className="docs-grid">
        {sections.map((s, i) => (
          <div key={i} className="docs-card glass">
            <div className="docs-card-header">
              <div className="docs-icon"><s.icon size={20} /></div>
              <h3>{s.title}</h3>
            </div>
            <p className="docs-card-desc">{s.desc}</p>
            <ul className="docs-articles">
              {s.articles.map((a, j) => (
                <li key={j}><a href="#">{a} <ArrowRight size={12} /></a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        .docs-page { max-width: 1000px; margin: 0 auto; }
        .docs-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .docs-header h1 { font-size: 2rem; }
        .docs-header p { color: var(--text-muted); }

        .docs-search-wrap { margin-bottom: 2.5rem; }
        .docs-search { max-width: 500px; padding: 0.85rem 1.25rem; font-size: 1rem; }

        .docs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .docs-card { padding: 1.75rem; border-radius: var(--radius-xl); }
        .docs-card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
        .docs-icon { width: 40px; height: 40px; border-radius: 12px; background: rgba(0,135,81,0.08); display: flex; align-items: center; justify-content: center; color: var(--primary-light); }
        .docs-card h3 { font-size: 1.05rem; }
        .docs-card-desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.5; }
        .docs-articles { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .docs-articles li a { display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); padding: 0.45rem 0.75rem; border-radius: 8px; transition: all 0.15s; }
        .docs-articles li a:hover { background: var(--surface-light); color: var(--primary-light); }
      `}</style>
    </div>
  )
}

export default Docs
