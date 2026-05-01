import type { Meta, StoryObj } from '@storybook/react'
import { GuidedProcedureCard } from './GuidedProcedureCard'

const meta: Meta<typeof GuidedProcedureCard> = {
  title: 'Components/Cards/GuidedProcedureCard',
  component: GuidedProcedureCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof GuidedProcedureCard>

const baseArgs = {
  category: 'HVAC',
  title: 'Filter Replacement Walkthrough',
  description: 'Guided steps for replacing HVAC filters across all zones.',
  stepCount: 12,
  estimatedMinutes: 20,
}

export const Default: Story = { args: { ...baseArgs } }
export const Hover: Story = { args: { ...baseArgs, isHovered: true } }
