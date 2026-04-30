import type { Meta, StoryObj } from '@storybook/react'
import { Wrench } from 'lucide-react'
import { QuickReplyChip } from './QuickReplyChip'

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
