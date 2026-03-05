/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:   '#6366F1',
        secondary: '#0D9488',
        warning:   '#F59E0B',
        danger:    '#F43F5E',
        success:   '#10B981',
        sidebar:   '#0F172A',
        'page-bg': '#F8FAFC',
        'card-bg': '#FFFFFF',
        border:    '#E2E8F0',
        'text-primary':   '#1E293B',
        'text-secondary': '#64748B',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}