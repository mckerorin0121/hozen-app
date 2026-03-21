import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hozen: {
          green: '#2D5016',
          'green-light': '#4A7A2E',
          gold: '#C5A55A',
          'gold-light': '#D4BA7A',
          sky: '#87CEEB',
          cream: '#F5F0E8',
          dark: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
