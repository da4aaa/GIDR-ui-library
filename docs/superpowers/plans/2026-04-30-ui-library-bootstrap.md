# UI Library Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap a React + TypeScript + Tailwind component library from the GIDR Design System, with Storybook deployed to Vercel for screen prototyping and developer handoff.

**Architecture:** shadcn-style model — each component is a self-contained `.tsx` file with typed props and Tailwind classes driven by `cva` variants. Design tokens live in `tailwind.config.ts` and are the single source of truth. Storybook covers every DS variant state and deploys automatically to Vercel on push.

**Tech Stack:** React 18, TypeScript 5, Tailwind CSS 3, clsx + tailwind-merge, cva (class-variance-authority), Vite 5, Storybook 8, Vercel

---

## File Map

```
ui-library/
├── src/
│   ├── lib/
│   │   └── utils.ts                   # cn() helper
│   ├── components/
│   │   ├── Avatar/
│   │   │   ├── Avatar.tsx
│   │   │   ├── Avatar.stories.tsx
│   │   │   └── index.ts
│   │   ├── Badge/
│   │   │   ├── Badge.tsx
│   │   │   ├── Badge.stories.tsx
│   │   │   └── index.ts
│   │   ├── Tag/
│   │   │   ├── Tag.tsx
│   │   │   ├── Tag.stories.tsx
│   │   │   └── index.ts
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Dropdown/
│   │   │   ├── DropdownRow.tsx
│   │   │   ├── DropdownSection.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Dropdown.stories.tsx
│   │   │   └── index.ts
│   │   └── QuickReplyChip/
│   │       ├── QuickReplyChip.tsx
│   │       ├── QuickReplyChip.stories.tsx
│   │       └── index.ts
│   └── index.ts                        # Barrel export
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.tsx` (dev entry only)

- [ ] **Step 1: Create the project directory and init git**

```bash
cd ~
mkdir ui-library && cd ui-library
git init
echo "node_modules\ndist\nstorybook-static\n.env" > .gitignore
```

- [ ] **Step 2: Create package.json**

```bash
cat > package.json << 'EOF'
{
  "name": "@gidr/ui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
EOF
```

- [ ] **Step 3: Install core dependencies**

```bash
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install clsx tailwind-merge class-variance-authority
npm install lucide-react
```

- [ ] **Step 4: Install Storybook**

```bash
npx storybook@latest init --type react_vite --no-dev
```

Expected: Storybook 8 scaffolded, `.storybook/` created, sample stories added. Delete the sample stories:
```bash
rm -rf src/stories
```

- [ ] **Step 5: Create vite.config.ts**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 6: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "skipLibCheck": true
  },
  "include": ["src", ".storybook"]
}
```

- [ ] **Step 7: Create index.html and src/main.tsx**

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>UI Library Dev</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>
```

```tsx
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><div /></React.StrictMode>)
```

- [ ] **Step 8: Init Tailwind**

```bash
npx tailwindcss init -p --ts
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold vite react ts project with storybook"
```

---

## Task 2: Design tokens → Tailwind config

**Files:**
- Modify: `tailwind.config.ts`
- Create: `src/lib/utils.ts`
- Create: `src/index.css`

These are the exact values from the GIDR Design Library variables.

