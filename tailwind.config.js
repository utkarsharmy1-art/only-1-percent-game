/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#a855f7',
          'purple-glow': '#c084fc',
          blue: '#3b82f6',
          'blue-glow': '#60a5fa',
          cyan: '#06b6d4',
          orange: '#f97316',
          'orange-glow': '#fb923c',
          pink: '#ec4899',
          green: '#22c55e',
          red: '#ef4444',
          yellow: '#eab308',
        },
        dark: {
          950: '#07060e',
          900: '#0d0b1a',
          850: '#131126',
          800: '#1b1735',
          700: '#27224c',
          600: '#38306b',
        }
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounceShort 0.5s ease-in-out infinite alternate',
        'shake': 'shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'countdown': 'countScale 1s ease-out forwards',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        bounceShort: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-6px)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(4px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-6px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(6px, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        countScale: {
          '0%': { transform: 'scale(2)', opacity: '0' },
          '50%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      boxShadow: {
        'neon-purple': '0 0 20px -3px rgba(168, 85, 247, 0.5), 0 0 10px -2px rgba(168, 85, 247, 0.3)',
        'neon-blue': '0 0 20px -3px rgba(59, 130, 246, 0.5), 0 0 10px -2px rgba(59, 130, 246, 0.3)',
        'neon-orange': '0 0 20px -3px rgba(249, 115, 22, 0.5), 0 0 10px -2px rgba(249, 115, 22, 0.3)',
        'neon-green': '0 0 20px -3px rgba(34, 197, 94, 0.5), 0 0 10px -2px rgba(34, 197, 94, 0.3)',
        'neon-red': '0 0 20px -3px rgba(239, 68, 68, 0.5), 0 0 10px -2px rgba(239, 68, 68, 0.3)',
      }
    },
  },
  plugins: [],
}
