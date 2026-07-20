import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getTheme, setTheme } from '../utils/storage'

const ThemeContext = createContext(null)
const readTheme = () => getTheme()
const writeTheme = (value) => setTheme(value)

export function ThemeProvider({ children }) {
  const [theme, setThemeValue] = useLocalStorage({
    read: readTheme,
    write: writeTheme,
    storageKey: 'tf_theme',
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])
  const toggleTheme = useCallback(
    () => setThemeValue((current) => (current === 'dark' ? 'light' : 'dark')),
    [setThemeValue],
  )
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
