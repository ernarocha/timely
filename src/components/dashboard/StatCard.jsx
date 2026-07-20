import Card from '../common/Card'
import { formatHours } from '../../utils/timeCalculations'

const accentStyles = {
  lavender: 'bg-primary-container text-secondary dark:bg-primary/60 dark:text-primary-container',
  lime: 'bg-lime/60 text-[#4a6800]',
  peach: 'bg-[#ffd9c5] text-[#673c28] dark:bg-[#6a4130] dark:text-[#ffd9c5]',
}

export default function StatCard({ label, value, comparison, icon: Icon, accent = 'lavender', unit = 'hrs', progress }) {
  return (
    <Card className="group flex min-h-28 items-center justify-between overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div>
        <p className="text-sm font-semibold text-muted dark:text-white/55">{label}</p>
        <p className="mt-1 text-3xl font-bold tracking-[-.04em] text-ink dark:text-white">{formatHours(value)}<span className="ml-2 font-mono text-xs font-medium tracking-normal text-muted dark:text-white/50">{unit}</span></p>
        <p className="mt-2 text-xs text-muted dark:text-white/45">{comparison}</p>
        {progress !== undefined && <div className="mt-2 h-1.5 w-full max-w-36 overflow-hidden rounded-full bg-surface-low dark:bg-white/10"><div className="h-full rounded-full bg-[#e89c72] transition-[width] duration-500" style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} /></div>}
      </div>
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition group-hover:scale-105 ${accentStyles[accent]}`}><Icon size={21} /></div>
    </Card>
  )
}
