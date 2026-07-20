import { endOfDay, isWithinInterval, startOfDay } from 'date-fns'
import { getWeekEnd, getWeekStart } from './dates'

export const entriesForWeek = (entries, weekStart) => entries.filter(({ startAt }) => {
  const date = new Date(startAt)
  return !Number.isNaN(date.getTime()) && isWithinInterval(date, { start: getWeekStart(weekStart), end: getWeekEnd(weekStart) })
})

export const hoursThisWeek = (entries, date = new Date()) => sumHours(entriesForWeek(entries, getWeekStart(date)))
export const hoursToday = (entries, date = new Date()) => sumHours(entries.filter(({ startAt }) => {
  const entryDate = new Date(startAt)
  return !Number.isNaN(entryDate.getTime()) && isWithinInterval(entryDate, { start: startOfDay(date), end: endOfDay(date) })
}))
export const hoursByProject = (entries) => entries.reduce((totals, entry) => {
  totals[entry.project] = (totals[entry.project] || 0) + Number(entry.hours || 0)
  return totals
}, {})
export const sumHours = (entries) => entries.reduce((total, entry) => total + Number(entry.hours || 0), 0)
export const formatHours = (hours) => Number(hours || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })
