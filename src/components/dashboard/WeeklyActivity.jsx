import { useEffect, useMemo, useState } from 'react'
import { addDays, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getWeekStart, isToday, weekDays, weekLabel } from '../../utils/dates'
import { entriesForWeek } from '../../utils/timeCalculations'
import Card from '../common/Card'
import ActivityDay from './ActivityDay'
import WeeklyEmptyState from './WeeklyEmptyState'

export default function WeeklyActivity({
  entries,
  selectedWeek,
  onWeekChange,
  onAddEntry,
  onEntrySelect,
}) {
  const days = useMemo(() => weekDays(selectedWeek), [selectedWeek])
  const visibleEntries = useMemo(
    () => entriesForWeek(entries, selectedWeek),
    [entries, selectedWeek],
  )
  const entriesByDay = useMemo(() => {
    const grouped = new Map(days.map((day) => [day.toISOString(), []]))
    visibleEntries.forEach((entry) => {
      const entryDate = new Date(entry.startAt)
      const matchingDay = days.find((day) => isSameDay(day, entryDate))
      if (matchingDay) grouped.get(matchingDay.toISOString()).push(entry)
    })
    grouped.forEach((dayEntries) => {
      dayEntries.sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
    })
    return grouped
  }, [days, visibleEntries])
  const viewingCurrentWeek = isSameDay(selectedWeek, getWeekStart())
  const [expandedDays, setExpandedDays] = useState(() => {
    const currentDay = weekDays(selectedWeek).find(isToday)
    return new Set(currentDay ? [currentDay.toISOString()] : [])
  })

  useEffect(() => {
    const currentDay = days.find(isToday)
    // Expansion is transient per-week UI state, so a week change intentionally resets it to today.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpandedDays(new Set(currentDay ? [currentDay.toISOString()] : []))
  }, [days])

  const returnToCurrentWeek = () => onWeekChange(getWeekStart())
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
        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[.14em] text-muted dark:text-white/45 sm:text-[10px] sm:tracking-[.16em]">
            Weekly activity
          </p>
          <h2 className="mt-1 whitespace-nowrap text-base font-bold sm:text-2xl">
            {weekLabel(selectedWeek)}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={returnToCurrentWeek}
            className="h-9 rounded-full bg-surface-low px-3 text-xs font-semibold transition hover:bg-primary-container/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/50 dark:bg-white/10 dark:hover:bg-white/15 sm:h-10 sm:px-4 sm:text-sm"
          >
            Today
          </button>
          <div className="flex rounded-full bg-surface-low p-1 dark:bg-white/10">
            <button
              aria-label="Previous week"
              onClick={() => onWeekChange(addDays(selectedWeek, -7))}
              className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:hover:bg-white/10 sm:h-8 sm:w-8"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              aria-label="Next week"
              onClick={() => onWeekChange(addDays(selectedWeek, 7))}
              className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:hover:bg-white/10 sm:h-8 sm:w-8"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {visibleEntries.length === 0 ? (
        <WeeklyEmptyState
          viewingCurrentWeek={viewingCurrentWeek}
          onAddEntry={onAddEntry}
          onReturnToCurrentWeek={returnToCurrentWeek}
        />
      ) : (
        <div>
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
              const dayKey = day.toISOString()
              return (
                <ActivityDay
                  key={dayKey}
                  day={day}
                  entries={entriesByDay.get(dayKey)}
                  expanded={expandedDays.has(dayKey)}
                  onToggle={() => toggleDay(dayKey)}
                  onEntrySelect={onEntrySelect}
                />
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}
