// tailwind.config.ts
//
// ─── DS TOKEN → TAILWIND CLASS REFERENCE ────────────────────────────────────
//
// RADIUS (DS variable → Tailwind class → px)
//   radius/sm    → rounded-sm    → 4px   form inputs, small badges
//   radius/md    → rounded-md    → 8px   buttons, rows, dropdown rows, tags
//   radius/lg    → rounded-lg    → 12px  dropdowns, cards, bubbles
//   radius/xl    → rounded-xl    → 16px  panels, larger cards
//   Radius/24    → rounded-2xl   → 24px  bottom sheets, modals, page containers
//   radius/full  → rounded-full  → 9999px pills, chips, avatars, icon buttons
//
// BORDER WIDTH
//   stroke/sm    → border-sm     → 1px   dividers, card borders
//   stroke/md    → border-md     → 1.5px button strokes, active states
//
// ELEVATION (shadow)
//   Elevation-1  → shadow-elevation-1    cards, small overlays
//   Elevation-2  → shadow-elevation-2    dropdowns, menus
//   Elevation-4  → shadow-elevation-4    modals, sheets
//
// TYPOGRAPHY
//   Caption      → text-caption          11px/14px regular   — labels, timestamps
//   Caption-md   → text-caption-md       12px/16px semibold  — section headers
//   Body-sm      → text-body-sm          13px/18px regular   — secondary text
//   Body         → text-body             14px/18px regular   — primary body
//   Body-bold    → text-body-bold        14px/20px bold      — strong body
//   Body-semi    → text-body-semi        14px/20px semibold  — interactive labels
//   Heading      → text-heading          16px/22px bold      — card titles
//   Heading-lg   → text-heading-lg       18px/24px bold      — page headings
//
// FONT FAMILIES
//   Nunito Sans  → font-sans    headings, buttons, labels
//   Inter        → font-body    body text, captions, data
//
// ────────────────────────────────────────────────────────────────────────────

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
