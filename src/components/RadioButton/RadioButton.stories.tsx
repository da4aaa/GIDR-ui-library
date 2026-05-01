import type { Meta, StoryObj } from '@storybook/react'
import { RadioButton } from './RadioButton'

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof RadioButton>

export const Default: Story = { args: { label: 'Option A' } }
export const Checked: Story = { args: { label: 'Option A', checked: true, onChange: () => {} } }
export const Disabled: Story = { args: { label: 'Disabled option', disabled: true } }
export const DisabledChecked: Story = { args: { label: 'Disabled checked', disabled: true, checked: true, onChange: () => {} } }
export const WithLabel: Story = { args: { label: 'Notify me by email', checked: false, onChange: () => {} } }

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <RadioButton name="group" label="HVAC procedures" checked onChange={() => {}} />
      <RadioButton name="group" label="Electrical procedures" onChange={() => {}} />
      <RadioButton name="group" label="Plumbing procedures" onChange={() => {}} />
    </div>
  ),
}