- [ ] **Step 1: Write the full tailwind.config.ts**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          '000': '#fbfcfd',
          '100': '#f0f4f5',
          '200': '#eaecf0',
          '300': '#e8ebef',
          '400': '#c9d0d9',
          '500': '#bac2cb',
          '600': '#8c9299',
          '700': '#676c71',
          '800': '#43474a',
          '900': '#1a1a1a',
        },
        'accent-1': {
          '50':  '#f0fbfb',
          '100': '#e0f5f6',
          '200': '#b8eced',
          '300': '#dcf4f3',
          '400': '#7dd8d9',
          '500': '#3fc9cb',
          '600': '#1abecf',
          '700': '#00bcd0',
          '800': '#00b4c8',
          '900': '#33cbcc',
          'vivid': '#a95eff',
        },
        'accent-2': {
          '50':  '#f0f7ff',
          '100': '#ddeeff',
          '200': '#c7e1ff',
          '300': '#a8d0f5',
          '400': '#7db8f0',
          '500': '#519de8',
          '600': '#2e82de',
          '700': '#1a6ccf',
          '800': '#1256b0',
          '900': '#0c4090',
        },
        'accent-3': {
          '50':  '#fbf8fc',
          '100': '#f7f0fa',
          '200': '#f0e3f7',
          '300': '#ead7f4',
          '400': '#dfc5ed',
          '500': '#d2afe4',
          '600': '#c396d9',
          '700': '#aa72c5',
          '800': '#704685',
          '900': '#311f3a',
          'vivid': '#a95eff',
        },
        service: {
          'error-200':   '#fceaea',
          'error-300':   '#fceeee',
          'error-400':   '#f8c5c5',
          'error-500':   '#f29b9b',
          'error-600':   '#e97070',
          'error-700':   '#db4545',
          'error-800':   '#c82020',
          'error-900':   '#a80000',
          'warning-200': '#fff8e0',
          'warning-300': '#fff3c4',
          'warning-500': '#f5c030',
          'warning-800': '#c28000',
          'success-200': '#e6f7ed',
          'success-300': '#bfe8cd',
          'success-800': '#1a7a40',
          'success-900': '#0d4f28',
        },
        bg: {
          'page-light':  '#f0f4f5',
          'page-darker': '#e4ebec',
        },
        avatar: {
          '1': '#e8734a',
          '2': '#7048c6',
          '3': '#2d9cdb',
          '4': '#27ae60',
          '5': '#eb5757',
        },
      },
      fontFamily: {
        sans:    ['"Nunito Sans"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        'caption':    ['11px', { lineHeight: '14px', fontWeight: '400' }],
        'caption-md': ['12px', { lineHeight: '16px', fontWeight: '600' }],
        'body-sm':    ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'body':       ['14px', { lineHeight: '18px', fontWeight: '400' }],
        'body-bold':  ['14px', { lineHeight: '20px', fontWeight: '700' }],
        'body-semi':  ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'heading':    ['16px', { lineHeight: '22px', fontWeight: '700' }],
        'heading-lg': ['18px', { lineHeight: '24px', fontWeight: '700' }],
      },
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        '2xl':'24px',
        full: '9999px',
      },
      borderWidth: {
        sm: '1px',
        md: '1.5px',
      },
      spacing: {
        'component-2xs': '4px',
        'component-xs':  '6px',
        'component-sm':  '8px',
        'component-md':  '12px',
        'component-lg':  '16px',
        'layout-xs':     '8px',
        'layout-sm':     '12px',
        'layout-md':     '16px',
        'layout-lg':     '24px',
        'layout-xl':     '32px',
      },
      boxShadow: {
        'elevation-1': '0 2px 4px rgba(0,0,0,0.10)',
        'elevation-2': '0 2px 4px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.10)',
        'elevation-4': '0 8px 16px rgba(0,0,0,0.10), 0 16px 32px rgba(0,0,0,0.14)',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 2: Create src/index.css**

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
```

- [ ] **Step 3: Create src/lib/utils.ts**

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add design tokens to tailwind config and utilities"
```

---

## Task 3: Storybook configuration

**Files:**
- Modify: `.storybook/main.ts`
- Modify: `.storybook/preview.ts`

- [ ] **Step 1: Update .storybook/main.ts**

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}
export default config
```

- [ ] **Step 2: Update .storybook/preview.ts**

```ts
// .storybook/preview.ts
import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'page-light',
      values: [
        { name: 'page-light',  value: '#f0f4f5' },
        { name: 'page-darker', value: '#e4ebec' },
        { name: 'white',       value: '#ffffff' },
      ],
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
}
export default preview
```

- [ ] **Step 3: Verify Storybook launches**

```bash
npm run storybook
```

Expected: browser opens at http://localhost:6006 with empty Storybook.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: configure storybook with ds backgrounds"
```

---

## Task 4: Avatar component

DS spec: Type = Image | Letter | Empty. Size = xxsmall (24) | xsmall (32) | small (48) | medium (72) | large (96) | xlarge (160).

**Files:**
- Create: `src/components/Avatar/Avatar.tsx`
- Create: `src/components/Avatar/Avatar.stories.tsx`
- Create: `src/components/Avatar/index.ts`

