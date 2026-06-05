import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Design System/Colors',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isDark(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum < 0.45
}

function Swatch({ token, hex }: { token: string; hex: string }) {
  const dark = isDark(hex)
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-lg border border-black/8 flex items-end p-2"
        style={{ backgroundColor: hex }}
      >
        <span
          className="font-mono text-[10px] font-semibold leading-none"
          style={{ color: dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.55)' }}
        >
          {hex}
        </span>
      </div>
      <span className="font-mono text-[11px] text-neutral-600 leading-tight">{token}</span>
    </div>
  )
}

function SemanticSwatch({ token, hex, ref: primitiveRef }: { token: string; hex: string | null; ref?: string | null }) {
  if (!hex) {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="h-14 w-full rounded-lg border border-dashed border-neutral-300 flex items-center justify-center">
          <span className="font-mono text-[10px] text-neutral-400">unset</span>
        </div>
        <span className="font-mono text-[11px] text-neutral-600 leading-tight">{token}</span>
      </div>
    )
  }
  const dark = isDark(hex)
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-lg border border-black/8 flex items-end p-2"
        style={{ backgroundColor: hex }}
      >
        <span
          className="font-mono text-[10px] font-semibold leading-none"
          style={{ color: dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.55)' }}
        >
          {hex}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[11px] text-neutral-800 leading-tight font-medium">{token.replace('color/', '')}</span>
        {primitiveRef && <span className="font-mono text-[10px] text-neutral-400 leading-tight">↳ {primitiveRef}</span>}
      </div>
    </div>
  )
}

function Group({ title, cols = 5, children }: { title: string; cols?: number; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-sans font-bold text-[12px] text-neutral-500 uppercase tracking-widest border-b border-neutral-200 pb-2">
        {title}
      </h3>
      <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {children}
      </div>
    </div>
  )
}

// ─── Primitives ───────────────────────────────────────────────────────────────

