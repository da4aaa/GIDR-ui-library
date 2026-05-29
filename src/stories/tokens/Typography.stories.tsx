import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

interface SpecimenProps {
  token: string
  className: string
  fontFamily: string
  spec: string
  sample?: string
}

function Specimen({ token, className, fontFamily, spec, sample }: SpecimenProps) {
  return (
    <div className="flex items-baseline gap-6 py-4 border-b border-neutral-100 last:border-0">
      <div className="w-48 shrink-0 flex flex-col gap-0.5">
        <span className="font-mono text-[11px] text-accent-1-800 font-semibold">{token}</span>
        <span className="font-mono text-[10px] text-neutral-500">{fontFamily}</span>
        <span className="font-mono text-[10px] text-neutral-400">{spec}</span>
      </div>
      <span className={`${className} text-neutral-900 flex-1`}>
        {sample ?? 'Machine fault detected on Tray 2 — replace separation roller'}
      </span>
    </div>
  )
}

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => (
    <div className="flex flex-col">
      <Specimen
        token="text-heading-lg"
        className="text-heading-lg font-sans"
        fontFamily="Nunito Sans"
        spec="18px / 24px / Bold"
        sample="Morning triage — 4 jobs today"
      />
      <Specimen
        token="text-heading"
        className="text-heading font-sans"
        fontFamily="Nunito Sans"
        spec="16px / 22px / Bold"
        sample="Konica Minolta C554e"
      />
      <Specimen
        token="text-body-bold"
        className="text-body-bold font-sans"
        fontFamily="Nunito Sans"
        spec="14px / 20px / Bold"
        sample="Transfer Belt Unit — A0EDR70000"
      />
      <Specimen
        token="text-body-semi"
        className="text-body-semi font-sans"
        fontFamily="Nunito Sans"
        spec="14px / 20px / SemiBold"
        sample="E-3203 secondary transfer error"
      />
      <Specimen
        token="text-body"
        className="text-body font-body"
        fontFamily="Inter"
        spec="14px / 18px / Regular"
      />
      <Specimen
        token="text-body-sm"
        className="text-body-sm font-body"
        fontFamily="Inter"
        spec="13px / 18px / Regular"
        sample="Last visited Jan 12 · 3 prior visits on record"
      />
      <Specimen
        token="text-caption-md"
        className="text-caption-md font-body"
        fontFamily="Inter"
        spec="12px / 16px / SemiBold"
        sample="CANON INDUSTRIAL PARK · #KC221045"
      />
      <Specimen
        token="text-caption"
        className="text-caption font-body"
        fontFamily="Inter"
        spec="11px / 14px / Regular"
        sample="9:14 AM · 2 sources cited"
      />
    </div>
  ),
}

export const TextOnBackgrounds: Story = {
  name: 'Text on Backgrounds',
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { bg: 'bg-white', label: 'white', dark: true },
        { bg: 'bg-neutral-000', label: 'neutral-000 #fbfcfd', dark: true },
        { bg: 'bg-neutral-100', label: 'neutral-100 #f0f4f5', dark: true },
        { bg: 'bg-neutral-300', label: 'neutral-300 #e8ebef', dark: true },
        { bg: 'bg-accent-1-100', label: 'accent-1-100 (teal tint)', dark: true },
        { bg: 'bg-neutral-800', label: 'neutral-800', dark: false },
        { bg: 'bg-neutral-900', label: 'neutral-900', dark: false },
        { bg: 'bg-accent-1-800', label: 'accent-1-800 (brand)', dark: false },
      ].map(({ bg, label, dark }) => (
        <div key={label} className={`${bg} rounded-xl p-5 border border-black/5`}>
          <p className="text-[10px] font-mono mb-3" style={{ color: dark ? '#94a3b8' : '#94a3b8' }}>{label}</p>
          <div className="flex flex-col gap-1">
            <p className={`text-heading font-sans ${dark ? 'text-neutral-900' : 'text-white'}`}>Heading — Nunito Sans Bold</p>
            <p className={`text-body font-body ${dark ? 'text-neutral-800' : 'text-white'}`}>Body text — Inter Regular — reads well at this size</p>
            <p className={`text-caption font-body ${dark ? 'text-neutral-600' : 'text-white opacity-70'}`}>Caption — timestamp · metadata · secondary info</p>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const FontFamilies: Story = {
  name: 'Font Families',
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[11px] text-neutral-500">font-sans — Nunito Sans — headings, buttons, labels, brand text</p>
        <p className="font-sans font-normal text-[32px] text-neutral-900 leading-tight">GIDR AI Field Assistant</p>
        <p className="font-sans font-semibold text-[20px] text-neutral-900">abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[11px] text-neutral-500">font-body — Inter — body copy, captions, data, metadata</p>
        <p className="font-body font-normal text-[32px] text-neutral-900 leading-tight">GIDR AI Field Assistant</p>
        <p className="font-body font-medium text-[20px] text-neutral-900">abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
      </div>
    </div>
  ),
}
