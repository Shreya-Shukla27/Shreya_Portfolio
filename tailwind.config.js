/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        'text-h': 'var(--text)',
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        'border-h': 'var(--border-h)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
      },
      fontFamily: {
        sans: ['var(--sans)'],
        serif: ['var(--serif)'],
        mono: ['var(--mono)'],
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        floatOrb: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulsePill: {
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(217,102,245,0)' },
          '50%': { 'box-shadow': '0 0 0 5px rgba(217,102,245,0.1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        ringPulse: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.025)' },
        },
        scrollAnim: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        ticker: 'ticker 24s linear infinite',
      },
    },
  },
  plugins: [],
}