export const Primitives: Story = {
  name: 'Primitives',
  render: () => (
    <div className="flex flex-col gap-8">

      <Group title="Neutral">
        <Swatch token="N000" hex="#ffffff" />
        <Swatch token="N100" hex="#fbfcfd" />
        <Swatch token="N300" hex="#e8ebef" />
        <Swatch token="N400" hex="#d7dce1" />
        <Swatch token="N500" hex="#bac2cb" />
        <Swatch token="N600" hex="#8c9299" />
        <Swatch token="N700" hex="#676c71" />
        <Swatch token="N800" hex="#43474a" />
        <Swatch token="N900" hex="#1a1a1a" />
      </Group>

      <Group title="Accent-1 — Teal (brand secondary)">
        <Swatch token="A1-50"  hex="#fafdfc" />
        <Swatch token="A1-100" hex="#f2fafa" />
        <Swatch token="A1-200" hex="#e8f7f7" />
        <Swatch token="A1-300" hex="#dcf4f3" />
        <Swatch token="A1-400" hex="#ccf0ee" />
        <Swatch token="A1-500" hex="#b2ebe8" />
        <Swatch token="A1-600" hex="#91e3df" />
        <Swatch token="A1-700" hex="#6ed9cb" />
        <Swatch token="A1-800" hex="#00b4c8" />
        <Swatch token="A1-900" hex="#33cbcc" />
      </Group>

      <Group title="Accent-2 — Blue">
        <Swatch token="A2-50"  hex="#fafbfd" />
        <Swatch token="A2-100" hex="#f4f8fb" />
        <Swatch token="A2-200" hex="#eef4f9" />
        <Swatch token="A2-300" hex="#e3eef7" />
        <Swatch token="A2-400" hex="#d6e7f5" />
        <Swatch token="A2-500" hex="#c7dff5" />
        <Swatch token="A2-600" hex="#b1d6f6" />
        <Swatch token="A2-700" hex="#95caf8" />
        <Swatch token="A2-800" hex="#74bcfb" />
        <Swatch token="A2-900" hex="#1f95ff" />
      </Group>

      <Group title="Accent-3 — Purple (brand tertiary)">
        <Swatch token="A3-50"    hex="#fbf8fc" />
        <Swatch token="A3-100"   hex="#f7f0fa" />
        <Swatch token="A3-200"   hex="#f0e3f7" />
        <Swatch token="A3-300"   hex="#ead7f4" />
        <Swatch token="A3-400"   hex="#dfc5ed" />
        <Swatch token="A3-500"   hex="#d2afe4" />
        <Swatch token="A3-600"   hex="#c396d9" />
        <Swatch token="A3-700"   hex="#aa72c5" />
        <Swatch token="A3-800"   hex="#704685" />
        <Swatch token="A3-900"   hex="#562f6a" />
        <Swatch token="A3-vivid" hex="#a95eff" />
      </Group>

      <Group title="Accent-4 — Indigo (brand primary)" cols={6}>
        <Swatch token="A4-50"    hex="#e9e9f8" />
        <Swatch token="A4-100"   hex="#e2dff3" />
        <Swatch token="A4-200"   hex="#dedafd" />
        <Swatch token="A4-300"   hex="#d0c9fb" />
        <Swatch token="A4-400"   hex="#bdb6f3" />
        <Swatch token="A4-500"   hex="#a89fe9" />
        <Swatch token="A4-600"   hex="#8f85d3" />
        <Swatch token="A4-700"   hex="#6d63b5" />
        <Swatch token="A4-800"   hex="#5b51a1" />
        <Swatch token="A4-900"   hex="#463b93" />
        <Swatch token="A4-vivid" hex="#5946e4" />
      </Group>

      <Group title="Service — Error">
        <Swatch token="Error-200" hex="#fceeee" />
        <Swatch token="Error-300" hex="#fceeee" />
        <Swatch token="Error-400" hex="#ffe2e2" />
        <Swatch token="Error-500" hex="#fdc2c2" />
        <Swatch token="Error-600" hex="#ffa5a5" />
        <Swatch token="Error-700" hex="#fd6e6e" />
        <Swatch token="Error-800" hex="#ff1c1c" />
        <Swatch token="Error-900" hex="#e52121" />
      </Group>

      <Group title="Service — Warning">
        <Swatch token="Warning-200" hex="#fcf3e3" />
        <Swatch token="Warning-300" hex="#fbe9cb" />
        <Swatch token="Warning-400" hex="#fadca8" />
        <Swatch token="Warning-500" hex="#fcce7e" />
        <Swatch token="Warning-600" hex="#fdbd4e" />
        <Swatch token="Warning-700" hex="#f9a91f" />
        <Swatch token="Warning-800" hex="#da8e0b" />
        <Swatch token="Warning-900" hex="#a56d0e" />
      </Group>

      <Group title="Service — Success">
        <Swatch token="Success-200" hex="#def3e5" />
        <Swatch token="Success-300" hex="#bfe8ce" />
        <Swatch token="Success-400" hex="#98ddb1" />
        <Swatch token="Success-500" hex="#6ecf91" />
        <Swatch token="Success-600" hex="#41c873" />
        <Swatch token="Success-700" hex="#2da95b" />
        <Swatch token="Success-800" hex="#218345" />
        <Swatch token="Success-900" hex="#165a2f" />
      </Group>

    </div>
  ),
}

// ─── Semantics ────────────────────────────────────────────────────────────────

