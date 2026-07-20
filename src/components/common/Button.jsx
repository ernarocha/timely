import { forwardRef } from 'react'

const variants = {
  primary: 'bg-secondary text-white shadow-sm hover:-translate-y-0.5 hover:shadow-lift',
  lime: 'bg-lime text-[#243400] shadow-sm hover:-translate-y-0.5 hover:shadow-lift',
  ghost:
    'bg-transparent text-ink hover:bg-primary-container/30 dark:text-white dark:hover:bg-white/10',
  soft: 'bg-primary-container/30 text-ink hover:bg-primary-container/50 dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
}

const Button = forwardRef(function Button(
  { className = '', variant = 'primary', type = 'button', children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-container/60 disabled:pointer-events-none disabled:opacity-55 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
