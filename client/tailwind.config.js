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
          green: '#2cff05',
          'green-dim': '#1db803',
          'green-glow': 'rgba(44, 255, 5, 0.15)',
          'green-glow-md': 'rgba(44, 255, 5, 0.30)',
          'green-glow-lg': 'rgba(44, 255, 5, 0.50)',
        },
        dark: {
          DEFAULT: '#000000',
          100: '#0a0a0a',
          200: '#111111',
          300: '#1a1a1a',
          400: '#222222',
          500: '#2d2d2d',
          600: '#3d3d3d',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(44, 255, 5, 0.2)',
          'border-dim': 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        display: ['"Orbitron"', '"Audiowide"', 'sans-serif'],
        audio:   ['"Audiowide"', 'sans-serif'],
        body:    ['"Rajdhani"', 'sans-serif'],
        mono:    ['"Share Tech Mono"', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(44, 255, 5, 0.5), 0 0 30px rgba(44, 255, 5, 0.2)',
        'neon-md': '0 0 20px rgba(44, 255, 5, 0.6), 0 0 60px rgba(44, 255, 5, 0.25)',
        'neon-lg': '0 0 30px rgba(44, 255, 5, 0.8), 0 0 80px rgba(44, 255, 5, 0.35)',
        'neon-inset': 'inset 0 0 20px rgba(44, 255, 5, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(44, 255, 5, 0.15)',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(44, 255, 5, 0.03) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(44, 255, 5, 0.03) 1px, transparent 1px)`,
        'hero-radial': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(44, 255, 5, 0.12) 0%, transparent 70%)',
        'neon-gradient': 'linear-gradient(135deg, #2cff05 0%, #1db803 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(44, 255, 5, 0.08) 0%, rgba(44, 255, 5, 0.02) 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
        'border-flow': 'borderFlow 3s linear infinite',
        'text-glow': 'textGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(44, 255, 5, 0.5), 0 0 30px rgba(44, 255, 5, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(44, 255, 5, 0.8), 0 0 60px rgba(44, 255, 5, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.6' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        textGlow: {
          '0%': { textShadow: '0 0 10px rgba(44, 255, 5, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(44, 255, 5, 1), 0 0 40px rgba(44, 255, 5, 0.5)' },
        },
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
