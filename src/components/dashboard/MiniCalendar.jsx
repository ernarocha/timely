import { useEffect, useMemo, useState } from 'react'
import { addMonths, eachDayOfInterval, endOfMonth, format, isSameDay, isSameMonth, isWithinInterval, startOfMonth, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getWeekEnd, getWeekStart } from '../../utils/dates'

export default function MiniCalendar({ selectedWeek, onSelectWeek }) {
  const [month, setMonth] = useState(startOfMonth(selectedWeek))

  useEffect(() => {
    setMonth(startOfMonth(selectedWeek))
  }, [selectedWeek])

  const days = useMemo(() => {
    const first = getWeekStart(startOfMonth(month))
    const last = getWeekEnd(endOfMonth(month))
    return eachDayOfInterval({ start: first, end: last })
  }, [month])
  const weekEnd = getWeekEnd(selectedWeek)

  return (
    <section className="rounded-3xl border border-white/25 bg-primary-container/30 p-5 dark:border-white/5 dark:bg-white/[.06]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">{format(month, 'MMMM yyyy')}</h2>
        <div className="flex gap-1">
          <button aria-label="Previous month" onClick={() => setMonth((value) => subMonths(value, 1))} className="grid h-8 w-8 place-items-center rounded-lg transition hover:bg-white/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/60 dark:hover:bg-white/10"><ChevronLeft size={17} /></button>
          <button aria-label="Next month" onClick={() => setMonth((value) => addMonths(value, 1))} className="grid h-8 w-8 place-items-center rounded-lg transition hover:bg-white/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/60 dark:hover:bg-white/10"><ChevronRight size={17} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-muted dark:text-white/45">{['M','T','W','T','F','S','S'].map((day, i) => <span key={`${day}-${i}`} className="py-1">{day}</span>)}</div>
      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-xs">
        {days.map((day) => {
          const inWeek = isWithinInterval(day, { start: getWeekStart(selectedWeek), end: weekEnd })
          const today = isSameDay(day, new Date())
          return <button key={day.toISOString()} aria-label={format(day, 'MMMM d, yyyy')} onClick={() => onSelectWeek(getWeekStart(day))} className={`mx-auto grid h-8 w-8 place-items-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${today ? 'bg-lime font-bold text-[#293a00]' : inWeek ? 'bg-secondary text-white' : 'hover:bg-white/60 dark:hover:bg-white/10'} ${!isSameMonth(day, month) ? 'opacity-35' : ''}`}>{format(day, 'd')}</button>
        })}
      </div>
    </section>
  )
}
