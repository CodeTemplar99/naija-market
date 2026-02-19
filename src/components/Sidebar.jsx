import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutGrid, PieChart, Trophy, Activity, Flame, Globe, Landmark, Dumbbell, Bitcoin, DollarSign, Cpu, Clapperboard, BarChart3, Leaf, Vote, Target, BookOpen, HelpCircle, Info, FileText } from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const mainNav = [
    { name: 'Markets', icon: LayoutGrid, path: '/' },
    { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Activity', icon: Activity, path: '/activity' },
    { name: 'Accuracy', icon: Target, path: '/accuracy' },
  ]

  const categories = [
    { name: 'Politics', icon: Landmark, path: '/politics' },
    { name: 'Sports', icon: Dumbbell, path: '/sports' },
    { name: 'Crypto', icon: Bitcoin, path: '/crypto' },
    { name: 'Finance', icon: DollarSign, path: '/finance' },
    { name: 'Tech', icon: Cpu, path: '/tech' },
    { name: 'Culture', icon: Clapperboard, path: '/culture' },
    { name: 'Economy', icon: BarChart3, path: '/economy' },
    { name: 'Climate', icon: Leaf, path: '/climate-science' },
    { name: 'Elections', icon: Vote, path: '/elections' },
    { name: 'World', icon: Globe, path: '/world' },
  ]

  const resources = [
    { name: 'Docs', icon: BookOpen, path: '/docs' },
    { name: 'Help Center', icon: HelpCircle, path: '/help' },
    { name: 'About', icon: Info, path: '/about' },
    { name: 'Terms', icon: FileText, path: '/terms' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sb-header">
        <div className="logo">
          <div className="logo-mark">NP</div>
          <span className="logo-name">Naija<span className="prim">Predict</span></span>
        </div>
      </div>

      <nav className="sb-nav">
        <div className="nav-section">
          {mainNav.map((item) => (
            <NavLink key={item.name} to={item.path} end={item.path === '/'} className={({ isActive }) => `sb-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <item.icon size={18} /> <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav-section">
          <p className="section-label">Browse</p>
          {categories.map((cat) => (
            <NavLink key={cat.name} to={cat.path} className={({ isActive }) => `sb-link sub ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <cat.icon size={16} /> <span>{cat.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav-section">
          <p className="section-label">Resources</p>
          {resources.map((r) => (
            <NavLink key={r.name} to={r.path} className={({ isActive }) => `sb-link sub ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <r.icon size={16} /> <span>{r.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sb-footer">
        <div className="sb-cta glass">
          <Flame size={18} color="var(--accent-yellow)" />
          <div className="cta-text">
            <span className="cta-title">Create a Market</span>
            <span className="cta-sub">Ask anything. Trade everything.</span>
          </div>
        </div>
      </div>

      <style>{`
        .sidebar { width: 250px; height: 100vh; background: var(--surface); border-right: 1px solid var(--border); position: fixed; left: 0; top: 0; display: flex; flex-direction: column; z-index: 1000; transition: transform 0.3s ease, background 0.3s; }
        @media (max-width: 1024px) { .sidebar { transform: translateX(-100%); } .sidebar.open { transform: translateX(0); box-shadow: var(--shadow-lg); } }
        .sb-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
        .logo { display: flex; align-items: center; gap: 0.7rem; }
        .logo-mark { width: 30px; height: 30px; background: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.7rem; color: white; box-shadow: 0 4px 12px rgba(0,135,81,0.25); }
        .logo-name { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; }
        .prim { color: var(--primary-light); }
        .sb-nav { flex: 1; overflow-y: auto; padding: 1rem 0.75rem; }
        .nav-section { margin-bottom: 1.25rem; }
        .section-label { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; padding: 0 0.75rem; margin-bottom: 0.5rem; }
        .sb-link { display: flex; align-items: center; gap: 0.7rem; padding: 0.55rem 0.75rem; border-radius: 10px; color: var(--text-muted); font-weight: 600; font-size: 0.88rem; transition: all 0.15s; margin-bottom: 1px; }
        .sb-link:hover { background: rgba(255,255,255,0.03); color: var(--text); }
        [data-theme="light"] .sb-link:hover { background: rgba(0,0,0,0.03); }
        .sb-link.active { background: rgba(0,135,81,0.1); color: var(--primary-light); }
        .sb-link.sub { font-size: 0.82rem; padding: 0.45rem 0.75rem; }
        .sb-footer { padding: 0.75rem; }
        .sb-cta { padding: 1rem; border-radius: 16px; display: flex; align-items: center; gap: 0.75rem; cursor: pointer; transition: background 0.2s; }
        .sb-cta:hover { background: var(--surface-light); }
        .cta-text { display: flex; flex-direction: column; }
        .cta-title { font-weight: 700; font-size: 0.85rem; }
        .cta-sub { font-size: 0.7rem; color: var(--text-muted); }
      `}</style>
    </aside>
  )
}

export default Sidebar
