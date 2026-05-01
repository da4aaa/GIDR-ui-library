import type { Meta, StoryObj } from '@storybook/react'
import { AIThinkingState } from './AIThinkingState'

const meta: Meta<typeof AIThinkingState> = {
  title: 'Components/Chat/AIThinkingState',
  component: AIThinkingState,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof AIThinkingState>

export const Default: Story = {}
