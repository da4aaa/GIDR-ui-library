import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

/**
 * Toast — transient notification overlay for operation feedback. Four semantic types map to distinct icons and border colors.
 *
 * ## Props
 * - `type`      — 'success' | 'error' | 'warning' | 'info'. Determines icon, border color, and icon tint.
 * - `title`     — main notification text (bold, always shown).
 * - `message`   — optional secondary detail text.
 * - `action`    — optional `{ label: string; onClick: () => void }`. Renders a text link below the message.
 * - `onDismiss` — renders an × button. Call to remove the toast.
 *
 * ## Rules
 * - Purely presentational — manage show/hide and auto-dismiss timing in the parent (typically a toast queue).
 * - 'success' = completed operation, 'error' = failure, 'warning' = recoverable issue, 'info' = neutral update.
 * - Always provide onDismiss unless the toast auto-dismisses on a timer.
 */
const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-8"><Story /></div>],
  argTypes: { type: { control: 'select', options: ['success','error','warning','info'] } },
}
export default meta
type Story = StoryObj<typeof Toast>

export const Success: Story = { args: { type: 'success', title: 'Ticket closed successfully', message: 'The job has been saved and synced to eAutomate.' } }
export const Error: Story   = { args: { type: 'error',   title: 'Failed to sync', message: 'Could not connect to eAutomate. Try again.' } }
export const Warning: Story = { args: { type: 'warning', title: 'Offline mode active', message: 'Changes will sync when connection is restored.' } }
export const Info: Story    = { args: { type: 'info',    title: 'New procedure available', message: 'HVAC maintenance guide was updated.' } }
export const WithAction: Story = { args: { type: 'success', title: 'Ticket closed', action: { label: 'View ticket', onClick: () => {} }, onDismiss: () => {} } }
export const Dismissible: Story = { args: { type: 'info', title: 'Tip', message: 'Swipe left on a job to see quick actions.', onDismiss: () => {} } }

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toast type="success" title="Success" message="Operation completed." />
      <Toast type="error"   title="Error"   message="Something went wrong." />
      <Toast type="warning" title="Warning" message="Proceed with caution." />
      <Toast type="info"    title="Info"    message="Here is some information." />
    </div>
  ),
}
