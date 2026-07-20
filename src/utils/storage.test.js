import { beforeEach, describe, expect, it, vi } from 'vitest'
import { clearSession, getEntries, getSession, getTheme, getUsers, saveEntries, saveUsers, setSession, setTheme } from './storage'

function createStorage() {
  const values = new Map()
  return {
    getItem: vi.fn((key) => values.has(key) ? values.get(key) : null),
    setItem: vi.fn((key, value) => values.set(key, String(value))),
    removeItem: vi.fn((key) => values.delete(key)),
  }
}

describe('storage boundary', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createStorage())
  })

  it('round-trips typed user, session, and entry data', () => {
    const users = [{ id: 'u1', name: 'Alex' }]
    const entries = [{ id: 'e1', userId: 'u1', hours: 1.5 }]
    saveUsers(users)
    setSession({ userId: 'u1' })
    saveEntries(entries)
    expect(getUsers()).toEqual(users)
    expect(getSession()).toEqual({ userId: 'u1' })
    expect(getEntries()).toEqual(entries)
  })

  it('falls back safely when persisted JSON is malformed', () => {
    localStorage.setItem('tf_users', '{not-json')
    localStorage.setItem('tf_entries', 'null')
    expect(getUsers()).toEqual([])
    expect(getEntries()).toEqual([])
  })

  it('normalizes theme values and clears sessions', () => {
    setTheme('dark')
    expect(getTheme()).toBe('dark')
    setTheme('unexpected')
    expect(getTheme()).toBe('light')
    setSession({ userId: 'u1' })
    clearSession()
    expect(getSession()).toBeNull()
  })
})
