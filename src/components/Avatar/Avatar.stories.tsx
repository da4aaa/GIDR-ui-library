// src/components/Avatar/Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size:  { control: 'select', options: ['xxsmall','xsmall','small','medium','large','xlarge'] },
    type:  { control: 'select', options: ['image','letter','empty'] },
    color: { control: 'select', options: ['1','2','3','4','5'] },
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Empty: Story = { args: { type: 'empty', size: 'medium' } }
export const Letter: Story = { args: { type: 'letter', initials: 'AT', size: 'medium', color: '2' } }
export const Image: Story = { args: { type: 'image', src: 'https://i.pravatar.cc/150?img=3', size: 'medium' } }

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 flex-wrap">
      {(['xxsmall','xsmall','small','medium','large','xlarge'] as const).map(size => (
        <Avatar key={size} type="letter" initials="AT" size={size} color="2" />
      ))}
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-3">
      {(['1','2','3','4','5'] as const).map(color => (
        <Avatar key={color} type="letter" initials="AB" size="small" color={color} />
      ))}
    </div>
  ),
}
