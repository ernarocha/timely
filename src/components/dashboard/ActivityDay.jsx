import { format } from 'date-fns'
import { CalendarRange, ChevronDown, ChevronUp } from 'lucide-react'
import { isToday } from '../../utils/dates'
import { formatHours } from '../../utils/timeCalculations'
import ActivityEntryRow from './ActivityEntryRow'

export default function ActivityDay({ day, entries, expanded, onToggle, onEntrySelect }) {
  const today = isToday(day)
  const canCollapse = entries.length > 1
  const isExpanded = !canCollapse || expanded
  const dayHours = entries.reduce((total, entry) => total + Number(entry.hours || 0), 0)

  return (
    <section
      className={`grid grid-cols-[44px_minmax(0,1fr)_36px] items-start gap-2 px-2 py-3 transition-colors duration-200 sm:grid-cols-[76px_minmax(0,1fr)_40px] sm:gap-3 sm:px-6 sm:py-4 ${
        today ? 'bg-lime/[.045]' : 'hover:bg-surface-low/55 dark:hover:bg-white/[.025]'
      }`}
    >
      <div className="flex flex-col items-center gap-0">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted dark:text-white/45">
          {format(day, 'EEE')}
        </p>
        <p
          className={`mt-1 grid h-9 w-9 place-items-center rounded-full text-lg font-bold ${
            today ? 'bg-lime text-[#293a00]' : 'bg-primary-container/30 dark:bg-white/[.07]'
          }`}
        >
          {format(day, 'd')}
        </p>
      </div>

      {entries.length ? (
        <div className="min-w-0 self-center">
          {/* Both states stay mounted so CSS Grid can animate their height without measuring content in JavaScript. */}
          <div
            aria-hidden={!isExpanded}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="space-y-2">
                {entries.map((entry) => (
                  <ActivityEntryRow
                    key={entry.id}
                    entry={entry}
                    interactive={isExpanded}
                    onSelect={onEntrySelect}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            aria-hidden={isExpanded}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              isExpanded ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex min-h-11 items-center gap-2 rounded-2xl border border-dashed border-secondary/40 px-4 text-sm text-muted/70 dark:border-primary-container/35 dark:text-white/35">
                <CalendarRange size={15} />
                {entries.length} entries · {formatHours(dayHours)}h logged
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-11 self-center items-center gap-2 rounded-2xl border border-dashed border-line px-4 text-sm text-muted/70 dark:border-white/10 dark:text-white/35">
          <CalendarRange size={15} /> No time logged
        </div>
      )}

      {canCollapse ? (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Hide' : 'View'} ${format(day, 'EEEE')} entries`}
          title={`${isExpanded ? 'Hide' : 'View'} entries`}
          onClick={onToggle}
          className="mt-3 grid h-9 w-9 place-items-center rounded-full text-secondary transition hover:bg-primary-container/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/50 dark:text-primary-container dark:hover:bg-white/10"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      ) : (
        <span aria-hidden="true" />
      )}
    </section>
  )
}
