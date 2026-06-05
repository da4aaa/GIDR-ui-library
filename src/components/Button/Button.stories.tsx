import type { Meta, StoryObj } from '@storybook/react'
import { Share2, ArrowRight, X } from 'lucide-react'
import { Button } from './Button'
import { IconButton } from './IconButton'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'stroked', 'ghost', 'link'] },
    size:    { control: 'select', options: ['s', 'm', 'l'] },
    color:   { control: 'select', options: ['default', 'error', 'purple'] },
    iconLeft:  { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
}
export default meta
type Story = StoryObj<typeof Button>

// ─── Sandbox (Controls panel) ─────────────────────────────────────────────────
export const Sandbox: Story = {
  args: { variant: 'filled', size: 'm', color: 'default', children: 'Button' },
}

// ─── Helper ──────────────────────────────────────────────────────────────────
type BtnVariant = 'filled' | 'stroked' | 'ghost' | 'link'
type BtnColor   = 'default' | 'error' | 'purple'

const COLORS: BtnColor[]  = ['default', 'error', 'purple']
const COLOR_LABELS: Record<BtnColor, string> = { default: 'Default', error: 'Error', purple: 'Purple' }

function Grid({ variant }: { variant: BtnVariant }) {
  return (
    <div className="flex flex-col gap-8 p-4 bg-neutral-100 rounded-xl">
      {COLORS.map(color => (
        <div key={color} className="flex flex-col gap-3">
          <p className="text-caption-md text-muted uppercase tracking-wide">{COLOR_LABELS[color]}</p>

          {/* Sizes — no icon */}
          <div className="flex gap-3 items-center flex-wrap">
            <Button variant={variant} size="l" color={color}>Button L</Button>
            <Button variant={variant} size="m" color={color}>Button M</Button>
            <Button variant={variant} size="s" color={color}>Button S</Button>
          </div>

          {/* Icon Left */}
          <div className="flex gap-3 items-center flex-wrap">
            <Button variant={variant} size="l" color={color} iconLeft={Share2}>Icon Left L</Button>
            <Button variant={variant} size="m" color={color} iconLeft={Share2}>Icon Left M</Button>
            <Button variant={variant} size="s" color={color} iconLeft={Share2}>Icon Left S</Button>
          </div>

          {/* Icon Right */}
          <div className="flex gap-3 items-center flex-wrap">
            <Button variant={variant} size="l" color={color} iconRight={ArrowRight}>Icon Right L</Button>
            <Button variant={variant} size="m" color={color} iconRight={ArrowRight}>Icon Right M</Button>
            <Button variant={variant} size="s" color={color} iconRight={ArrowRight}>Icon Right S</Button>
          </div>

          {/* Disabled */}
          <div className="flex gap-3 items-center flex-wrap">
            <Button variant={variant} size="l" color={color} disabled>Disabled L</Button>
            <Button variant={variant} size="m" color={color} disabled>Disabled M</Button>
            <Button variant={variant} size="s" color={color} disabled>Disabled S</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Per-type stories ─────────────────────────────────────────────────────────
export const Filled: Story = {
  render: () => <Grid variant="filled" />,
}

export const Stroked: Story = {
  render: () => <Grid variant="stroked" />,
}

export const Ghost: Story = {
  render: () => <Grid variant="ghost" />,
}

export const Link: Story = {
  render: () => <Grid variant="link" />,
}

// ─── All variants at a glance ─────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {(['filled', 'stroked', 'ghost', 'link'] as BtnVariant[]).map(variant => (
        <div key={variant} className="flex flex-col gap-2">
          <p className="text-caption-md text-muted uppercase tracking-wide">{variant}</p>
          <div className="flex gap-3 items-center flex-wrap">
            <Button variant={variant} size="m">Default</Button>
            <Button variant={variant} size="m" color="error">Error</Button>
            <Button variant={variant} size="m" color="purple">Purple</Button>
            <Button variant={variant} size="m" disabled>Disabled</Button>
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Icon Buttons ─────────────────────────────────────────────────────────────
export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <IconButton icon={X} label="Close" size="xs" />
      <IconButton icon={X} label="Close" size="s" />
      <IconButton icon={X} label="Close" size="m" />
      <IconButton icon={X} label="Close" size="l" />
    </div>
  ),
}
