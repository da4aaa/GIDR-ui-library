import type { Meta, StoryObj } from '@storybook/react'
import { GuidedProcedureCardNew } from './GuidedProcedureCardNew'

const meta: Meta<typeof GuidedProcedureCardNew> = {
  title: 'Components/Cards/GuidedProcedureCardNew',
  component: GuidedProcedureCardNew,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6 max-w-[380px]"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof GuidedProcedureCardNew>

const baseArgs = {
  illustrationType: 'Network' as const,
  title: 'Moving parts and machinery guided procedures',
  description: 'Verify protective equipment before starting field work',
  badges: [
    { label: 'Mandatory', color: 'blue' as const },
    { label: 'Status', color: 'neutral' as const },
  ],
  stepCount: 12,
  estimatedMinutes: 15,
}

export const Default: Story = { args: { ...baseArgs } }
export const Hover: Story = { args: { ...baseArgs, isHovered: true } }
export const Safety: Story = { args: { ...baseArgs, illustrationType: 'Safety' as const } }
export const Mechanical: Story = { args: { ...baseArgs, illustrationType: 'Mechanical' as const } }
export const Electrical: Story = { args: { ...baseArgs, illustrationType: 'Electrical' as const } }
export const HVAC: Story = { args: { ...baseArgs, illustrationType: 'HVAC' as const } }
export const NoTime: Story = { args: { ...baseArgs, estimatedMinutes: undefined } }
export const NoBadges: Story = { args: { ...baseArgs, badges: [] } }
