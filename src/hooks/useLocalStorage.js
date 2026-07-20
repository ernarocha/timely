import { useCallback, useEffect, useState } from 'react'
import { watchStorage } from '../utils/storage'

export function useLocalStorage({ read, write, storageKey }) {
  const [value, setValueState] = useState(read)

  const setValue = useCallback(
    (next) => {
      setValueState((current) => {
        const resolved = typeof next === 'function' ? next(current) : next
        write(resolved)
        return resolved
      })
    },
    [write],
  )

  useEffect(
    () =>
      watchStorage((key) => {
        if (key === storageKey) setValueState(read())
      }),
    [read, storageKey],
  )

  return [value, setValue]
}
