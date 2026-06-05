import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { Dropdown } from '@/components/Dropdown/Dropdown'
import { DropdownRow } from '@/components/Dropdown/DropdownRow'
import { DropdownSection } from '@/components/Dropdown/DropdownSection'

/**
 * Select — dropdown trigger button showing the current selection. Pair with Dropdown for the full select pattern.
 *
 * ## Props
 * - `placeholder`    — shown when no value is selected.
 * - `value`          — the currently selected label string.
 * - `isOpen`         — whether the associated Dropdown is visible. Rotates the chevron.
 * - `disabled`       — disables the trigger button.
 * - `hasAvatar`      — boolean. Shows an Avatar (xxsmall) before the value text.
 * - `avatarInitials` — initials for the avatar. Falls back to the first 2 chars of value.
 * - `onClick`        — called when the trigger is clicked; use to toggle the Dropdown.
 *
 * ## Rules
 * - Select is only the trigger button — render Dropdown separately and manage isOpen in the parent.
 * - Use hasAvatar=true when the selected item represents an organization or person.
 * - See the WithDropdown story for the full composed pattern.
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-xs p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story    = { args: { placeholder: 'Select organization...' } }
export const WithValue: Story  = { args: { value: 'Apollo Office Systems', hasAvatar: true, avatarInitials: 'AO' } }
export const Open: Story       = { args: { placeholder: 'Select organization...', isOpen: true } }
export const Disabled: Story   = { args: { placeholder: 'Select organization...', disabled: true } }

export const WithDropdown: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Select value="Apollo Office Systems" hasAvatar avatarInitials="AO" isOpen />
      <Dropdown>
        <DropdownSection label="My organizations" />
        <DropdownRow label="Apollo Office Systems" type="with-avatar" avatarInitials="AO" state="selected" />
        <DropdownRow label="CBA" type="with-avatar" avatarInitials="CB" />
        <DropdownRow label="BusinessLink" type="with-avatar" avatarInitials="BL" />
      </Dropdown>
    </div>
  ),
}
