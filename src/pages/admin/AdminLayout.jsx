import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Briefcase, DollarSign, Bell, Shield, ChevronRight } from 'lucide-react'

const AdminLayout = ({ children }) => {
  const location = useLocation()
  const path = location.pathname

  const menu = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Briefcase, label: 'Markets', path: '/admin/markets' },
    { icon: Users, label: 'Users & KYC', path: '/admin/users' },
    { icon: DollarSign, label: 'Finance', path: '/admin/finance' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar glass">
        <div className="as-header">
          <div className="as-logo">NP</div>
          <span className="as-brand">
            Naija<span className="prim">Predict</span> <span className="badge badge-red as-badge">ADMIN</span>
          </span>
        </div>

        <nav className="as-nav">
          {menu.map(item => (
            <Link key={item.path} to={item.path} className={`as-link ${path === item.path ? 'active' : ''}`}>
              <item.icon size={18} />
              <span>{item.label}</span>
              {path === item.path && <ChevronRight size={14} className="as-chev" />}
            </Link>
          ))}
        </nav>

        <div className="as-footer">
          <div className="as-user">
            <div className="as-avatar">A</div>
            <div className="as-meta">
              <span className="name">Admin</span>
              <span className="role">Super User</span>
            </div>
          </div>
          <Link to="/" className="as-logout"><LogOut size={16} /></Link>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-header glass">
          <h2 className="ah-title">
            {menu.find(m => m.path === path)?.label || 'Overview'}
          </h2>
          <div className="ah-actions">
            <button className="icon-btn"><Bell size={18} /></button>
            <div className="ah-sep"></div>
            <span className="ah-status"><span className="live-dot"></span> System Operational</span>
          </div>
        </header>

        <div className="admin-body animate-slide-up">
          {children}
        </div>
      </main>

      <style>{`
        .admin-layout { display: flex; min-height: 100vh; background: #050505; color: #e5e5e5; font-family: var(--font-main); }
        .admin-sidebar { width: 260px; height: 100vh; position: sticky; top: 0; border-right: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; background: rgba(10,10,10,0.6); backdrop-filter: blur(20px); }
        
        .as-header { padding: 1.5rem; display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .as-logo { width: 32px; height: 32px; background: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.75rem; color: white; }
        .as-brand { font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 0.4rem; }
        .prim { color: var(--primary-light); }
        .as-badge { font-size: 0.55rem; padding: 0.1rem 0.3rem; border-radius: 4px; }

        .as-nav { flex: 1; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .as-link { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 10px; color: #888; font-weight: 600; font-size: 0.9rem; transition: all 0.2s; }
        .as-link:hover { background: rgba(255,255,255,0.03); color: #fff; }
        .as-link.active { background: rgba(0, 135, 81, 0.15); color: var(--primary-light); }
        .as-chev { margin-left: auto; opacity: 0.6; }

        .as-footer { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .as-user { display: flex; align-items: center; gap: 0.6rem; }
        .as-avatar { width: 36px; height: 36px; background: #222; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; border: 1px solid rgba(255,255,255,0.1); color: #fff; }
        .as-meta { display: flex; flex-direction: column; }
        .as-meta .name { font-size: 0.85rem; font-weight: 700; color: #fff; }
        .as-meta .role { font-size: 0.7rem; color: #666; font-weight: 600; }
        .as-logout { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: #666; border-radius: 8px; transition: background 0.2s; }
        .as-logout:hover { background: rgba(255,61,0,0.1); color: var(--accent-no); }

        .admin-content { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .admin-header { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); position: sticky; top: 0; z-index: 10; background: rgba(5,5,5,0.8); backdrop-filter: blur(20px); }
        .ah-title { font-size: 1.1rem; color: #fff; }
        .ah-actions { display: flex; align-items: center; gap: 1rem; }
        .ah-sep { width: 1px; height: 20px; background: rgba(255,255,255,0.1); }
        .ah-status { font-size: 0.75rem; color: var(--accent-yes); font-weight: 700; display: flex; align-items: center; gap: 0.4rem; text-transform: uppercase; letter-spacing: 0.02em; }
        .icon-btn { background: none; border: none; color: #666; cursor: pointer; transition: color 0.2s; }
        .icon-btn:hover { color: #fff; }

        .admin-body { padding: 2rem; flex: 1; }
      `}</style>
    </div>
  )
}

export default AdminLayout
