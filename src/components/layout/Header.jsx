import { useEffect, useRef, useState } from 'react'
import { Moon, Plus, Sun } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import Button from '../common/Button'

export default function Header({ onAddEntry }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const initials = user?.name?.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'U'

  useEffect(() => {
    if (!profileOpen) return undefined
    const closeOnOutsideClick = (event) => {
      if (!profileRef.current?.contains(event.target)) setProfileOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setProfileOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [profileOpen])

  const handleLogout = () => {
    setProfileOpen(false)
    logout()
  }

  return (
    <header className="sticky top-0 z-30 min-h-16 border-b border-white/40 bg-[#f0eef8]/85 px-3 backdrop-blur-xl dark:border-white/5 dark:bg-midnight/85 sm:min-h-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center justify-between gap-3 sm:min-h-20 sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-primary-container dark:bg-primary-container dark:text-ink md:hidden"><span className="font-mono text-sm font-bold">TF</span></span>
          <div className="hidden sm:block">
            <p className="text-lg font-extrabold leading-tight text-ink dark:text-white">Timely</p>
            <p className="hidden truncate text-xs text-muted dark:text-white/50 sm:block">Good to see you, {user?.name?.split(' ')[0]}.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} className="grid h-10 w-10 place-items-center rounded-full bg-primary-container/30 text-ink transition hover:bg-primary-container/55 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 sm:h-11 sm:w-11">
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          {onAddEntry && <Button variant="lime" onClick={onAddEntry} className="min-h-10 rounded-full px-3 sm:min-h-11 sm:px-5"><Plus size={18} /><span className="hidden sm:inline">Add time entry</span><span className="sm:hidden">Add</span></Button>}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 text-ink shadow-sm transition hover:shadow-ambient focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/60 dark:bg-white/10 dark:text-white sm:h-11 sm:w-11"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-[11px] font-bold text-white sm:h-9 sm:w-9 sm:text-xs">{initials}</span>
            </button>

            {profileOpen && (
              <div role="menu" className="absolute right-0 top-[calc(100%+.75rem)] w-48 origin-top-right animate-pop rounded-2xl border border-primary-container/40 bg-white p-2 shadow-lift dark:border-white/10 dark:bg-midnight-card">
                <div className="px-3 pb-2 pt-3">
                  <p className="truncate text-sm font-bold text-ink dark:text-white">{user?.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted dark:text-white/50">{user?.email}</p>
                </div>
                <button type="button" role="menuitem" onClick={handleLogout} className="flex w-full items-center justify-center rounded-xl bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 dark:bg-red-400/10 dark:text-red-300 dark:hover:bg-red-400/15">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
