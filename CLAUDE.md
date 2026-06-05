# ui-library — Project Rules

## Stack
React + TypeScript + Tailwind v3 + CVA + Storybook. Deployed to Vercel.
- `npm run dev -- --host` → prototype viewer at localhost:5173
- `npm run storybook` → component catalog at localhost:6006
- Do NOT upgrade Tailwind to v4.

## Tokens
Full reference in `tailwind.config.ts` header comments. Always use semantic tokens (`bg-brand`, `text-foreground`, `text-muted`) over primitives (`accent-1-800`). CSS vars defined in `src/index.css`.

## Components
`src/components/` — read-only unless explicitly asked to modify.
Import path in prototypes: `@/components/[Name]`
Exports registered in each folder's `index.ts`.

---

## Storybook rules

### Template — apply to every component story file

**1. Meta JSDoc** — mandatory. Explain what the component is, every prop, valid values, and usage rules. AI reads this to understand how to use the component.

```tsx
/**
 * ComponentName — one-line description of what it is and where it's used.
 *
 * ## Props
 * - `variant` — controls appearance. Values: 'filled' | 'stroked' | 'ghost' | 'link'
 * - `size`    — 's' | 'm' | 'l'
 * - `disabled` — disables interaction; all colors collapse to grey disabled tokens
 *
 * ## Rules
 * - Any business logic or constraints go here (e.g. "only 1 run can be in progress at a time")
 * - Hover is managed internally; pass `isHovered` to force the state in stories/tests
 */
const meta: Meta<typeof Component> = { ... }
```

**2. argTypes** — every prop that affects rendering must have a control. Hide non-serialisable props (icons, functions) with `table: { disable: true }`.

**3. Default / Sandbox story** — one `args`-based story for the Storybook Controls panel. Named `Default` for simple components, `Sandbox` for complex ones.

```tsx
export const Default: Story = {
  args: { variant: 'filled', size: 'm', children: 'Button' },
}
```

**4. Named variant stories with `args`** — one per meaningful state or prop combination. These are the AI-readable layer. Name them descriptively. Add a JSDoc comment when the scenario has non-obvious rules.

```tsx
/** User is on run 9 — 8 complete, 9th currently active. Only 1 run can be in progress at a time. */
export const InProgress_MultipleRuns: Story = {
  args: { runCount: 9, badge: { label: 'In progress', color: 'warning' } },
}
```

**5. One visual render story** — a single `render()` story showing all variants/states in a grid. This is the human-readable layer for quick visual scanning. Name it `AllVariants`, `AllStates`, or `AllColors` depending on what varies.

```tsx
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {VARIANTS.map(v => (
        <div key={v}>
          <p className="text-caption-md text-muted uppercase mb-2">{v}</p>
          <Component variant={v} />
        </div>
      ))}
    </div>
  ),
}
```

### Rules
- Two layers always: named `args` stories (AI) + one render story (humans).
- Never merge them into a single big render function — AI can't extract prop combinations from JSX.
- Keep label typography consistent: `font-body text-[11px] text-neutral-500 uppercase tracking-wider` for section headers inside render stories.
- Hover states: always show one card/component with `isHovered` (or equivalent) forced `true` in the render story so the hover appearance is visible without interaction.
- No decorators that hide the component width — let components render at their natural size.
