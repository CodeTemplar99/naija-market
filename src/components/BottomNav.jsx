import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutGrid, PieChart, Activity, User, Target } from 'lucide-react'

const BottomNav = () => {
  return (
    <>
      <nav className="bottom-nav glass">
        <NavLink to="/" className={({ isActive }) => `bn-link ${isActive ? 'active' : ''}`} end>
          <div className="bn-icon-wrap"><LayoutGrid strokeWidth={2.5} size={24} className="bn-icon" /></div>
          <span className="bn-label">Markets</span>
        </NavLink>
        <NavLink to="/portfolio" className={({ isActive }) => `bn-link ${isActive ? 'active' : ''}`}>
          <div className="bn-icon-wrap"><PieChart strokeWidth={2.5} size={24} className="bn-icon" /></div>
          <span className="bn-label">Portfolio</span>
        </NavLink>
        <NavLink to="/activity" className={({ isActive }) => `bn-link ${isActive ? 'active' : ''}`}>
          <div className="bn-icon-wrap"><Activity strokeWidth={2.5} size={24} className="bn-icon" /></div>
          <span className="bn-label">Activity</span>
        </NavLink>
        <NavLink to="/accuracy" className={({ isActive }) => `bn-link ${isActive ? 'active' : ''}`}>
          <div className="bn-icon-wrap"><Target strokeWidth={2.5} size={24} className="bn-icon" /></div>
          <span className="bn-label">Accuracy</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `bn-link ${isActive ? 'active' : ''}`}>
          <div className="bn-icon-wrap"><User strokeWidth={2.5} size={24} className="bn-icon" /></div>
          <span className="bn-label">Profile</span>
        </NavLink>
      </nav>

      <style>{`
        .bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 85px; /* Base height + space for iOS safe area */
          padding-bottom: env(safe-area-inset-bottom, 20px);
          z-index: 1000;
          border-top: 1px solid var(--border);
          justify-content: space-around;
          align-items: center;
          background: rgba(10, 14, 12, 0.85);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
        }
        
        [data-theme="light"] .bottom-nav {
          background: rgba(255, 255, 255, 0.85);
        }

        @media (max-width: 1024px) {
          .bottom-nav {
            display: flex;
          }
        }

        .bn-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--text-muted);
          text-decoration: none;
          flex: 1;
          height: 100%;
          transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          padding-top: 5px;
        }

        .bn-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bn-icon {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bn-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .bn-link.active {
          color: var(--primary-light);
        }
        
        .bn-link.active .bn-icon {
          transform: scale(1.15) translateY(-2px);
          filter: drop-shadow(0 4px 6px rgba(0, 135, 81, 0.3));
        }
      `}</style>
    </>
  )
}

export default BottomNav
