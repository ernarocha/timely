import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { projects } from '../../data/projects'
import Button from '../common/Button'
import Input from '../common/Input'
import Modal from '../common/Modal'
import Select from '../common/Select'

const initialForm = () => {
  return { project: '', description: '', hours: '1' }
}

export default function TimeEntryModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  useEffect(() => { if (open) { setForm(initialForm()); setError('') } }, [open])
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const hours = Number(form.hours)
    if (!form.project) return setError('Select a project for this time entry.')
    if (!form.description.trim()) return setError('Add a short description of the work.')
    if (!Number.isFinite(hours) || hours < 0.25 || hours > 12) return setError('Hours must be between 0.25 and 12.')
    onSave({ project: form.project, description: form.description.trim(), hours, startAt: new Date().toISOString() })
    onClose()
  }
  return (
    <Modal open={open} onClose={onClose} title="Add time entry" description="Log the work while it’s fresh.">
      <form className="space-y-5" onSubmit={submit}>
        <Select
          label="Project"
          name="project"
          value={form.project}
          onChange={(project) => setForm((current) => ({ ...current, project }))}
          placeholder="Select a project"
          options={projects.map((project) => ({ value: project.name, label: project.name, color: project.color }))}
        />
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_128px]">
          <Input label="Description" name="description" placeholder="What did you work on?" maxLength={80} value={form.description} onChange={update('description')} />
          <Input label="Hours" name="hours" type="number" min="0.25" max="12" step="0.25" className="px-3" value={form.hours} onChange={update('hours')} hint="e.g. 1.5" />
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="lime" type="submit"><Plus size={18} /> Save entry</Button>
        </div>
      </form>
    </Modal>
  )
}