- [ ] **Step 1: Create Avatar.tsx**

```tsx
// src/components/Avatar/Avatar.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xxsmall: 'size-6',
        xsmall:  'size-8',
        small:   'size-12',
        medium:  'size-[72px]',
        large:   'size-24',
        xlarge:  'size-40',
      },
      color: {
        '1': 'bg-[#e8734a]',
        '2': 'bg-[#7048c6]',
        '3': 'bg-[#2d9cdb]',
        '4': 'bg-[#27ae60]',
        '5': 'bg-[#eb5757]',
      },
    },
    defaultVariants: { size: 'small', color: '2' },
  }
)

const iconSize: Record<NonNullable<VariantProps<typeof avatarVariants>['size']>, number> = {
  xxsmall: 12, xsmall: 16, small: 24, medium: 32, large: 40, xlarge: 64,
}

const textSize: Record<NonNullable<VariantProps<typeof avatarVariants>['size']>, string> = {
  xxsmall: 'text-[9px]',
  xsmall:  'text-[11px]',
  small:   'text-[16px]',
  medium:  'text-[24px]',
  large:   'text-[32px]',
  xlarge:  'text-[52px]',
}

type AvatarType = 'image' | 'letter' | 'empty'

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  type?: AvatarType
  src?: string
  initials?: string
  alt?: string
  className?: string
}

export function Avatar({ type = 'empty', src, initials, alt, size = 'small', color = '2', className }: AvatarProps) {
  return (
    <div className={cn(avatarVariants({ size, color }), className)}>
      {type === 'image' && src && (
        <img src={src} alt={alt ?? ''} className="size-full object-cover" />
      )}
      {type === 'letter' && (
        <span className={cn('font-sans font-semibold text-white leading-none', textSize[size ?? 'small'])}>
          {initials?.slice(0, 2).toUpperCase()}
        </span>
      )}
      {type === 'empty' && (
        <User size={iconSize[size ?? 'small']} className="text-white" strokeWidth={1.5} />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create Avatar.stories.tsx**

```tsx
// src/components/Avatar/Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size:  { control: 'select', options: ['xxsmall','xsmall','small','medium','large','xlarge'] },
    type:  { control: 'select', options: ['image','letter','empty'] },
    color: { control: 'select', options: ['1','2','3','4','5'] },
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Empty: Story = { args: { type: 'empty', size: 'medium' } }
export const Letter: Story = { args: { type: 'letter', initials: 'AT', size: 'medium', color: '2' } }
export const Image: Story = { args: { type: 'image', src: 'https://i.pravatar.cc/150?img=3', size: 'medium' } }

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 flex-wrap">
      {(['xxsmall','xsmall','small','medium','large','xlarge'] as const).map(size => (
        <Avatar key={size} type="letter" initials="AT" size={size} color="2" />
      ))}
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-3">
      {(['1','2','3','4','5'] as const).map(color => (
        <Avatar key={color} type="letter" initials="AB" size="small" color={color} />
      ))}
    </div>
  ),
}
```

- [ ] **Step 3: Create index.ts**

```ts
// src/components/Avatar/index.ts
export { Avatar } from './Avatar'
export type { } from './Avatar'
```

- [ ] **Step 4: Check story renders in Storybook**

Run `npm run storybook`, navigate to Components/Avatar. Verify all stories render without errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Avatar component — Image, Letter, Empty × 6 sizes"
```

---

## Task 5: Badge component

DS spec: Color = Neutral | Green | Blue | Purple | Error. Size = SM | MD. Has Icon = true | false.

**Files:**
- Create: `src/components/Badge/Badge.tsx`
- Create: `src/components/Badge/Badge.stories.tsx`
- Create: `src/components/Badge/index.ts`

- [ ] **Step 1: Create Badge.tsx**

