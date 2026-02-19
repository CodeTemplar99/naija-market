import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Markets from './pages/Markets'
import MarketDetail from './pages/MarketDetail'
import Portfolio from './pages/Portfolio'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Routes>
          <Route path="/" element={<Markets />} />
          <Route path="/market/:id" element={<MarketDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
