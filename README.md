# GIDR UI Library

## Repo structure

### `src/components/` — Design system component library
A set of 21 reusable React components: Avatar, Badge, Button, Checkbox, Dropdown, Input, Tabs, Toast, Cards, Chat bubbles, and more. Each component has a Storybook story.

> **Note:** This component library is outdated. The latest approved UI lives entirely in the prototype (`OnboardingScreenAnthropic.tsx`) and has not yet been migrated back into the component library.

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

