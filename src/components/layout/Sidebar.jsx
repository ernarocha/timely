import { BarChart3, Clock3, LayoutDashboard, TimerReset } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', Icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Overview', Icon: BarChart3, to: '/overview' },
  { label: 'Timer', Icon: Clock3, to: '/timer' },
]

export default function Sidebar({ expanded, pinned, onHoverChange, onPinnedChange }) {
  const togglePinned = () => {
    onPinnedChange(!pinned)
    if (pinned) onHoverChange(false)
  }

  return (
    <aside
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={`fixed inset-x-0 bottom-0 z-50 flex h-[calc(4rem+env(safe-area-inset-bottom))] items-center justify-around border-t border-white/50 bg-primary-container/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-[width] duration-300 ease-out dark:border-white/5 dark:bg-[#29263e]/95 md:inset-y-0 md:left-0 md:right-auto md:h-auto md:flex-col md:justify-start md:border-r md:border-t-0 md:px-4 md:py-6 ${expanded ? 'md:w-52 md:shadow-lift' : 'md:w-20'}`}
    >
      <div className="contents md:flex md:w-full md:flex-col md:items-center md:gap-8">
        <div className="hidden w-full items-center justify-center md:flex">
          <button
            type="button"
            onClick={togglePinned}
            aria-label={pinned ? 'Collapse sidebar' : 'Pin sidebar open'}
            aria-expanded={expanded}
            className={`flex h-12 items-center rounded-2xl bg-ink text-primary-container shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 dark:bg-primary-container dark:text-ink ${expanded ? 'w-[152px] gap-3 px-3' : 'w-12 justify-center'}`}
          >
            <TimerReset className="shrink-0" size={24} />
            {expanded && <span className="whitespace-nowrap text-lg font-extrabold">Timely</span>}
          </button>
        </div>

        <nav className="contents md:flex md:w-full md:flex-col md:items-center md:gap-3" aria-label="Primary navigation">
          {navItems.map(({ label, Icon, to }) => (
            <NavLink key={label} to={to} aria-label={label} title={expanded ? undefined : label} className={({ isActive }) => `flex h-12 w-12 items-center justify-center rounded-xl transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 md:h-11 ${expanded ? 'md:w-[152px] md:justify-start md:gap-3 md:px-3' : 'md:w-12'} ${isActive ? 'bg-secondary text-white shadow-md' : 'text-[#514a7a] hover:bg-white/30 dark:text-primary-container dark:hover:bg-white/10'}`}>
              <Icon className="shrink-0" size={21} />
              {expanded && <span className="hidden whitespace-nowrap text-sm font-semibold md:block">{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

    </aside>
  )
}
