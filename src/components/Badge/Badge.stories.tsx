import type { Meta, StoryObj } from '@storybook/react'
import { Circle } from 'lucide-react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['neutral','green','blue','purple','error'] },
    size:  { control: 'select', options: ['sm','md'] },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { label: 'Active', color: 'green', size: 'sm' } }
export const WithIcon: Story = { args: { label: 'Live', color: 'green', size: 'sm', icon: Circle } }

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      {(['neutral','green','blue','purple','error'] as const).map(color => (
        <Badge key={color} label={color} color={color} size="sm" />
      ))}
    </div>
  ),
}

export const AllColorsWithIcon: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      {(['neutral','green','blue','purple','error'] as const).map(color => (
        <Badge key={color} label={color} color={color} size="sm" icon={Circle} />
      ))}
    </div>
  ),
}

export const BothSizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Badge label="SM badge" color="neutral" size="sm" />
      <Badge label="MD badge" color="neutral" size="md" />
    </div>
  ),
}
