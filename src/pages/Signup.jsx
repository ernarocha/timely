import { Navigate } from 'react-router-dom'
import SignupForm from '../components/forms/SignupForm'
import { useAuth } from '../context/AuthContext'
import { AuthShell } from './Login'

export default function Signup() {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return (
    <AuthShell
      eyebrow="Start tracking"
      title="Give your week some shape."
      copy="Create your workspace, log your first task, and see where your time goes."
      formEyebrow="New workspace"
      formTitle="Create your account"
      formCopy="Set up your workspace in less than a minute."
    >
      <SignupForm />
    </AuthShell>
  )
}
