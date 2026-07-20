import { addDays, format, isSameDay } from 'date-fns'
import { CalendarRange, ChevronLeft, ChevronRight } from 'lucide-react'
import { projectStyle } from '../../data/projects'
import { getWeekStart, isToday, weekDays, weekLabel } from '../../utils/dates'
import { entriesForWeek, formatHours } from '../../utils/timeCalculations'
import Card from '../common/Card'

export default function WeeklyActivity({ entries, selectedWeek, onWeekChange }) {
  const days = weekDays(selectedWeek)
  const visibleEntries = entriesForWeek(entries, selectedWeek)

  return (
    <Card className="max-w-[1080px] overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-line p-5 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted dark:text-white/45">Weekly activity</p><h2 className="mt-1 text-xl font-bold sm:text-2xl">{weekLabel(selectedWeek)}</h2></div>
        <div className="flex items-center gap-2">
          <button onClick={() => onWeekChange(getWeekStart())} className="h-10 rounded-full bg-surface-low px-4 text-sm font-semibold transition hover:bg-primary-container/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/50 dark:bg-white/10 dark:hover:bg-white/15">Today</button>
          <div className="flex rounded-full bg-surface-low p-1 dark:bg-white/10">
            <button aria-label="Previous week" onClick={() => onWeekChange(addDays(selectedWeek, -7))} className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:hover:bg-white/10"><ChevronLeft size={17} /></button>
            <button aria-label="Next week" onClick={() => onWeekChange(addDays(selectedWeek, 7))} className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:hover:bg-white/10"><ChevronRight size={17} /></button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-line dark:divide-white/5">
        {days.map((day) => {
          const dayEntries = visibleEntries.filter((entry) => isSameDay(new Date(entry.startAt), day)).sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
          const today = isToday(day)
          return (
            <section key={day.toISOString()} className={`grid gap-3 px-5 py-4 transition-colors duration-200 sm:grid-cols-[76px_minmax(0,1fr)] sm:items-start sm:px-6 ${today ? 'bg-lime/[.045]' : 'hover:bg-surface-low/55 dark:hover:bg-white/[.025]'}`}>
              <div className="flex flex-col items-center gap-0">
                <p className="font-mono text-[10px] uppercase tracking-wide text-muted dark:text-white/45">{format(day, 'EEE')}</p>
                <p className={`mt-1 grid h-9 w-9 place-items-center rounded-full text-lg font-bold ${today ? 'bg-lime text-[#293a00]' : 'bg-primary-container/30 dark:bg-white/[.07]'}`}>{format(day, 'd')}</p>
              </div>

              {dayEntries.length ? <div className="space-y-2">{dayEntries.map((entry) => {
                const project = projectStyle(entry.project)
                return (
                  <article key={entry.id} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/80 bg-white px-3.5 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-ambient dark:border-white/5 dark:bg-white/[.055]">
                    <span className="h-9 w-1 shrink-0 rounded-full" style={{ backgroundColor: project.color }} />
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <div className="min-w-0 flex-1 basis-0"><p className="truncate text-sm font-bold text-ink dark:text-white">{entry.description}</p><p className="mt-0.5 font-mono text-[10px] leading-none text-muted dark:text-white/45">{format(new Date(entry.startAt), 'h:mm a')}</p></div>
                      <span className="min-w-0 flex-1 basis-0 truncate text-center text-xs font-semibold leading-none text-ink dark:text-white">{entry.project}</span>
                      <span className="min-w-0 flex-1 basis-0 text-right font-mono text-xs font-bold leading-none text-ink dark:text-white">{formatHours(entry.hours)}h</span>
                    </div>
                  </article>
                )
              })}</div> : <div className="flex min-h-11 items-center gap-2 rounded-2xl border border-dashed border-line px-4 text-sm text-muted/70 sm:self-center dark:border-white/10 dark:text-white/35"><CalendarRange size={15} /> No time logged</div>}
            </section>
          )
        })}
      </div>
    </Card>
  )
}
