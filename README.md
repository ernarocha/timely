# Timely

Timely is a polished, frontend-only time tracker built to help a team record work in a few clicks. It uses React, Vite, Tailwind CSS, React Router, date-fns, Lucide icons, and browser `localStorage`—no backend or database is required.

## Live demo

[Open Timely on Vercel](https://timely-rho.vercel.app/)

## Features

- Sign up, sign in, stay signed in after refresh, and log out.
- Add a time entry from a modal with a required project, task description, and 0.25 to 8 hours.
- Automatically capture the current date and time when an entry is saved.
- See a Monday–Sunday activity view with recorded time, project, and duration.
- Review the selected week's total and daily average, progress towards a 40-hour weekly target, and totals by project.
- Switch between light and dark mode; the preference persists.
- Use a responsive interface: an expandable desktop sidebar becomes a mobile bottom navigation, and the content reflows for smaller screens.
- Start with a clean current week and clearly labelled sample entries in the previous week, so both empty and populated states are easy to evaluate.

## Requirements

- Node.js `20.19+` or `22.13+`
- npm `10+`
- A modern browser with `localStorage` enabled

## Run locally

```bash
git clone https://github.com/ernarocha/timeframe.git
cd timeframe
npm ci
npm run dev
```

Open the local URL printed by Vite. No environment variables, database setup, or backend service is needed.

To create a production build:

```bash
npm run build
npm run preview
```

To run the automated tests:

```bash
npm test
```

To check code quality and formatting:

```bash
npm run lint
npm run format:check
```

Run `npm run format` to apply the shared Prettier style automatically.

`npm ci` is recommended for a fresh clone because it installs the exact versions recorded in `package-lock.json`.

## Quick evaluation flow

1. Open `/signup` and create an account with a name, email address, and password.
2. Confirm the current week opens with an empty weekly activity view and zeroed totals. Use the previous-week arrow to inspect the labelled sample entries.
3. Select **Add time entry**.
4. Choose a project, enter a task description and hours, then select **Save entry**.
5. The entry appears under today with the time captured when it was saved. The statistics and Project Summary update immediately.
6. Refresh the browser to confirm entries and the active session persist.
7. Toggle dark mode, log out, and open `/dashboard` to confirm the route redirects to sign in.

## How it meets the brief

| Brief requirement  | Timely implementation                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Track time quickly | A persistent header action opens a focused modal with only the three required inputs. Hours starts at one, and the timestamp is automatic. |
| User accounts      | Signup validates the form and prevents duplicate emails. Sign in validates saved credentials; protected routes require an active session.  |
| Time entry fields  | Every entry stores a static-list project, description, decimal hours, automatic `startAt`, and `createdAt` timestamp.                      |
| Weekly work        | A compact Monday–Sunday activity view supports previous/next week navigation and a Today shortcut.                                         |
| Project totals     | The Project Summary groups the selected week's entries and shows each project's hours and proportion.                                      |
| Frontend-only data | All data persists through guarded, namespaced `localStorage` helpers.                                                                      |

## Architecture

The app intentionally keeps state close to where it is used:

- `AuthContext` owns signup, sign in, logout, and session hydration.
- `ThemeContext` owns the persisted light/dark preference.
- `useTimeEntries` loads and saves entries for the signed-in user.
- Pure date and calculation utilities derive weekly entries, daily totals, weekly totals, and project totals instead of storing duplicate calculations in state.
- Reusable Button, Card, Input, Select, and Modal components keep the interface consistent.

All direct browser-storage access is isolated in `src/utils/storage.js`.

| Storage key  | Value                                                                      |
| ------------ | -------------------------------------------------------------------------- |
| `tf_users`   | Array of `{ id, name, email, password }`                                   |
| `tf_session` | `{ userId }` or no session                                                 |
| `tf_entries` | Array of `{ id, userId, project, description, hours, startAt, createdAt }` |
| `tf_theme`   | `light` or `dark`                                                          |

## Assumptions and trade-offs

- This is a frontend-only take-home, so authentication is demonstrative. Passwords are lightly encoded and must not be treated as secure production authentication; a real product needs server-side hashing and secure sessions.
- Accounts, sessions, and entries are local to the current browser and device. They do not synchronize between a laptop and phone because the brief requires `localStorage` with no backend.
- Projects are a pre-filled static list because project administration is outside the requested scope.
- The timestamp is automatic and not editable, matching the requirement that the current date and time be recorded while keeping logging fast.
- Weeks start on Monday, matching the supplied visual reference and common work-planning conventions.
- Each entry accepts 0.25 to 8 hours. This keeps a single task entry practical while still allowing overtime or weekend work through multiple entries.
- Saturday and Sunday remain part of the weekly view and totals because some teams work outside the standard Monday-Friday schedule.
- A 40-hour target is a planning indicator only, not a restriction.
- The current week intentionally starts empty so evaluators can verify the complete add-entry flow. Clearly labelled samples live only in the previous week to demonstrate the populated weekly view.
- Editing, deleting, timers, and cloud sync are deliberately out of scope so the submission stays focused on the stated objective.
