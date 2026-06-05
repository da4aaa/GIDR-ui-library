import type { Meta, StoryObj } from '@storybook/react'
import { FileSearch } from 'lucide-react'
import { ProcedureCard } from './ProcedureCard'

/**
 * ProcedureCard — displays a single guided procedure in a list.
 *
 * ## Props
 * - `icon`      — LucideIcon shown in the neutral icon box (32px, accent-3-800 color)
 * - `title`     — procedure name
 * - `description` — one-line summary
 * - `stepCount` — always shown; total steps in the procedure
 * - `runCount`  — optional; number of times this procedure has been run.
 *                 Absent = never started. Present = at least one run recorded.
 * - `badge`     — optional `{ label, color }`. Communicates mandatory status and run state:
 *                   • `{ label: 'Mandatory', color: 'blue' }`    — required procedure, not yet started
 *                   • `{ label: 'In progress', color: 'warning' }` — a run is currently active
 *                   • `{ label: 'Complete', color: 'success' }`  — all runs finished
 *
 * ## States
 * 1. **Never started** — no `runCount`, badge is Mandatory or absent
 * 2. **In progress**   — `runCount` = current run number, badge = In progress
 *                        Only 1 run can be in progress at a time.
 * 3. **Complete**      — `runCount` = total completed runs, badge = Complete
 *
 * ## Hover
 * Managed internally. Pass `isHovered` to force hover state (e.g. in stories or tests).
 */
const meta: Meta<typeof ProcedureCard> = {
  title: 'Components/Cards/ProcedureCard',
  component: ProcedureCard,
  tags: ['autodocs'],
  argTypes: {
    icon:     { table: { disable: true } },
    runCount: { control: 'number' },
    stepCount:{ control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof ProcedureCard>

const base = {
  icon: FileSearch,
  title: 'Equipment inventory check',
  description: 'Verify protective equipment before starting field work',
  stepCount: 12,
}

// ─── Individual named stories (AI-readable) ───────────────────────────────────

/** User has never run this procedure. Mandatory — must be completed. */
export const NeverStarted_Mandatory: Story = {
  args: { ...base, badge: { label: 'Mandatory', color: 'blue' } },
}

/** User has never run this procedure. Optional — no badge shown. */
export const NeverStarted_Optional: Story = {
  args: { ...base },
}

/**
 * User is on their first run. runCount = 1.
 * Only 1 run can be active at a time.
 */
export const InProgress_FirstRun: Story = {
  args: { ...base, runCount: 1, badge: { label: 'In progress', color: 'warning' } },
}

/**
 * User is on run 9 — 8 runs completed, 9th currently in progress.
 * runCount always reflects the current/latest run number.
 */
export const InProgress_MultipleRuns: Story = {
  args: { ...base, runCount: 9, badge: { label: 'In progress', color: 'warning' } },
}

/** User completed their first and only run. */
export const Complete_OneRun: Story = {
  args: { ...base, runCount: 1, badge: { label: 'Complete', color: 'success' } },
}

/** User completed all 9 runs. */
export const Complete_MultipleRuns: Story = {
  args: { ...base, runCount: 9, badge: { label: 'Complete', color: 'success' } },
}

/** Hover state — gradient ring appears outside the card. Works interactively too. */
export const Hovered: Story = {
  args: { ...base, runCount: 1, badge: { label: 'In progress', color: 'warning' }, isHovered: true },
}

