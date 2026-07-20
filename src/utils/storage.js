const KEYS = {
  users: 'tf_users',
  session: 'tf_session',
  entries: 'tf_entries',
  theme: 'tf_theme',
}

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* Storage can be unavailable in private mode. */
  }
}

export const getUsers = () => {
  const value = readJSON(KEYS.users, [])
  return Array.isArray(value) ? value : []
}
export const saveUsers = (users) => writeJSON(KEYS.users, Array.isArray(users) ? users : [])
export const getSession = () => readJSON(KEYS.session, null)
export const setSession = (session) => writeJSON(KEYS.session, session)
export const clearSession = () => {
  try {
    localStorage.removeItem(KEYS.session)
  } catch {
    /* noop */
  }
}
export const getEntries = () => {
  const value = readJSON(KEYS.entries, [])
  return Array.isArray(value) ? value : []
}
export const saveEntries = (entries) =>
  writeJSON(KEYS.entries, Array.isArray(entries) ? entries : [])
export const getTheme = () => {
  try {
    return localStorage.getItem(KEYS.theme) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}
export const setTheme = (theme) => {
  try {
    localStorage.setItem(KEYS.theme, theme === 'dark' ? 'dark' : 'light')
  } catch {
    /* noop */
  }
}
export const watchStorage = (listener) => {
  const handler = (event) => {
    if (Object.values(KEYS).includes(event.key)) listener(event.key)
  }
  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}
