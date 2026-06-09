/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow"', 'sans-serif'],
        'barlow-condensed': ['"Barlow Condensed"', 'sans-serif'],
      },
      colors: {
        void: '#050508',
        'void-2': '#0a0a0f',
        'void-3': '#111118',
        bone: '#f7f7f8',
        muted: '#6b6b7a',
        'muted-2': '#3a3a48',
        signal: '#ffffff',
        seafoam: '#00FFA3',
        'seafoam-dim': 'rgba(0,255,163,0.12)',
        'seafoam-mid': 'rgba(0,255,163,0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
