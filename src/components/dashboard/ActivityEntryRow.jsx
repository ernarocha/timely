import { format } from 'date-fns'
import { projectStyle } from '../../data/projects'
import { formatHours } from '../../utils/timeCalculations'

export default function ActivityEntryRow({ entry, interactive, onSelect }) {
  const project = projectStyle(entry.project)

  return (
    <button
      type="button"
      disabled={!interactive}
      tabIndex={interactive ? 0 : -1}
      onClick={() => onSelect(entry)}
      aria-label={`View details for ${entry.description}`}
      className="flex w-full min-w-0 items-center gap-2 rounded-2xl border border-black/[.035] bg-white px-3 py-3 text-left shadow-[0_5px_18px_rgba(31,41,55,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(31,41,55,0.09)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/60 dark:border-white/10 dark:bg-white/[.055] sm:gap-3 sm:px-3.5 sm:shadow-[0_10px_30px_rgba(31,41,55,0.07)] sm:hover:shadow-[0_16px_38px_rgba(31,41,55,0.1)]"
    >
      <span className="h-9 w-1 shrink-0 rounded-full" style={{ backgroundColor: project.color }} />
      <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_42px] items-center gap-2 sm:grid-cols-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-ink dark:text-white">{entry.project}</p>
          <p className="mt-0.5 font-mono text-[10px] leading-none text-muted dark:text-white/45">
            {format(new Date(entry.startAt), 'h:mm a')}
          </p>
        </div>
        <span className="min-w-0 truncate text-center text-xs font-semibold leading-none text-ink dark:text-white">
          {entry.description}
        </span>
        <span className="min-w-0 text-right font-mono text-xs font-bold leading-none text-ink dark:text-white">
          {formatHours(entry.hours)}h
        </span>
      </div>
    </button>
  )
}
