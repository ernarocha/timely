import { useCallback, useEffect, useState } from 'react'
import { addDays, set } from 'date-fns'
import { getWeekStart } from '../utils/dates'
import { getEntries, saveEntries } from '../utils/storage'

const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`

const legacySampleDescriptions = new Set([
  'Sample · Design review',
  'Sample · Build onboarding flow',
  'Sample · Client feedback',
  'Sample · Responsive QA',
  'Sample · Weekly sync',
])

function makePreviousWeekSamples(userId) {
  const previousWeek = addDays(getWeekStart(), -7)
  const samples = [
    { day: 0, hour: 9, minute: 30, project: 'Website Redesign', description: 'Sample · Design review', hours: 1.5 },
    { day: 1, hour: 13, minute: 0, project: 'Mobile App', description: 'Sample · Build onboarding flow', hours: 2.5 },
    { day: 2, hour: 10, minute: 0, project: 'Client Portal', description: 'Sample · Client feedback', hours: 1 },
    { day: 3, hour: 14, minute: 30, project: 'Website Redesign', description: 'Sample · Responsive QA', hours: 2 },
    { day: 4, hour: 11, minute: 0, project: 'Internal', description: 'Sample · Weekly sync', hours: 0.75 },
  ]
  const createdAt = new Date().toISOString()
  return samples.map((sample) => ({
    id: makeId(),
    userId,
    project: sample.project,
    description: sample.description,
    hours: sample.hours,
    startAt: set(addDays(previousWeek, sample.day), { hours: sample.hour, minutes: sample.minute, seconds: 0, milliseconds: 0 }).toISOString(),
    createdAt,
    isSample: true,
  }))
}

function loadForUser(userId) {
  if (!userId) return []
  const all = getEntries()
  const cleaned = all.filter((entry) => entry.userId !== userId || entry.isSample || !legacySampleDescriptions.has(entry.description))
  const userEntries = cleaned.filter((entry) => entry.userId === userId)
  if (userEntries.some((entry) => entry.isSample)) {
    if (cleaned.length !== all.length) saveEntries(cleaned)
    return userEntries
  }
  const samples = makePreviousWeekSamples(userId)
  saveEntries([...cleaned, ...samples])
  return [...userEntries, ...samples]
}

export function useTimeEntries(userId) {
  const [entries, setEntries] = useState(() => loadForUser(userId))
  useEffect(() => setEntries(loadForUser(userId)), [userId])

  const addEntry = useCallback((data) => {
    const entry = { ...data, id: makeId(), userId, hours: Number(data.hours), createdAt: new Date().toISOString() }
    const all = getEntries()
    saveEntries([...all, entry])
    setEntries((current) => [...current, entry])
    return entry
  }, [userId])

  return { entries, addEntry }
}
