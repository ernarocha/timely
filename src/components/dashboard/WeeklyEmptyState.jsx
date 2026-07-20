import { CalendarRange, Plus } from 'lucide-react'
import Button from '../common/Button'

export default function WeeklyEmptyState({ weekStatus, onAddEntry, onReturnToCurrentWeek }) {
  const viewingCurrentWeek = weekStatus === 'current'
  const copy = {
    current: {
      eyebrow: 'Nothing logged yet',
      title: 'Your week is ready.',
      description: 'Add your first task and Timely will build your weekly totals automatically.',
    },
    past: {
      eyebrow: 'No activity recorded',
      title: 'No time was logged for this week.',
      description: 'Return to the current week to continue recording your work.',
    },
    future: {
      eyebrow: 'No entries',
      title: 'No time entries for this week.',
      description: 'Timely records work using the current date and time when you save an entry.',
    },
  }[weekStatus]

  return (
    <div className="p-5 sm:p-8 xl:flex xl:flex-1 xl:p-6">
      <div className="flex min-h-64 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-primary-container bg-surface-low/55 px-6 py-10 text-center dark:border-white/10 dark:bg-white/[.025] xl:flex-1 xl:py-6">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-container/45 text-secondary shadow-sm dark:bg-white/10 dark:text-primary-container">
          <CalendarRange size={25} strokeWidth={1.8} />
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[.18em] text-secondary dark:text-primary-container">
          {copy.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-bold text-ink dark:text-white">{copy.title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted dark:text-white/50">
          {copy.description}
        </p>
        <Button
          className="mt-5"
          variant="lime"
          onClick={viewingCurrentWeek ? onAddEntry : onReturnToCurrentWeek}
        >
          {viewingCurrentWeek && <Plus size={18} />}
          {viewingCurrentWeek ? 'Add your first entry' : 'Back to this week'}
        </Button>
      </div>
    </div>
  )
}
