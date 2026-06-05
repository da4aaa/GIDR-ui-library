import type { Meta, StoryObj } from '@storybook/react'
import { SystemMessage } from './SystemMessage'

/**
 * SystemMessage — full-width contextual message injected by the system into the chat thread. Used for procedure events, context anchors, and navigable actions.
 *
 * ## Props
 * - `title`       — message text (e.g. 'Guided procedure started').
 * - `badge`       — optional `{ label, color }`. Colors: 'neutral' | 'green' | 'blue' | 'purple' | 'error'.
 * - `showChevron` — boolean. Adds a right-pointing chevron indicating the row is tappable.
 * - `onClick`     — tap handler. Only meaningful when showChevron=true.
 *
 * ## Rules
 * - Distinct from UserMessage and AIMessage — system messages are thread events, not conversational turns.
 * - Always pair showChevron=true with an onClick handler.
 */
const meta: Meta<typeof SystemMessage> = {
  title: 'Components/Chat/SystemMessage',
  component: SystemMessage,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6 max-w-lg"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof SystemMessage>

export const Default: Story = {
  args: { title: 'AHU Maintenance — Zone 3' },
}

export const WithBadge: Story = {
  args: { title: 'Filter Replacement', badge: { label: 'Active', color: 'success' } },
}

export const WithChevron: Story = {
  args: { title: 'View procedure details', showChevron: true, onClick: () => {} },
}

export const WithBadgeAndChevron: Story = {
  args: {
    title: 'Guided procedure started',
    badge: { label: 'In progress', color: 'blue' },
    showChevron: true,
    onClick: () => {},
  },
}
