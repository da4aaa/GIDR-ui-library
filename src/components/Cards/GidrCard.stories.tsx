import type { Meta, StoryObj } from '@storybook/react'
import { GidrCard } from './GidrCard'

const meta: Meta<typeof GidrCard> = {
  title: 'Components/Cards/GidrCard',
  component: GidrCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof GidrCard>

const baseArgs = {
  category: 'HVAC',
  title: 'Air Handling Unit Maintenance',
  description: 'Step-by-step procedures for inspecting and servicing AHUs.',
  procedureCount: 8,
  jobsInProgress: 3,
}

export const Default: Story = { args: { ...baseArgs } }
export const Hover: Story = { args: { ...baseArgs, isHovered: true } }

export const Grid: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <GidrCard {...baseArgs} />
      <GidrCard {...baseArgs} category="Electrical" title="Panel Inspection Checklist" procedureCount={5} jobsInProgress={2} />
      <GidrCard {...baseArgs} category="Plumbing" title="Pipe Pressure Testing" procedureCount={3} jobsInProgress={1} isHovered />
    </div>
  ),
}
