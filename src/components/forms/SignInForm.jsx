import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import Input from '../common/Input'

export default function SignInForm() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    setError('')
    const result = signIn(form.email, form.password)
    if (!result.ok) return setError(result.error)
    navigate('/dashboard', { replace: true })
  }

  return (
    <form className="space-y-5" onSubmit={submit} noValidate>
      <Input
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={form.email}
        onChange={(event) => setForm({ ...form, email: event.target.value })}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={form.password}
        onChange={(event) => setForm({ ...form, password: event.target.value })}
        required
      />
      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </p>
      )}
      <Button type="submit" className="w-full">
        Sign in
      </Button>
      <p className="text-center text-sm text-muted dark:text-white/60">
        New to Timely?{' '}
        <Link
          className="font-bold text-secondary hover:underline dark:text-primary-container"
          to="/signup"
        >
          Create an account
        </Link>
      </p>
    </form>
  )
}
