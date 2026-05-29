import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Design System/Colors',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

// ─── Swatch ──────────────────────────────────────────────────────────────────

function Swatch({ token, hex, textDark = true }: { token: string; hex: string; textDark?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-14 w-full rounded-lg border border-black/10 flex items-end p-2"
        style={{ backgroundColor: hex }}
      >
        <span
          className="font-mono text-[10px] font-semibold leading-none"
          style={{ color: textDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)' }}
        >
          {hex}
        </span>
      </div>
      <span className="font-mono text-[11px] text-neutral-700 leading-tight">{token}</span>
    </div>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-sans font-bold text-[13px] text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">{title}</h3>
      <div className="grid grid-cols-5 gap-3">{children}</div>
    </div>
  )
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Neutral: Story = {
  render: () => (
    <Group title="Neutral">
      <Swatch token="neutral-000" hex="#fbfcfd" />
      <Swatch token="neutral-100" hex="#f0f4f5" />
      <Swatch token="neutral-200" hex="#eaecf0" />
      <Swatch token="neutral-300" hex="#e8ebef" />
      <Swatch token="neutral-400" hex="#d7dce1" />
      <Swatch token="neutral-500" hex="#bac2cb" />
      <Swatch token="neutral-600" hex="#8c9299" />
      <Swatch token="neutral-700" hex="#676c71" />
      <Swatch token="neutral-800" hex="#43474a" textDark={false} />
      <Swatch token="neutral-900" hex="#1a1a1a" textDark={false} />
    </Group>
  ),
}

export const Accent1Teal: Story = {
  name: 'Accent 1 — Teal (Brand)',
  render: () => (
    <Group title="Accent 1 — Teal (Brand primary)">
      <Swatch token="accent-1-50"  hex="#f0fbfb" />
      <Swatch token="accent-1-100" hex="#e0f5f6" />
      <Swatch token="accent-1-200" hex="#b8eced" />
      <Swatch token="accent-1-300" hex="#8de0e2" />
      <Swatch token="accent-1-400" hex="#ccf0ee" />
      <Swatch token="accent-1-500" hex="#33cbcc" />
      <Swatch token="accent-1-600" hex="#00b4c8" />
      <Swatch token="accent-1-700" hex="#008fab" />
      <Swatch token="accent-1-800" hex="#006d8f" textDark={false} />
      <Swatch token="accent-1-900" hex="#004d6e" textDark={false} />
    </Group>
  ),
}

export const Accent2Blue: Story = {
  name: 'Accent 2 — Blue',
  render: () => (
    <Group title="Accent 2 — Blue">
      <Swatch token="accent-2-200" hex="#c7dff5" />
      <Swatch token="accent-2-500" hex="#5baef7" />
      <Swatch token="accent-2-900" hex="#1f95ff" textDark={false} />
    </Group>
  ),
}

export const Accent3Purple: Story = {
  name: 'Accent 3 — Purple',
  render: () => (
    <Group title="Accent 3 — Purple">
      <Swatch token="accent-3-200" hex="#e8d5f6" />
      <Swatch token="accent-3-300" hex="#ead7f4" />
      <Swatch token="accent-3-700" hex="#aa72c5" textDark={false} />
      <Swatch token="accent-3-900" hex="#311f3a" textDark={false} />
      <Swatch token="accent-3-vivid" hex="#a95eff" textDark={false} />
    </Group>
  ),
}

export const ServiceColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Group title="Error / Danger">
        <Swatch token="service-error-200" hex="#fceaea" />
        <Swatch token="service-error-300" hex="#fceeee" />
        <Swatch token="service-error-400" hex="#f8c5c5" />
        <Swatch token="service-error-500" hex="#f29b9b" />
        <Swatch token="service-error-600" hex="#e97070" textDark={false} />
        <Swatch token="service-error-700" hex="#db4545" textDark={false} />
        <Swatch token="service-error-800" hex="#c82020" textDark={false} />
        <Swatch token="service-error-900" hex="#a80000" textDark={false} />
      </Group>
      <Group title="Warning">
        <Swatch token="service-warning-200" hex="#fff8e0" />
        <Swatch token="service-warning-300" hex="#fff3c4" />
        <Swatch token="service-warning-500" hex="#f5c030" />
        <Swatch token="service-warning-800" hex="#c28000" textDark={false} />
      </Group>
      <Group title="Success">
        <Swatch token="service-success-200" hex="#e6f7ed" />
        <Swatch token="service-success-300" hex="#bfe8cd" />
        <Swatch token="service-success-800" hex="#1a7a40" textDark={false} />
        <Swatch token="service-success-900" hex="#0d4f28" textDark={false} />
      </Group>
    </div>
  ),
}

