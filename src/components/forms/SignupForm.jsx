import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import Input from '../common/Input'

export default function SignupForm() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value })
  const submit = (event) => {
    event.preventDefault()
    if (form.name.trim().length < 2) return setError('Please enter your full name.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email address.')
    if (form.password.length < 8) return setError('Password must be at least 8 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    const result = signup(form)
    if (!result.ok) return setError(result.error)
    navigate('/dashboard', { replace: true })
  }

  return (
    <form className="space-y-4" onSubmit={submit} noValidate>
      <Input
        label="Full Name"
        name="name"
        autoComplete="name"
        placeholder="Alex Morgan"
        value={form.name}
        onChange={update('name')}
        required
      />
      <Input
        label="Work Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={form.email}
        onChange={update('email')}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="8+ characters"
          value={form.password}
          onChange={update('password')}
          required
        />
        <Input
          label="Confirm Password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat password"
          value={form.confirm}
          onChange={update('confirm')}
          required
        />
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
        </p>
      )}
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <p className="text-center text-sm text-muted dark:text-white/60">
        Already have an account?{' '}
        <Link
          className="font-bold text-secondary hover:underline dark:text-primary-container"
          to="/signin"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
