/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "Garcia",
        adelle: "Adelle-Sans"
      }, colors: {
        'primary': '#31B2EA',
        'light-bg': '#73B7D4',
        'lesson-bg': '#24779B',
        'account-light': '#82C5DC',
        'account-dark': '#068BB8',
      }, opacity: {
        '45': '.45'
      }, ringWidth: {
        '3': '3px',
      }, animation: {
        'gear-spin': 'gearSpin 2.8s ease-in-out infinite'
      }, keyframes: {
        gearSpin: {
          '0%': {transform: 'rotate(0deg)'},
          '21.4%': {transform: 'rotate(90deg)'},
          '25%': {transform: 'rotate(90deg)'},
          '46.4%': {transform: 'rotate(180deg)'},
          '50%': {transform: 'rotate(180deg)'},
          '71.4%': {transform: 'rotate(270deg)'},
          '75%': {transform: 'rotate(270deg)'},
          '96.4%': {transform: 'rotate(360deg)'},
          '100%': {transform: 'rotate(360deg)'}
      },
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
  },
  plugins: [],
};

