import { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, error, hint, id, className = '', ...props }, ref) {
  const inputId = id || props.name
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
  return (
    <label className="block min-w-0" htmlFor={inputId}>
      <span className="mb-2 block text-sm font-semibold text-ink dark:text-white">{label}</span>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`h-12 min-w-0 w-full rounded-xl border bg-surface-low px-4 text-ink outline-none transition placeholder:text-muted/60 focus:border-secondary focus:ring-4 focus:ring-primary-container/30 dark:bg-white/[.07] dark:text-white ${error ? 'border-red-500' : 'border-transparent'} ${className}`}
        {...props}
      />
      {(error || hint) && (
        <span
          id={describedBy}
          className={`mt-1.5 block text-xs ${error ? 'text-red-600 dark:text-red-400' : 'text-muted dark:text-white/55'}`}
        >
          {error || hint}
        </span>
      )}
    </label>
  )
})

export default Input
