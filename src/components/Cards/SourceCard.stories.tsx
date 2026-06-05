import type { Meta, StoryObj } from '@storybook/react'
import { SourceCard } from './SourceCard'

/**
 * SourceCard — reference source card shown in AI message citation panels. Links to the document or URL the AI cited.
 *
 * ## Props
 * - `state`   — 'default' | 'hover' | 'active' | 'loading'.
 *               'active' = user selected this source (blue border).
 *               'loading' = content not yet fetched (animated skeleton rows).
 * - `favicon` — URL to site favicon. Falls back to a Database icon.
 * - `domain`  — domain name (e.g. 'support.example.com').
 * - `title`   — document/page title.
 * - `url`     — full URL, shown truncated.
 *
 * ## Rules
 * - Width is fixed at 280px.
 * - State is controlled externally — purely presentational.
 * - Show at most 3–5 source cards per AI message.
 */
const meta: Meta<typeof SourceCard> = {
  title: 'Components/Cards/SourceCard',
  component: SourceCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof SourceCard>

const baseArgs = {
  domain: 'support.example.com',
  title: 'AHU Maintenance Guide — Section 4',
  url: 'https://support.example.com/docs/ahu-maintenance#section-4',
}

export const AllStates: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-start">
      <SourceCard {...baseArgs} state="default" />
      <SourceCard {...baseArgs} state="hover" />
      <SourceCard {...baseArgs} state="active" />
      <SourceCard state="loading" />
    </div>
  ),
}
