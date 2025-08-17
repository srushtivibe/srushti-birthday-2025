/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          200: '#E5D3B3',
          300: '#D4B995'
        }
      }
    },
  },
  plugins: [],
}