import React from 'react'
import { Search, Wallet, User, Bell, Menu } from 'lucide-react'

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar glass">
      <div className="nav-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="search-box glass">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search markets (e.g. Tinubu, AFCON, Solana)" />
        </div>
      </div>

      <div className="nav-right">
        <div className="wallet-balance glass">
          <Wallet size={16} className="wallet-icon" />
          <div className="balance-info">
            <span className="balance-val">₦245,600.00</span>
            <span className="balance-label">Available</span>
          </div>
        </div>
        
        <button className="icon-btn">
          <Bell size={20} />
          <div className="notification-dot"></div>
        </button>

        <div className="divider"></div>

        <button className="user-profile">
          <div className="avatar">OO</div>
          <span className="user-name">Olawale</span>
        </button>
      </div>

      <style>{`
        .navbar {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          position: sticky;
          top: 1rem;
          z-index: 100;
        }

        .nav-left, .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .menu-btn {
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          display: none;
        }

        @media (max-width: 1024px) {
          .menu-btn { display: flex; }
        }

        .search-box {
          display: flex;
          align-items: center;
          padding: 0.6rem 1.25rem;
          border-radius: 100px;
          width: 400px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
        }

        .search-box input {
          background: none;
          border: none;
          color: var(--text);
          margin-left: 0.75rem;
          width: 100%;
          outline: none;
          font-family: var(--font-main);
          font-size: 0.9rem;
        }

        .wallet-balance {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.4rem 1rem;
          border-radius: 12px;
          background: rgba(0, 135, 81, 0.05);
          border: 1px solid rgba(0, 135, 81, 0.1);
        }

        .wallet-icon { color: var(--primary-light); }

        .balance-info { display: flex; flex-direction: column; }

        .balance-val {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text);
        }

        .balance-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .icon-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
        }

        .notification-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: var(--accent-no);
          border-radius: 50%;
          border: 2px solid var(--surface);
        }

        .divider {
          width: 1px;
          height: 24px;
          background: var(--border);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: var(--surface-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
          border: 1px solid var(--border);
        }

        .user-name { font-weight: 600; font-size: 0.9rem; }
      `}</style>
    </nav>
  )
}

export default Navbar
