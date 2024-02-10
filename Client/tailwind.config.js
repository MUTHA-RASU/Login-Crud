/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        red:
        {
          50: '#ffe2ec',
          100: '#ffb3c5',
          200: '#fc839f',
          300: '#f95278',
          400: '#f62252',
          500: '#dd0939',
          600: '#ad032c',
          700: '#7c001e',
          800: '#4d0012',
          900: '#200005',
        },
        green:
        {
          50: '#e0ffe0',
          100: '#b1ffb1',
          200: '#80ff80',
          300: '#4fff4e',
          400: '#25ff20',
          500: '#14e60c',
          600: '#08b304',
          700: '#008000',
          800: '#004d00',
          900: '#001b00',
        },
      }
    },
  },
  plugins: [],
}
