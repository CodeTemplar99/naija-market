import React from 'react'
import { Link } from 'react-router-dom'
import { Globe, Twitter, Send, Github, FileText, HelpCircle, Shield, BarChart3, BookOpen, Info } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="ft-inner">
        {/* Top row */}
        <div className="ft-grid">
          <div className="ft-brand">
            <div className="ft-logo">
              <div className="ft-logo-mark">NP</div>
              <span className="ft-logo-name">Naija<span className="ft-prim">Predict</span></span>
            </div>
            <p className="ft-tagline">Nigeria's #1 Prediction Market™. Trade on the outcomes of real-world events.</p>
            <div className="ft-socials">
              <a href="#" className="ft-social" aria-label="Twitter"><Twitter size={16} /></a>
              <a href="#" className="ft-social" aria-label="Telegram"><Send size={16} /></a>
              <a href="#" className="ft-social" aria-label="GitHub"><Github size={16} /></a>
              <a href="#" className="ft-social" aria-label="Website"><Globe size={16} /></a>
            </div>
          </div>

          <div className="ft-col">
            <h4>Markets</h4>
            <Link to="/">All Markets</Link>
            <Link to="/politics">Politics</Link>
            <Link to="/sports">Sports</Link>
            <Link to="/crypto">Crypto</Link>
            <Link to="/finance">Finance</Link>
            <Link to="/elections">Elections</Link>
          </div>

          <div className="ft-col">
            <h4>Platform</h4>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/activity">Activity Feed</Link>
            <Link to="/deposit">Deposit</Link>
            <Link to="/withdraw">Withdraw</Link>
            <Link to="/accuracy">Accuracy</Link>
          </div>

          <div className="ft-col">
            <h4>Resources</h4>
            <Link to="/docs">Documentation</Link>
            <Link to="/help">Help Center</Link>
            <Link to="/about">About Us</Link>
            <Link to="/terms">Terms of Use</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">API Access</a>
          </div>

          <div className="ft-col">
            <h4>Contact</h4>
            <a href="mailto:support@naijapredict.com">support@naijapredict.com</a>
            <a href="#">Lagos, Nigeria</a>
            <a href="#">Press Kit</a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="ft-bottom">
          <p className="ft-copy">© 2026 NaijaPredict. All rights reserved. Built with 🇳🇬 in Lagos.</p>
          <div className="ft-bottom-links">
            <Link to="/terms">Terms</Link>
            <span className="ft-dot"></span>
            <a href="#">Privacy</a>
            <span className="ft-dot"></span>
            <Link to="/docs">Docs</Link>
            <span className="ft-dot"></span>
            <a href="#">Status</a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          margin-left: 250px;
          border-top: 1px solid var(--border);
          background: var(--surface);
          padding: 4rem 2rem 2rem;
          margin-top: 4rem;
        }
        @media (max-width: 1024px) { .site-footer { margin-left: 0; padding: 3rem 1.5rem calc(110px + env(safe-area-inset-bottom)); } }

        .ft-inner { max-width: 1200px; margin: 0 auto; }

        .ft-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
        @media (max-width: 1024px) { .ft-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } }
        @media (max-width: 600px) { .ft-grid { grid-template-columns: 1fr; } }

        .ft-brand { display: flex; flex-direction: column; gap: 1rem; }
        .ft-logo { display: flex; align-items: center; gap: 0.6rem; }
        .ft-logo-mark { width: 28px; height: 28px; background: var(--primary); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.65rem; color: white; }
        .ft-logo-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; }
        .ft-prim { color: var(--primary-light); }
        .ft-tagline { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; max-width: 280px; }

        .ft-socials { display: flex; gap: 0.5rem; }
        .ft-social {
          width: 34px; height: 34px; border-radius: 10px; background: var(--surface-light);
          border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
          color: var(--text-muted); transition: all 0.15s;
        }
        .ft-social:hover { color: var(--primary-light); border-color: var(--primary); background: rgba(0,135,81,0.06); }

        .ft-col { display: flex; flex-direction: column; gap: 0.6rem; }
        .ft-col h4 { font-size: 0.8rem; font-weight: 800; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.04em; }
        .ft-col a { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; transition: color 0.15s; }
        .ft-col a:hover { color: var(--primary-light); }

        .ft-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 1rem; }
        .ft-copy { font-size: 0.8rem; color: var(--text-muted); }
        .ft-bottom-links { display: flex; align-items: center; gap: 0.75rem; }
        .ft-bottom-links a { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .ft-bottom-links a:hover { color: var(--text); }
        .ft-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--text-muted); }
      `}</style>
    </footer>
  )
}

export default Footer
