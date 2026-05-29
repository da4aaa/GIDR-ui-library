# GIDR UI Library

## Repo structure

### `src/components/` — Design system component library
A set of 21 reusable React components built to the GIDR design tokens: Avatar, Badge, Button, Checkbox, Dropdown, Input, Tabs, Toast, Cards, Chat bubbles, and more. Each component has a Storybook story. This is the foundation for production dev work — components are copy-paste ready (shadcn-style) and mapped to the Figma design system tokens.

### `src/prototype/screens/OnboardingScreenAnthropic.tsx` — UX prototype
A single self-contained file that implements the full mobile app flow:

**Login → Choose GIDR → Jobs sheet → Landing (procedure cards) → Guided Procedure (step panel + chat + voice mode) → Summary**

Built with inline styles for speed — **does not use the component library**. Treat it as a UX reference, not production code.

### `src/mobile.css`
Mobile-specific CSS: overscroll lock, tap highlight off, safe area handling. Loaded for the prototype only.

### `public/icons/`
Procedure card icons (SVG) and Luxoft logo used in the prototype.

### `vercel.json`
Configured to build the prototype app (`vite build` → `dist/`), not Storybook.

## Live URLs

| | URL |
|---|---|
| Prototype | https://ui-library-henna-psi.vercel.app |
| Storybook (component catalog) | https://gidr-ui-library.netlify.app |

## Stack

React 18 + TypeScript + Tailwind v3 + Framer Motion + Vite

> **Note:** Do not upgrade to Tailwind v4 — it uses CSS-based config incompatible with `tailwind.config.ts`.

## Dev

```bash
npm run dev -- --host     # Prototype dev server (exposed to network for phone testing)
npm run storybook         # Storybook on port 6006
npm run build             # Production build
```
