import type { Meta, StoryObj } from '@storybook/react'
import { Search, Eye } from 'lucide-react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-sm p-6"><Story /></div>],
  argTypes: {
    size:  { control: 'select', options: ['sm', 'md'] },
    state: { control: 'select', options: ['default', 'error', 'disabled'] },
  },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: 'Email', placeholder: 'you@example.com', size: 'md' } }
export const WithHelperText: Story = { args: { label: 'Username', placeholder: 'alex_tech', helperText: 'Only letters, numbers and underscores.', size: 'md' } }
export const WithError: Story = { args: { label: 'Email', placeholder: 'you@example.com', error: 'Please enter a valid email address.', size: 'md' } }
export const Disabled: Story = { args: { label: 'Email', placeholder: 'you@example.com', disabled: true, value: 'alex@gidr.ai', size: 'md' } }
export const WithIcons: Story = { args: { label: 'Search', placeholder: 'Search procedures...', iconLeft: Search, iconRight: Eye, size: 'md' } }
export const SmallSize: Story = { args: { placeholder: 'Small input', size: 'sm' } }
