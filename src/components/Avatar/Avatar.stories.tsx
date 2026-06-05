// src/components/Avatar/Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Pencil, Camera, Plus } from 'lucide-react'
import { Avatar } from './Avatar'

/**
 * Avatar — circular user/entity representation. Used in profiles, message threads, assignment fields, and dropdown rows.
 *
 * ## Props
 * - `type`           — 'image' | 'letter' | 'empty'. Empty shows a default user icon.
 * - `size`           — 'xxsmall'(24px) | 'xsmall'(32px) | 'small'(48px) | 'medium'(72px) | 'large'(96px) | 'xlarge'(160px)
 * - `color`          — '1'–'5'. Background color for letter/empty variants.
 * - `src`            — Image URL. Only used when type='image'.
 * - `initials`       — 1–2 characters shown uppercase. Only used when type='letter'.
 * - `alt`            — Accessible alt text. Only used when type='image'.
 * - `overlayIcon`    — LucideIcon rendered as an action badge in the bottom-right corner.
 * - `onOverlayClick` — Click handler for the overlay badge. Required when overlayIcon is set.
 * - `overlayLabel`   — Accessible label for the overlay button. Defaults to 'Edit'.
 *
 * ## Rules
 * - xxsmall/xsmall sizes are used inside other components (Badge, DropdownRow). Avoid standalone use at those sizes.
 * - overlayIcon requires onOverlayClick — the badge is a <button> and must be interactive.
 * - Only pass initials when type='letter'; src only when type='image'.
 */
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
