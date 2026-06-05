# GIDR UI Library

Two things live here in one repo.

## `src/` — Component Library

React + TypeScript + Tailwind component library for the GIDR product. Components are documented in Storybook with props, variants, and usage rules — readable by both humans and AI.

```
npm run storybook    → localhost:6006
```

## `app/` — Design Prototypes

Interactive mobile prototypes used by the designer to explore and test flows. Imports directly from `src/components/` — any component change reflects instantly with no extra steps.

```
npm run dev          → localhost:5173
```

---

Both share `tailwind.config.ts` (design tokens) and `src/index.css` (CSS variables).

