/** @type {import('tailwindcss').Config} */
const { gray, white, blue } = require('tailwindcss/colors');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          title: gray[900],
          main: gray[600],
          bg: white,
          hover: blue[400],
        },
        dark: {
          title: gray[50],
          main: gray[300],
          bg: gray[800],
          hover: blue[400],
        },
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
    },
  },
  plugins: [],
};
