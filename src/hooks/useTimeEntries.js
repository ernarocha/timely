import { useCallback, useEffect, useState } from 'react'
import { createPreviousWeekSamples, LEGACY_SAMPLE_DESCRIPTIONS } from '../data/sampleEntries'
import { makeId } from '../utils/id'
import { getEntries, saveEntries } from '../utils/storage'
import { isValidEntryHours, MAX_ENTRY_HOURS, MIN_ENTRY_HOURS } from '../utils/timeEntryValidation'

function loadForUser(userId) {
  if (!userId) return []
  const allEntries = getEntries()

  // Earlier builds could seed samples without isSample; remove only those known legacy
  // descriptions for this user so real entries and other users' data remain untouched.
  const cleanedEntries = allEntries.filter(
    (entry) =>
      entry.userId !== userId ||
      entry.isSample ||
      !LEGACY_SAMPLE_DESCRIPTIONS.has(entry.description),
  )
  const userEntries = cleanedEntries.filter((entry) => entry.userId === userId)

  if (userEntries.some((entry) => entry.isSample)) {
    if (cleanedEntries.length !== allEntries.length) saveEntries(cleanedEntries)
    return userEntries
  }

  const samples = createPreviousWeekSamples(userId)
  saveEntries([...cleanedEntries, ...samples])
  return [...userEntries, ...samples]
}

export function useTimeEntries(userId) {
  const [entries, setEntries] = useState(() => loadForUser(userId))
  // The hook can outlive an auth change, so its browser-backed entries must follow the active user.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setEntries(loadForUser(userId)), [userId])

  const addEntry = useCallback(
    (data) => {
      if (!isValidEntryHours(data.hours)) {
        throw new RangeError(
          `Entry hours must be between ${MIN_ENTRY_HOURS} and ${MAX_ENTRY_HOURS}.`,
        )
      }
      const entry = {
        ...data,
        id: makeId(),
        userId,
        hours: Number(data.hours),
        createdAt: new Date().toISOString(),
      }
      const allEntries = getEntries()
      saveEntries([...allEntries, entry])
      setEntries((current) => [...current, entry])
      return entry
    },
    [userId],
  )

  return { entries, addEntry }
}
