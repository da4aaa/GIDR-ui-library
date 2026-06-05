import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'
import { Button } from '../Button/Button'

/**
 * Dialog — modal overlay panel for confirmations, detail views, and forms. Fixed width 600px; height grows with content.
 *
 * ## Props
 * - `title`    — dialog heading.
 * - `children` — content slot. No fixed height or scrolling; grows to fit.
 * - `actions`  — ReactNode in the footer, right-aligned. Typically: `<Button variant="link">Cancel</Button> + <Button variant="filled">Confirm</Button>`.
 * - `onClose`  — renders a × button in the top-right corner when provided.
 *
 * ## Rules
 * - Presentational only — does not manage open/closed state. Conditionally render from the parent.
 * - The backdrop/overlay is not included — add it in the parent if needed.
 * - Pair a destructive confirm action with color="error" on the Button.
 * - Always provide a cancel path (via actions or onClose) so users can escape.
 */
const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  decorators: [(Story) => (
    <div className="min-h-[300px] flex items-center justify-center p-12 bg-bg-page-light">
      <Story />
    </div>
  )],
}
export default meta
type Story = StoryObj<typeof Dialog>

const defaultActions = (
  <>
    <Button variant="link">Cancel</Button>
    <Button variant="filled" size="m">Confirm</Button>
  </>
)

export const Default: Story = {
  args: {
    title: 'Dialog Title',
    onClose: () => {},
    actions: defaultActions,
    children: (
      <p className="text-body font-body text-muted">
        This is the content area. It grows to fit whatever you put here.
      </p>
    ),
  },
}

export const NoCloseButton: Story = {
  args: {
    title: 'Confirm Action',
    actions: defaultActions,
    children: (
      <p className="text-body font-body text-muted">
        Are you sure you want to continue? This action cannot be undone.
      </p>
    ),
  },
}

export const TallContent: Story = {
  args: {
    title: 'System Details',
    onClose: () => {},
    actions: defaultActions,
    children: (
      <div className="flex flex-col gap-3">
        <p className="text-body font-body text-muted">Machine: Konica Minolta C360i</p>
        <p className="text-body font-body text-muted">Serial: KM-C360-20419</p>
        <p className="text-body font-body text-muted">Last service: 14 days ago</p>
        <p className="text-body font-body text-muted">Open tickets: 2</p>
        <p className="text-body font-body text-muted">Error history: C-0210, C-0214</p>
        <p className="text-body-sm font-body text-muted">
          Note: This machine has had recurring fuser issues since the last PM cycle.
          Consider replacing the fuser unit if the error recurs.
        </p>
      </div>
    ),
  },
}

export const NoActions: Story = {
  args: {
    title: 'Information',
    onClose: () => {},
    children: (
      <p className="text-body font-body text-muted">
        This dialog has no action buttons — close-only.
      </p>
    ),
  },
}