```tsx
// src/components/Badge/Badge.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-body font-medium whitespace-nowrap',
  {
    variants: {
      color: {
        neutral: 'bg-neutral-300 text-neutral-800',
        green:   'bg-service-success-300 text-neutral-900',
        blue:    'bg-accent-2-200 text-neutral-900',
        purple:  'bg-accent-3-200 text-accent-3-900',
        error:   'bg-service-error-300 text-neutral-900',
      },
      size: {
        sm: 'px-[7px] py-[2px] text-[11px] leading-[14px]',
        md: 'px-[9px] py-[3px] text-[12px] leading-[16px]',
      },
    },
    defaultVariants: { color: 'neutral', size: 'sm' },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  label: string
  icon?: LucideIcon
  className?: string
}

export function Badge({ label, icon: Icon, color = 'neutral', size = 'sm', className }: BadgeProps) {
  const iconSize = size === 'sm' ? 10 : 12
  return (
    <span className={cn(badgeVariants({ color, size }), className)}>
      {Icon && <Icon size={iconSize} strokeWidth={1.5} />}
      {label}
    </span>
  )
}
```

- [ ] **Step 2: Create Badge.stories.tsx**

```tsx
// src/components/Badge/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Circle } from 'lucide-react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['neutral','green','blue','purple','error'] },
    size:  { control: 'select', options: ['sm','md'] },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { label: 'Active', color: 'green', size: 'sm' } }
export const WithIcon: Story = { args: { label: 'Live', color: 'green', size: 'sm', icon: Circle } }

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      {(['neutral','green','blue','purple','error'] as const).map(color => (
        <Badge key={color} label={color} color={color} size="sm" />
      ))}
    </div>
  ),
}

export const AllColorsWithIcon: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      {(['neutral','green','blue','purple','error'] as const).map(color => (
        <Badge key={color} label={color} color={color} size="sm" icon={Circle} />
      ))}
    </div>
  ),
}

export const BothSizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Badge label="SM badge" color="neutral" size="sm" />
      <Badge label="MD badge" color="neutral" size="md" />
    </div>
  ),
}
```

- [ ] **Step 3: Create index.ts**

```ts
export { Badge } from './Badge'
```

- [ ] **Step 4: Verify in Storybook, commit**

```bash
git add -A
git commit -m "feat: add Badge component — 5 colors × 2 sizes × icon slot"
```

---

## Task 6: Tag component

DS spec: same colors as Badge + removable (× button). Has Icon = true | false.

**Files:**
- Create: `src/components/Tag/Tag.tsx`
- Create: `src/components/Tag/Tag.stories.tsx`
- Create: `src/components/Tag/index.ts`

- [ ] **Step 1: Create Tag.tsx**

```tsx
// src/components/Tag/Tag.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-body font-medium whitespace-nowrap',
  {
    variants: {
      color: {
        neutral: 'bg-neutral-300 text-neutral-800',
        green:   'bg-service-success-300 text-neutral-900',
        blue:    'bg-accent-2-200 text-neutral-900',
        purple:  'bg-accent-3-200 text-accent-3-900',
        error:   'bg-service-error-300 text-neutral-900',
      },
      size: {
        sm: 'pl-[7px] pr-[5px] py-[2px] text-[11px] leading-[14px]',
        md: 'pl-[9px] pr-[7px] py-[3px] text-[12px] leading-[16px]',
      },
    },
    defaultVariants: { color: 'neutral', size: 'sm' },
  }
)

interface TagProps extends VariantProps<typeof tagVariants> {
  label: string
  icon?: LucideIcon
  onRemove?: () => void
  className?: string
}

export function Tag({ label, icon: Icon, onRemove, color = 'neutral', size = 'sm', className }: TagProps) {
  const iconSize = size === 'sm' ? 10 : 12
  return (
    <span className={cn(tagVariants({ color, size }), className)}>
      {Icon && <Icon size={iconSize} strokeWidth={1.5} />}
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center rounded-full hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          aria-label={`Remove ${label}`}
        >
          <X size={iconSize} strokeWidth={1.5} />
        </button>
      )}
    </span>
  )
}
```

- [ ] **Step 2: Create Tag.stories.tsx**

```tsx
// src/components/Tag/Tag.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Circle } from 'lucide-react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['neutral','green','blue','purple','error'] },
    size:  { control: 'select', options: ['sm','md'] },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

export const Removable: Story = { args: { label: 'HVAC', color: 'neutral', size: 'sm', onRemove: () => {} } }
export const WithIcon: Story  = { args: { label: 'HVAC', color: 'blue', size: 'sm', icon: Circle, onRemove: () => {} } }

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      {(['neutral','green','blue','purple','error'] as const).map(color => (
        <Tag key={color} label={color} color={color} size="sm" onRemove={() => {}} />
      ))}
    </div>
  ),
}
```

