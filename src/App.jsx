import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Markets from './pages/Markets'
import MarketDetail from './pages/MarketDetail'
import Portfolio from './pages/Portfolio'
import Leaderboard from './pages/Leaderboard'
import Activity from './pages/Activity'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import Accuracy from './pages/Accuracy'
import Docs from './pages/Docs'
import HelpCenter from './pages/HelpCenter'
import About from './pages/About'
import Terms from './pages/Terms'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminMarkets from './pages/admin/Markets'
import AdminUsers from './pages/admin/Users'
import AdminFinance from './pages/admin/Finance'
import AdminSettings from './pages/admin/Settings'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Auth pages render without sidebar/navbar/footer
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)

  if (isAuthPage)
  {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    )
  }

  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin)
  {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/markets" element={<AdminMarkets />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/finance" element={<AdminFinance />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </AdminLayout>
    )
  }

  return (
    <div className="app-container">
      {sidebarOpen && <div className="sidebar-overlay visible" onClick={() => setSidebarOpen(false)} />}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="app-wrapper">
        <div className="main-content">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <Routes>
            <Route path="/" element={<Markets />} />
            <Route path="/market/:id" element={<MarketDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/accuracy" element={<Accuracy />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/:category" element={<Markets />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
