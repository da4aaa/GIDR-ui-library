// src/components/Avatar/Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Pencil, Camera, Plus } from 'lucide-react'
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

export const WithOverlayIcon: Story = {
  name: 'Overlay Icon',
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      {/* All sizes — letter */}
      <div>
        <p className="font-body text-[12px] text-neutral-500 mb-3 uppercase tracking-wider">Letter · all sizes</p>
        <div className="flex items-end gap-6 flex-wrap">
          {(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map(size => (
            <Avatar
              key={size}
              type="letter"
              initials="AT"
              size={size}
              color="2"
              overlayIcon={Pencil}
              overlayLabel="Edit profile"
              onOverlayClick={() => {}}
            />
          ))}
        </div>
      </div>

      {/* All sizes — image */}
      <div>
        <p className="font-body text-[12px] text-neutral-500 mb-3 uppercase tracking-wider">Image · all sizes</p>
        <div className="flex items-end gap-6 flex-wrap">
          {(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map(size => (
            <Avatar
              key={size}
              type="image"
              src="https://i.pravatar.cc/150?img=8"
              size={size}
              overlayIcon={Pencil}
              overlayLabel="Edit photo"
              onOverlayClick={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Different icons */}
      <div>
        <p className="font-body text-[12px] text-neutral-500 mb-3 uppercase tracking-wider">Icon variants · medium</p>
        <div className="flex items-end gap-6 flex-wrap">
          <Avatar type="letter" initials="AT" size="medium" color="2" overlayIcon={Pencil}  overlayLabel="Edit"   onOverlayClick={() => {}} />
          <Avatar type="letter" initials="AT" size="medium" color="3" overlayIcon={Camera}  overlayLabel="Photo"  onOverlayClick={() => {}} />
          <Avatar type="letter" initials="AT" size="medium" color="1" overlayIcon={Plus}    overlayLabel="Add"    onOverlayClick={() => {}} />
        </div>
      </div>
    </div>
  ),
}