- [ ] **Step 3: Create index.ts + commit**

```ts
export { Tag } from './Tag'
```

```bash
git add -A
git commit -m "feat: add Tag component — removable chip with icon slot"
```

---

## Task 7: Button component

DS spec: variant = primary | secondary. Size = S | M | L. State = default | hover | disabled. Icon position = left | right | none.

**Files:**
- Create: `src/components/Button/Button.tsx`
- Create: `src/components/Button/IconButton.tsx`
- Create: `src/components/Button/Button.stories.tsx`
- Create: `src/components/Button/index.ts`

- [ ] **Step 1: Create Button.tsx**

```tsx
// src/components/Button/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 font-sans font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:   'bg-accent-1-800 text-white hover:bg-accent-1-900 focus-visible:ring-accent-1-800',
        secondary: 'bg-transparent border-[1.5px] border-accent-1-900 text-accent-1-900 hover:bg-accent-1-100 focus-visible:ring-accent-1-800',
        chip:      'bg-transparent border-[1.5px] border-accent-1-900 text-accent-1-900 hover:bg-accent-1-100 rounded-full focus-visible:ring-accent-1-800',
      },
      size: {
        s: 'h-[30px] px-3 py-1.5 text-[13px] rounded-lg',
        m: 'h-9 px-4 py-2 text-sm rounded-xl',
        l: 'h-[38px] px-[22px] py-[9px] text-sm rounded-xl',
      },
    },
    compoundVariants: [
      { variant: 'chip', size: 's', class: 'h-[30px] px-3 py-1.5 text-[13px]' },
      { variant: 'chip', size: 'm', class: 'h-9 px-4 py-2 text-sm' },
    ],
    defaultVariants: { variant: 'primary', size: 'm' },
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
}

const iconSizes: Record<NonNullable<VariantProps<typeof buttonVariants>['size']>, number> = {
  s: 14, m: 16, l: 18,
}

export function Button({ variant = 'primary', size = 'm', iconLeft: IconLeft, iconRight: IconRight, children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {IconLeft && <IconLeft size={iconSizes[size ?? 'm']} strokeWidth={1.5} />}
      {children}
      {IconRight && <IconRight size={iconSizes[size ?? 'm']} strokeWidth={1.5} />}
    </button>
  )
}
```

- [ ] **Step 2: Create IconButton.tsx**

```tsx
// src/components/Button/IconButton.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      size: {
        xs: 'size-4',
        s:  'size-6',
        m:  'size-8',
        l:  'size-10',
      },
      variant: {
        ghost:  'hover:bg-neutral-100 text-neutral-600',
        filled: 'bg-accent-1-800 text-white hover:bg-accent-1-900',
      },
    },
    defaultVariants: { size: 'm', variant: 'ghost' },
  }
)

const iconSize: Record<NonNullable<VariantProps<typeof iconButtonVariants>['size']>, number> = {
  xs: 10, s: 14, m: 18, l: 22,
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  icon: LucideIcon
  label: string
}

export function IconButton({ icon: Icon, label, size = 'm', variant = 'ghost', className, ...props }: IconButtonProps) {
  return (
    <button aria-label={label} className={cn(iconButtonVariants({ size, variant }), className)} {...props}>
      <Icon size={iconSize[size ?? 'm']} strokeWidth={1.5} />
    </button>
  )
}
```

- [ ] **Step 3: Create Button.stories.tsx**

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Share2, ArrowRight, X } from 'lucide-react'
import { Button } from './Button'
import { IconButton } from './IconButton'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary','secondary','chip'] },
    size:    { control: 'select', options: ['s','m','l'] },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story    = { args: { variant: 'primary',   children: 'Primary',   size: 'm' } }
