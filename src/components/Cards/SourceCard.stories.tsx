import type { Meta, StoryObj } from '@storybook/react'
import { SourceCard } from './SourceCard'

const meta: Meta<typeof SourceCard> = {
  title: 'Components/Cards/SourceCard',
  component: SourceCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof SourceCard>

const baseArgs = {
  domain: 'support.example.com',
  title: 'AHU Maintenance Guide — Section 4',
  url: 'https://support.example.com/docs/ahu-maintenance#section-4',
}

export const AllStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-start">
      <SourceCard {...baseArgs} state="default" />
      <SourceCard {...baseArgs} state="hover" />
      <SourceCard {...baseArgs} state="active" />
      <SourceCard state="loading" />
    </div>
  ),
}
