import { useEffect, useState } from 'react'
import { addDays, format, isSameDay } from 'date-fns'
import { CalendarRange, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Plus } from 'lucide-react'
import { projectStyle } from '../../data/projects'
import { getWeekStart, isToday, weekDays, weekLabel } from '../../utils/dates'
import { entriesForWeek, formatHours } from '../../utils/timeCalculations'
import Button from '../common/Button'
import Card from '../common/Card'

export default function WeeklyActivity({ entries, selectedWeek, onWeekChange, onAddEntry, onEntrySelect }) {
  const days = weekDays(selectedWeek)
  const visibleEntries = entriesForWeek(entries, selectedWeek)
  const viewingCurrentWeek = isSameDay(selectedWeek, getWeekStart())
  const [expandedDays, setExpandedDays] = useState(() => {
    const currentDay = weekDays(selectedWeek).find(isToday)
    return new Set(currentDay ? [currentDay.toISOString()] : [])
  })

  useEffect(() => {
    const currentDay = weekDays(selectedWeek).find(isToday)
    setExpandedDays(new Set(currentDay ? [currentDay.toISOString()] : []))
  }, [selectedWeek])

  const toggleDay = (dayKey) => {
    setExpandedDays((current) => {
      const next = new Set(current)
      if (next.has(dayKey)) next.delete(dayKey)
      else next.add(dayKey)
      return next
    })
  }

  return (
    <Card className="max-w-[1080px] overflow-hidden xl:flex xl:flex-1 xl:flex-col">
      <div className="flex items-end justify-between gap-2 px-4 pb-3 pt-4 sm:items-center sm:px-6 sm:pb-3 sm:pt-6">
        <div className="min-w-0"><p className="font-mono text-[9px] uppercase tracking-[.14em] text-muted dark:text-white/45 sm:text-[10px] sm:tracking-[.16em]">Weekly activity</p><h2 className="mt-1 whitespace-nowrap text-base font-bold sm:text-2xl">{weekLabel(selectedWeek)}</h2></div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => onWeekChange(getWeekStart())} className="h-9 rounded-full bg-surface-low px-3 text-xs font-semibold transition hover:bg-primary-container/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/50 dark:bg-white/10 dark:hover:bg-white/15 sm:h-10 sm:px-4 sm:text-sm">Today</button>
          <div className="flex rounded-full bg-surface-low p-1 dark:bg-white/10">
            <button aria-label="Previous week" onClick={() => onWeekChange(addDays(selectedWeek, -7))} className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:hover:bg-white/10 sm:h-8 sm:w-8"><ChevronLeft size={17} /></button>
            <button aria-label="Next week" onClick={() => onWeekChange(addDays(selectedWeek, 7))} className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:hover:bg-white/10 sm:h-8 sm:w-8"><ChevronRight size={17} /></button>
          </div>
        </div>
      </div>

      {visibleEntries.length === 0 ? (
        <div className="p-5 sm:p-8 xl:flex xl:flex-1 xl:p-6">
          <div className="flex min-h-64 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-primary-container bg-surface-low/55 px-6 py-10 text-center dark:border-white/10 dark:bg-white/[.025] xl:flex-1 xl:py-6">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-container/45 text-secondary shadow-sm dark:bg-white/10 dark:text-primary-container">
              <CalendarRange size={25} strokeWidth={1.8} />
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[.18em] text-secondary dark:text-primary-container">Nothing logged yet</p>
            <h3 className="mt-2 text-xl font-bold text-ink dark:text-white">{viewingCurrentWeek ? 'Your week is ready.' : 'No entries for this week.'}</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted dark:text-white/50">
              {viewingCurrentWeek ? 'Add your first task and Timely will build your weekly totals automatically.' : 'Return to the current week to record new work with the automatic timestamp.'}
            </p>
            <Button className="mt-5" variant="lime" onClick={viewingCurrentWeek ? onAddEntry : () => onWeekChange(getWeekStart())}>
              {viewingCurrentWeek && <Plus size={18} />}
              {viewingCurrentWeek ? 'Add your first entry' : 'Back to this week'}
            </Button>
          </div>
        </div>
      ) : <div>
        <div className="grid grid-cols-[44px_minmax(0,1fr)_36px] border-b border-line px-2 pb-3 dark:border-white/5 sm:grid-cols-[76px_minmax(0,1fr)_40px] sm:px-6">
          <span aria-hidden="true" />
          <div className="flex min-w-0 gap-3 px-3.5">
            <span className="w-1 shrink-0" aria-hidden="true" />
            <div className="flex min-w-0 flex-1 gap-2 font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-muted dark:text-white/45">
              <span className="min-w-0 flex-1 basis-0">Project</span>
              <span className="min-w-0 flex-1 basis-0 text-center">Task</span>
              <span className="min-w-0 flex-1 basis-0 text-right">Hours</span>
            </div>
          </div>
          <span aria-hidden="true" />
        </div>
        <div className="divide-y divide-line dark:divide-white/5">
        {days.map((day) => {
          const dayEntries = visibleEntries.filter((entry) => isSameDay(new Date(entry.startAt), day)).sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
          const today = isToday(day)
          const dayKey = day.toISOString()
          const expanded = expandedDays.has(dayKey)
          const dayHours = dayEntries.reduce((total, entry) => total + Number(entry.hours || 0), 0)
          return (
            <section key={dayKey} className={`grid grid-cols-[44px_minmax(0,1fr)_36px] items-start gap-2 px-2 py-3 transition-colors duration-200 sm:grid-cols-[76px_minmax(0,1fr)_40px] sm:gap-3 sm:px-6 sm:py-4 ${today ? 'bg-lime/[.045]' : 'hover:bg-surface-low/55 dark:hover:bg-white/[.025]'}`}>
              <div className="flex flex-col items-center gap-0">
                <p className="font-mono text-[10px] uppercase tracking-wide text-muted dark:text-white/45">{format(day, 'EEE')}</p>
                <p className={`mt-1 grid h-9 w-9 place-items-center rounded-full text-lg font-bold ${today ? 'bg-lime text-[#293a00]' : 'bg-primary-container/30 dark:bg-white/[.07]'}`}>{format(day, 'd')}</p>
              </div>

              {dayEntries.length ? <div className="min-w-0 self-center">
                <div aria-hidden={!expanded} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="space-y-2">{dayEntries.map((entry) => {
                      const project = projectStyle(entry.project)
                      return (
                        <button type="button" key={entry.id} disabled={!expanded} tabIndex={expanded ? 0 : -1} onClick={() => onEntrySelect(entry)} aria-label={`View details for ${entry.description}`} className="flex w-full min-w-0 items-center gap-2 rounded-2xl border border-white/80 bg-white px-3 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-ambient focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/60 dark:border-white/5 dark:bg-white/[.055] sm:gap-3 sm:px-3.5">
                          <span className="h-9 w-1 shrink-0 rounded-full" style={{ backgroundColor: project.color }} />
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <div className="min-w-0 flex-1 basis-0"><p className="truncate text-sm font-bold text-ink dark:text-white">{entry.project}</p><p className="mt-0.5 font-mono text-[10px] leading-none text-muted dark:text-white/45">{format(new Date(entry.startAt), 'h:mm a')}</p></div>
                            <span className="min-w-0 flex-1 basis-0 truncate text-center text-xs font-semibold leading-none text-ink dark:text-white">{entry.description}</span>
                            <span className="min-w-0 flex-1 basis-0 text-right font-mono text-xs font-bold leading-none text-ink dark:text-white">{formatHours(entry.hours)}h</span>
                          </div>
                        </button>
                      )
                    })}</div>
                  </div>
                </div>
                <div aria-hidden={expanded} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${expanded ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="flex min-h-11 items-center gap-2 rounded-2xl border border-dashed border-secondary/40 px-4 text-sm text-muted/70 dark:border-primary-container/35 dark:text-white/35"><CalendarRange size={15} /> {dayEntries.length} {dayEntries.length === 1 ? 'entry' : 'entries'} · {formatHours(dayHours)}h logged</div>
                  </div>
                </div>
              </div> : <div className="flex min-h-11 self-center items-center gap-2 rounded-2xl border border-dashed border-line px-4 text-sm text-muted/70 dark:border-white/10 dark:text-white/35"><CalendarRange size={15} /> No time logged</div>}
              {dayEntries.length ? <button type="button" aria-expanded={expanded} aria-label={`${expanded ? 'Hide' : 'View'} ${format(day, 'EEEE')} entries`} title={`${expanded ? 'Hide' : 'View'} entries`} onClick={() => toggleDay(dayKey)} className="mt-3 grid h-9 w-9 place-items-center rounded-full text-secondary transition hover:bg-primary-container/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/50 dark:text-primary-container dark:hover:bg-white/10">{expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button> : <span aria-hidden="true" />}
            </section>
          )
        })}
        </div>
      </div>}
    </Card>
  )
}