export const Backgrounds: Story = {
  render: () => (
    <Group title="Backgrounds">
      <Swatch token="bg-page-light"  hex="#f0f4f5" />
      <Swatch token="bg-page-darker" hex="#e4ebec" />
    </Group>
  ),
}

export const AvatarColors: Story = {
  render: () => (
    <Group title="Avatar Colors">
      <Swatch token="avatar-1" hex="#e8734a" textDark={false} />
      <Swatch token="avatar-2" hex="#7048c6" textDark={false} />
      <Swatch token="avatar-3" hex="#2d9cdb" textDark={false} />
      <Swatch token="avatar-4" hex="#27ae60" textDark={false} />
      <Swatch token="avatar-5" hex="#eb5757" textDark={false} />
    </Group>
  ),
}

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <div className="flex flex-col gap-8">
      <Group title="Neutral">
        <Swatch token="neutral-000" hex="#fbfcfd" />
        <Swatch token="neutral-100" hex="#f0f4f5" />
        <Swatch token="neutral-200" hex="#eaecf0" />
        <Swatch token="neutral-300" hex="#e8ebef" />
        <Swatch token="neutral-400" hex="#d7dce1" />
        <Swatch token="neutral-500" hex="#bac2cb" />
        <Swatch token="neutral-600" hex="#8c9299" />
        <Swatch token="neutral-700" hex="#676c71" />
        <Swatch token="neutral-800" hex="#43474a" textDark={false} />
        <Swatch token="neutral-900" hex="#1a1a1a" textDark={false} />
      </Group>
      <Group title="Teal — Brand Primary">
        <Swatch token="accent-1-50"  hex="#f0fbfb" />
        <Swatch token="accent-1-100" hex="#e0f5f6" />
        <Swatch token="accent-1-200" hex="#b8eced" />
        <Swatch token="accent-1-400" hex="#ccf0ee" />
        <Swatch token="accent-1-500" hex="#33cbcc" />
        <Swatch token="accent-1-600" hex="#00b4c8" />
        <Swatch token="accent-1-800" hex="#006d8f" textDark={false} />
        <Swatch token="accent-1-900" hex="#004d6e" textDark={false} />
      </Group>
      <Group title="Blue">
        <Swatch token="accent-2-200" hex="#c7dff5" />
        <Swatch token="accent-2-500" hex="#5baef7" />
        <Swatch token="accent-2-900" hex="#1f95ff" textDark={false} />
      </Group>
      <Group title="Purple">
        <Swatch token="accent-3-300" hex="#ead7f4" />
        <Swatch token="accent-3-700" hex="#aa72c5" textDark={false} />
        <Swatch token="accent-3-900" hex="#311f3a" textDark={false} />
        <Swatch token="accent-3-vivid" hex="#a95eff" textDark={false} />
      </Group>
      <Group title="Error">
        <Swatch token="error-200" hex="#fceaea" />
        <Swatch token="error-300" hex="#fceeee" />
        <Swatch token="error-500" hex="#f29b9b" />
        <Swatch token="error-700" hex="#db4545" textDark={false} />
        <Swatch token="error-900" hex="#a80000" textDark={false} />
      </Group>
      <Group title="Warning">
        <Swatch token="warning-200" hex="#fff8e0" />
        <Swatch token="warning-300" hex="#fff3c4" />
        <Swatch token="warning-500" hex="#f5c030" />
        <Swatch token="warning-800" hex="#c28000" textDark={false} />
      </Group>
      <Group title="Success">
        <Swatch token="success-200" hex="#e6f7ed" />
        <Swatch token="success-300" hex="#bfe8cd" />
        <Swatch token="success-800" hex="#1a7a40" textDark={false} />
      </Group>
    </div>
  ),
}
