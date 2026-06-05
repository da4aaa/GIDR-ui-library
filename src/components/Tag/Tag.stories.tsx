import type { Meta, StoryObj } from '@storybook/react'
import { Circle } from 'lucide-react'
import { Tag } from './Tag'

/**
 * Tag — small removable pill for user-applied labels and filterable metadata.
 * Distinct from Badge: Tags are user-generated and removable; Badges are system-defined statuses.
 *
 * ## Props
 * - `label`    — the tag text.
 * - `color`    — 'neutral' | 'green' | 'blue' | 'purple' | 'error'. Default: 'neutral'.
 * - `size`     — 'sm'(11px) | 'md'(12px). Default: 'sm'.
 * - `icon`     — optional LucideIcon before the label.
 * - `onRemove` — adds a × button; call to remove the tag from its list.
 *
 * ## Rules
 * - Use Tag for user-applied labels (procedure categories, filter chips).
 * - Use Badge for system statuses (in-progress, mandatory, complete).
 * - Always pair onRemove with the handler that removes the tag from parent state.
 */
const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['neutral','green','blue','purple','error'] },
    size:  { control: 'select', options: ['sm','md'] },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

export const Removable: Story = { args: { label: 'HVAC', color: 'neutral', size: 'sm', onRemove: () => {} } }
export const WithIcon: Story  = { args: { label: 'HVAC', color: 'blue', size: 'sm', icon: Circle, onRemove: () => {} } }

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      {(['neutral','green','blue','purple','error'] as const).map(color => (
        <Tag key={color} label={color} color={color} size="sm" onRemove={() => {}} />
      ))}
    </div>
  ),
}
