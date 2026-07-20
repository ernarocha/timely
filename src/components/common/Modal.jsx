import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, description, children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])')].filter((item) => !item.disabled)
        if (!items.length) return
        const first = items[0]
        const last = items.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => panelRef.current?.querySelector('input, select, button')?.focus())
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
      <button aria-label="Close modal" className="absolute inset-0 cursor-default bg-[#171526]/55 backdrop-blur-sm" onClick={onClose} />
      <div ref={panelRef} className="relative max-h-[calc(100vh-2rem)] w-full max-w-[480px] animate-pop overflow-x-hidden overflow-y-auto rounded-4xl border border-primary-container/40 bg-white p-6 shadow-lift dark:border-white/10 dark:bg-midnight-card sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-2xl font-bold text-ink dark:text-white">{title}</h2>
            {description && <p id="modal-description" className="mt-1 text-sm text-muted dark:text-white/60">{description}</p>}
          </div>
          <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-surface-low hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/50 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Close" onClick={onClose}><X size={19} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
