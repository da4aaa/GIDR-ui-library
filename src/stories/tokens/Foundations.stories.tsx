import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Design System/Foundations',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const Elevation: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <h3 className="font-sans font-bold text-[13px] text-neutral-900 uppercase tracking-wider">Elevation / Shadows</h3>
      <div className="flex gap-8 flex-wrap">
        {[
          { token: 'shadow-none', className: 'shadow-none', label: 'none', use: 'Flat elements, dividers' },
          { token: 'shadow-elevation-1', className: 'shadow-elevation-1', label: 'elevation-1', use: 'Cards, small overlays' },
          { token: 'shadow-elevation-2', className: 'shadow-elevation-2', label: 'elevation-2', use: 'Dropdowns, menus' },
          { token: 'shadow-elevation-4', className: 'shadow-elevation-4', label: 'elevation-4', use: 'Modals, sheets' },
        ].map(({ token, className, label, use }) => (
          <div key={token} className="flex flex-col gap-3 items-start">
            <div className={`${className} bg-white rounded-xl w-36 h-24 flex items-center justify-center border border-neutral-100`}>
              <span className="font-mono text-[10px] text-neutral-400">{label}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-accent-1-800 font-semibold">{token}</span>
              <span className="font-body text-[11px] text-neutral-500">{use}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const BorderRadius: Story = {
  name: 'Border Radius',
  render: () => (
    <div className="flex flex-col gap-8">
      <h3 className="font-sans font-bold text-[13px] text-neutral-900 uppercase tracking-wider">Border Radius</h3>
      <div className="flex gap-6 flex-wrap items-end">
        {[
          { token: 'rounded-sm',   px: '4px',    use: 'Inputs, small badges, chips' },
          { token: 'rounded-md',   px: '8px',    use: 'Buttons, rows, tags' },
          { token: 'rounded-lg',   px: '12px',   use: 'Dropdowns, cards, bubbles' },
          { token: 'rounded-xl',   px: '16px',   use: 'Larger cards, panels' },
          { token: 'rounded-2xl',  px: '24px',   use: 'Bottom sheets, modals' },
          { token: 'rounded-full', px: '9999px', use: 'Pills, chips, avatars' },
        ].map(({ token, px, use }) => (
          <div key={token} className="flex flex-col gap-3 items-start">
            <div
              className={`${token} bg-accent-1-100 border-2 border-accent-1-400 w-20 h-20 flex items-center justify-center`}
            >
              <span className="font-mono text-[10px] text-accent-1-800 font-bold text-center leading-tight">{px}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-accent-1-800 font-semibold">{token}</span>
              <span className="font-body text-[10px] text-neutral-500 max-w-[80px] leading-tight">{use}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <h3 className="font-sans font-bold text-[13px] text-neutral-900 uppercase tracking-wider">Spacing Scale</h3>
      <div className="flex flex-col gap-3">
        {[
          { token: 'component-2xs', px: '4px',  use: 'Icon-to-label gap, dot-to-text gap' },
          { token: 'component-xs',  px: '6px',  use: 'Tight row gaps, badge internals' },
          { token: 'component-sm',  px: '8px',  use: 'Standard row gaps, inline spacing' },
          { token: 'component-md',  px: '12px', use: 'Card internal sections' },
          { token: 'component-lg',  px: '16px', use: 'Card padding, section padding' },
          { token: 'layout-xs',     px: '8px',  use: 'Page edge, tight layout' },
          { token: 'layout-sm',     px: '12px', use: 'Page section gap' },
          { token: 'layout-md',     px: '16px', use: 'Standard layout padding' },
          { token: 'layout-lg',     px: '24px', use: 'Screen padding' },
          { token: 'layout-xl',     px: '32px', use: 'Large section gap' },
        ].map(({ token, px, use }) => (
          <div key={token} className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-accent-1-800 w-40 shrink-0">{token}</span>
            <div
              className="bg-accent-1-400 rounded h-5 shrink-0"
              style={{ width: px }}
            />
            <span className="font-mono text-[11px] text-neutral-500 w-10 shrink-0">{px}</span>
            <span className="font-body text-[11px] text-neutral-500">{use}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const BorderWidth: Story = {
  name: 'Border Width',
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="font-sans font-bold text-[13px] text-neutral-900 uppercase tracking-wider">Border Width</h3>
      <div className="flex gap-8">
        {[
          { token: 'border-sm', px: '1px', use: 'All component borders, dividers, input borders' },
          { token: 'border-md', px: '1.5px', use: 'Active states, hover borders, selected' },
        ].map(({ token, px, use }) => (
          <div key={token} className="flex flex-col gap-3">
            <div
              className="w-36 h-16 rounded-lg bg-white"
              style={{ border: `${px} solid #00b4c8` }}
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-accent-1-800 font-semibold">{token}</span>
              <span className="font-mono text-[10px] text-neutral-500">{px}</span>
              <span className="font-body text-[11px] text-neutral-500 max-w-[160px]">{use}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}
