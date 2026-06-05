import type { Meta, StoryObj } from '@storybook/react'
import { Search, Eye } from 'lucide-react'
import { Input } from './Input'

/**
 * Input — single-line text field with label, helper text, error state, and icon support.
 *
 * ## Props
 * - `label`      — optional label above the input. Auto-generates the htmlFor/id pair.
 * - `size`       — 'sm'(30px) | 'md'(38px, default).
 * - `state`      — 'default' | 'error' | 'disabled'. Derived automatically from error/disabled props.
 * - `error`      — error string shown below in red. Automatically sets state='error'.
 * - `helperText` — helper string shown below in grey. Hidden when error is present.
 * - `iconLeft`   — LucideIcon inside the left edge of the input border.
 * - `iconRight`  — LucideIcon inside the right edge of the input border.
 * - `disabled`   — sets state='disabled', prevents all interaction.
 *
 * ## Rules
 * - State is derived automatically: disabled → 'disabled', error present → 'error', else 'default'.
 * - Do not pass state='error' manually — just pass the error string.
 * - helperText is hidden when error is set; they share the same slot.
 */
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
