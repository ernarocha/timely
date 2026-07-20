import { CalendarRange, Plus } from 'lucide-react'
import Button from '../common/Button'

export default function WeeklyEmptyState({
  viewingCurrentWeek,
  onAddEntry,
  onReturnToCurrentWeek,
}) {
  return (
    <div className="p-5 sm:p-8 xl:flex xl:flex-1 xl:p-6">
      <div className="flex min-h-64 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-primary-container bg-surface-low/55 px-6 py-10 text-center dark:border-white/10 dark:bg-white/[.025] xl:flex-1 xl:py-6">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-container/45 text-secondary shadow-sm dark:bg-white/10 dark:text-primary-container">
          <CalendarRange size={25} strokeWidth={1.8} />
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[.18em] text-secondary dark:text-primary-container">
          Nothing logged yet
        </p>
        <h3 className="mt-2 text-xl font-bold text-ink dark:text-white">
          {viewingCurrentWeek ? 'Your week is ready.' : 'No entries for this week.'}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted dark:text-white/50">
          {viewingCurrentWeek
            ? 'Add your first task and Timely will build your weekly totals automatically.'
            : 'Return to the current week to record new work with the automatic timestamp.'}
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
