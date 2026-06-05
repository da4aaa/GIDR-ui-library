import type { Meta, StoryObj } from '@storybook/react'
import { AIThinkingState } from './AIThinkingState'

/**
 * AIThinkingState — animated loading indicator shown while the AI is generating a response.
 *
 * ## Props
 * - No configuration props. Drop in with no arguments.
 *
 * ## Rules
 * - Render in place of AIMessage while the response stream is open.
 * - Unmount once the first content chunk arrives; replace with AIMessage.
 */
const meta: Meta<typeof AIThinkingState> = {
  title: 'Components/Chat/AIThinkingState',
  component: AIThinkingState,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof AIThinkingState>

export const Default: Story = {}
