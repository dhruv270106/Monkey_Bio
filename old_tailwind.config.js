/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6cf383',
          DEFAULT: '#43E660', // Specified Linktree-inspired green
          dark: '#2ecf4a',
        },
        secondary: {
          light: '#1e293b',
          DEFAULT: '#0F172A',
          dark: '#020617',
        },
        neutral: {
          100: '#F5F7FA',
          200: '#EAEFF4',
          900: '#111111',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        headings: ['Inter', 'system-ui', 'sans-serif'], // Or Manrope
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
