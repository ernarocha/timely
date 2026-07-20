import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

export default function Select({ label, id, name, value, onChange, options, placeholder = 'Select an option' }) {
  const generatedId = useId()
  const selectId = id || name || generatedId
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    if (!open) return undefined
    const closeOnOutsideClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const choose = (option) => {
    onChange(option.value)
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative min-w-0">
      <span id={`${selectId}-label`} className="mb-2 block text-sm font-semibold text-ink dark:text-white">{label}</span>
      <button
        id={selectId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${selectId}-label ${selectId}`}
        onClick={() => setOpen((current) => !current)}
        className="flex h-12 w-full items-center justify-between gap-3 rounded-xl border border-transparent bg-surface-low px-4 text-left text-ink outline-none transition focus:border-secondary focus:ring-4 focus:ring-primary-container/30 dark:bg-white/[.07] dark:text-white"
      >
        <span className={`flex min-w-0 items-center gap-2.5 truncate ${selected ? '' : 'text-muted/70 dark:text-white/45'}`}>
          {selected?.color && <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />}
          <span className="truncate">{selected?.label || placeholder}</span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-muted transition-transform duration-200 dark:text-white/50 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div role="listbox" aria-labelledby={`${selectId}-label`} className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 origin-top animate-pop overflow-hidden rounded-2xl border border-primary-container/45 bg-white p-1.5 shadow-lift dark:border-white/10 dark:bg-[#2b2b39]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => choose(option)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${option.value === value ? 'bg-primary-container/35 font-semibold dark:bg-white/10' : 'hover:bg-surface-low dark:hover:bg-white/[.07]'}`}
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: option.color }} />
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {option.value === value && <Check size={16} className="shrink-0 text-secondary dark:text-primary-container" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