export const Secondary: Story  = { args: { variant: 'secondary', children: 'Secondary', size: 'm' } }
export const Chip: Story       = { args: { variant: 'chip',      children: 'Quick reply', size: 's' } }
export const WithIconLeft: Story  = { args: { variant: 'primary', children: 'Share', size: 'm', iconLeft: Share2 } }
export const WithIconRight: Story = { args: { variant: 'secondary', children: 'Next', size: 'm', iconRight: ArrowRight } }
export const Disabled: Story   = { args: { variant: 'primary', children: 'Disabled', size: 'm', disabled: true } }

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center flex-wrap">
      <Button variant="primary" size="s">Small</Button>
      <Button variant="primary" size="m">Medium</Button>
      <Button variant="primary" size="l">Large</Button>
    </div>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <IconButton icon={X} label="Close" size="xs" />
      <IconButton icon={X} label="Close" size="s" />
      <IconButton icon={X} label="Close" size="m" />
      <IconButton icon={X} label="Close" size="l" />
    </div>
  ),
}
```

- [ ] **Step 4: Create index.ts + commit**

```ts
export { Button } from './Button'
export { IconButton } from './IconButton'
```

```bash
git add -A
git commit -m "feat: add Button and IconButton components — primary/secondary/chip variants"
```

---

## Task 8: Dropdown component

DS spec: container shell with optional search, section headers, and rows (Default | With Avatar | With Icon | With Checkbox × Default | Hover | Selected | Disabled).

**Files:**
- Create: `src/components/Dropdown/DropdownRow.tsx`
- Create: `src/components/Dropdown/DropdownSection.tsx`
- Create: `src/components/Dropdown/Dropdown.tsx`
- Create: `src/components/Dropdown/Dropdown.stories.tsx`
- Create: `src/components/Dropdown/index.ts`

- [ ] **Step 1: Create DropdownRow.tsx**

```tsx
// src/components/Dropdown/DropdownRow.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/Avatar'
import type { LucideIcon } from 'lucide-react'

const rowVariants = cva(
  'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-[14px] leading-[18px] font-body font-normal select-none',
  {
    variants: {
      state: {
        default:  'text-neutral-900 hover:bg-neutral-100',
        hover:    'bg-neutral-100 text-neutral-900',
        selected: 'bg-accent-1-300 text-neutral-900',
        disabled: 'text-neutral-600 opacity-50 pointer-events-none',
      },
    },
    defaultVariants: { state: 'default' },
  }
)

interface DropdownRowProps extends VariantProps<typeof rowVariants> {
  label: string
  type?: 'default' | 'with-avatar' | 'with-icon' | 'with-checkbox'
  icon?: LucideIcon
  avatarSrc?: string
  avatarInitials?: string
  checked?: boolean
  className?: string
  onClick?: () => void
}

