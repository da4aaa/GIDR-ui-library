import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-6"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Tabs>

const defaultTabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'History',  value: 'history' },
  { label: 'Notes',    value: 'notes' },
]

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('overview')
    return <Tabs tabs={defaultTabs} value={active} onChange={setActive} />
  },
}

export const WithDisabled: Story = {
  render: () => {
    const [active, setActive] = useState('overview')
    const tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'History',  value: 'history' },
      { label: 'Offline',  value: 'offline', disabled: true },
    ]
    return <Tabs tabs={tabs} value={active} onChange={setActive} />
  },
}

export const ManyTabs: Story = {
  render: () => {
    const [active, setActive] = useState('morning')
    const tabs = [
      { label: 'Morning triage', value: 'morning' },
      { label: 'Pre-job',        value: 'prejob' },
      { label: 'On-site',        value: 'onsite' },
      { label: 'Close-out',      value: 'closeout' },
    ]
    return <Tabs tabs={tabs} value={active} onChange={setActive} />
  },
}
