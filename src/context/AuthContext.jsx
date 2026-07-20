import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { clearSession, getSession, getUsers, saveUsers, setSession } from '../utils/storage'

const AuthContext = createContext(null)
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
const normalizeEmail = (email) => email.trim().toLowerCase()
const encodePassword = (password) => btoa(unescape(encodeURIComponent(password)))

function currentUser() {
  const session = getSession()
  return session?.userId ? getUsers().find((candidate) => candidate.id === session.userId) || null : null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(currentUser)

  const login = useCallback((email, password) => {
    const match = getUsers().find((candidate) => candidate.email === normalizeEmail(email) && candidate.password === encodePassword(password))
    if (!match) return { ok: false, error: 'Email or password is incorrect.' }
    setSession({ userId: match.id })
    setUser(match)
    return { ok: true }
  }, [])

  const signup = useCallback(({ name, email, password }) => {
    const users = getUsers()
    const normalized = normalizeEmail(email)
    if (users.some((candidate) => candidate.email === normalized)) return { ok: false, error: 'An account with this email already exists.' }
    const newUser = { id: makeId(), name: name.trim(), email: normalized, password: encodePassword(password) }
    saveUsers([...users, newUser])
    setSession({ userId: newUser.id })
    setUser(newUser)
    return { ok: true }
  }, [])

  const logout = useCallback(() => { clearSession(); setUser(null) }, [])
  const value = useMemo(() => ({ user, login, signup, logout }), [user, login, signup, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
