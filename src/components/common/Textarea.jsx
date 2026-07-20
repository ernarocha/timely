import { forwardRef } from 'react'

const Textarea = forwardRef(function Textarea(
  { label, meta, error, hint, id, className = '', onInput, ...props },
  ref,
) {
  const inputId = id || props.name
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
  const resizeToContent = (event) => {
    const field = event.currentTarget
    field.style.height = 'auto'
    field.style.height = `${Math.max(field.scrollHeight, 48)}px`
    onInput?.(event)
  }

  return (
    <label className="block min-w-0" htmlFor={inputId}>
      <span className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-ink dark:text-white">{label}</span>
        {meta && (
          <span className="font-mono text-[10px] text-muted dark:text-white/45">{meta}</span>
        )}
      </span>
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onInput={resizeToContent}
        className={`min-h-12 min-w-0 w-full resize-none overflow-hidden rounded-xl border bg-surface-low px-4 py-3 text-ink outline-none transition-[border-color,box-shadow] [overflow-wrap:anywhere] placeholder:text-muted/60 focus:border-secondary focus:ring-4 focus:ring-primary-container/30 dark:bg-white/[.07] dark:text-white ${error ? 'border-red-500' : 'border-transparent'} ${className}`}
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

export default Textarea
