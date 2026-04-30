import type { Meta, StoryObj } from '@storybook/react'
import { Share2, ArrowRight, X } from 'lucide-react'
import { Button } from './Button'
import { IconButton } from './IconButton'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary','secondary','chip'] },
    size:    { control: 'select', options: ['s','m','l'] },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story    = { args: { variant: 'primary',   children: 'Primary',   size: 'm' } }
export const Secondary: Story  = { args: { variant: 'secondary', children: 'Secondary', size: 'm' } }
export const Chip: Story       = { args: { variant: 'chip',      children: 'Quick reply', size: 's' } }
export const WithIconLeft: Story  = { args: { variant: 'primary', children: 'Share', size: 'm', iconLeft: Share2 } }
export const WithIconRight: Story = { args: { variant: 'secondary', children: 'Next', size: 'm', iconRight: ArrowRight } }
export const Disabled: Story   = { args: { variant: 'primary', children: 'Disabled', size: 'm', disabled: true } }

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Button variant="primary" size="s">Small</Button>
      <Button variant="primary" size="m">Medium</Button>
      <Button variant="primary" size="l">Large</Button>
    </div>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <IconButton icon={X} label="Close" size="xs" />
      <IconButton icon={X} label="Close" size="s" />
      <IconButton icon={X} label="Close" size="m" />
      <IconButton icon={X} label="Close" size="l" />
    </div>
  ),
}
