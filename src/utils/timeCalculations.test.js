import { describe, expect, it } from 'vitest'
import { entriesForWeek, formatHours, hoursByProject, hoursThisWeek, hoursToday } from './timeCalculations'

const entries = [
  { project: 'Website Redesign', hours: 1, startAt: '2026-07-13T09:00:00+08:00' },
  { project: 'Mobile App', hours: 2.5, startAt: '2026-07-15T13:00:00+08:00' },
  { project: 'Website Redesign', hours: 3, startAt: '2026-07-19T10:00:00+08:00' },
  { project: 'Internal', hours: 8, startAt: '2026-07-20T09:00:00+08:00' },
]

describe('time calculations', () => {
  it('includes Monday through Sunday in the selected week', () => {
    const week = entriesForWeek(entries, new Date('2026-07-15T12:00:00+08:00'))
    expect(week).toHaveLength(3)
    expect(hoursThisWeek(entries, new Date('2026-07-15T12:00:00+08:00'))).toBe(6.5)
  })

  it('calculates today independently from the week total', () => {
    expect(hoursToday(entries, new Date('2026-07-15T18:00:00+08:00'))).toBe(2.5)
  })

  it('groups decimal hours by project without duplicating state', () => {
    expect(hoursByProject(entries)).toEqual({
      'Website Redesign': 4,
      'Mobile App': 2.5,
      Internal: 8,
    })
  })

  it('formats whole and decimal hour labels compactly', () => {
    expect(formatHours(4)).toBe('4')
    expect(formatHours(2.55)).toBe('2.6')
  })
})