export function DropdownRow({ label, type = 'default', icon: Icon, avatarSrc, avatarInitials, checked, state = 'default', className, onClick }: DropdownRowProps) {
  const isSelected = state === 'selected'

  return (
    <div role="option" aria-selected={isSelected} className={cn(rowVariants({ state }), className)} onClick={onClick}>
      {type === 'with-avatar' && (
        <Avatar
          type={avatarSrc ? 'image' : 'letter'}
          src={avatarSrc}
          initials={avatarInitials}
          size="xxsmall"
          color="2"
        />
      )}
      {type === 'with-icon' && Icon && <Icon size={16} strokeWidth={1.5} className="shrink-0 text-neutral-600" />}
      {type === 'with-checkbox' && (
        <div className={cn('size-4 rounded border flex items-center justify-center shrink-0', isSelected ? 'bg-accent-1-800 border-accent-1-800' : 'border-neutral-500')}>
          {isSelected && <Check size={10} strokeWidth={2.5} className="text-white" />}
        </div>
      )}

      <span className="flex-1 min-w-0 truncate">{label}</span>

      {isSelected && type !== 'with-checkbox' && (
        <Check size={16} strokeWidth={2} className="shrink-0 text-accent-1-800" />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create DropdownSection.tsx**

```tsx
// src/components/Dropdown/DropdownSection.tsx
import { cn } from '@/lib/utils'

interface DropdownSectionProps {
  label: string
  className?: string
}

export function DropdownSection({ label, className }: DropdownSectionProps) {
  return (
    <div className={cn('px-2 py-1.5 text-[12px] font-body font-semibold text-neutral-600 leading-[16px]', className)}>
      {label}
    </div>
  )
}
```

- [ ] **Step 3: Create Dropdown.tsx**

```tsx
// src/components/Dropdown/Dropdown.tsx
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropdownProps {
  hasSearch?: boolean
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function Dropdown({ hasSearch = false, searchPlaceholder = 'Search...', searchValue, onSearchChange, children, className }: DropdownProps) {
  return (
    <div className={cn('bg-white border border-neutral-300 rounded-xl shadow-elevation-2 py-3 px-1 flex flex-col w-[260px]', className)}>
      {hasSearch && (
        <>
          <div className="px-1.5 pb-3">
            <div className="flex items-center gap-2 border border-neutral-500 rounded-sm px-3 py-1.5 text-sm text-neutral-700">
              <input
                type="text"
                value={searchValue}
                onChange={e => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 outline-none text-[14px] font-body placeholder:text-neutral-500 bg-transparent"
              />
              <Search size={16} className="text-neutral-500 shrink-0" strokeWidth={1.5} />
            </div>
          </div>
          <div className="h-px bg-neutral-300 mb-2" />
        </>
      )}
      <div className="flex flex-col gap-0.5 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create Dropdown.stories.tsx**

```tsx
// src/components/Dropdown/Dropdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from 'lucide-react'
import { Dropdown } from './Dropdown'
import { DropdownRow } from './DropdownRow'
import { DropdownSection } from './DropdownSection'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="p-8"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Dropdown>

export const SimpleList: Story = {
  render: () => (
    <Dropdown>
      <DropdownSection label="Options" />
      <DropdownRow label="Option one" />
      <DropdownRow label="Option two" state="selected" />
      <DropdownRow label="Option three" />
      <DropdownRow label="Disabled option" state="disabled" />
    </Dropdown>
  ),
}

export const WithSearch: Story = {
  render: () => (
    <Dropdown hasSearch searchPlaceholder="Search for organization...">
      <DropdownSection label="My organizations" />
      <DropdownRow label="Apollo Office Systems" type="with-avatar" avatarInitials="AO" state="selected" />
      <DropdownRow label="CBA" type="with-avatar" avatarInitials="CB" />
      <DropdownRow label="BusinessLink" type="with-avatar" avatarInitials="BL" />
      <div className="h-px bg-neutral-300 my-2" />
      <DropdownSection label="Invited to organizations" />
      <DropdownRow label="Amisoft" type="with-avatar" avatarInitials="AM" />
    </Dropdown>
  ),
}

export const WithCheckboxes: Story = {
  render: () => (
    <Dropdown>
      <DropdownSection label="Filter by tag" />
      <DropdownRow label="HVAC" type="with-checkbox" state="selected" checked />
      <DropdownRow label="Electrical" type="with-checkbox" />
      <DropdownRow label="Plumbing" type="with-checkbox" />
    </Dropdown>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <DropdownRow label="Add tag" type="with-icon" icon={Tag} />
    </Dropdown>
  ),
}
```

- [ ] **Step 5: Create index.ts + commit**

```ts
export { Dropdown } from './Dropdown'
export { DropdownRow } from './DropdownRow'
export { DropdownSection } from './DropdownSection'
```

```bash
git add -A
git commit -m "feat: add Dropdown, DropdownRow, DropdownSection components"
```

---

## Task 9: QuickReplyChip component

DS spec: State = default | selected | disabled. Has Icon = true | false. Built on Button chip variant.

**Files:**
- Create: `src/components/QuickReplyChip/QuickReplyChip.tsx`
- Create: `src/components/QuickReplyChip/QuickReplyChip.stories.tsx`
- Create: `src/components/QuickReplyChip/index.ts`

- [ ] **Step 1: Create QuickReplyChip.tsx**

```tsx
// src/components/QuickReplyChip/QuickReplyChip.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const chipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border-[1.5px] font-body font-medium text-[13px] leading-[18px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1-800 whitespace-nowrap cursor-pointer',
  {
    variants: {
      state: {
        default:  'border-accent-1-900 text-accent-1-900 bg-transparent hover:bg-accent-1-100',
        selected: 'border-accent-1-900 text-accent-1-900 bg-accent-1-300',
        disabled: 'border-neutral-300 text-neutral-600 bg-transparent opacity-45 pointer-events-none',
      },
    },
    defaultVariants: { state: 'default' },
  }
)

interface QuickReplyChipProps extends VariantProps<typeof chipVariants> {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  className?: string
}

export function QuickReplyChip({ label, icon: Icon, state = 'default', onClick, className }: QuickReplyChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === 'disabled'}
      className={cn('px-3 py-1.5', chipVariants({ state }), className)}
    >
      {Icon && <Icon size={14} strokeWidth={1.5} />}
      {label}
    </button>
  )
}
```

- [ ] **Step 2: Create QuickReplyChip.stories.tsx**

```tsx
// src/components/QuickReplyChip/QuickReplyChip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Wrench } from 'lucide-react'
import { QuickReplyChip } from './QuickReplyChip'

const meta: Meta<typeof QuickReplyChip> = {
  title: 'Components/QuickReplyChip',
  component: QuickReplyChip,
  tags: ['autodocs'],
  argTypes: { state: { control: 'select', options: ['default','selected','disabled'] } },
}
export default meta
type Story = StoryObj<typeof QuickReplyChip>

export const Default: Story   = { args: { label: 'Yes, confirm', state: 'default' } }
export const Selected: Story  = { args: { label: 'Yes, confirm', state: 'selected' } }
export const Disabled: Story  = { args: { label: 'Yes, confirm', state: 'disabled' } }
export const WithIcon: Story  = { args: { label: 'Schedule service', icon: Wrench, state: 'default' } }

export const ChipRow: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <QuickReplyChip label="Yes, do it" state="default" />
      <QuickReplyChip label="Show me options" state="default" />
      <QuickReplyChip label="Not now" state="default" />
      <QuickReplyChip label="Already done" state="selected" />
    </div>
  ),
}
```

- [ ] **Step 3: Create index.ts + commit**

```ts
export { QuickReplyChip } from './QuickReplyChip'
```

```bash
git add -A
git commit -m "feat: add QuickReplyChip component"
```

---

## Task 10: Barrel export + Vercel deploy

**Files:**
- Modify: `src/index.ts`
- Create: `vercel.json`

- [ ] **Step 1: Write src/index.ts**

```ts
// src/index.ts
export * from './components/Avatar'
export * from './components/Badge'
export * from './components/Tag'
export * from './components/Button'
export * from './components/Dropdown'
export * from './components/QuickReplyChip'
```

- [ ] **Step 2: Create vercel.json for Storybook deployment**

```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "installCommand": "npm install"
}
```

- [ ] **Step 3: Push to GitHub**

```bash
git add -A
git commit -m "feat: barrel exports and vercel config"
# Create repo at github.com — then:
git remote add origin https://github.com/da4aaa/ui-library.git
git push -u origin main
```

- [ ] **Step 4: Deploy on Vercel**

1. Go to vercel.com/new
2. Import the `ui-library` repo
3. Framework preset: **Other**
4. Build command: `npm run build-storybook`
5. Output directory: `storybook-static`
6. Deploy

Expected: Storybook live at `https://ui-library-[hash].vercel.app`. Every push to `main` redeploys.

- [ ] **Step 5: Final smoke test**

Open the deployed Storybook URL. Verify:
- All component stories render
- Controls panel works (change props live)
- No console errors
- Backgrounds toggle works (page-light / page-darker)

---

## Self-review

**Spec coverage:**
- ✓ React + Tailwind + shadcn-style — Task 1–2
- ✓ DS tokens in Tailwind config — Task 2
- ✓ Avatar (Image/Letter/Empty × 6 sizes) — Task 4
- ✓ Badge (5 colors × 2 sizes × icon) — Task 5
- ✓ Tag (removable, icon slot) — Task 6
- ✓ Button + IconButton — Task 7
- ✓ Dropdown shell + Row + Section — Task 8
- ✓ Quick Reply Chip — Task 9
- ✓ Storybook with per-component stories — Tasks 3–9
- ✓ Vercel deploy — Task 10

**Placeholder scan:** No TBD, no "implement later", all code blocks complete.

**Type consistency:** `VariantProps<typeof xVariants>` used consistently. `LucideIcon` type imported where used. `cn()` from `@/lib/utils` everywhere.
