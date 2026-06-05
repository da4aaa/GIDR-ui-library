import type { Meta, StoryObj } from '@storybook/react'
import { ArrowRight, ArrowUpRight, Plus, Circle } from 'lucide-react'
import { Badge, type BadgeColor, type BadgeSize } from './Badge'

/**
 * Badge — compact inline label for status, category, or count. Used in cards, list rows, system messages, and table cells.
 *
 * ## Props
 * - `label`          — text inside the badge. Omit for icon-only mode.
 * - `color`          — 'brand' | 'success' | 'slate' | 'info' | 'indigo' | 'purple' | 'blue' | 'warning' | 'error' | 'neutral'
 * - `size`           — 'sm'(12px) | 'md'(13px) | 'lg'(14px). Default: 'sm'.
 * - `dot`            — boolean. Adds a colored dot before the label. Mutually exclusive with avatar and iconLeft.
 * - `avatar`         — boolean. Shows an Avatar (xxsmall) before the label.
 * - `avatarSrc`      — image URL for the avatar. Used when avatar=true.
 * - `avatarInitials` — fallback initials when no avatarSrc. Used when avatar=true.
 * - `avatarColor`    — '1'–'5'. Avatar background color. Used when avatar=true.
 * - `iconLeft`       — LucideIcon. Overrides dot and avatar when set.
 * - `iconRight`      — LucideIcon after the label. Overridden by onRemove.
 * - `onRemove`       — adds a × dismiss button; overrides iconRight.
 *
 * ## Rules
 * - dot, avatar, and iconLeft are mutually exclusive — only the first applicable one renders.
 * - onRemove takes priority over iconRight when both are passed.
 * - Omit label for icon-only badges (the padding adjusts automatically).
 * - Color conventions: 'warning' = in-progress, 'success' = complete, 'blue' = mandatory, 'error' = critical.
 */
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color:    { control: 'select', options: ['brand','success','slate','info','indigo','purple','blue','warning','error','neutral'] },
    size:     { control: 'select', options: ['sm','md','lg'] },
    dot:      { control: 'boolean' },
    avatar:   { control: 'boolean' },
    onRemove: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

const COLORS: BadgeColor[] = ['brand','success','slate','info','indigo','purple','blue','warning','error','neutral']
const SIZES:  BadgeSize[]  = ['sm', 'md', 'lg']

// ─── Single ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'In Progress', color: 'brand', size: 'sm' },
}

// ─── All Colors ───────────────────────────────────────────────────────────────

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider">{size}</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <Badge key={color} label={color} color={color} size={size} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Dot ─────────────────────────────────────────────────────────────────────

export const WithDot: Story = {
  name: 'Dot',
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider">{size}</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <Badge key={color} label={color} color={color} size={size} dot />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AVATAR_SRC = 'https://i.pravatar.cc/150?img=3'

export const WithAvatar: Story = {
  name: 'Avatar',
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider">{size}</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <Badge key={color} label={color} color={color} size={size} avatar avatarSrc={AVATAR_SRC} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Dismiss (× close) ───────────────────────────────────────────────────────

export const Dismissible: Story = {
  name: 'X Close',
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider">{size}</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <Badge key={color} label={color} color={color} size={size} onRemove={() => {}} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Icon Left ────────────────────────────────────────────────────────────────

export const WithIconLeft: Story = {
  name: 'Icon Left',
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider">{size}</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <Badge key={color} label={color} color={color} size={size} iconLeft={ArrowUpRight} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Icon Right ───────────────────────────────────────────────────────────────

export const WithIconRight: Story = {
  name: 'Icon Right',
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider">{size}</p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <Badge key={color} label={color} color={color} size={size} iconRight={ArrowRight} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Icon Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon Only',
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col gap-2">
          <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider">{size}</p>
          <div className="flex flex-wrap gap-2 items-center">
            {COLORS.map(color => (
              <Badge key={color} color={color} size={size} iconLeft={Plus} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── All Variants grid ────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="overflow-x-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="font-body text-[11px] text-neutral-400 text-left pr-4 pb-3 font-normal w-20">Color</th>
            {(['Plain','Dot','Avatar','Dismiss','Icon L','Icon R','Only'] as const).map(v => (
              <th key={v} className="font-body text-[11px] text-neutral-400 text-left px-2 pb-3 font-normal">{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COLORS.map(color => (
            <tr key={color}>
              <td className="font-body text-[11px] text-neutral-600 pr-4 py-1.5 capitalize">{color}</td>
              <td className="px-2 py-1.5"><Badge label="Label" color={color} size="md" /></td>
              <td className="px-2 py-1.5"><Badge label="Label" color={color} size="md" dot /></td>
              <td className="px-2 py-1.5"><Badge label="Label" color={color} size="md" avatar avatarSrc={AVATAR_SRC} /></td>
              <td className="px-2 py-1.5"><Badge label="Label" color={color} size="md" onRemove={() => {}} /></td>
              <td className="px-2 py-1.5"><Badge label="Label" color={color} size="md" iconLeft={ArrowUpRight} /></td>
              <td className="px-2 py-1.5"><Badge label="Label" color={color} size="md" iconRight={ArrowRight} /></td>
              <td className="px-2 py-1.5"><Badge color={color} size="md" iconLeft={Circle} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
