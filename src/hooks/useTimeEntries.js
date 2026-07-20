import { useCallback, useEffect, useState } from 'react'
import { getEntries, saveEntries } from '../utils/storage'

const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`

const legacySampleDescriptions = new Set([
  'Sample · Design review',
  'Sample · Build onboarding flow',
  'Sample · Client feedback',
  'Sample · Responsive QA',
  'Sample · Weekly sync',
])

function loadForUser(userId) {
  if (!userId) return []
  const all = getEntries()
  const cleaned = all.filter((entry) => entry.userId !== userId || !legacySampleDescriptions.has(entry.description))
  if (cleaned.length !== all.length) saveEntries(cleaned)
  return cleaned.filter((entry) => entry.userId === userId)
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
