import type { Meta, StoryObj } from '@storybook/react'
import { UserMessage } from './UserMessage'

/**
 * UserMessage — right-aligned user message bubble in the chat thread. Supports text, image attachments, and mixed content.
 *
 * ## Props
 * - `message`     — the user's text. Optional when type='attachment'.
 * - `type`        — 'text' (default) | 'attachment'. 'attachment' renders only the first image at 50×50, no bubble.
 * - `attachments` — array of `{ src, alt }`. Shown as 50×50 thumbnails above the message text inside the bubble.
 *
 * ## Rules
 * - Right-aligned by design — do not override the flex justify-end.
 * - type='attachment' renders a bare 50×50 image with no text wrapper.
 * - type='text' with attachments shows thumbnails above the text inside the bubble.
 * - Max bubble width is 80% of the container.
 */
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
