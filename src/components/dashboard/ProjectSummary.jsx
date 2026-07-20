import { FolderKanban } from 'lucide-react'
import Card from '../common/Card'
import { projects } from '../../data/projects'
import { formatHours } from '../../utils/timeCalculations'

export default function ProjectSummary({ totals, label = 'Selected week' }) {
  const rows = projects
    .map((project) => ({ ...project, hours: totals[project.name] || 0 }))
    .filter((project) => project.hours > 0)
    .sort((a, b) => b.hours - a.hours)
  const total = rows.reduce((sum, project) => sum + project.hours, 0)
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.14em] text-muted dark:text-white/45">
            {label}
          </p>
          <h2 className="mt-1 text-lg font-bold">Project summary</h2>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-container/50 text-secondary dark:bg-white/10 dark:text-primary-container">
          <FolderKanban size={19} />
        </span>
      </div>
      {rows.length ? (
        <div className="mt-6 space-y-5">
          {rows.map((project) => (
            <div key={project.name}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="truncate font-semibold">{project.name}</span>
                <span className="shrink-0 font-mono text-xs text-muted dark:text-white/50">
                  {formatHours(project.hours)}h
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-low dark:bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max((project.hours / total) * 100, 6)}%`,
                    background: project.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-surface-low p-5 text-center text-sm text-muted dark:bg-white/5 dark:text-white/50">
          No time logged this week yet.
        </div>
      )}
    </Card>
  )
}
