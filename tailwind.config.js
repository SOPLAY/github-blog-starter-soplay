/** @type {import('tailwindcss').Config} */
const { gray } = require('tailwindcss/colors');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: { title: gray[900], main: gray[600] },
        darkBase: { title: gray[50], main: gray[300] },
      },
    },
  },
  plugins: [],
};
