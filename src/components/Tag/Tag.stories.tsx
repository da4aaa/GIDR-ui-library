import type { Meta, StoryObj } from '@storybook/react'
import { Circle } from 'lucide-react'
import { Tag } from './Tag'

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
