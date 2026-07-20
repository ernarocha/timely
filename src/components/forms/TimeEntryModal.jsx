import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { projects } from '../../data/projects'
import Button from '../common/Button'
import Input from '../common/Input'
import Modal from '../common/Modal'
import Select from '../common/Select'
import Textarea from '../common/Textarea'

const initialForm = () => {
  return { project: '', description: '', hours: '1' }
}

export default function TimeEntryModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [recordedAt, setRecordedAt] = useState(() => new Date())
  useEffect(() => { if (open) { setForm(initialForm()); setError(''); setRecordedAt(new Date()) } }, [open])
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const hours = Number(form.hours)
    if (!form.project) return setError('Select a project for this time entry.')
    if (!form.description.trim()) return setError('Add a short description of the work.')
    if (!Number.isFinite(hours) || hours < 0.25 || hours > 12) return setError('Hours must be between 0.25 and 12.')
    onSave({ project: form.project, description: form.description.trim(), hours, startAt: recordedAt.toISOString() })
    onClose()
  }
  return (
    <Modal open={open} onClose={onClose} title="Add time entry" description="Log the work while it’s fresh.">
      <form className="space-y-5" onSubmit={submit}>
        <div className="space-y-2">
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_128px]">
            <Select
              label="Project"
              name="project"
              value={form.project}
              onChange={(project) => setForm((current) => ({ ...current, project }))}
              placeholder="Select a project"
              options={projects.map((project) => ({ value: project.name, label: project.name, color: project.color }))}
            />
            <Input label="Hours" name="hours" type="number" min="0.25" max="12" step="0.25" className="px-3" value={form.hours} onChange={update('hours')} />
          </div>
          <Textarea label="Description" meta={`${form.description.length}/200`} name="description" placeholder="What did you work on?" maxLength={200} rows={1} value={form.description} onChange={update('description')} />
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-end sm:justify-between">
          <p className="whitespace-nowrap font-mono text-[10px] text-muted dark:text-white/50">{format(recordedAt, 'MMM d, yyyy · h:mm a')}</p>
          <div className="flex gap-3">
            <Button variant="soft" className="flex-1 sm:flex-none" onClick={onClose}>Cancel</Button>
            <Button variant="lime" className="flex-1 sm:flex-none" type="submit"><Plus size={18} /> Save entry</Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
