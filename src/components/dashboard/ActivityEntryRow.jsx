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
      className="flex w-full min-w-0 items-center gap-2 rounded-2xl border border-white/80 bg-white px-3 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-ambient focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/60 dark:border-white/5 dark:bg-white/[.055] sm:gap-3 sm:px-3.5"
    >
      <span className="h-9 w-1 shrink-0 rounded-full" style={{ backgroundColor: project.color }} />
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="min-w-0 flex-1 basis-0">
          <p className="truncate text-sm font-bold text-ink dark:text-white">{entry.project}</p>
          <p className="mt-0.5 font-mono text-[10px] leading-none text-muted dark:text-white/45">
            {format(new Date(entry.startAt), 'h:mm a')}
          </p>
        </div>
        <span className="min-w-0 flex-1 basis-0 truncate text-center text-xs font-semibold leading-none text-ink dark:text-white">
          {entry.description}
        </span>
        <span className="min-w-0 flex-1 basis-0 text-right font-mono text-xs font-bold leading-none text-ink dark:text-white">
          {formatHours(entry.hours)}h
        </span>
      </div>
    </button>
  )
}
