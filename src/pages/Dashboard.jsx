import { useMemo, useState } from 'react'
import { Clock3, Sparkles, Target } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import MiniCalendar from '../components/dashboard/MiniCalendar'
import ProjectSummary from '../components/dashboard/ProjectSummary'
import StatCard from '../components/dashboard/StatCard'
import WeeklyActivity from '../components/dashboard/WeeklyActivity'
import TimeEntryModal from '../components/forms/TimeEntryModal'
import { useAuth } from '../context/AuthContext'
import { useTimeEntries } from '../hooks/useTimeEntries'
import { getWeekStart } from '../utils/dates'
import { entriesForWeek, hoursByProject, hoursThisWeek, hoursToday } from '../utils/timeCalculations'

const WEEKLY_HOUR_TARGET = 40

export default function Dashboard() {
  const { user } = useAuth()
  const { entries, addEntry } = useTimeEntries(user.id)
  const [selectedWeek, setSelectedWeek] = useState(getWeekStart)
  const [modalOpen, setModalOpen] = useState(false)
  const metrics = useMemo(() => {
    const selectedEntries = entriesForWeek(entries, selectedWeek)
    return {
      thisWeek: hoursThisWeek(entries),
      today: hoursToday(entries),
      selectedProjects: hoursByProject(selectedEntries),
      selectedCount: selectedEntries.length,
    }
  }, [entries, selectedWeek])

  return (
    <DashboardLayout onAddEntry={() => setModalOpen(true)}>
      <main className="mx-auto w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
        <div className="mb-6 animate-rise sm:mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-secondary dark:text-primary-container">Workspace overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-.03em] text-ink dark:text-white sm:text-4xl">Your week, clearly.</h1>
          <p className="mt-2 max-w-xl text-sm text-muted dark:text-white/55 sm:text-base">Log the work, spot the patterns, and keep every project moving.</p>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-8">
          <aside className="grid gap-5 sm:grid-cols-2 xl:sticky xl:top-28 xl:grid-cols-1">
            <MiniCalendar selectedWeek={selectedWeek} onSelectWeek={setSelectedWeek} />
            <ProjectSummary totals={metrics.selectedProjects} />
            <div className="hidden rounded-3xl bg-ink p-5 text-white dark:bg-primary-container dark:text-ink xl:block">
              <Sparkles size={20} className="text-lime dark:text-secondary" />
              <p className="mt-5 text-lg font-bold">Keep the rhythm.</p>
              <p className="mt-1 text-sm leading-6 text-white/60 dark:text-ink/60">{metrics.selectedCount} {metrics.selectedCount === 1 ? 'entry' : 'entries'} in this selected week.</p>
            </div>
          </aside>

          <section className="min-w-0 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard label="Hours this week" value={metrics.thisWeek} comparison="Monday through Sunday" icon={Clock3} />
              <StatCard label="Hours today" value={metrics.today} comparison="Your focused time today" icon={Sparkles} accent="lime" />
              <StatCard label="Weekly target" value={Math.round((metrics.thisWeek / WEEKLY_HOUR_TARGET) * 100)} comparison={`${metrics.thisWeek.toLocaleString(undefined, { maximumFractionDigits: 1 })} of ${WEEKLY_HOUR_TARGET} hrs logged`} icon={Target} accent="peach" unit="% complete" progress={(metrics.thisWeek / WEEKLY_HOUR_TARGET) * 100} />
            </div>
            <WeeklyActivity entries={entries} selectedWeek={selectedWeek} onWeekChange={setSelectedWeek} />
          </section>
        </div>
      </main>
      <TimeEntryModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addEntry} />
    </DashboardLayout>
  )
}
