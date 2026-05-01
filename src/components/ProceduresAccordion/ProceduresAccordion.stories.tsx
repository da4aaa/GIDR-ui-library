import type { Meta, StoryObj } from '@storybook/react'
import { ProceduresAccordion } from './ProceduresAccordion'

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
