import { BarChart3, CalendarDays, Clock3, LogOut, TimerReset } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Overview', Icon: BarChart3 },
  { label: 'Week', Icon: CalendarDays, active: true },
  { label: 'Timer', Icon: Clock3 },
]

export default function Sidebar({ expanded, pinned, onHoverChange, onPinnedChange }) {
  const { logout } = useAuth()

  const togglePinned = () => {
    onPinnedChange(!pinned)
    if (pinned) onHoverChange(false)
  }

  return (
    <aside
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={`fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-white/50 bg-primary-container/95 px-3 backdrop-blur-xl transition-[width] duration-300 ease-out dark:border-white/5 dark:bg-[#29263e]/95 md:inset-y-0 md:left-0 md:right-auto md:h-auto md:flex-col md:justify-between md:border-r md:border-t-0 md:px-4 md:py-6 ${expanded ? 'md:w-52 md:shadow-lift' : 'md:w-20'}`}
    >
      <div className="contents md:flex md:w-full md:flex-col md:items-center md:gap-8">
        <div className={`hidden w-full items-center md:flex ${expanded ? 'justify-start' : 'justify-center'}`}>
          <button
            type="button"
            onClick={togglePinned}
            aria-label={pinned ? 'Collapse sidebar' : 'Pin sidebar open'}
            aria-expanded={expanded}
            className={`flex h-12 items-center rounded-2xl bg-ink text-primary-container shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 dark:bg-primary-container dark:text-ink ${expanded ? 'gap-3 px-3' : 'w-12 justify-center'}`}
          >
            <TimerReset className="shrink-0" size={24} />
            {expanded && <span className="whitespace-nowrap text-lg font-extrabold">TimeFrame</span>}
          </button>
        </div>

        <nav className="contents md:flex md:w-full md:flex-col md:gap-3" aria-label="Primary navigation">
          {navItems.map(({ label, Icon, active }) => (
            <button key={label} type="button" aria-current={active ? 'page' : undefined} aria-label={label} title={expanded ? undefined : label} className={`flex h-11 items-center rounded-xl transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 ${expanded ? 'md:w-full md:gap-3 md:px-3' : 'w-12 justify-center'} ${active ? 'bg-secondary text-white shadow-md' : 'text-[#514a7a] hover:bg-white/30 dark:text-primary-container dark:hover:bg-white/10'}`}>
              <Icon className="shrink-0" size={21} />
              {expanded && <span className="hidden whitespace-nowrap font-semibold md:block">{label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <button onClick={logout} aria-label="Log out" title={expanded ? undefined : 'Log out'} className={`flex h-11 items-center rounded-xl text-[#514a7a] transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 dark:text-primary-container dark:hover:bg-white/10 ${expanded ? 'md:w-full md:gap-3 md:px-3' : 'w-12 justify-center'}`}>
        <LogOut className="shrink-0" size={21} />
        {expanded && <span className="hidden whitespace-nowrap font-semibold md:block">Log out</span>}
      </button>
    </aside>
  )
}
