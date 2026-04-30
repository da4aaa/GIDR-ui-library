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
