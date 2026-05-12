/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:   '#006670', // Deep teal
        'primary-container': '#0b818d',
        secondary: '#111C2D',
        tertiary:  '#F59E0B',
        warning:   '#F59E0B',
        danger:    '#F43F5E',
        success:   '#10B981',
        sidebar:   '#263143', // Deep slate
        'page-bg': '#F9F9FF', // Base level 0
        'card-bg': '#FFFFFF', // Active card level 2
        'surface-low': '#F0F3FF', // Level 1
        'surface-highest': '#D8E3FB',
        border:    'rgba(17, 28, 45, 0.15)', // Ghost border rule
        'text-primary':   '#111C2D',
        'text-secondary': '#64748B',
      },
      fontFamily: {
        sora: ['Manrope', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'float': '0 0px 32px rgba(17, 28, 45, 0.04)',
      },
    },
  },
  plugins: [],
}