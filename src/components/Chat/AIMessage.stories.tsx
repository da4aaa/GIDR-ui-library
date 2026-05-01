import type { Meta, StoryObj } from '@storybook/react'
import { AIMessage } from './AIMessage'

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
