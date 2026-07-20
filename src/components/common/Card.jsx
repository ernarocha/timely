export default function Card({ as: Element = 'section', className = '', children, ...props }) {
  return (
    <Element
      className={`rounded-3xl border border-white/70 bg-white shadow-ambient dark:border-white/5 dark:bg-midnight-card ${className}`}
      {...props}
    >
      {children}
    </Element>
  )
}
