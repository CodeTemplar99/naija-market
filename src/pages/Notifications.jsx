import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Check, TrendingUp, Wallet, AlertTriangle, Star, Trash2 } from 'lucide-react'

const Notifications = () => {
  const [notifs, setNotifs] = useState([
    { id: 1, type: 'trade', title: 'Trade Executed', desc: 'Your ₦50,000 Buy Yes on "CBN interest rate" was filled at ₦65.', time: '2 min ago', read: false },
    { id: 2, type: 'market', title: 'Market Resolved', desc: '"Will Burna Boy win a Grammy?" resolved to No. Your position has been settled.', time: '1 hour ago', read: false },
    { id: 3, type: 'deposit', title: 'Deposit Successful', desc: '₦100,000 has been credited to your wallet via Paystack.', time: '3 hours ago', read: false },
    { id: 4, type: 'alert', title: 'Price Alert', desc: '"Will Nigeria qualify for 2026 WC?" Yes price crossed 80%. Your alert has triggered.', time: '5 hours ago', read: true },
    { id: 5, type: 'promo', title: 'Weekend Bonus', desc: 'Trade ₦10,000+ this weekend and earn 5% bonus on winnings!', time: '1 day ago', read: true },
    { id: 6, type: 'trade', title: 'Order Filled', desc: 'Your limit order on "Naira below ₦1,200/$" was partially filled.', time: '2 days ago', read: true },
  ])

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const clearAll = () => setNotifs([])
  const unreadCount = notifs.filter(n => !n.read).length

  const iconMap = {
    trade: <TrendingUp size={16} />,
    market: <Star size={16} />,
    deposit: <Wallet size={16} />,
    alert: <AlertTriangle size={16} />,
    promo: <Star size={16} />,
  }

  const colorMap = {
    trade: 'green', market: 'blue', deposit: 'green', alert: 'yellow', promo: 'blue',
  }

  return (
    <div className="notif-page animate-slide-up">
      <div className="notif-header">
        <div>
          <h1>Notifications</h1>
          {unreadCount > 0 && <span className="notif-unread">{unreadCount} unread</span>}
        </div>
        <div className="notif-actions">
          <button className="btn btn-ghost btn-sm" onClick={markAllRead}><Check size={14} /> Mark all read</button>
          <button className="btn btn-ghost btn-sm" onClick={clearAll}><Trash2 size={14} /> Clear all</button>
        </div>
      </div>

      {notifs.length === 0 ? (
        <div className="empty-notif glass">
          <Bell size={32} />
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="notif-list">
          {notifs.map(n => (
            <div key={n.id} className={`notif-item glass ${!n.read ? 'unread' : ''}`}>
              <div className={`notif-icon ${colorMap[n.type]}`}>{iconMap[n.type]}</div>
              <div className="notif-body">
                <span className="notif-title">{n.title}</span>
                <p className="notif-desc">{n.desc}</p>
                <span className="notif-time">{n.time}</span>
              </div>
              {!n.read && <div className="notif-dot"></div>}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .notif-page { max-width: 800px; margin: 0 auto; }
        .notif-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .notif-header h1 { font-size: 2rem; }
        .notif-unread { font-size: 0.8rem; color: var(--primary-light); font-weight: 700; }
        .notif-actions { display: flex; gap: 0.5rem; }

        .notif-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .notif-item { display: flex; gap: 1rem; padding: 1.25rem; border-radius: 16px; align-items: flex-start; transition: background 0.15s; }
        .notif-item.unread { border-left: 3px solid var(--primary); }

        .notif-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .notif-icon.green { background: rgba(0,200,83,0.1); color: var(--accent-yes); }
        .notif-icon.blue { background: rgba(64,150,255,0.1); color: #4096ff; }
        .notif-icon.yellow { background: rgba(255,214,0,0.1); color: var(--accent-yellow); }

        .notif-body { flex: 1; min-width: 0; }
        .notif-title { font-weight: 700; font-size: 0.9rem; display: block; margin-bottom: 0.2rem; }
        .notif-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.3rem; }
        .notif-time { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }

        .notif-dot { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; flex-shrink: 0; margin-top: 0.3rem; }

        .empty-notif { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 4rem; border-radius: var(--radius-xl); color: var(--text-muted); text-align: center; }
      `}</style>
    </div>
  )
}

export default Notifications
