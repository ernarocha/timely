import { ArrowLeft, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import DashboardLayout from '../components/layout/DashboardLayout'

export default function ComingSoon({ title, description, icon: Icon }) {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1440px] items-center justify-center p-4 pb-24 sm:p-6 md:pb-6 lg:p-8">
        <Card className="relative w-full max-w-xl overflow-hidden p-8 text-center sm:p-12">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary-container/25 blur-2xl dark:bg-secondary/20" />
          <div className="relative">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-container/40 text-secondary dark:bg-white/10 dark:text-primary-container">
              <Icon size={28} strokeWidth={1.8} />
            </div>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.18em] text-secondary dark:text-primary-container">
              <Sparkles size={13} /> Coming soon
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-.03em] text-ink dark:text-white">
              {title} is on the way.
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted dark:text-white/55 sm:text-base">
              {description}
            </p>
            <Button variant="soft" className="mt-7" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={17} /> Back to dashboard
            </Button>
          </div>
        </Card>
      </main>
    </DashboardLayout>
  )
}
