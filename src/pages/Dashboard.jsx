import { useMemo, useState } from 'react'
import { Clock3, Sparkles, Target } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import MiniCalendar from '../components/dashboard/MiniCalendar'
import ProjectSummary from '../components/dashboard/ProjectSummary'
import StatCard from '../components/dashboard/StatCard'
import TimeEntryDetailsModal from '../components/dashboard/TimeEntryDetailsModal'
import WeeklyActivity from '../components/dashboard/WeeklyActivity'
import TimeEntryModal from '../components/forms/TimeEntryModal'
import { useAuth } from '../context/AuthContext'
import { useTimeEntries } from '../hooks/useTimeEntries'
import { getWeekStart } from '../utils/dates'
import { entriesForWeek, hoursByProject, sumHours } from '../utils/timeCalculations'

const WEEKLY_HOUR_TARGET = 40

export default function Dashboard() {
  const { user } = useAuth()
  const { entries, addEntry } = useTimeEntries(user.id)
  const [selectedWeek, setSelectedWeek] = useState(getWeekStart)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const metrics = useMemo(() => {
    const selectedEntries = entriesForWeek(entries, selectedWeek)
    const selectedHours = sumHours(selectedEntries)
    return {
      selectedHours,
      dailyAverage: selectedHours / 7,
      selectedProjects: hoursByProject(selectedEntries),
      selectedCount: selectedEntries.length,
    }
  }, [entries, selectedWeek])

  return (
    <DashboardLayout onAddEntry={() => setModalOpen(true)}>
      <main className="mx-auto w-full max-w-[1440px] px-6 py-4 sm:p-6 lg:p-8">
        <div className="mb-6 animate-rise sm:mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-secondary dark:text-primary-container">
            Workspace overview
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-[-.03em] text-ink dark:text-white sm:text-4xl">
            Your week, clearly.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted dark:text-white/55 sm:text-base">
            Log the work, spot the patterns, and keep every project moving.
          </p>
        </div>

        <div className="grid items-start gap-4 sm:gap-6 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-8">
          <aside className="grid gap-5 sm:grid-cols-2 xl:sticky xl:top-28 xl:grid-cols-1">
            <div className="animate-rise [animation-delay:60ms]">
              <MiniCalendar selectedWeek={selectedWeek} onSelectWeek={setSelectedWeek} />
            </div>
            <div className="animate-rise [animation-delay:110ms]">
              <ProjectSummary totals={metrics.selectedProjects} />
            </div>
            <div className="hidden animate-rise rounded-3xl bg-ink p-5 text-white [animation-delay:160ms] dark:bg-primary-container dark:text-ink xl:block">
              <p className="text-lg font-bold">Keep the rhythm.</p>
              <p className="mt-1 text-sm leading-6 text-white/60 dark:text-ink/60">
                {metrics.selectedCount} {metrics.selectedCount === 1 ? 'entry' : 'entries'} in this
                selected week.
              </p>
            </div>
          </aside>

          <section className="min-w-0 space-y-6 xl:flex xl:self-stretch xl:flex-col">
            <div className="grid animate-rise gap-4 [animation-delay:80ms] sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                label="Week total"
                value={metrics.selectedHours}
                comparison="Selected Monday through Sunday"
                icon={Clock3}
              />
              <StatCard
                label="Daily average"
                value={metrics.dailyAverage}
                comparison="Across the selected week"
                icon={Sparkles}
                accent="lime"
              />
              <StatCard
                label="Weekly target"
                value={Math.round((metrics.selectedHours / WEEKLY_HOUR_TARGET) * 100)}
                comparison={`${metrics.selectedHours.toLocaleString(undefined, { maximumFractionDigits: 1 })} of ${WEEKLY_HOUR_TARGET} hrs logged`}
                icon={Target}
                accent="peach"
                unit="% complete"
                progress={(metrics.selectedHours / WEEKLY_HOUR_TARGET) * 100}
              />
            </div>
            <div className="animate-rise [animation-delay:150ms] xl:flex xl:flex-1">
              <WeeklyActivity
                entries={entries}
                selectedWeek={selectedWeek}
                onWeekChange={setSelectedWeek}
                onAddEntry={() => setModalOpen(true)}
                onEntrySelect={setSelectedEntry}
              />
            </div>
          </section>
        </div>
      </main>
      <TimeEntryModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addEntry} />
      <TimeEntryDetailsModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </DashboardLayout>
  )
}
