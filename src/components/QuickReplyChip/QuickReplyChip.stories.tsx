import type { Meta, StoryObj } from '@storybook/react'
import { Wrench } from 'lucide-react'
import { QuickReplyChip } from './QuickReplyChip'

/**
 * QuickReplyChip — tappable suggestion pill shown below AI messages. Lets the user reply with a pre-defined option without typing.
 *
 * ## Props
 * - `label`   — the chip's display text.
 * - `state`   — 'default' | 'selected' | 'disabled'.
 *               'selected' = user tapped this chip (filled background).
 *               'disabled' = option no longer valid (e.g. another chip was already selected).
 * - `icon`    — optional LucideIcon before the label.
 * - `onClick` — called when the chip is tapped.
 *
 * ## Rules
 * - After a chip is tapped: set that chip to 'selected', all others to 'disabled'.
 * - Chips are single-use — once a reply is sent, the row becomes static (all disabled).
 * - Render chips in a horizontal flex-wrap row, typically 3–4 chips max.
 */
const meta: Meta<typeof QuickReplyChip> = {
  title: 'Components/QuickReplyChip',
  component: QuickReplyChip,
  tags: ['autodocs'],
  argTypes: { state: { control: 'select', options: ['default','selected','disabled'] } },
}
export default meta
type Story = StoryObj<typeof QuickReplyChip>

export const Default: Story   = { args: { label: 'Yes, confirm', state: 'default' } }
export const Selected: Story  = { args: { label: 'Yes, confirm', state: 'selected' } }
export const Disabled: Story  = { args: { label: 'Yes, confirm', state: 'disabled' } }
export const WithIcon: Story  = { args: { label: 'Schedule service', icon: Wrench, state: 'default' } }

export const ChipRow: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <QuickReplyChip label="Yes, do it" state="default" />
      <QuickReplyChip label="Show me options" state="default" />
      <QuickReplyChip label="Not now" state="default" />
      <QuickReplyChip label="Already done" state="selected" />
    </div>
  ),
}
