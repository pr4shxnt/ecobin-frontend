/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'sans': ['Lato', 'sans-serif'], // Make Lato the default sans font
      },
      colors: {
        primary: {
          50: '#f0f4f0',
          100: '#e1e9e1',
          200: '#c3d3c3',
          300: '#a5bda5',
          400: '#87a787',
          500: '#3a563f',
          600: '#2e452f',
          700: '#223423',
          800: '#162317',
          900: '#0b120b',
        }
      }
    },
  },
  plugins: [],
} 