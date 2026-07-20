import { addDays, set } from 'date-fns'
import { getWeekStart } from '../utils/dates'
import { makeId } from '../utils/id'

export const LEGACY_SAMPLE_DESCRIPTIONS = new Set([
  'Sample · Design review',
  'Sample · Build onboarding flow',
  'Sample · Client feedback',
  'Sample · Responsive QA',
  'Sample · Weekly sync',
])

const SAMPLE_TEMPLATES = [
  {
    day: 0,
    hour: 9,
    minute: 30,
    project: 'Website Redesign',
    description: 'Sample · Design review',
    hours: 1.5,
  },
  {
    day: 1,
    hour: 13,
    minute: 0,
    project: 'Mobile App',
    description: 'Sample · Build onboarding flow',
    hours: 2.5,
  },
  {
    day: 2,
    hour: 10,
    minute: 0,
    project: 'Client Portal',
    description: 'Sample · Client feedback',
    hours: 1,
  },
  {
    day: 3,
    hour: 14,
    minute: 30,
    project: 'Website Redesign',
    description: 'Sample · Responsive QA',
    hours: 2,
  },
  {
    day: 4,
    hour: 11,
    minute: 0,
    project: 'Internal',
    description: 'Sample · Weekly sync',
    hours: 0.75,
  },
]

export function createPreviousWeekSamples(userId) {
  // Samples live in the previous week so new users can test the current empty state
  // while still having a populated week to inspect; isSample keeps them identifiable.
  const previousWeek = addDays(getWeekStart(), -7)
  const createdAt = new Date().toISOString()

  return SAMPLE_TEMPLATES.map((sample) => ({
    id: makeId(),
    userId,
    project: sample.project,
    description: sample.description,
    hours: sample.hours,
    startAt: set(addDays(previousWeek, sample.day), {
      hours: sample.hour,
      minutes: sample.minute,
      seconds: 0,
      milliseconds: 0,
    }).toISOString(),
    createdAt,
    isSample: true,
  }))
}
