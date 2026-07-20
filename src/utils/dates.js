import { addDays, endOfWeek, format, isSameDay, startOfWeek } from 'date-fns'

export const getWeekStart = (date = new Date()) => startOfWeek(date, { weekStartsOn: 1 })
export const getWeekEnd = (date = new Date()) => endOfWeek(date, { weekStartsOn: 1 })
export const weekDays = (weekStart) =>
  Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
export const isToday = (date) => isSameDay(date, new Date())
export const weekLabel = (weekStart) => {
  const end = addDays(weekStart, 6)
  return weekStart.getMonth() === end.getMonth()
    ? `${format(weekStart, 'MMMM d')}–${format(end, 'd, yyyy')}`
    : `${format(weekStart, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`
}
