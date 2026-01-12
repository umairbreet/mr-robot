/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors
        'hacker-green': '#10b981',
        'hacker-cyan': '#06b6d4',
        'hacker-red': '#ef4444',
        'hacker-yellow': '#f59e0b',
        'hacker-purple': '#8b5cf6',
        'hacker-gray': '#6b7280',
      },
      fontFamily: {
        'mono': ['"Courier New"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}