/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#070709',
        surface: {
          50: '#1e1e24',
          100: '#17171c',
          200: '#121216',
          300: '#0e0e12',
          400: '#0a0a0d',
          500: '#070709',
        },
        accent: {
          cyan: '#38bdf8',
          blue: '#2563eb',
          silver: '#e2e8f0',
          titanium: '#94a3b8',
          electric: '#00f0ff',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(56, 189, 248, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Syne', 'Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.25em',
        epic: '0.35em',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
