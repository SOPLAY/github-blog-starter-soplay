/** @type {import('tailwindcss').Config} */
const { gray, white } = require('tailwindcss/colors');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: { title: gray[900], main: gray[600], bg: white },
        dark: { title: gray[50], main: gray[300], bg: gray[800] },
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
    },
  },
  plugins: [],
};
