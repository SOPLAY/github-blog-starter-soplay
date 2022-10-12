/** @type {import('tailwindcss').Config} */
const { gray, white, blue, black, purple } = require('tailwindcss/colors');
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
          footerBg: '#f2f2f2',
          footerText: '#565a5e',
          gradient: {
            to: purple[400],
            from: blue[400],
            to_per: purple[900],
            from_per: blue[400],
          },
        },
        dark: {
          title: gray[50],
          main: gray[300],
          bg: '#202124',
          hover: blue[400],
          footerBg: '#171718',
          footerText: '#959a9d',
          gradient: {
            to: purple[400],
            from: blue[400],
            to_per: purple[900],
            from_per: blue[400],
          },
        },
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
