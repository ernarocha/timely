/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5e5a83',
        'primary-container': '#c9c3f3',
        secondary: '#6151a8',
        lime: '#bdf44a',
        surface: '#f9f9fc',
        'surface-low': '#f3f3f6',
        ink: '#1a163c',
        muted: '#6f6c7d',
        line: '#e8e7ef',
        midnight: '#171721',
        'midnight-card': '#22222f',
      },
      fontFamily: {
        headline: ['Hanken Grotesk', 'sans-serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        ambient: '0 10px 30px rgba(97, 81, 168, 0.08)',
        lift: '0 18px 45px rgba(55, 43, 116, 0.15)',
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pop: { from: { opacity: '0', transform: 'scale(.97)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
      animation: { rise: 'rise .45s ease-out both', pop: 'pop .18s ease-out both' },
    },
  },
  plugins: [],
}
