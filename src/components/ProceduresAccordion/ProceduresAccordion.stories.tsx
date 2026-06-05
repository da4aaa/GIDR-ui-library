import type { Meta, StoryObj } from '@storybook/react'
import { ProceduresAccordion } from './ProceduresAccordion'

/**
 * ProceduresAccordion — collapsible panel that reveals available procedures in a chat or detail context. Header shows the GIDR logo and a procedure count.
 *
 * ## Props
 * - `count`      — number of available procedures shown in the header row.
 * - `isExpanded` — controlled expanded state.
 * - `onToggle`   — called when the header row is clicked.
 * - `children`   — content rendered when expanded (typically a list of ProcedureCard components).
 *
 * ## Rules
 * - Fully controlled — manage isExpanded in the parent.
 * - children only render when isExpanded=true.
 * - Used inside an AIMessage or chat footer when the AI has identified relevant procedures.
 */
const meta: Meta<typeof ProceduresAccordion> = {
  title: 'Components/ProceduresAccordion',
  component: ProceduresAccordion,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6 max-w-md"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof ProceduresAccordion>

export const Collapsed: Story = {
  args: { count: 4, isExpanded: false, onToggle: () => {} },
}

export const Expanded: Story = {
  args: {
    count: 4,
    isExpanded: true,
    onToggle: () => {},
    children: <p className="text-body font-body text-neutral-700">Procedure list here</p>,
  },
}
