import type { Meta, StoryObj } from '@storybook/react'
import { UserMessage } from './UserMessage'

const meta: Meta<typeof UserMessage> = {
  title: 'Components/Chat/UserMessage',
  component: UserMessage,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6 max-w-lg"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof UserMessage>

export const TextOnly: Story = {
  args: { message: 'How often should I replace the HVAC filters in zone 3?', type: 'text' },
}

export const WithAttachments: Story = {
  args: {
    message: 'Here is the filter I found — is this the right part?',
    type: 'text',
    attachments: [
      { src: 'https://placehold.co/50x50', alt: 'Filter photo' },
      { src: 'https://placehold.co/50x50', alt: 'Filter label' },
    ],
  },
}

export const AttachmentOnly: Story = {
  args: {
    type: 'attachment',
    attachments: [{ src: 'https://placehold.co/50x50', alt: 'Attachment' }],
  },
}
