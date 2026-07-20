import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout({ children, onAddEntry }) {
  const [sidebarPinned, setSidebarPinned] = useState(false)
  const [sidebarHovered, setSidebarHovered] = useState(false)
  const sidebarExpanded = sidebarPinned || sidebarHovered

  return (
    <div className="min-h-screen bg-[#f0eef8] text-ink dark:bg-midnight dark:text-white">
      <Sidebar expanded={sidebarExpanded} pinned={sidebarPinned} onHoverChange={setSidebarHovered} onPinnedChange={setSidebarPinned} />
      <div className={`min-h-screen pb-20 transition-[margin] duration-300 ease-out md:pb-0 ${sidebarExpanded ? 'md:ml-52' : 'md:ml-20'}`}>
        <Header onAddEntry={onAddEntry} />
        {children}
      </div>
    </div>
  )
}
