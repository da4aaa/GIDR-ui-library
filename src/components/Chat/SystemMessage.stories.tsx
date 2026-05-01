import type { Meta, StoryObj } from '@storybook/react'
import { SystemMessage } from './SystemMessage'

const meta: Meta<typeof SystemMessage> = {
  title: 'Components/Chat/SystemMessage',
  component: SystemMessage,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6 max-w-lg"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof SystemMessage>

export const Default: Story = {
  args: { title: 'AHU Maintenance — Zone 3' },
}

export const WithBadge: Story = {
  args: { title: 'Filter Replacement', badge: { label: 'Active', color: 'green' } },
}

export const WithChevron: Story = {
  args: { title: 'View procedure details', showChevron: true, onClick: () => {} },
}

export const WithBadgeAndChevron: Story = {
  args: {
    title: 'Guided procedure started',
    badge: { label: 'In progress', color: 'blue' },
    showChevron: true,
    onClick: () => {},
  },
}
