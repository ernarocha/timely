import { Moon, Plus, Sun } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import Button from '../common/Button'

export default function Header({ onAddEntry }) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="sticky top-0 z-30 min-h-20 border-b border-white/40 bg-[#f0eef8]/85 px-4 backdrop-blur-xl dark:border-white/5 dark:bg-midnight/85 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-20 w-full max-w-[1440px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-primary-container dark:bg-primary-container dark:text-ink md:hidden"><span className="font-mono text-sm font-bold">TF</span></span>
          <div>
            <p className="text-lg font-extrabold leading-tight text-ink dark:text-white">TimeFrame</p>
            <p className="hidden truncate text-xs text-muted dark:text-white/50 sm:block">Good to see you, {user?.name?.split(' ')[0]}.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} className="grid h-11 w-11 place-items-center rounded-full bg-primary-container/30 text-ink transition hover:bg-primary-container/55 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <Button variant="lime" onClick={onAddEntry} className="rounded-full px-4 sm:px-5"><Plus size={18} /><span className="hidden sm:inline">Add time entry</span><span className="sm:hidden">Add</span></Button>
        </div>
      </div>
    </header>
  )
}
