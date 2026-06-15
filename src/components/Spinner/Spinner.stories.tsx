import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

/**
 * Spinner — the single loading indicator for any page or section. Show it while
 * fetching GIDRs, cards, or any async data. A conic-gradient ring with a fading
 * tail; pairs with an optional label and an optional full-screen scrim.
 *
 * ## Props
 * - `size`       — diameter. Values: 'sm'(16) | 'md'(24) | 'lg'(36) | 'xl'(48). Default 'md'.
 * - `tone`       — arc color. Values: 'brand' | 'muted' | 'foreground' | 'inverse'. Default 'brand'.
 * - `label`      — optional text under the ring (e.g. "Loading GIDRs…"). Renders muted, centered.
 * - `fullScreen` — covers the nearest positioned ancestor with a blurred scrim and centers the spinner.
 *
 * ## Rules
 * - Use ONE Spinner per loading region — never stack multiple.
 * - `fullScreen` needs a `relative` (positioned) ancestor, or it covers the viewport.
 * - Use `tone='inverse'` only on dark/brand backgrounds.
 * - Always pass `label` for loads longer than ~1s so the user knows what's happening.
 */
const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    tone: { control: 'select', options: ['brand', 'muted', 'foreground', 'inverse'] },
    label: { control: 'text' },
    fullScreen: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: { size: 'md', tone: 'brand' },
}

export const WithLabel: Story = {
  args: { size: 'lg', tone: 'brand', label: 'Loading GIDRs…' },
}

export const Small: Story = { args: { size: 'sm', tone: 'muted' } }
export const Large: Story = { args: { size: 'xl', tone: 'brand' } }

/** Page-level load: scrim + blur over a positioned region. */
export const FullScreen: Story = {
  args: { size: 'lg', tone: 'brand', label: 'Loading your workspace…', fullScreen: true },
  render: (args) => (
    <div className="relative h-80 w-full rounded-xl border border-border bg-surface-base p-4">
      <p className="text-[14px] leading-[18px] text-muted">
        Content underneath the scrim — cards, list, whatever is being fetched.
      </p>
      <Spinner {...args} />
    </div>
  ),
}

const SIZES = ['sm', 'md', 'lg', 'xl'] as const
const TONES = ['brand', 'muted', 'foreground'] as const

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider mb-3">Sizes</p>
        <div className="flex items-center gap-8">
          {SIZES.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Spinner size={s} tone="brand" />
              <span className="font-body text-[11px] text-neutral-500 uppercase">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider mb-3">Tones</p>
        <div className="flex items-center gap-8">
          {TONES.map((t) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <Spinner size="lg" tone={t} />
              <span className="font-body text-[11px] text-neutral-500 uppercase">{t}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2 rounded-lg bg-brand p-3">
            <Spinner size="lg" tone="inverse" />
            <span className="font-body text-[11px] text-brand-foreground uppercase">inverse</span>
          </div>
        </div>
      </div>

      <div>
        <p className="font-body text-[11px] text-neutral-500 uppercase tracking-wider mb-3">With label</p>
        <Spinner size="lg" tone="brand" label="Loading GIDRs…" />
      </div>
    </div>
  ),
}
