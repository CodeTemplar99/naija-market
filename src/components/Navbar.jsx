import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Wallet, Bell, Menu, ChevronDown, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Navbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="topbar glass">
      <div className="tb-left">
        <button className="mobile-menu" onClick={toggleSidebar}><Menu size={20} /></button>
        <div className="search-box">
          <Search size={16} className="si" />
          <input type="text" placeholder="Search events" className="search-input" />
          <kbd className="kbd">/</kbd>
        </div>
      </div>

      <div className="tb-right">
        {/* Theme toggle */}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <div className="theme-toggle-knob"></div>
          {theme === 'dark' ? <Moon size={10} className="ticon tl" /> : <Sun size={10} className="ticon tr" />}
        </button>

        <Link to="/deposit" className="btn btn-primary btn-sm">Deposit</Link>

        <Link to="/portfolio" className="wallet-pill">
          <Wallet size={14} />
          <span className="wb-val">₦245,600</span>
        </Link>

        <Link to="/notifications" className="notif-wrap">
          <button className="icon-btn"><Bell size={18} /></button>
          <span className="notif-badge">3</span>
        </Link>

        <div className="tb-divider"></div>

        <Link to="/profile" className="avatar-btn">
          <div className="avatar-circle">OO</div>
          <ChevronDown size={14} />
        </Link>
      </div>

      <style>{`
        .topbar { height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 1.25rem; border-radius: 14px; margin-bottom: 1.5rem; position: sticky; top: 0.75rem; z-index: 100; }
        .tb-left, .tb-right { display: flex; align-items: center; gap: 0.85rem; }
        .mobile-menu { background: none; border: none; color: var(--text); cursor: pointer; display: none; }
        @media (max-width: 1024px) { .mobile-menu { display: flex; } }
        .search-box { display: flex; align-items: center; gap: 0.5rem; background: var(--surface-light); border: 1px solid var(--border); padding: 0.45rem 1rem; border-radius: 10px; width: 320px; }
        .si { color: var(--text-muted); flex-shrink: 0; }
        .search-input { background: none; border: none; color: var(--text); width: 100%; outline: none; font-family: var(--font-main); font-size: 0.85rem; }
        .kbd { background: var(--surface-hover); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.6rem; color: var(--text-muted); font-family: monospace; }
        .wallet-pill { display: flex; align-items: center; gap: 0.5rem; background: rgba(0,135,81,0.06); border: 1px solid rgba(0,135,81,0.12); padding: 0.35rem 0.85rem; border-radius: 10px; }
        .wb-val { font-weight: 700; font-size: 0.85rem; }
        .notif-wrap { position: relative; }
        .icon-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; }
        .icon-btn:hover { color: var(--text); }
        .notif-badge { position: absolute; top: -6px; right: -6px; background: var(--accent-no); color: white; width: 16px; height: 16px; border-radius: 50%; font-size: 0.55rem; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 2px solid var(--surface); }
        .tb-divider { width: 1px; height: 20px; background: var(--border); }
        .avatar-btn { display: flex; align-items: center; gap: 0.4rem; color: var(--text); }
        .avatar-circle { width: 30px; height: 30px; background: var(--surface-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; border: 1px solid var(--border); }

        /* theme toggle icons */
        .theme-toggle { position: relative; }
        .ticon { position: absolute; top: 50%; transform: translateY(-50%); pointer-events: none; color: white; }
        .tl { left: 5px; }
        .tr { right: 5px; }

        @media (max-width: 768px) {
          .search-box { width: 180px; }
          .wallet-pill .wb-val { display: none; }
          .kbd { display: none; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
