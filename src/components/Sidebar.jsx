import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutGrid, TrendingUp, PieChart, Info, HelpCircle, Trophy, Activity, MessageSquare } from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Markets', icon: LayoutGrid, path: '/' },
    { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Activity', icon: Activity, path: '/activity' },
  ]

  const categories = [
    { name: 'Politics', path: '/politics' },
    { name: 'Crypto', path: '/crypto' },
    { name: 'Sports', path: '/sports' },
    { name: 'Entertainment', path: '/entertainment' },
    { name: 'Economy', path: '/economy' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-section">
          <div className="logo-icon">NP</div>
          <span className="logo-text">Naija<span className="primary-text">Predict</span></span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group">
          <p className="nav-label">General</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav-group">
          <p className="nav-label">Categories</p>
          {categories.map((cat) => (
            <NavLink
              key={cat.name}
              to={cat.path}
              className="nav-item sub-nav"
            >
              <div className="dot"></div>
              <span>{cat.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="support-card glass">
          <MessageSquare size={16} />
          <span>Need Help?</span>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: var(--surface);
          border-right: 1px solid var(--border);
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          transition: transform 0.3s ease;
        }

        @media (max-width: 1024px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.75rem;
          color: white;
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .primary-text { color: var(--primary-light); }

        .sidebar-nav {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .nav-group { margin-bottom: 2rem; }

        .nav-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          padding-left: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          margin-bottom: 0.2rem;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.03);
          color: var(--text);
        }

        .nav-item.active {
          background: rgba(0, 135, 81, 0.1);
          color: var(--primary-light);
        }

        .sub-nav {
          font-size: 0.9rem;
          padding: 0.6rem 1rem;
        }

        .dot {
          width: 4px;
          height: 4px;
          background: var(--text-muted);
          border-radius: 50%;
        }

        .nav-item.active .dot { background: var(--primary-light); }

        .sidebar-footer { padding: 1.5rem; }

        .support-card {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .support-card:hover { background: var(--surface-light); }
      `}</style>
    </aside>
  )
}

export default Sidebar
