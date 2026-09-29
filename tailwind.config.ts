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
          // 静かでミニマルな配色（紙・墨・苔）
          paper: '#F7F5F0',
          ink: '#2B2B28',
          moss: '#5E6B4E',
          night: '#151513',
          line: '#E4E0D6',
          // 旧トークン名（/about・/pricing・バナーで使用）を新配色に割り当て
          green: '#5E6B4E',
          'green-light': '#7A8768',
          gold: '#9C8A63',
          'gold-light': '#B3A27E',
          sky: '#8FA3AD',
          cream: '#F7F5F0',
          dark: '#2B2B28',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
        serif: ['Noto Serif JP', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
