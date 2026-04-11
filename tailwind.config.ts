import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bhg-blue': '#003366',
        'bhg-red': '#CC0000',
        'bhg-light': '#F5F5F5',
      },
      fontFamily: {
        'sans': ['Proxima Nova', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
