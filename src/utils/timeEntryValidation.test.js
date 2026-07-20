import { describe, expect, it } from 'vitest'
import { isValidEntryHours } from './timeEntryValidation'

describe('time-entry hour validation', () => {
  it('accepts the supported boundaries and values between them', () => {
    expect(isValidEntryHours(0.25)).toBe(true)
    expect(isValidEntryHours('1.5')).toBe(true)
    expect(isValidEntryHours(8)).toBe(true)
  })

  it('rejects values outside the supported range and invalid input', () => {
    expect(isValidEntryHours(0)).toBe(false)
    expect(isValidEntryHours(8.25)).toBe(false)
    expect(isValidEntryHours('not-a-number')).toBe(false)
  })
})