export const Semantics: Story = {
  name: 'Semantics',
  render: () => (
    <div className="flex flex-col gap-8">

      <Group title="Brand" cols={6}>
        <SemanticSwatch token="color/brand/primary"          hex="#5b51a1" ref="A4-800" />
        <SemanticSwatch token="color/brand/primary/subtle"   hex="#f2fafa" ref="A1-100" />
        <SemanticSwatch token="color/brand/secondary"        hex="#00b4c8" ref="A1-800" />
        <SemanticSwatch token="color/brand/secondary/subtle" hex="#f4f8fb" ref="A2-100" />
        <SemanticSwatch token="color/brand/tertiary"         hex="#704685" ref="A3-800" />
        <SemanticSwatch token="color/brand/tertiary/subtle"  hex="#f7f0fa" ref="A3-100" />
      </Group>

      <Group title="Backgrounds" cols={6}>
        <SemanticSwatch token="color/bg/page"           hex="#e9e9f8" ref="A4-50" />
        <SemanticSwatch token="color/bg/panel"          hex="#ffffff" ref="N000" />
        <SemanticSwatch token="color/bg/input"          hex="#ffffff" ref="N000" />
        <SemanticSwatch token="color/bg/modal"          hex="#ffffff" ref="N000" />
        <SemanticSwatch token="color/bg/popover"        hex="#ffffff" ref="N000" />
        <SemanticSwatch token="color/bg/sidebar"        hex="#1a1a1a" ref="N900" />
        <SemanticSwatch token="color/bg/canvas"         hex={null} />
        <SemanticSwatch token="color/bg/input/disabled" hex="#e8ebef" ref="N300" />
      </Group>

      <Group title="Text" cols={6}>
        <SemanticSwatch token="color/text/primary"     hex="#1a1a1a" ref="N900" />
        <SemanticSwatch token="color/text/secondary"   hex="#676c71" ref="N700" />
        <SemanticSwatch token="color/text/tertiary"    hex="#8c9299" ref="N600" />
        <SemanticSwatch token="color/text/disabled"    hex="#bac2cb" ref="N500" />
        <SemanticSwatch token="color/text/placeholder" hex="#bac2cb" ref="N500" />
        <SemanticSwatch token="color/text/inverse"     hex="#ffffff" ref="N000" />
        <SemanticSwatch token="color/text/on-brand"    hex="#ffffff" ref="N000" />
        <SemanticSwatch token="color/text/on-accent"   hex="#ffffff" />
        <SemanticSwatch token="color/text/error"       hex="#e52121" ref="Error-900" />
        <SemanticSwatch token="color/text/warning"     hex="#a56d0e" ref="Warning-900" />
        <SemanticSwatch token="color/text/success"     hex="#165a2f" ref="Success-900" />
        <SemanticSwatch token="color/text/info"        hex="#1f95ff" ref="A2-900" />
      </Group>

      <Group title="Links" cols={4}>
        <SemanticSwatch token="color/link/default"  hex="#5946e4" ref="A4-vivid" />
        <SemanticSwatch token="color/link/hover"    hex="#5b51a1" ref="A4-800" />
        <SemanticSwatch token="color/link/disabled" hex={null} />
      </Group>

      <Group title="Borders" cols={6}>
        <SemanticSwatch token="color/border/divider"       hex="#e8ebef" ref="N300" />
        <SemanticSwatch token="color/border/card"          hex="#d7dce1" ref="N400" />
        <SemanticSwatch token="color/border/table"         hex="#d7dce1" ref="N400" />
        <SemanticSwatch token="color/border/input"         hex="#d7dce1" ref="N400" />
        <SemanticSwatch token="color/border/input/hover"   hex="#ffffff" />
        <SemanticSwatch token="color/border/input/focus"   hex="#ffffff" />
        <SemanticSwatch token="color/border/input/error"   hex="#e52121" ref="Error-900" />
        <SemanticSwatch token="color/border/input/disabled" hex="#d7dce1" ref="N400" />
        <SemanticSwatch token="color/border/focus"         hex="#33cbcc" ref="A1-900" />
        <SemanticSwatch token="color/border/error"         hex="#ffa5a5" ref="Error-600" />
        <SemanticSwatch token="color/border/warning"       hex="#fdbd4e" ref="Warning-600" />
        <SemanticSwatch token="color/border/success"       hex="#41c873" ref="Success-600" />
        <SemanticSwatch token="color/border/info"          hex="#b1d6f6" ref="A2-600" />
        <SemanticSwatch token="color/border/nav"           hex="#ffffff" />
        <SemanticSwatch token="color/border/selected"      hex="#ffffff" />
      </Group>

      <Group title="Interactive" cols={6}>
        <SemanticSwatch token="primary/default"   hex="#5b51a1" ref="A4-800" />
        <SemanticSwatch token="primary/hover"     hex="#463b93" ref="A4-900" />
        <SemanticSwatch token="primary/pressed"   hex="#6d63b5" ref="A4-700" />
        <SemanticSwatch token="primary/disabled"  hex="#e8ebef" ref="N300" />
        <SemanticSwatch token="secondary/default" hex="#704685" ref="A3-800" />
        <SemanticSwatch token="secondary/hover"   hex="#562f6a" ref="A3-900" />
        <SemanticSwatch token="secondary/pressed" hex="#aa72c5" ref="A3-700" />
        <SemanticSwatch token="secondary/disabled" hex="#e8ebef" ref="N300" />
        <SemanticSwatch token="ghost-default/default" hex="#dedafd" ref="A4-200" />
        <SemanticSwatch token="ghost-default/hover"   hex="#bdb6f3" ref="A4-400" />
        <SemanticSwatch token="ghost-purple/default"  hex="#dfc5ed" ref="A3-400" />
        <SemanticSwatch token="ghost-purple/hover"    hex="#d2afe4" ref="A3-500" />
        <SemanticSwatch token="destructive/default"   hex="#e52121" ref="Error-900" />
        <SemanticSwatch token="destructive/hover"     hex="#ff1c1c" ref="Error-800" />
        <SemanticSwatch token="destructive/pressed"   hex="#fd6e6e" ref="Error-700" />
        <SemanticSwatch token="destructive/subtle"    hex="#fceeee" ref="Error-300" />
        <SemanticSwatch token="destructive/disabled"  hex="#e8ebef" ref="N300" />
      </Group>

      <Group title="Status" cols={6}>
        <SemanticSwatch token="error/bg"      hex="#fceeee" ref="Error-300" />
        <SemanticSwatch token="error/text"    hex="#e52121" ref="Error-900" />
        <SemanticSwatch token="error/border"  hex="#ffa5a5" ref="Error-600" />
        <SemanticSwatch token="warning/bg"    hex="#fcf3e3" ref="Warning-200" />
        <SemanticSwatch token="warning/text"  hex="#a56d0e" ref="Warning-900" />
        <SemanticSwatch token="warning/border" hex="#fdbd4e" ref="Warning-600" />
        <SemanticSwatch token="success/bg"    hex="#bfe8ce" ref="Success-300" />
        <SemanticSwatch token="success/text"  hex="#165a2f" ref="Success-900" />
        <SemanticSwatch token="success/border" hex="#41c873" ref="Success-600" />
        <SemanticSwatch token="info/bg"       hex="#eef4f9" ref="A2-200" />
        <SemanticSwatch token="info/text"     hex="#1f95ff" ref="A2-900" />
        <SemanticSwatch token="info/border"   hex="#b1d6f6" ref="A2-600" />
        <SemanticSwatch token="neutral/bg"    hex="#e8ebef" ref="N300" />
        <SemanticSwatch token="neutral/text"  hex="#676c71" ref="N700" />
      </Group>

      <Group title="Badges" cols={5}>
        <SemanticSwatch token="badge/brand/bg"   hex="#dedafd" ref="A4-200" />
        <SemanticSwatch token="badge/brand/fg"   hex="#463b93" ref="A4-900" />
        <SemanticSwatch token="badge/success/bg" hex="#def3e5" ref="Success-200" />
        <SemanticSwatch token="badge/success/fg" hex="#2da95b" ref="Success-700" />
        <SemanticSwatch token="badge/slate/bg"   hex="#dfe5ea" />
        <SemanticSwatch token="badge/slate/fg"   hex="#334155" />
        <SemanticSwatch token="badge/info/bg"    hex="#eef4f9" ref="A2-200" />
        <SemanticSwatch token="badge/info/fg"    hex="#1f95ff" ref="A2-900" />
        <SemanticSwatch token="badge/indigo/bg"  hex="#e8f7f7" ref="A1-200" />
        <SemanticSwatch token="badge/indigo/fg"  hex="#00b4c8" ref="A1-800" />
        <SemanticSwatch token="badge/purple/bg"  hex="#f0e3f7" ref="A3-200" />
        <SemanticSwatch token="badge/purple/fg"  hex="#562f6a" ref="A3-900" />
        <SemanticSwatch token="badge/blue/bg"    hex="#eef4f9" ref="A2-200" />
        <SemanticSwatch token="badge/blue/fg"    hex="#1f95ff" ref="A2-900" />
        <SemanticSwatch token="badge/warning/bg" hex="#fcf3e3" ref="Warning-200" />
        <SemanticSwatch token="badge/warning/fg" hex="#da8e0b" ref="Warning-800" />
        <SemanticSwatch token="badge/error/bg"   hex="#fceeee" ref="Error-300" />
        <SemanticSwatch token="badge/error/fg"   hex="#ff1c1c" ref="Error-800" />
        <SemanticSwatch token="badge/neutral/bg" hex="#e8ebef" ref="N300" />
        <SemanticSwatch token="badge/neutral/fg" hex="#676c71" ref="N700" />
      </Group>

    </div>
  ),
}
