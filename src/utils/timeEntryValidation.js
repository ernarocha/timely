export const MIN_ENTRY_HOURS = 0.25
export const MAX_ENTRY_HOURS = 8

export const isValidEntryHours = (value) => {
  const hours = Number(value)
  return Number.isFinite(hours) && hours >= MIN_ENTRY_HOURS && hours <= MAX_ENTRY_HOURS
}
