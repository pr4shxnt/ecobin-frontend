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
    },
  },
  plugins: [],
} 