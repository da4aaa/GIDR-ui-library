import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from 'lucide-react'
import { Dropdown } from './Dropdown'
import { DropdownRow } from './DropdownRow'
import { DropdownSection } from './DropdownSection'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Dropdown>

export const SimpleList: Story = {
  render: () => (
    <Dropdown>
      <DropdownSection label="Options" />
      <DropdownRow label="Option one" />
      <DropdownRow label="Option two" state="selected" />
      <DropdownRow label="Option three" />
      <DropdownRow label="Disabled option" state="disabled" />
    </Dropdown>
  ),
}

export const WithSearch: Story = {
  render: () => (
    <Dropdown hasSearch searchPlaceholder="Search for organization...">
      <DropdownSection label="My organizations" />
      <DropdownRow label="Apollo Office Systems" type="with-avatar" avatarInitials="AO" state="selected" />
      <DropdownRow label="CBA" type="with-avatar" avatarInitials="CB" />
      <DropdownRow label="BusinessLink" type="with-avatar" avatarInitials="BL" />
      <div className="h-px bg-neutral-300 my-2" />
      <DropdownSection label="Invited to organizations" />
      <DropdownRow label="Amisoft" type="with-avatar" avatarInitials="AM" />
    </Dropdown>
  ),
}

export const WithCheckboxes: Story = {
  render: () => (
    <Dropdown>
      <DropdownSection label="Filter by tag" />
      <DropdownRow label="HVAC" type="with-checkbox" state="selected" />
      <DropdownRow label="Electrical" type="with-checkbox" />
      <DropdownRow label="Plumbing" type="with-checkbox" />
    </Dropdown>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <DropdownRow label="Add tag" type="with-icon" icon={Tag} />
    </Dropdown>
  ),
}
