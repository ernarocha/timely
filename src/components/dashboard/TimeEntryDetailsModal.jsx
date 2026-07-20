import { format } from 'date-fns'
import { CalendarDays, Clock3, FolderKanban } from 'lucide-react'
import { projectStyle } from '../../data/projects'
import { formatHours } from '../../utils/timeCalculations'
import Modal from '../common/Modal'

export default function TimeEntryDetailsModal({ entry, onClose }) {
  if (!entry) return null
  const project = projectStyle(entry.project)
  const start = new Date(entry.startAt)

  return (
    <Modal
      open
      title="Time entry details"
      description="A complete view of this logged task."
      onClose={onClose}
    >
      <div className="space-y-4">
        <div className="rounded-2xl bg-surface-low p-4 dark:bg-white/[.055]">
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-muted dark:text-white/45">
            Task
          </p>
          <p className="mt-2 break-words text-lg font-bold leading-snug text-ink [overflow-wrap:anywhere] dark:text-white">
            {entry.description}
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line p-4 dark:border-white/10">
            <dt className="flex items-center gap-2 text-xs font-semibold text-muted dark:text-white/45">
              <FolderKanban size={15} /> Project
            </dt>
            <dd className="mt-3 flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              {entry.project}
            </dd>
          </div>
          <div className="rounded-2xl border border-line p-4 dark:border-white/10">
            <dt className="flex items-center gap-2 text-xs font-semibold text-muted dark:text-white/45">
              <Clock3 size={15} /> Duration
            </dt>
            <dd className="mt-3 font-mono text-sm font-bold text-ink dark:text-white">
              {formatHours(entry.hours)} {Number(entry.hours) === 1 ? 'hour' : 'hours'}
            </dd>
          </div>
        </dl>

        <div className="rounded-2xl border border-line p-4 dark:border-white/10">
          <p className="flex items-center gap-2 text-xs font-semibold text-muted dark:text-white/45">
            <CalendarDays size={15} /> Recorded
          </p>
          <p className="mt-3 text-sm font-bold text-ink dark:text-white">
            {format(start, 'EEEE, MMMM d, yyyy')}
          </p>
          <p className="mt-1 font-mono text-xs text-muted dark:text-white/50">
            {format(start, 'h:mm a')}
          </p>
        </div>
      </div>
    </Modal>
  )
}
