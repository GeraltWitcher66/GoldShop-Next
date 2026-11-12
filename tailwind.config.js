/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0b',
          soft: '#111114',
          line: '#1c1c20',
        },
        gold: {
          DEFAULT: '#c9a227',
          light: '#e8cf8b',
          deep: '#8c6d15',
        },
        champagne: '#f4e9d4',
      },
      fontFamily: {
        sans: [
          'Vazirmatn',
          'IRANSansX',
          'IRANSans',
          'Segoe UI',
          'Tahoma',
          'system-ui',
          'sans-serif',
        ],
        display: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        gold: '0 25px 60px -25px rgba(201, 162, 39, 0.45)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        softPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        cartIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'soft-pulse': 'softPulse 3.2s ease-in-out infinite',
        'cart-in': 'cartIn 0.35s cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
