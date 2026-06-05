import type { Meta, StoryObj } from '@storybook/react'
import { AIMessage } from './AIMessage'

/**
 * AIMessage — GIDR AI response bubble in the chat thread. Wraps the AI's text content and provides copy/feedback/source actions.
 *
 * ## Props
 * - `children`       — ReactNode; the AI's response text or formatted content.
 * - `sourcesCount`   — number of cited sources. Renders a "N sources" link when provided.
 * - `onCopy`         — handler for the copy icon button.
 * - `onThumbsUp`     — handler for thumbs-up feedback.
 * - `onThumbsDown`   — handler for thumbs-down feedback.
 * - `onSourcesClick` — handler for the sources link; typically opens a citations panel.
 *
 * ## Rules
 * - Left-aligned, no bubble background — AI messages render as plain text with a floating action bar below.
 * - Omit sourcesCount when the AI's response has no citations.
 * - All action handlers are optional; only pass the ones relevant to the context.
 */
const meta: Meta<typeof AIMessage> = {
  title: 'Components/Chat/AIMessage',
  component: AIMessage,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6 max-w-lg"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof AIMessage>

export const Default: Story = {
  args: {
    children: 'Based on the AHU maintenance schedule, filters should be replaced every 90 days or when pressure drop exceeds 0.5 in. w.g.',
  },
}

export const WithSources: Story = {
  args: {
    children: 'The recommended procedure involves shutting down the unit before accessing the filter compartment.',
    sourcesCount: 3,
    onSourcesClick: () => {},
  },
}

export const AllActions: Story = {
  args: {
    children: 'Always wear appropriate PPE including gloves and a dust mask when replacing HVAC filters.',
    sourcesCount: 2,
    onCopy: () => {},
    onThumbsUp: () => {},
    onThumbsDown: () => {},
    onSourcesClick: () => {},
  },
}
