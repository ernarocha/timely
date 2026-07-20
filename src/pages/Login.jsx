import { Navigate } from 'react-router-dom'
import { TimerReset } from 'lucide-react'
import LoginForm from '../components/forms/LoginForm'
import Card from '../components/common/Card'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return <AuthShell eyebrow="Welcome back" title="Make every hour count." copy="A calm, clear view of your week—so logging work never gets in the way of doing it." formEyebrow="Account access" formTitle="Sign in to Timely" formCopy="Enter your details to continue to your workspace."><LoginForm /></AuthShell>
}

export function AuthShell({ eyebrow, title, copy, formEyebrow, formTitle, formCopy, children }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-surface px-3 py-6 dark:bg-midnight sm:px-6 sm:py-10">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary-container/45 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lime/20 blur-3xl" />
      <div className="relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_460px]">
        <section className="hidden lg:block">
          <div className="mb-10 flex items-center gap-3 text-xl font-extrabold"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-primary-container dark:bg-primary-container dark:text-ink"><TimerReset /></span>Timely</div>
          <p className="font-mono text-xs uppercase tracking-[.18em] text-secondary dark:text-primary-container">{eyebrow}</p>
          <h1 className="mt-4 max-w-xl text-6xl font-bold leading-[.98] tracking-[-.045em] text-ink dark:text-white">{title}</h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted dark:text-white/60">{copy}</p>
          <div className="mt-10 flex items-center gap-3 font-mono text-xs text-muted dark:text-white/50"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-lime" /> Your week, in focus</div>
        </section>
        <Card className="relative p-5 sm:p-9">
          <div className="mb-7 lg:hidden"><div className="mb-6 flex items-center gap-3 text-xl font-extrabold"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-primary-container dark:bg-primary-container dark:text-ink"><TimerReset size={22} /></span>Timely</div></div>
          <p className="font-mono text-xs uppercase tracking-[.16em] text-secondary dark:text-primary-container">{formEyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold text-ink dark:text-white">{formTitle}</h2>
          <p className="mb-7 mt-2 text-muted dark:text-white/60">{formCopy}</p>
          {children}
        </Card>
      </div>
    </main>
  )
}
