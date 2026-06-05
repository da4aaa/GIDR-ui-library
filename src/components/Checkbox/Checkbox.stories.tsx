import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

/**
 * Checkbox — binary or indeterminate selection control. Used in filter panels, forms, and multi-select lists.
 *
 * ## Props
 * - `label`         — optional text label. Also auto-generates the input id via htmlFor.
 * - `checked`       — controlled checked state.
 * - `indeterminate` — boolean. Shows a dash (–) instead of a checkmark. Use on "select all" rows with partial selection.
 * - `disabled`      — disables interaction and dims the control.
 *
 * ## Rules
 * - indeterminate takes visual priority over checked — if both are true, the dash shows.
 * - Always pass onChange when using checked (controlled mode).
 * - Use indeterminate only on "select all" rows, never on individual items.
 * - Do not use for single-select — use RadioButton instead.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story  = { args: { label: 'Accept terms and conditions' } }
export const Checked: Story    = { args: { label: 'Accept terms and conditions', checked: true, onChange: () => {} } }
export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true } }
export const Disabled: Story   = { args: { label: 'Disabled option', disabled: true } }
export const DisabledChecked: Story = { args: { label: 'Disabled checked', disabled: true, checked: true, onChange: () => {} } }
export const NoLabel: Story    = { args: { checked: true, onChange: () => {} } }

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="HVAC procedures" checked onChange={() => {}} />
      <Checkbox label="Electrical procedures" />
      <Checkbox label="Plumbing procedures" checked onChange={() => {}} />
      <Checkbox label="Unavailable category" disabled />
    </div>
  ),
}
